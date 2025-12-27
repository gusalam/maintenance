import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, X, Heart } from 'lucide-react';
import albumArt from '@/assets/album-art.png';
import backgroundMusic from '@/assets/background-music.mp3';

const MusicNotification = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(formatTime(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.volume = 0.5;
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    }
  };

  const skipBack = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={backgroundMusic} type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
        {/* Material You Notification Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(220,20%,13%)] to-[hsl(220,25%,8%)] backdrop-blur-2xl shadow-2xl border border-white/5">
          {/* Subtle ambient glow from album art */}
          <div 
            className="absolute inset-0 opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(ellipse at 20% 50%, hsl(30 80% 50% / 0.4) 0%, transparent 60%)'
            }}
          />
          
          <div className="relative p-4">
            <div className="flex gap-4">
              {/* Album Art - Rounded Square */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10">
                  <img 
                    src={albumArt} 
                    alt="Album Art" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Playing indicator */}
                {isPlaying && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <div className="flex gap-0.5 items-end h-2">
                      <span className="w-0.5 bg-primary-foreground animate-pulse h-full" style={{ animationDelay: '0ms' }} />
                      <span className="w-0.5 bg-primary-foreground animate-pulse h-2/3" style={{ animationDelay: '150ms' }} />
                      <span className="w-0.5 bg-primary-foreground animate-pulse h-full" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Track Info & Controls */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                {/* Track Info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-base truncate tracking-tight">
                      Lofi Chill Beats
                    </h3>
                    <p className="text-white/60 text-sm truncate">
                      Late Night Study Session
                    </p>
                  </div>
                  
                  {/* Close & Like */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${
                          isLiked ? 'fill-red-500 text-red-500' : 'text-white/50'
                        }`} 
                      />
                    </button>
                    <button
                      onClick={() => setIsVisible(false)}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4 text-white/50" />
                    </button>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                    onClick={skipBack}
                    className="p-2 rounded-full hover:bg-white/10 transition-all active:scale-95"
                  >
                    <SkipBack className="w-5 h-5 text-white/80 fill-white/80" />
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-white text-black hover:bg-white/90 transition-all shadow-lg active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    )}
                  </button>
                  
                  <button
                    onClick={skipForward}
                    className="p-2 rounded-full hover:bg-white/10 transition-all active:scale-95"
                  >
                    <SkipForward className="w-5 h-5 text-white/80 fill-white/80" />
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 px-1">
              <div 
                className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-150 relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Progress handle */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              {/* Time stamps */}
              <div className="flex justify-between mt-1.5 text-[10px] text-white/40 font-medium tracking-wide">
                <span>{currentTime}</span>
                <span>{duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicNotification;
