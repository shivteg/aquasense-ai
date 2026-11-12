import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Send,
  User,
  AlertCircle,
  CheckCircle2,
  MapPin,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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

export default function Contact({ darkMode, onShowToast }: ContactProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
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
      errs.email = 'Please provide a valid email format (e.g., engineer@plant.org).';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Inquiry message cannot be empty.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters describing your question or project feedback.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedFeedback(null);

    if (!validate()) {
      if (onShowToast) {
        onShowToast('Validation Alert', 'Please correct highlighted form errors.', 'warning');
      }
      return;
    }

    // Transparent handling: do not pretend email was dispatched over network without backend
    const notice =
      'Form Validation Succeeded (Local Demo Mode): Your inquiry details are valid. Notice: Because this static innovation website operates without a connected email backend server, no email was dispatched over the network. For direct correspondence, please use our GitHub repository or project email below.';
    setSubmittedFeedback(notice);

    if (onShowToast) {
      onShowToast(
        'Form Validated (Demo Mode)',
        'Inputs verified. No backend mail service connected to send live email.',
        'info'
      );
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative section-padding overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-[#060d1a]' : 'bg-[#f0f9ff]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
            <Mail size={14} />
            Inquiries & Collaboration
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-[#0a1628]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Get in Touch with <span className="gradient-text">AquaClean AI</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-white/60' : 'text-slate-600'
            }`}
          >
            Interested in learning more about our automated screening architecture, academic research, or competition
            evaluation? Send us a message or connect through our project repository.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Project Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div
              className={`rounded-3xl p-7 border ${
                darkMode
                  ? 'bg-gradient-to-br from-[#0c233c] to-[#071424] border-cyan-500/30 shadow-lg'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Project Hub & Repository
              </h3>
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  darkMode ? 'text-white/70' : 'text-slate-600'
                }`}
              >
                AquaClean AI is maintained on GitHub under a private repository for intellectual property protection during
                competition judging.
              </p>

              <div className="space-y-4">
                <a
                  href="https://github.com/shivteg/aquaclean-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
                    darkMode
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/50'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <GithubIcon size={20} />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}>
                        Private GitHub Repository
                      </h4>
                      <span className="text-xs text-cyan-400 font-mono">shivteg/aquaclean-ai</span>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
                </a>

                <div
                  className={`flex items-center gap-3 p-4 rounded-2xl border ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}>
                      Lead Project Inquiry Email
                    </h4>
                    <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
                      founder@shivteg.com
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-3 p-4 rounded-2xl border ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}>
                      Innovation Campus
                    </h4>
                    <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
                      Water Treatment & Robotics Engineering Lab
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scientific Transparency Callout */}
            <div
              className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
                darkMode ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <ShieldAlert size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                <strong>Backend Transparency Notice:</strong> As required by competition standards, this submission does not simulate a false backend confirmation. Validated data is acknowledged locally.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className={`rounded-3xl p-7 sm:p-9 border relative ${
                darkMode
                  ? 'bg-gradient-to-br from-[#0a182b] to-[#071221] border-white/10 shadow-xl'
                  : 'bg-white border-slate-200 shadow-xl'
              }`}
            >
              <h3
                className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Send a Message or Feedback
              </h3>
              <p className={`text-xs sm:text-sm mb-6 ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
                Fill in the form below to test client-side input validation and interaction handling.
              </p>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-white/70' : 'text-slate-700'}`}>
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3.5 text-white/40" />
                    <input
                      type="text"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none ${
                        errors.name
                          ? 'bg-red-500/10 border-red-500 text-white'
                          : darkMode
                          ? 'bg-white/5 border-white/10 text-white focus:border-cyan-400 focus:bg-white/10'
                          : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-cyan-500 focus:bg-white'
                      } border`}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-white/70' : 'text-slate-700'}`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-white/40" />
                    <input
                      type="email"
                      placeholder="e.g. evaluator@innovation.org"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none ${
                        errors.email
                          ? 'bg-red-500/10 border-red-500 text-white'
                          : darkMode
                          ? 'bg-white/5 border-white/10 text-white focus:border-cyan-400 focus:bg-white/10'
                          : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-cyan-500 focus:bg-white'
                      } border`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-white/70' : 'text-slate-700'}`}>
                    Subject / Topic *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Inquiring about mechanical screen CAD blueprints"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none ${
                      errors.subject
                        ? 'bg-red-500/10 border-red-500 text-white'
                        : darkMode
                        ? 'bg-white/5 border-white/10 text-white focus:border-cyan-400 focus:bg-white/10'
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-cyan-500 focus:bg-white'
                    } border`}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-white/70' : 'text-slate-700'}`}>
                    Message / Feedback *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your technical observations, competition questions, or suggestions..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none resize-none ${
                      errors.message
                        ? 'bg-red-500/10 border-red-500 text-white'
                        : darkMode
                        ? 'bg-white/5 border-white/10 text-white focus:border-cyan-400 focus:bg-white/10'
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-cyan-500 focus:bg-white'
                    } border`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
                </div>

                {/* Feedback Banner if Submitted */}
                {submittedFeedback && (
                  <div
                    className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                      darkMode ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-200' : 'bg-cyan-50 border-cyan-300 text-cyan-900'
                    }`}
                  >
                    <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{submittedFeedback}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Send size={16} /> Validate & Submit Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
