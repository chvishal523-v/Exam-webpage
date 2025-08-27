const { validationResult } = require('express-validator');
const Question = require('../models/Question');

// Fisher–Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

exports.startExam = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    // Random sample using aggregation
    const pipeline = [{ $sample: { size: limit } }];
    const docs = await Question.aggregate(pipeline);

    // Hide correct answers and shuffle options for each question
    const payload = docs.map(q => ({
      id: q._id,
      question: q.question,
      options: shuffle([...q.options])
    }));
    res.json({ questions: payload, durationSeconds: 30 * 60 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.submitExam = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { answers } = req.body; // [{ questionId, selectedOption }]
    if (!Array.isArray(answers)) return res.status(400).json({ msg: 'Invalid answers format' });
    const ids = answers.map(a => a.questionId);
    const questions = await Question.find({ _id: { $in: ids } }).lean();

    const questionMap = new Map(questions.map(q => [String(q._id), q]));
    let score = 0;
    const detailed = answers.map(a => {
      const q = questionMap.get(String(a.questionId));
      const isCorrect = q && q.correctAnswer === a.selectedOption;
      if (isCorrect) score += 1;
      return {
        questionId: a.questionId,
        selected: a.selectedOption,
        correct: q ? q.correctAnswer : null,
        isCorrect: !!isCorrect
      };
    });

    res.json({
      total: answers.length,
      score,
      details: detailed
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
