"use client";
import React, { useState, useRef, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import axios from "axios";

const Jess = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! I'm Jess, your wellness companion. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const synthRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Setup speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const synth = window.speechSynthesis;
      synth.onvoiceschanged = () => synth.getVoices(); // Force load
      synth.getVoices();
    }
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getPreferredVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = [
      "Google UK English Male",
      "Microsoft David - English (United States)",
      "Alex",
      "Daniel",
      "en-US-Wavenet-D",
    ];
    for (const name of preferredVoices) {
      const voice = voices.find((v) => v.name === name);
      if (voice) return voice;
    }
    return voices.find((v) => v.lang === "en-US" || v.lang === "en-GB") || voices[0];
  };

  const speakText = (text) => {
    const synth = synthRef.current;
    if (!synth) return;

    if (synth.speaking) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = getPreferredVoice();
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    synth.speak(utterance);
    currentUtteranceRef.current = utterance;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token") || "";

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/JessAI`,
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botMessage = {
        type: "bot",
        content: res.data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen relative">
      <AuroraBackground className="absolute inset-0 -z-10 h-full w-full" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl h-[85vh] flex flex-col bg-slate-900/20 backdrop-blur-2xl rounded-3xl border border-blue-300/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-8 bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-cyan-500/10 border-b border-blue-300/20">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 via-sky-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <img src="/jess_logo.png" alt="Jess logo" className="rounded-2xl" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Jess</h2>
                <p className="text-sm text-blue-200/80 font-medium">Your Wellness Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-slate-800/30 rounded-full px-4 py-2 border border-blue-400/20">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-blue-100/90 font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-blue-400/20 scrollbar-track-transparent">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] ${message.type === "user" ? "order-2 ml-4" : "order-1 mr-4"}`}>
                  <div
                    className={`p-5 rounded-3xl shadow-lg relative backdrop-blur-sm ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-blue-500 via-blue-600 to-sky-600 text-white shadow-blue-500/20"
                        : "bg-slate-100/95 text-slate-800 border border-white/20 shadow-slate-900/10"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                      {message.type === "bot" && (
                        <button
                          onClick={() => speakText(message.content)}
                          className="w-7 h-7 rounded-full bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 border border-blue-200/20"
                          title="Read this message"
                        >
                          <img src="/speaker.png" alt="Speak" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className={`text-xs mt-2 px-3 font-medium text-blue-200/70 ${message.type === "user" ? "text-right" : "text-left"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                {message.type === "bot" && (
                  <div className="w-10 h-10 flex-shrink-0 rounded-2xl bg-gradient-to-br from-blue-400 via-sky-400 to-cyan-400 flex items-center justify-center mr-4 mt-1 shadow-lg shadow-blue-500/25">
                    <span className="text-white font-bold text-sm">J</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 via-sky-400 to-cyan-400 flex items-center justify-center mr-4 mt-1 shadow-lg shadow-blue-500/25">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <div className="bg-slate-100/95 p-5 rounded-3xl shadow-lg border border-white/20">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-8 bg-slate-900/10 backdrop-blur-sm border-t border-blue-300/20">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  className="w-full p-5 pr-14 bg-slate-100/95 rounded-3xl border border-blue-200/30 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none shadow-lg font-medium transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts with Jess..."
                  rows={1}
                  style={{ minHeight: "60px", maxHeight: "140px" }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="p-5 bg-gradient-to-br from-blue-500 via-blue-600 to-sky-600 text-white rounded-3xl font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-blue-200/60 mt-4 text-center font-medium">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jess;
