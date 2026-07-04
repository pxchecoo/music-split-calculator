"use client";

import { useEffect, useRef } from "react";

export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const canvasElement = canvas;
    const drawingContext = context;

    let animationFrame = 0;
    let time = 0;

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      canvasElement.width = Math.floor(canvasElement.offsetWidth * ratio);
      canvasElement.height = Math.floor(canvasElement.offsetHeight * ratio);
      drawingContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
      const width = canvasElement.offsetWidth;
      const height = canvasElement.offsetHeight;
      time += 0.012;

      drawingContext.clearRect(0, 0, width, height);

      const gradient = drawingContext.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#070a12");
      gradient.addColorStop(0.52, "#131022");
      gradient.addColorStop(1, "#14251f");
      drawingContext.fillStyle = gradient;
      drawingContext.fillRect(0, 0, width, height);

      drawingContext.globalAlpha = 0.18;
      drawingContext.strokeStyle = "#f7fbff";
      drawingContext.lineWidth = 1;
      for (let x = 0; x < width; x += 56) {
        drawingContext.beginPath();
        drawingContext.moveTo(x, 0);
        drawingContext.lineTo(x, height);
        drawingContext.stroke();
      }
      for (let y = 0; y < height; y += 56) {
        drawingContext.beginPath();
        drawingContext.moveTo(0, y);
        drawingContext.lineTo(width, y);
        drawingContext.stroke();
      }

      const centerY = height * 0.57;
      const lines = [
        { color: "#28e0b9", offset: 0, amplitude: 52 },
        { color: "#f4c95d", offset: 1.4, amplitude: 34 },
        { color: "#ff7a59", offset: 2.1, amplitude: 24 }
      ];

      lines.forEach((line) => {
        drawingContext.globalAlpha = 0.72;
        drawingContext.strokeStyle = line.color;
        drawingContext.lineWidth = 3;
        drawingContext.beginPath();

        for (let x = 0; x <= width; x += 8) {
          const y =
            centerY +
            Math.sin(x * 0.012 + time * 2.4 + line.offset) * line.amplitude +
            Math.sin(x * 0.027 + time * 1.2) * 14;

          if (x === 0) drawingContext.moveTo(x, y);
          else drawingContext.lineTo(x, y);
        }

        drawingContext.stroke();
      });

      const barCount = 46;
      const gap = 8;
      const barWidth = Math.max(5, (width * 0.72) / barCount - gap);
      const startX = width * 0.14;

      for (let index = 0; index < barCount; index += 1) {
        const value =
          Math.sin(index * 0.46 + time * 3.2) * 0.5 +
          Math.sin(index * 0.18 + time) * 0.35 +
          0.85;
        const barHeight = Math.max(16, value * 42);
        const x = startX + index * (barWidth + gap);
        const y = height * 0.78 - barHeight / 2;

        drawingContext.globalAlpha = 0.58;
        drawingContext.fillStyle = index % 5 === 0 ? "#ff7a59" : "#28e0b9";
        drawingContext.fillRect(x, y, barWidth, barHeight);
      }

      drawingContext.globalAlpha = 0.18;
      drawingContext.fillStyle = "#28e0b9";
      drawingContext.beginPath();
      drawingContext.arc(width * 0.82, height * 0.24, 150, 0, Math.PI * 2);
      drawingContext.fill();

      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
