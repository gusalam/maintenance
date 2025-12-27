import { useEffect, useRef } from 'react';
import backgroundMusic from '@/assets/background-music.mp3';

const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay
    const playAudio = async () => {
      try {
        audio.volume = 0.3;
        await audio.play();
      } catch (error) {
        // Autoplay was prevented, wait for user interaction
        const handleInteraction = async () => {
          try {
            await audio.play();
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
          } catch (e) {
            console.log('Audio play failed:', e);
          }
        };
        
        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
      }
    };

    playAudio();

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <audio ref={audioRef} loop className="hidden">
      <source src={backgroundMusic} type="audio/mpeg" />
    </audio>
  );
};

export default BackgroundAudio;
