import MatrixRain from '@/components/MatrixRain';
import MaintenanceCard from '@/components/MaintenanceCard';
import BackgroundAudio from '@/components/BackgroundAudio';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Matrix rain background */}
      <MatrixRain />
      
      {/* Radial glow overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 0% / 0.8) 100%)',
          zIndex: 1
        }}
      />

      {/* Center glow effect */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(120 100% 50% / 0.05) 0%, transparent 70%)',
          zIndex: 1
        }}
      />

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center py-8">
        <MaintenanceCard />
      </main>

      {/* Hidden background audio - autoplay */}
      <BackgroundAudio />

      {/* Scanlines overlay for CRT effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 0%) 2px, hsl(0 0% 0%) 4px)',
          zIndex: 100
        }}
      />
    </div>
  );
};

export default Index;
