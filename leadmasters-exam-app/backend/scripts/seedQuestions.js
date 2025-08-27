require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Question = require('../models/Question');
//50 sample questions for database  we need to seed this 
const SAMPLE = [
  {
    question: "What is the average of 10, 20, 30, 40 and 50?",
    options: ["20", "25", "30", "35"],
    correctAnswer: "30"
  },
  {
    question: "If 12 men can complete a work in 6 days, how many men are required to complete it in 3 days?",
    options: ["6", "12", "18", "24"],
    correctAnswer: "24"
  },
  {
    question: "The sum of angles in a triangle is:",
    options: ["90°", "120°", "180°", "360°"],
    correctAnswer: "180°"
  },
  {
    question: "The probability of getting a head when tossing a fair coin is:",
    options: ["0", "0.25", "0.5", "1"],
    correctAnswer: "0.5"
  },
  {
    question: "Which is the next prime number after 7?",
    options: ["9", "11", "13", "17"],
    correctAnswer: "11"
  },
  {
    question: "If 5x = 20, what is x?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "4"
  },
  {
    question: "A clock shows 3:15. What is the angle between the hour and minute hand?",
    options: ["0°", "7.5°", "15°", "30°"],
    correctAnswer: "7.5°"
  },
  {
    question: "Simplify: 25% of 200",
    options: ["25", "40", "50", "100"],
    correctAnswer: "50"
  },
  {
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    correctAnswer: "12"
  },
  {
    question: "Speed = Distance / ?",
    options: ["Velocity", "Time", "Work", "Power"],
    correctAnswer: "Time"
  },
  {
    question: "Which number is divisible by both 3 and 5?",
    options: ["10", "12", "15", "22"],
    correctAnswer: "15"
  },
  {
    question: "The synonym of 'Rapid' is:",
    options: ["Slow", "Fast", "Weak", "Dull"],
    correctAnswer: "Fast"
  },
  {
    question: "The antonym of 'Victory' is:",
    options: ["Defeat", "Success", "Joy", "Pride"],
    correctAnswer: "Defeat"
  },
  {
    question: "Find the missing number: 2, 4, 8, 16, ?",
    options: ["24", "30", "32", "36"],
    correctAnswer: "32"
  },
  {
    question: "If 1 dollar = ₹80, what is ₹400 in dollars?",
    options: ["4", "5", "6", "8"],
    correctAnswer: "5"
  },
  {
    question: "Simplify: 3² + 4²",
    options: ["12", "18", "25", "30"],
    correctAnswer: "25"
  },
  {
    question: "In a right triangle, one angle is 90°. What is the sum of the other two angles?",
    options: ["45°", "60°", "90°", "180°"],
    correctAnswer: "90°"
  },
  {
    question: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2"
  },
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"],
    correctAnswer: "New Delhi"
  },
  {
    question: "If a car runs at 60 km/hr, how much time will it take to cover 180 km?",
    options: ["2 hr", "3 hr", "4 hr", "5 hr"],
    correctAnswer: "3 hr"
  },
  {
    question: "What is the opposite of 'Generous'?",
    options: ["Kind", "Selfish", "Friendly", "Rich"],
    correctAnswer: "Selfish"
  },
  {
    question: "Which one is not a vowel?",
    options: ["A", "E", "I", "Y"],
    correctAnswer: "Y"
  },
  {
    question: "The chemical formula of water is:",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correctAnswer: "H2O"
  },
  {
    question: "Which shape has all sides equal?",
    options: ["Rectangle", "Square", "Triangle", "Circle"],
    correctAnswer: "Square"
  },
  {
    question: "Simplify: 100 ÷ 4 ÷ 5",
    options: ["2", "4", "5", "20"],
    correctAnswer: "5"
  },
  {
    question: "Find the odd one out: Apple, Banana, Carrot, Mango",
    options: ["Apple", "Banana", "Carrot", "Mango"],
    correctAnswer: "Carrot"
  },
  {
    question: "Which of these is an even number?",
    options: ["13", "15", "18", "21"],
    correctAnswer: "18"
  },
  {
    question: "If 8 + x = 15, what is x?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    question: "The synonym of 'Happy' is:",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    correctAnswer: "Joyful"
  },
  {
    question: "If a man earns ₹500 per day, how much will he earn in 15 days?",
    options: ["₹5000", "₹7500", "₹10000", "₹15000"],
    correctAnswer: "₹7500"
  },
  {
    question: "Which gas do humans exhale?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correctAnswer: "Carbon Dioxide"
  },
  {
    question: "How many minutes are there in 2 hours?",
    options: ["60", "90", "100", "120"],
    correctAnswer: "120"
  },
  {
    question: "What is 15% of 200?",
    options: ["15", "20", "25", "30"],
    correctAnswer: "30"
  },
  {
    question: "Which day comes after Friday?",
    options: ["Wednesday", "Thursday", "Saturday", "Sunday"],
    correctAnswer: "Saturday"
  },
  {
    question: "The antonym of 'Begin' is:",
    options: ["Start", "End", "Open", "Create"],
    correctAnswer: "End"
  },
  {
    question: "Which is the smallest 3-digit number?",
    options: ["99", "100", "101", "111"],
    correctAnswer: "100"
  },
  {
    question: "Solve: 9 × 8",
    options: ["56", "64", "72", "81"],
    correctAnswer: "72"
  },
  {
    question: "If 2 pencils cost ₹10, how many can you buy for ₹50?",
    options: ["5", "8", "10", "12"],
    correctAnswer: "10"
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter"
  },
  {
    question: "Find the next number: 2, 4, 6, 8, ?",
    options: ["9", "10", "11", "12"],
    correctAnswer: "10"
  },
  {
    question: "What is the opposite of 'Hot'?",
    options: ["Warm", "Cold", "Cool", "Boiling"],
    correctAnswer: "Cold"
  },
  {
    question: "If 20% of x = 40, then x = ?",
    options: ["100", "150", "200", "250"],
    correctAnswer: "200"
  },
  {
    question: "Which one is not a primary color?",
    options: ["Red", "Blue", "Yellow", "Green"],
    correctAnswer: "Green"
  },
  {
    question: "What is the synonym of 'Brave'?",
    options: ["Cowardly", "Fearless", "Weak", "Timid"],
    correctAnswer: "Fearless"
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6"
  },
  {
    question: "Solve: 45 ÷ 9",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5"
  },
  {
    question: "Find the odd one: Cat, Dog, Tiger, Rose",
    options: ["Cat", "Dog", "Tiger", "Rose"],
    correctAnswer: "Rose"
  },
  {
    question: "Which metal is used to make wires?",
    options: ["Gold", "Silver", "Copper", "Iron"],
    correctAnswer: "Copper"
  },
  {
    question: "If 3x = 21, what is x?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    question: "Which month has 28 or 29 days?",
    options: ["January", "February", "March", "April"],
    correctAnswer: "February"
  }
];

(async () => {
  try {
    await connectDB();
    await Question.deleteMany({});
    await Question.insertMany(SAMPLE);
    console.log('Seeded questions:', SAMPLE.length);
    await mongoose.connection.close();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
