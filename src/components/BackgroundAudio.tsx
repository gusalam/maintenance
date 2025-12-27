import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import backgroundMusic from '@/assets/background-music.mp3';

const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay
    const playAudio = async () => {
      try {
        audio.volume = 0.3;
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay was prevented, wait for user interaction
        const handleInteraction = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
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

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      audio.volume = 0.3;
    } else {
      audio.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={backgroundMusic} type="audio/mpeg" />
      </audio>
      
      {/* Audio control button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass-card border border-matrix-green/30 hover:border-matrix-green/60 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--matrix-green)/0.4)] group"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary text-glow animate-pulse-glow" />
        )}
      </button>

      {/* Click to play hint */}
      {!isPlaying && (
        <div className="fixed bottom-6 left-6 z-50 text-xs text-muted-foreground font-mono animate-pulse">
          Click anywhere to play music...
        </div>
      )}
    </>
  );
};

export default BackgroundAudio;
