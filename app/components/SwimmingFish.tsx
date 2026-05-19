'use client';
import { useEffect, useRef } from 'react';

export default function SwimmingFish() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.src = '/trout.png';
    let animId: number;

    img.onload = () => {
      const W = img.width;   // 657
      const H = img.height;  // 380
      const PAD = 35;        // вертикальный запас чтобы хвост не обрезало

      canvas.width = W;
      canvas.height = H + PAD * 2;

      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;

      let startTime: number | null = null;

      function draw(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const t = (timestamp - startTime) / 1000;

        ctx.clearRect(0, 0, W, H + PAD * 2);

        const swimFreq  = 1.9;  // циклов в секунду
        const waveLen   = 1.3;  // длина волны вдоль тела
        const maxAmp    = 10;   // максимальное смещение хвоста (px)

        for (let x = 0; x < W; x++) {
          // 0 = голова (слева), 1 = хвост (справа)
          const progress = x / W;

          // У головы амплитуда = 0, у хвоста = максимум
          const amp = maxAmp * Math.pow(progress, 1.7);

          // Бегущая волна от головы к хвосту
          const phase  = 2 * Math.PI * (swimFreq * t - waveLen * progress);
          const offset = amp * Math.sin(phase);

          ctx.drawImage(img, x, 0, 1, H, x, PAD + offset, 1, H);
        }

        animId = requestAnimationFrame(draw);
      }

      animId = requestAnimationFrame(draw);
    };

    return () => { if (animId) cancelAnimationFrame(animId); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="trout-canvas"
      style={{ width: '100%' }}
    />
  );
}
