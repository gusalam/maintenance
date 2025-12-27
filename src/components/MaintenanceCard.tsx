import { Settings, Mail, Phone, MessageCircle, Terminal } from 'lucide-react';

const MaintenanceCard = () => {
  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
      {/* Glowing border effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-matrix-green/20 via-matrix-green/40 to-matrix-green/20 rounded-2xl blur-xl opacity-75 animate-pulse-glow" />
      
      {/* Main card */}
      <div className="relative glass-card rounded-2xl p-8 md:p-12 border-glow animate-fade-in">
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-matrix-green/50 to-transparent animate-scan-line" />
        </div>

        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-matrix-green/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 ml-4 text-muted-foreground text-sm">
            <Terminal className="w-4 h-4" />
            <span>system_maintenance.sh</span>
          </div>
        </div>

        {/* Animated gear icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-matrix-green/20 rounded-full blur-2xl animate-pulse-glow" />
            <Settings className="w-20 h-20 text-primary animate-spin text-glow" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        {/* Main message */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary text-glow-strong animate-flicker">
            [SYSTEM MAINTENANCE]
          </h1>
          
          <div className="font-mono text-muted-foreground space-y-1 text-sm md:text-base">
            <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="text-primary">$</span> status: <span className="text-accent-foreground">offline</span>
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span className="text-primary">$</span> message: <span className="text-foreground">"Sistem sedang dalam perbaikan"</span>
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <span className="text-primary">$</span> eta: <span className="text-accent-foreground">coming_soon</span>
            </p>
          </div>

          <p className="text-lg md:text-xl text-secondary-foreground mt-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            Silakan hubungi pengembang untuk informasi lebih lanjut
          </p>
        </div>

        {/* Contact section */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '1s' }}>
          <h2 className="text-center text-primary font-semibold mb-6 text-glow">
            {"// CONTACT DEVELOPER"}
          </h2>
          
          <div className="grid gap-3">
            <ContactButton 
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              value="developer@system.id"
              href="mailto:developer@system.id"
            />
            <ContactButton 
              icon={<Phone className="w-5 h-5" />}
              label="Phone"
              value="+62 812 3456 7890"
              href="tel:+6281234567890"
            />
            <ContactButton 
              icon={<MessageCircle className="w-5 h-5" />}
              label="WhatsApp"
              value="Chat via WhatsApp"
              href="https://wa.me/6281234567890"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-matrix-green/20 text-center">
          <p className="text-muted-foreground text-xs font-mono animate-flicker">
            <span className="text-primary">{">"}</span> System will be back online soon...
            <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
};

interface ContactButtonProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

const ContactButton = ({ icon, label, value, href }: ContactButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-matrix-green/20 hover:border-matrix-green/60 hover:bg-secondary transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--matrix-green)/0.3)]"
    >
      <div className="text-primary group-hover:text-glow transition-all">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-secondary-foreground group-hover:text-primary transition-colors font-mono">
          {value}
        </p>
      </div>
      <div className="text-muted-foreground group-hover:text-primary transition-colors">
        →
      </div>
    </a>
  );
};

export default MaintenanceCard;
