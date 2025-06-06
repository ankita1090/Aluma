'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Journal() {
  const [userId, setUserId] = useState(null);
  const [pages, setPages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('');
  const Router = useRouter();

  // Decode token to get userId on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
        console.log("Decoded token:", decoded);
        setUserId(decoded.id || decoded._id); // Adjust according to your JWT payload
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  // Fetch journal entries after userId is set
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
    const userId = decoded.id || decoded._id; // Adjust according to your JWT payload

    if (!userId) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/journal/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          console.error("Invalid data from API", data);
          return;
        }
        const mappedPages = {};
        data.forEach((entry) => {
          mappedPages[entry.pageNumber] = entry.text;
        });
        setPages(mappedPages);
        setText(mappedPages[currentPage] || "");
      })
      .catch((err) => console.error("Error fetching journal entries:", err));
  }, [userId]);

  // Change page handler with flip animation
  const goToPage = (pageNum) => {
    if (pageNum === currentPage || isFlipping) return;
    
    setPages((prev) => ({ ...prev, [currentPage]: text }));
    setIsFlipping(true);
    setFlipDirection(pageNum > currentPage ? 'forward' : 'backward');
    
    setTimeout(() => {
      setCurrentPage(pageNum);
      setText(pages[pageNum] || "");
    }, 1000); // Half of the animation duration
    
    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection('');
    }, 2000); // Full animation duration
  };

  // Save current page content
  const handleSave = async () => {
    if (!userId) return alert("User not logged in");

    const token = localStorage.getItem("token");
    const body = {
      userId, // add this
      pageNumber: currentPage,
      text,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/journal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Failed to save entry");
      alert("Saved!");
    } catch (error) {
      console.error(error);
      alert("Error saving entry");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 flex items-center justify-center">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
        
        .journal-texture {
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255,248,220,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,248,220,0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,248,220,0.2) 0%, transparent 50%);
        }
        
        .paper-lines {
          background-image: repeating-linear-gradient(
            transparent,
            transparent 31px,
            rgba(59, 130, 246, 0.1) 31px,
            rgba(59, 130, 246, 0.1) 33px
          );
        }
        
        .handwriting {
          font-family: 'Kalam', cursive;
          line-height: 32px;
        }
        
        .margin-line {
          border-left: 2px solid rgba(239, 68, 68, 0.3);
        }
        
        .page-shadow {
          box-shadow: 
            0 0 0 1px rgba(120, 53, 15, 0.1),
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        
        .book-binding {
          background: linear-gradient(to right, 
            rgba(120, 53, 15, 0.8) 0%, 
            rgba(120, 53, 15, 0.6) 50%, 
            rgba(120, 53, 15, 0.8) 100%);
        }

        .page-flip-container {
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .page-flip {
          transition: all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: left center;
          transform-style: preserve-3d;
          position: relative;
        }

        .page-flip.flipping-forward {
          animation: flipForward 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .page-flip.flipping-backward {
          animation: flipBackward 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes flipForward {
          0% {
            transform: rotateY(0deg) translateZ(0px);
            box-shadow: 
              0 0 0 1px rgba(120, 53, 15, 0.1),
              0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              inset 0 0 0 1px rgba(255, 255, 255, 0.1);
          }
          25% {
            transform: rotateY(-25deg) translateZ(20px);
            box-shadow: 
              -8px 0 16px rgba(0, 0, 0, 0.15),
              -4px 0 8px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: rotateY(-90deg) translateZ(60px);
            box-shadow: 
              -25px 0 50px rgba(0, 0, 0, 0.25),
              -15px 0 30px rgba(0, 0, 0, 0.15);
          }
          75% {
            transform: rotateY(-155deg) translateZ(20px);
            box-shadow: 
              -8px 0 16px rgba(0, 0, 0, 0.15),
              -4px 0 8px rgba(0, 0, 0, 0.1);
          }
          100% {
            transform: rotateY(-180deg) translateZ(0px);
            box-shadow: 
              0 0 0 1px rgba(120, 53, 15, 0.1),
              0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              inset 0 0 0 1px rgba(255, 255, 255, 0.1);
          }
        }

        @keyframes flipBackward {
          0% {
            transform: rotateY(-180deg) translateZ(0px);
            box-shadow: 
              0 0 0 1px rgba(120, 53, 15, 0.1),
              0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              inset 0 0 0 1px rgba(255, 255, 255, 0.1);
          }
          25% {
            transform: rotateY(-155deg) translateZ(20px);
            box-shadow: 
              -8px 0 16px rgba(0, 0, 0, 0.15),
              -4px 0 8px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: rotateY(-90deg) translateZ(60px);
            box-shadow: 
              -25px 0 50px rgba(0, 0, 0, 0.25),
              -15px 0 30px rgba(0, 0, 0, 0.15);
          }
          75% {
            transform: rotateY(-25deg) translateZ(20px);
            box-shadow: 
              -8px 0 16px rgba(0, 0, 0, 0.15),
              -4px 0 8px rgba(0, 0, 0, 0.1);
          }
          100% {
            transform: rotateY(0deg) translateZ(0px);
            box-shadow: 
              0 0 0 1px rgba(120, 53, 15, 0.1),
              0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              inset 0 0 0 1px rgba(255, 255, 255, 0.1);
          }
        }

        .page-content {
          backface-visibility: hidden;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .page-flip.flipping-forward .page-content,
        .page-flip.flipping-backward .page-content {
          opacity: 0.8;
        }

        .page-back {
          transform: rotateY(180deg);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
      `}</style>
      
      {/* Book Cover */}
      <div className="bg-gradient-to-br from-amber-800 to-amber-900 rounded-2xl p-8 shadow-2xl max-w-6xl w-full relative border-4 border-amber-700">
  
        {/* Close Journal Button */}
        <button
          onClick={() => Router.push("/pages/Dashboard")}
          className="absolute top-4 right-4 z-50 bg-white text-amber-900 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-amber-100 transition-all duration-200"
        >
          Close Journal
        </button>
  
        {/* Book Spine */}
        <div className="book-binding absolute left-0 top-0 w-8 h-full rounded-l-2xl shadow-inner"></div>
        
        {/* Decorative Corner Ornaments */}
        <div className="absolute top-6 left-12 w-6 h-6 border-l-2 border-t-2 border-amber-500 opacity-60"></div>
        <div className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-amber-500 opacity-60"></div>
        <div className="absolute bottom-6 left-12 w-6 h-6 border-l-2 border-b-2 border-amber-500 opacity-60"></div>
        <div className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 border-amber-500 opacity-60"></div>
        
        {/* Page Flip Container */}
        <div className="page-flip-container ml-4">
          {/* Inner Paper with Flip Animation */}
          <div className={`
            journal-texture bg-white rounded-xl p-8 page-shadow relative page-flip
            ${isFlipping && flipDirection === 'forward' ? 'flipping-forward' : ''}
            ${isFlipping && flipDirection === 'backward' ? 'flipping-backward' : ''}
          `}>
            
            {/* Main Page Content */}
            <div className="page-content">
              {/* Page Curl Effect */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-tl from-gray-100 to-transparent rounded-bl-full shadow-sm"></div>
              
              {/* Journal Header */}
              <div className="text-center mb-8 border-b-2 border-amber-300 pb-6">
                <h1 className="text-5xl font-bold text-amber-900 mb-3 font-serif tracking-wide">
                  My Journal
                </h1>
                <div className="w-40 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full mb-4"></div>
                <p className="handwriting text-2xl text-amber-700 font-medium">
                  Page {currentPage}
                </p>
              </div>
      
              {/* Writing Area */}
              <div className="relative">
                <div className="paper-lines margin-line pl-20 pr-8 py-8 min-h-[400px] bg-white rounded-lg">
                  <textarea
                    className="handwriting w-full h-[350px] bg-transparent border-none outline-none resize-none text-blue-900 text-xl placeholder-amber-400 placeholder-opacity-60"
                    placeholder="Dear Journal, today I want to write about..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isFlipping}
                    style={{
                      lineHeight: '32px',
                      fontFamily: 'Kalam, cursive'
                    }}
                  />
                </div>
              </div>
      
              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-10 pt-8 border-t-2 border-amber-300">
                <button
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || isFlipping}
                  className={`
                    px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all duration-300 transform
                    ${currentPage === 1 || isFlipping
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 hover:scale-105 hover:shadow-lg active:scale-95'
                    }
                  `}
                >
                  <span className="text-xl">◀</span>
                  Previous Page
                </button>
      
                <button
                  onClick={handleSave}
                  disabled={isFlipping}
                  className={`
                    px-10 py-4 rounded-xl font-bold text-xl flex items-center gap-3 transition-all duration-300 transform shadow-lg
                    ${isFlipping
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 hover:scale-105 hover:shadow-xl active:scale-95'
                    }
                  `}
                >
                  <span className="text-2xl">✒️</span>
                  Save Entry
                </button>
      
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={isFlipping}
                  className={`
                    px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all duration-300 transform
                    ${isFlipping
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 hover:scale-105 hover:shadow-lg active:scale-95'
                    }
                  `}
                >
                  Next Page
                  <span className="text-xl">▶</span>
                </button>
              </div>
            </div>

            {/* Back of Page (for flip effect) */}
            <div className="page-back journal-texture bg-white rounded-xl p-8">
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-amber-600 opacity-30">
                  <div className="text-6xl mb-4">📖</div>
                  <p className="handwriting text-2xl">Turning page...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Book Title on Spine */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-amber-200 font-bold text-sm tracking-widest">
          JOURNAL
        </div>
      </div>
    </div>
  );
}