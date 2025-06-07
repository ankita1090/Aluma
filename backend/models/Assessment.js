import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionIndex: Number,
  selectedOption: Number,
});

const scoreBreakdownSchema = new mongoose.Schema({
  totalScore: Number,
  categoryScores: {
    stress: Number,
    focus: Number,
    positivity: Number,
  },
  suggestions: [String],
});

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    answers: [answerSchema],
    totalScore: Number,
    categoryScores: {
      stress: Number,
      focus: Number,
      positivity: Number,
    },
    suggestions: [String],
    lastScore: scoreBreakdownSchema, // <-- stores last score breakdown
  },
  {
    timestamps: true,
  }
);

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;
