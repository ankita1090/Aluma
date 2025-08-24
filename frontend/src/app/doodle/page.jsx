"use client";
import { useRef, useState, useEffect } from "react";

export default function DoodlePage() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.7;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Doodle Board</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>Color: </label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <label style={{ marginLeft: "10px" }}>Line Width: </label>
        <input
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />
        <button onClick={clearCanvas} style={{ marginLeft: "10px" }}>
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: "2px solid black", cursor: "crosshair" }}
      />
    </div>
  );
}

