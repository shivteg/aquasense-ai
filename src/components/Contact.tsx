import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Award,
  School,
} from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
  onShowToast?: (title: string, message: string, type: 'info' | 'success' | 'warning') => void;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact({ darkMode: _darkMode, onShowToast }: ContactProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Message content is required.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onShowToast?.('Form Incomplete', 'Please fill in all required fields correctly.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedFeedback(`Thank you, ${formData.name}! Your message has been received by the AquaSense innovation team.`);
      onShowToast?.(
        'Message Dispatched',
        'Thank you! The AquaSense team has received your communication.',
        'success'
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 800);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] via-[#091b35] to-[#0a1628] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Mail className="w-3.5 h-3.5" />
            Connect With The Innovation Team
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Project Team & Showcase Inquiries
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            Presenting at the Lovely Professional University Innovation Competition (14–15 November).
            Reach out to our engineering team for technical evaluations, partnerships, or demonstrations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Team Card & Competition Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* LPU Competition Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                    Innovation Showcase
                  </span>
                  <h3 className="text-lg font-bold text-white">Lovely Professional University</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                AquaSense is formulated and entered for the prestigious LPU Innovation Competition
                on <strong>14–15 November</strong>, competing in the Environmental Sustainability & Clean Technologies category.
              </p>

              <div className="space-y-3 text-xs pt-4 border-t border-white/10">
                <div className="flex items-center gap-2.5 text-white/80">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>LPU Campus, Jalandhar - Delhi G.T. Road, Phagwara, Punjab</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/80">
                  <School className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lovely Professional University • School of Technology</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/80">
                  <ExternalLink className="w-4 h-4 text-purple-400 shrink-0" />
                  <a
                    href="https://github.com/shivteg/aquaclean-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    github.com/shivteg/aquaclean-ai
                  </a>
                </div>
              </div>
            </div>

            {/* Team Contact Highlights */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Team Capabilities & Collaboration
              </h4>
              <div className="space-y-2 text-xs text-white/70 leading-relaxed">
                <div>• Hardware & Embedded Robotics (ESP32, Dual-Pontoon Hydrodynamics)</div>
                <div>• Biomass Valorization & Aerobic Composting Chemistry (AquaFert)</div>
                <div>• Multi-Stage Water Quality Testing & IoT Telemetry (AquaPure)</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Transmit a Message to the Team
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mb-6">
              Inquire about technical schematics, deployment trials, or competition evaluation metrics.
            </p>

            {submittedFeedback ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">Message Successfully Dispatched</h4>
                <p className="text-sm text-white/80 leading-relaxed mb-4">{submittedFeedback}</p>
                <button
                  onClick={() => setSubmittedFeedback(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Aryan Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.name ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors`}
                    />
                    {errors.name && <div className="text-[11px] text-red-400 mt-1">{errors.name}</div>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. aryan@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors`}
                    />
                    {errors.email && <div className="text-[11px] text-red-400 mt-1">{errors.email}</div>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Inquiry Subject *</label>
                  <input
                    type="text"
                    placeholder="e.g. Technical Evaluation for LPU Competition Showcase"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      errors.subject ? 'border-red-500' : 'border-white/10'
                    } text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors`}
                  />
                  {errors.subject && <div className="text-[11px] text-red-400 mt-1">{errors.subject}</div>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Message Content *</label>
                  <textarea
                    rows={4}
                    placeholder="Enter your inquiry, feedback, or competition notes regarding AquaSense..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      errors.message ? 'border-red-500' : 'border-white/10'
                    } text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none`}
                  />
                  {errors.message && <div className="text-[11px] text-red-400 mt-1">{errors.message}</div>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-600 hover:from-cyan-400 hover:to-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Transmitting Dispatch...' : 'Submit Inquiry to AquaSense Team'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
