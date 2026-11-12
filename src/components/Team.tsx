import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users,
  UserCheck,
  GraduationCap,
  Trophy,
  Award,
  Edit3,
  Check,
  RotateCcw,
  BookOpen,
  Briefcase,
  ExternalLink,
} from 'lucide-react';

interface TeamProps {
  darkMode: boolean;
}

interface TeamMember {
  role: string;
  name: string;
  affiliation: string;
  focus: string;
  avatarLetter: string;
}

export default function Team({ darkMode }: TeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // State for editable placeholders
  const [isEditing, setIsEditing] = useState(false);
  const [teamName, setTeamName] = useState('Team AquaClean Innovators');
  const [competitionName, setCompetitionName] = useState('National Environmental Innovation Challenge 2024');
  const [institution, setInstitution] = useState('Department of Water Resources & Environmental Engineering');
  const [projectGuide, setProjectGuide] = useState('Dr. [Faculty Mentor Name], M.Tech, Ph.D.');
  const [leader, setLeader] = useState('Lead Student Researcher [Name]');

  const [members, setMembers] = useState<TeamMember[]>([
    {
      role: 'Project Leader & System Architect',
      name: 'Student Lead [Candidate Name]',
      affiliation: 'Environmental Engineering & Mechatronics',
      focus: 'Mechanical Bar Screen CAD Modeling, Automation Kinematics, & Real-Time Telemetry',
      avatarLetter: 'L',
    },
    {
      role: 'Hardware & Sensor Engineer',
      name: 'Team Member 1 [Candidate Name]',
      affiliation: 'Electronics & Instrumentation',
      focus: 'Ultrasonic Differential Level Sensing, Motor Driver Control, & Arduino/ESP32 Firmware',
      avatarLetter: 'H',
    },
    {
      role: 'Software & AI Vision Specialist',
      name: 'Team Member 2 [Candidate Name]',
      affiliation: 'Computer Science & Applied AI',
      focus: 'Edge Computer Vision Prototyping, Dashboard UI, & Sensor Telemetry Visualisation',
      avatarLetter: 'S',
    },
    {
      role: 'Process & Environmental Analyst',
      name: 'Team Member 3 [Candidate Name]',
      affiliation: 'Chemical & Environmental Sciences',
      focus: 'Primary Treatment Dynamics, Solid Waste Characterisation, & Hydraulic Flow Analysis',
      avatarLetter: 'E',
    },
  ]);

  const handleResetDefaults = () => {
    setTeamName('Team AquaClean Innovators');
    setCompetitionName('National Environmental Innovation Challenge 2024');
    setInstitution('Department of Water Resources & Environmental Engineering');
    setProjectGuide('Dr. [Faculty Mentor Name], M.Tech, Ph.D.');
    setLeader('Lead Student Researcher [Name]');
  };

  return (
    <section
      id="team"
      ref={ref}
      className={`relative section-padding overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-[#0a1628]' : 'bg-[#f8faff]'
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
            <Users size={14} />
            Innovation Roster
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-[#0a1628]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Project Team & <span className="gradient-text">Institution</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-white/60' : 'text-slate-600'
            }`}
          >
            Structured competition profile with editable placeholders ready for submission to national hackathons,
            engineering symposiums, and green-technology showcases.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              {isEditing ? <Check size={14} /> : <Edit3 size={14} />}
              {isEditing ? 'Save Details' : 'Edit Placeholders'}
            </button>
            {isEditing && (
              <button
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all cursor-pointer"
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>
        </motion.div>

        {/* Project Meta Banner */}
        <div
          className={`rounded-3xl p-6 sm:p-8 border mb-12 relative overflow-hidden ${
            darkMode
              ? 'bg-gradient-to-r from-[#0c233c] via-[#091b2e] to-[#0c233c] border-cyan-500/30 shadow-[0_10px_40px_rgba(6,182,212,0.1)]'
              : 'bg-white border-cyan-200 shadow-lg'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                <Trophy size={24} />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Competition Target</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={competitionName}
                    onChange={(e) => setCompetitionName(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg text-sm bg-white/10 border border-cyan-400 text-white focus:outline-none"
                  />
                ) : (
                  <h4 className={`text-base font-bold mt-1 ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}>
                    {competitionName}
                  </h4>
                )}
                <span className="text-xs text-cyan-400/80">Innovation & Sustainability Track</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={24} />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">School / Institution</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg text-sm bg-white/10 border border-blue-400 text-white focus:outline-none"
                  />
                ) : (
                  <h4 className={`text-base font-bold mt-1 ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}>
                    {institution}
                  </h4>
                )}
                <span className="text-xs text-blue-400/80">Affiliated Engineering Campus</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
                <Award size={24} />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Project Guide / Mentor</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={projectGuide}
                    onChange={(e) => setProjectGuide(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg text-sm bg-white/10 border border-teal-400 text-white focus:outline-none"
                  />
                ) : (
                  <h4 className={`text-base font-bold mt-1 ${darkMode ? 'text-white' : 'text-[#0a1628]'}`}>
                    {projectGuide}
                  </h4>
                )}
                <span className="text-xs text-teal-400/80">Faculty Technical Advisor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {members.map((member, idx) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl p-6 border transition-all duration-300 card-hover flex flex-col justify-between ${
                darkMode
                  ? 'bg-gradient-to-br from-[#0b1c32] to-[#071322] border-white/10 shadow-lg'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div>
                {/* Avatar Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    {member.avatarLetter}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Member #{idx + 1}
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  {member.role}
                </span>

                {isEditing ? (
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => {
                      const updated = [...members];
                      updated[idx].name = e.target.value;
                      setMembers(updated);
                    }}
                    className="w-full mb-2 px-2.5 py-1 rounded bg-white/10 border border-cyan-400 text-white text-base font-bold focus:outline-none"
                  />
                ) : (
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      darkMode ? 'text-white' : 'text-[#0a1628]'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {member.name}
                  </h3>
                )}

                <p className={`text-xs mb-3 font-medium ${darkMode ? 'text-cyan-200/70' : 'text-cyan-700'}`}>
                  {member.affiliation}
                </p>

                <p className={`text-xs leading-relaxed ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
                  {member.focus}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className={`${darkMode ? 'text-white/40' : 'text-slate-400'}`}>Role Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <UserCheck size={13} /> Active Contributor
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ethical / Anti-Plagiarism Disclaimer */}
        <div
          className={`p-4 rounded-2xl border text-center text-xs ${
            darkMode
              ? 'bg-white/5 border-white/10 text-white/50'
              : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}
        >
          🔒 <strong>Academic Integrity Notice:</strong> All member entries are structured placeholders ready for official
          candidate enrollment. In compliance with competition guidelines, no fabricated personal identities or unauthorized credentials are presented.
        </div>
      </div>
    </section>
  );
}
