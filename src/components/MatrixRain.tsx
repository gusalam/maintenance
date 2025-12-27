import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - binary + some code symbols
    const chars = '01アイウエオカキクケコサシスセソタチツテト{}[]()<>=;:+-*/&|!?@#$%^';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array to track the y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Different shades of green for depth effect
    const colors = [
      'rgba(0, 255, 0, 1)',
      'rgba(0, 255, 0, 0.8)',
      'rgba(0, 200, 0, 0.6)',
      'rgba(0, 150, 0, 0.4)',
      'rgba(0, 100, 0, 0.2)',
    ];

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head of the drop is brightest
        ctx.fillStyle = colors[0];
        ctx.shadowColor = 'rgba(0, 255, 0, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fillText(char, x, y);

        // Trail with decreasing opacity
        for (let j = 1; j < 5; j++) {
          const trailY = y - j * fontSize;
          if (trailY > 0) {
            ctx.fillStyle = colors[j];
            ctx.shadowBlur = 0;
            const trailChar = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(trailChar, x, trailY);
          }
        }

        // Reset drop when it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default MatrixRain;
