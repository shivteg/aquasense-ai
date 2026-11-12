import { Waves, Award } from 'lucide-react';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface FooterProps {
  darkMode: boolean;
}

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About AquaSense', href: '#about' },
  { label: 'The Problem', href: '#problem' },
  { label: 'Our Solution', href: '#solution' },
  { label: 'AquaClean Robot', href: '#aquaclean' },
  { label: 'AquaFert Composting', href: '#aquafert' },
  { label: 'AquaPure Purification', href: '#aquapure' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Robot Simulation', href: '#simulation' },
  { label: 'Monitoring Dashboard', href: '#dashboard' },
  { label: 'Scientific Principles', href: '#scientific-principles' },
  { label: 'Environmental Impact', href: '#impact' },
  { label: 'Future Scope', href: '#future-scope' },
  { label: 'Project Team & Contact', href: '#contact' },
];

export default function Footer({ darkMode: _darkMode }: FooterProps) {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060e1a] text-white pt-16 pb-12 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Waves size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-poppins font-black text-2xl tracking-tight text-white"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  AQUA<span className="text-cyan-400">SENSE</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase">
                  Clean Water • Green Agriculture • Sustainable Future
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-md">
              <strong>AquaSense</strong> – An Integrated Floating Pond-Cleaning, Algae-to-Fertiliser and
              Water-Purification System. Turning pond pollution into environmental opportunity.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-cyan-300 flex items-center gap-2 max-w-md">
              <Award className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Built for Lovely Professional University Innovation Competition (14–15 Nov)</span>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-4">
              Website Architecture Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-xs text-white/60 hover:text-cyan-300 transition-colors py-1 cursor-pointer truncate"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Repository & Competition (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Official Repository
            </h4>
            <a
              href="https://github.com/shivteg/aquasense-ai"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-all group"
            >
              <GithubIcon size={20} />
              <div className="flex flex-col truncate">
                <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  GitHub Project
                </span>
                <span className="text-[10px] text-white/50 truncate">github.com/shivteg/aquasense-ai</span>
              </div>
            </a>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-white/60 leading-relaxed">
              <strong>Circular Model:</strong> Pollution → Collection → Separation → Resource Recovery → Water Treatment → Sustainable Reuse
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © 2026 <strong>AQUASENSE</strong>. All rights reserved. LPU Innovation Showcase.
          </div>
          <div className="font-mono text-[11px] text-emerald-400">
            Clean Water • Green Agriculture • Sustainable Future
          </div>
        </div>
      </div>
    </footer>
  );
}
