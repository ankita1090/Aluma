import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Top");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "top", label: "Top" },
    { id: "FocusCards", label: "Elena & Jess" },
    { id: "FocusCards", label: "Journal" },
    { id: "SelfAssessment", label: "AI Assessment" },
    { id: "music", label: "Music" },
    { id: "quotes", label: "Quotes" }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/10 backdrop-blur-md border-b border-white/10" 
          : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <span className="text-white font-semibold text-lg tracking-wide">
                {/* WellnessLab */}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"></div>
                  )}
                  
                  {/* Hover indicator */}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-white/50 rounded-full transition-all duration-200 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}></div>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMobileMenuOpen 
          ? "opacity-100 visible" 
          : "opacity-0 invisible"
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Mobile Menu Panel */}
        <div className={`absolute top-16 right-4 left-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-95 opacity-0 -translate-y-2"
        }`}>
          <div className="p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-white bg-white/20"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}