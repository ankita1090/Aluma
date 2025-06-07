import React from "react";
import { ArrowRight, Brain, Heart, Target, BarChart3, Calendar, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";

dotenv.config();

export default function SelfAssessmentCard() {
  const router = useRouter();

  const handleNewTest = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.alert(
        "No token found. Please log in first. CHECK THE SELFASSESSMENT CARD"
      );
      return;
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

  const handleViewDashboard = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("No token found. Please log in first.");
      return;
    }
  
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded._id;
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/assessment/${userId}/latest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch assessment data");
      }
  
      const assessmentData = await response.json();
      console.log("Fetched assessment data:", assessmentData);
  
      // Save the fetched data to sessionStorage
      sessionStorage.setItem("assessmentData", JSON.stringify(assessmentData));
  
      // Navigate to the dashboard page
      router.push("/pages/pastAssessmentDashboard");
  
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error fetching your data. Please try again.");
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-transparent p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        
        {/* Take New Test Card */}
        <div
          onClick={handleNewTest}
          className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border border-emerald-200/50 select-none group z-10"
        >
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-emerald-600 font-medium text-sm tracking-wide uppercase">
              Daily Check-in
            </span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main content */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
              Take New Assessment
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Reflect on your mental wellness, productivity, and personal
              growth. Track your daily progress and build mindful habits.
            </p>

            {/* Action items */}
            <div className="space-y-3 mb-6">
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
          </div>

          {/* Time estimate and action */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-medium text-slate-800">
                2-3 minutes
              </div>
              <div className="text-sm text-slate-500">Quick assessment</div>
            </div>
            <div className="bg-emerald-500 group-hover:bg-emerald-600 transition-colors rounded-full p-4 shadow-lg">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* View Dashboard Card */}
        <div
          onClick={handleViewDashboard}
          className="bg-gradient-to-br from-pink-200 to-rose-300
          rounded-3xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border border-blue-200/50 select-none group z-10"
        >
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
              Analytics
            </span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main content */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
              View Assessment Dashboard
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Review your progress, analyze trends, and gain insights from your
              assessment history. See how you've grown over time.
            </p>

            {/* Dashboard features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-slate-700">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <span className="text-base">Progress analytics</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="text-base">Trend analysis</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="text-base">Historical data</span>
              </div>
            </div>
          </div>

          {/* Stats preview and action */}
          <div className="flex items-center justify-between">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 mb-1">89%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">
                  Weekly Avg
                </div>
              </div>
            </div>
            <div className="bg-blue-500 group-hover:bg-blue-600 transition-colors rounded-full p-4 shadow-lg">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}