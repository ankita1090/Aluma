"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dotenv from "dotenv";
import AssessmentDashboard from "../selfAssessmentDashboard/page";

dotenv.config();

const questions = [
  "I felt emotionally balanced throughout the week.",
  "I was able to manage my stress effectively.",
  "I maintained a healthy sleep routine.",
  "I felt motivated to complete my daily responsibilities.",
  "I took time for activities that helped me relax or recharge.",
  "I felt connected to friends, family, or community.",
  "I stayed present and focused during tasks or conversations.",
  "I recognized and acknowledged my emotions as they came.",
  "I experienced moments of joy, gratitude, or contentment.",
  "Overall, I would rate my mental health this week as good."
];


const options = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly Agree", value: 5 },
];

export default function SelfAssessmentPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1D5DCB] via-[#4D86E0] to-[#7AA7F2] flex items-center justify-center">
        <div className="text-white text-xl">Loading or no user ID provided</div>
      </div>
    );
  }

  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleOptionChange = (qIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = { questionIndex: qIndex, selectedOption: value };
    setAnswers(newAnswers);
    
    // Auto-advance to next question after a short delay
    if (qIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(qIndex + 1);
      }, 500);
    }
  };

  const handleSubmit = async () => {
    if (answers.some((a) => a === null)) {
      alert("Please answer all questions");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/assessment/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, answers }),
      });
      const data = await res.json();
      console.log("Full API response:", data);
      console.log("Full ai response :", data.aiAnalysis);

      if (res.ok) {
        setResult({
          ...data.assessment,
          aiAnalysis: data.aiAnalysis,
        });
      } else {
        alert(data.message || "Error submitting assessment");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = ((answers.filter(a => a !== null).length) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allAnswered = answers.every(a => a !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1D5DCB] via-[#4D86E0] to-[#7AA7F2]">
      {!result ? (
        <div className="relative">
          {/* Progress Bar */}
          <div className="fixed top-0 left-0 w-full z-50">
            <div className="h-2 bg-black/20 backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-[#C5DFFF] via-[#7AA7F2] to-[#4D86E0] transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="h-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="text-center py-2 bg-black/10 backdrop-blur-sm text-white text-sm font-medium">
              Question {answers.filter(a => a !== null).length} of {questions.length} completed
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-20 px-4 pb-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-block">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-[#C5DFFF] via-[#7AA7F2] to-[#4D86E0] bg-clip-text text-transparent mb-4">
                    Self Assessment
                  </h1>
                  <div className="h-1 bg-gradient-to-r from-[#C5DFFF] to-[#7AA7F2] rounded-full"></div>
                </div>
                <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
                  Take your time to reflect and answer honestly. Each response helps us understand you better.
                </p>
              </div>

              {/* Question Card - Single Question Display */}
              <div className="flex justify-center">
                {questions.map((q, i) => {
                  const isAnswered = answers[i] !== null;
                  const isCurrent = i === currentQuestion;
                  
                  if (!isCurrent) return null;
                  
                  return (
                    <div
                      key={i}
                      className="w-full max-w-4xl transform transition-all duration-500 animate-fadeIn"
                    >
                      <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm border-2 bg-white/10 border-white/20 shadow-2xl shadow-black/20">
                        
                        {/* Aurora-like animated background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1D5DCB]/20 via-[#4D86E0]/15 to-[#7AA7F2]/20"></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-white/10"></div>
                        
                        {/* Question Header */}
                        <div className="relative p-8 pb-6">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4D86E0] to-[#7AA7F2] flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-[#4D86E0]/30">
                                {i + 1}
                              </div>
                              <span className="text-sm font-medium text-white/90 uppercase tracking-wider">
                                Question {i + 1} of {questions.length}
                              </span>
                            </div>
                            <div className="text-[#C5DFFF] text-sm font-medium">
                              {answers.filter(a => a !== null).length}/{questions.length} Complete
                            </div>
                          </div>
                          
                          <h3 className="text-3xl font-bold text-white mb-8 leading-relaxed drop-shadow-lg">
                            {q}
                          </h3>
                        </div>

                        {/* Options */}
                        <div className="relative px-8 pb-8">
                          <div className="grid gap-4">
                            {options.map((opt, optIndex) => {
                              const isSelected = answers[i]?.selectedOption === opt.value;
                              return (
                                <label 
                                  key={opt.value} 
                                  className="group relative cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name={`question-${i}`}
                                    value={opt.value}
                                    checked={isSelected}
                                    onChange={() => handleOptionChange(i, opt.value)}
                                    className="sr-only"
                                  />
                                  <div className={`relative flex items-center p-5 rounded-xl border-2 transition-all duration-300 transform ${
                                    isSelected
                                      ? 'border-[#7AA7F2] bg-gradient-to-r from-[#4D86E0]/30 to-[#7AA7F2]/20 shadow-xl shadow-[#4D86E0]/30 scale-105 bg-white/20'
                                      : 'border-white/30 bg-white/10 hover:border-[#7AA7F2]/70 hover:bg-white/20 hover:scale-102 backdrop-blur-sm'
                                  }`}>
                                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-300 ${
                                      isSelected 
                                        ? 'border-[#7AA7F2] bg-[#7AA7F2] shadow-lg shadow-[#4D86E0]/40' 
                                        : 'border-white/50 group-hover:border-[#7AA7F2]/70'
                                    }`}>
                                      {isSelected && (
                                        <div className="w-3 h-3 bg-white rounded-full animate-scale-in"></div>
                                      )}
                                    </div>
                                    <span className={`text-lg font-semibold transition-all duration-300 ${
                                      isSelected ? 'text-white drop-shadow-lg' : 'text-white/80 group-hover:text-white'
                                    }`}>
                                      {opt.label}
                                    </span>
                                    {isSelected && (
                                      <div className="ml-auto">
                                        <div className="w-8 h-8 bg-[#7AA7F2] rounded-full flex items-center justify-center animate-scale-in shadow-lg">
                                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              {allAnswered && (
                <div className="mt-12 text-center animate-fadeIn">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`relative px-12 py-4 rounded-2xl font-bold text-xl text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      loading
                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#1D5DCB] via-[#4D86E0] to-[#7AA7F2] hover:from-[#134BB3] hover:via-[#4D86E0] hover:to-[#7AA7F2] shadow-2xl shadow-[#4D86E0]/30 hover:shadow-[#4D86E0]/50'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Analyzing Your Responses...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <span>Complete Assessment</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <AssessmentDashboard result={result} />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}