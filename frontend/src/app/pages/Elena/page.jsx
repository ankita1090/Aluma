"use client";
import React, { useState, useRef, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import axios from "axios";

const Elena = () => {
  const [input, setInput] = useState("");
  const synthRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm Elena, your wellness companion. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPreferredVoice = () => {
    const voices = window.speechSynthesis.getVoices();
  
    // Try common female voices first
    const preferredFemaleVoices = [
      "Google US English",
      "Google UK English Female",
      "Microsoft Zira - English (United States)",
      "Samantha", // macOS
      "Victoria", // macOS
      "en-US-Wavenet-F", // Chrome TTS extension voice (sometimes available)
    ];
  
    for (const name of preferredFemaleVoices) {
      const voice = voices.find((v) => v.name === name);
      if (voice) return voice;
    }
  
    // Fallback to any en-US female-sounding voice
    const fallback = voices.find((v) =>
      v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
    );
  
    return fallback || voices[0]; // Final fallback
  };
  
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const synth = window.speechSynthesis;
      const loadVoices = () => {
        synth.getVoices(); // trigger loading
      };
      synth.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ElenaAI`, 
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // <-- send token here
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
      const errorMessage = {
        type: "bot",
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
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

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const speakText = (text) => {
    const synth = synthRef.current;

    if (!synth) return;

    if (synth.speaking) {
      synth.cancel();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getPreferredVoice();
    if (voice) utterance.voice = voice;

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    synth.speak(utterance);
    currentUtteranceRef.current = utterance;
  };

  return (
    <div className="min-h-screen">
      <AuroraBackground className="fixed inset-0 -z-10" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl h-[80vh] flex flex-col bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">
                <img src="/elena_logo.png" alt="" className="rounded-full" />
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Elena</h2>
                <p className="text-sm text-white/70">Your Wellness Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-white/70">Online</span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.type === "user" ? "order-2" : "order-1"
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl shadow-lg relative ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white ml-4"
                        : "bg-white/90 backdrop-blur-sm text-gray-800 mr-4"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      {message.type === "bot" && (
                        <img
                          src="/speaker.png"
                          alt="Speak"
                          className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform mt-0.5"
                          onClick={() => speakText(message.content)}
                          title="Read this message"
                        />
                      )}
                    </div>
                  </div>
                  <p
                    className={`text-xs text-white/60 mt-1 px-2 ${
                      message.type === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                {message.type === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white font-medium text-xs ">
                      E
                    </span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mr-3 mt-1">
                  <span className="text-white font-medium text-xs">E</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg mr-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/5 border-t border-white/10">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  className="w-full p-4 pr-12 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none shadow-lg transition-all duration-200"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                  placeholder="Type your message here... (Press Enter to send)"
                  style={{ minHeight: "52px", maxHeight: "120px" }}
                />
              </div>
              <button
                className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl font-medium hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[52px]"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-white/50 mt-2 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elena;
