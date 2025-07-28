import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Top");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 64;
      const offsetPosition = el.offsetTop - navbarHeight - 20;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
    { id: "quotes", label: "Quotes" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ?? "bg-black/60 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-[#FBB6CE] via-[#EC4899] to-[#BE185D] text-transparent bg-clip-text tracking-wide">
              ALUMA
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                 className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeSection === item.id
                  ? "text-[#ec4899]"
                  : "text-white hover:text-[#F472B6]"
                }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ec4899] rounded-full transition-all duration-300"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white/80 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        
        <div className={`absolute top-16 right-4 left-4 bg-gradient-to-br from-[#FBB6CE]/80 via-[#EC4899]/80 to-[#BE185D]/80 rounded-2xl border border-white/20 transition-all duration-300 ${
          isMobileMenuOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-2"
        }`}>
          <div className="p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition duration-200 ${
              activeSection === item.id
              ? "text-[#EC4899] bg-white/30"
              : "text-white hover:text-[#F472B6] hover:bg-white/20"
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
