import Assessment from '../models/Assessment.js';

import express from 'express';
import { analyzeAssessment } from '../models/utils/assessmentAnalysis.js';

// Scoring logic helper
const calculateScores = (answers) => {
  let total = 0;
  const categoryScores = {
    stress: 0,
    focus: 0,
    positivity: 0,
  };

  answers.forEach((ans, i) => {
    total += ans.selectedOption;

    if (i < 3) categoryScores.stress += ans.selectedOption;
    else if (i < 6) categoryScores.focus += ans.selectedOption;
    else categoryScores.positivity += ans.selectedOption;
  });

  return {
    totalScore: total,
    categoryScores,
    suggestions: generateSuggestions(categoryScores),
  };
};

// Generate suggestions (basic logic)
const generateSuggestions = (scores) => {
  const suggestions = [];

  if (scores.stress > 10) suggestions.push('Try meditation or breathing exercises.');
  if (scores.focus < 5) suggestions.push('Use a Pomodoro timer to stay on task.');
  if (scores.positivity < 5) suggestions.push('Consider a gratitude journal.');

  return suggestions;
};

export const submitAssessment = async (req, res) => {
    const { userId, answers } = req.body;
  
    if (!userId || !answers) {
      return res.status(400).json({ message: 'Missing userId or answers.' });
    }
  
    const scores = calculateScores(answers);
  
    try {
      // Call Gemini API analysis util
      const aiAnalysis = await analyzeAssessment(scores.categoryScores);
    //   const aiAnalysis = JSON.parse(aiResponseText);
  
      const existing = await Assessment.findOne({ userId }).sort({ createdAt: -1 });
  
      const newAssessment = new Assessment({
        userId,
        answers,
        totalScore: scores.totalScore,
        categoryScores: scores.categoryScores,
        suggestions: scores.suggestions,
        aiAnalysis,  // <-- add the AI advice here
        lastScore: existing
          ? {
              totalScore: existing.totalScore,
              categoryScores: existing.categoryScores,
              suggestions: existing.suggestions,
            }
          : null,
      });
  
      await newAssessment.save();
  
      res.status(201).json({
        message: 'Assessment submitted!',
        assessment: newAssessment,
        aiAnalysis,  // optionally send AI advice separately if you want
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

export const getLatestAssessment = async (req, res) => {
  const { userId } = req.params;

  try {
    const latest = await Assessment.findOne({ userId }).sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ message: 'No assessment found' });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
