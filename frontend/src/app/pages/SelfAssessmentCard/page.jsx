import React from "react";
import { ArrowRight, Brain, Heart, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SelfAssessmentCard() {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.alert(
        "No token found. Please log in first. CHECK THE SELFASSESSMENT CARD"
      );
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded._id;
      console.log("this is the userid", userId);

      router.push(`/pages/SelfAssessmentPage?userId=${encodeURIComponent(userId)}`);

    } catch (error) {
      console.error("Error decoding token:", error);
      console.alert(
        "Invalid token format. Please log in again. CHECK THE SELFASSESSMENT CARD"
      );
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6 flex items-center justify-center">
      <div
        onClick={handleClick}
        className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-8 max-w-4xl w-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border border-emerald-200/50 select-none group"
      >
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-emerald-600 font-medium text-sm tracking-wide uppercase">
            Daily Check-in
          </span>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        </div>

        {/* Main horizontal layout */}
        <div className="flex items-center gap-8">
          {/* Left side - Main content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
              Take your self assessment for today
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Reflect on your mental wellness, productivity, and personal
              growth. Track your daily progress and build mindful habits.
            </p>

            {/* Action items */}
            <div className="flex items-center gap-8 mb-6">
              <div className="flex items-center space-x-3 text-slate-700">
                <Brain className="w-5 h-5 text-emerald-500" />
                <span className="text-base">Mental clarity</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <Heart className="w-5 h-5 text-emerald-500" />
                <span className="text-base">Emotional well-being</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <Target className="w-5 h-5 text-emerald-500" />
                <span className="text-base">Goal achievement</span>
              </div>
            </div>

            {/* Time estimate */}
            <div className="flex items-center space-x-4">
              <div>
                <div className="text-lg font-medium text-slate-800">
                  2-3 minutes
                </div>
                <div className="text-sm text-slate-500">Quick assessment</div>
              </div>
              <div className="bg-emerald-500 group-hover:bg-emerald-600 transition-colors rounded-full p-4 shadow-lg pointer-events-none">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Right side - Stats card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/30 min-w-[280px]">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-slate-800 mb-2">
                View AI Insights
              </div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">
                Current Streak
              </div>
            </div>

            <div className="w-full h-16 mb-4">
              <svg viewBox="0 0 200 60" className="w-full h-full">
                <path
                  d="M10 45 Q30 25 50 35 Q70 20 90 30 Q110 15 130 25 Q150 10 170 20 Q180 15 190 18"
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                  className="drop-shadow-sm"
                />
                <circle cx="190" cy="18" r="3" fill="#10b981" />
              </svg>
            </div>

            <div className="text-center">
              <div className="text-2xl font-semibold text-emerald-600 mb-1">
                89%
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">
                Weekly Average
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
