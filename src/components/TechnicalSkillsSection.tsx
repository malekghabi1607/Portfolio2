import {
  Cloud,
  Database,
  HelpCircle,
  Laptop,
  Lightbulb,
  Monitor,
  Network,
  Server,
  Wrench,
} from 'lucide-react';
import { skillCategories, type Skill, type SkillCategory } from '../data/skills';

type TechnicalSkillsSectionProps = {
  isDark: boolean;
  language: 'fr' | 'en';
  title: string;
};

type AccentStyle = {
  color: string;
  colorSoft: string;
  tileGlow: string;
  text: string;
};

type NodeLayout = {
  left: number;
  top: number;
  width: number;
  columns: number;
  anchor: { x: number; y: number };
};

type BlobBubble = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
};

const accentStyles: Record<SkillCategory['accent'], AccentStyle> = {
  cyan: {
    color: '#22d3ee',
    colorSoft: 'rgba(34, 211, 238, 0.14)',
    tileGlow: 'group-hover/skill:bg-cyan-400/10',
    text: 'text-cyan-300',
  },
  blue: {
    color: '#60a5fa',
    colorSoft: 'rgba(96, 165, 250, 0.14)',
    tileGlow: 'group-hover/skill:bg-blue-400/10',
    text: 'text-blue-300',
  },
  orange: {
    color: '#38bdf8',
    colorSoft: 'rgba(56, 189, 248, 0.13)',
    tileGlow: 'group-hover/skill:bg-sky-400/10',
    text: 'text-sky-300',
  },
  green: {
    color: '#22d3ee',
    colorSoft: 'rgba(34, 211, 238, 0.13)',
    tileGlow: 'group-hover/skill:bg-cyan-400/10',
    text: 'text-cyan-300',
  },
  violet: {
    color: '#818cf8',
    colorSoft: 'rgba(129, 140, 248, 0.13)',
    tileGlow: 'group-hover/skill:bg-indigo-400/10',
    text: 'text-indigo-300',
  },
  rose: {
    color: '#60a5fa',
    colorSoft: 'rgba(96, 165, 250, 0.13)',
    tileGlow: 'group-hover/skill:bg-blue-400/10',
    text: 'text-blue-300',
  },
  amber: {
    color: '#38bdf8',
    colorSoft: 'rgba(56, 189, 248, 0.13)',
    tileGlow: 'group-hover/skill:bg-sky-400/10',
    text: 'text-sky-300',
  },
};

const categoryIcons = {
  frontend: Monitor,
  backend: Server,
  devops: Cloud,
  database: Database,
  networks: Network,
  tools: Wrench,
  platforms: Laptop,
};

const categoryBlobPaths: Record<string, string> = {
  database:
    'M8,28 C11,11 27,4 45,9 C58,13 68,7 82,12 C96,17 99,31 93,43 C88,55 99,65 91,78 C82,92 63,86 49,90 C31,96 12,91 8,75 C5,62 -2,54 4,42 C8,35 6,31 8,28 Z',
  frontend:
    'M6,31 C8,13 24,4 43,9 C59,13 70,5 86,11 C101,17 103,33 96,47 C91,57 102,66 94,78 C82,96 61,88 45,91 C27,94 9,87 7,72 C5,60 -1,54 5,43 C9,37 5,34 6,31 Z',
  backend:
    'M14,14 C26,2 45,8 58,7 C78,5 98,14 96,34 C94,48 104,59 95,75 C84,95 64,88 47,92 C27,97 10,88 9,68 C8,53 1,43 7,31 C13,22 8,18 14,14 Z',
  networks:
    'M7,25 C17,7 35,12 50,10 C67,8 81,1 93,14 C105,27 96,43 94,55 C91,67 99,76 87,86 C72,98 56,87 41,91 C25,96 6,88 6,71 C6,58 -3,50 5,38 C10,31 3,29 7,25 Z',
  tools:
    'M9,27 C18,8 36,8 53,12 C69,16 82,5 94,18 C106,31 96,45 98,59 C101,77 84,91 64,88 C47,85 36,95 19,89 C3,83 7,67 5,54 C3,42 -1,35 9,27 Z',
  devops:
    'M7,26 C16,8 34,10 51,11 C67,12 84,4 95,18 C106,32 94,47 97,61 C101,80 79,93 60,88 C43,84 31,94 15,84 C1,76 8,60 5,48 C2,38 -1,31 7,26 Z',
  platforms:
    'M13,20 C24,6 43,11 57,9 C75,7 92,18 92,36 C92,49 101,60 91,74 C80,91 61,86 45,91 C27,96 8,86 9,66 C10,52 2,43 8,31 C12,25 8,23 13,20 Z',
};

const categoryBlobBubbles: Record<string, BlobBubble[]> = {
  database: [
    { left: '1%', top: '18%', size: 16, delay: '0s', duration: '7s' },
    { left: '96%', top: '54%', size: 13, delay: '1.1s', duration: '8.5s' },
    { left: '8%', top: '86%', size: 8, delay: '2s', duration: '6.5s' },
    { left: '74%', top: '3%', size: 6, delay: '3.3s', duration: '7.8s' },
  ],
  frontend: [
    { left: '4%', top: '12%', size: 12, delay: '0.4s', duration: '7.4s' },
    { left: '62%', top: '4%', size: 7, delay: '1.8s', duration: '6.8s' },
    { left: '94%', top: '40%', size: 9, delay: '2.6s', duration: '8.2s' },
    { left: '82%', top: '8%', size: 6, delay: '3.5s', duration: '7.1s' },
  ],
  backend: [
    { left: '7%', top: '10%', size: 10, delay: '0.2s', duration: '6.7s' },
    { left: '98%', top: '22%', size: 14, delay: '1.5s', duration: '8.3s' },
    { left: '91%', top: '82%', size: 9, delay: '2.5s', duration: '7.5s' },
    { left: '16%', top: '88%', size: 6, delay: '3.8s', duration: '7.2s' },
  ],
  networks: [
    { left: '-1%', top: '25%', size: 16, delay: '0.7s', duration: '7.6s' },
    { left: '88%', top: '8%', size: 11, delay: '1.6s', duration: '8.1s' },
    { left: '6%', top: '88%', size: 9, delay: '2.2s', duration: '6.9s' },
    { left: '95%', top: '66%', size: 6, delay: '3.6s', duration: '7.4s' },
  ],
  devops: [
    { left: '1%', top: '50%', size: 15, delay: '0.1s', duration: '7.2s' },
    { left: '88%', top: '9%', size: 9, delay: '1.7s', duration: '8s' },
    { left: '96%', top: '78%', size: 11, delay: '2.9s', duration: '7.1s' },
    { left: '58%', top: '97%', size: 6, delay: '4s', duration: '6.8s' },
  ],
  tools: [
    { left: '-1%', top: '72%', size: 12, delay: '0.5s', duration: '7.8s' },
    { left: '18%', top: '5%', size: 9, delay: '1.9s', duration: '6.9s' },
    { left: '96%', top: '54%', size: 13, delay: '2.7s', duration: '8.4s' },
    { left: '7%', top: '94%', size: 6, delay: '3.9s', duration: '7.6s' },
  ],
  platforms: [
    { left: '5%', top: '15%', size: 10, delay: '0.3s', duration: '7s' },
    { left: '93%', top: '72%', size: 12, delay: '1.4s', duration: '8.2s' },
    { left: '48%', top: '95%', size: 8, delay: '2.4s', duration: '6.7s' },
    { left: '83%', top: '17%', size: 6, delay: '3.7s', duration: '7.5s' },
  ],
};

const treeSize = { width: 1900, height: 1080 };
const center = { x: 950, y: 530 };

const nodeLayoutsById: Record<string, NodeLayout> = {
  database: { left: 40, top: 55, width: 455, columns: 4, anchor: { x: 495, y: 250 } },
  frontend: { left: 585, top: 42, width: 675, columns: 6, anchor: { x: 950, y: 315 } },
  backend: { left: 1315, top: 20, width: 535, columns: 4, anchor: { x: 1315, y: 290 } },
  networks: { left: 35, top: 405, width: 575, columns: 6, anchor: { x: 610, y: 565 } },
  devops: { left: 1322, top: 572, width: 560, columns: 5, anchor: { x: 1322, y: 690 } },
  tools: { left: 55, top: 745, width: 660, columns: 7, anchor: { x: 715, y: 840 } },
  platforms: { left: 752, top: 790, width: 535, columns: 4, anchor: { x: 1019, y: 790 } },
};

function getCategoryTitle(category: SkillCategory, language: 'fr' | 'en') {
  return language === 'fr' ? category.titleFr : category.titleEn;
}

function buildConnection(anchor: NodeLayout['anchor']) {
  const hubRadius = 142;
  const angle = Math.atan2(anchor.y - center.y, anchor.x - center.x);
  const startX = center.x + Math.cos(angle) * hubRadius;
  const startY = center.y + Math.sin(angle) * hubRadius;
  const midX = startX + (anchor.x - startX) * 0.48;
  const midY = startY + (anchor.y - startY) * 0.48;
  const verticalBias = anchor.y < center.y ? -26 : 26;
  const curveOffset = anchor.x < center.x ? -62 : 62;
  return {
    path: `M ${startX} ${startY} Q ${midX + curveOffset} ${midY + verticalBias} ${anchor.x} ${anchor.y}`,
    start: { x: startX, y: startY },
  };
}

function SkillTile({
  skill,
  accent,
  isDark,
}: {
  skill: Skill;
  accent: SkillCategory['accent'];
  isDark: boolean;
}) {
  const accentStyle = accentStyles[accent];

  return (
    <div className="group/skill relative flex min-w-0 flex-col items-center gap-2">
      <div
        className={`pointer-events-none absolute -top-11 left-1/2 z-50 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold opacity-0 shadow-2xl ring-1 transition-all duration-200 group-hover/skill:translate-y-0 group-hover/skill:opacity-100 ${isDark
            ? 'bg-slate-950 text-white ring-white/10'
            : 'bg-slate-950 text-white ring-black/10'
          }`}
      >
        {skill.name} • {skill.percent}%
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-inherit" />
      </div>

      <div
        className="relative grid h-[74px] w-[74px] place-items-center overflow-visible transition-all duration-300 group-hover/skill:-translate-y-1 group-hover/skill:scale-[1.08]"
      >
        <div className={`absolute inset-0 opacity-0 blur-xl transition-opacity duration-300 ${accentStyle.tileGlow}`} />
        <img
          src={skill.logo}
          alt={skill.name}
          className="relative z-10 h-14 w-14 object-contain drop-shadow-md transition-all duration-300 group-hover/skill:scale-105 group-hover/skill:brightness-110"
          onError={(e) => {
            e.currentTarget.src = '/images/skills/_fallback.svg';
          }}
        />
      </div>

      <span
        className={`max-w-[88px] text-center text-[10.5px] font-semibold leading-tight ${isDark ? 'text-slate-100' : 'text-slate-800'
          }`}
      >
        {skill.name}
      </span>
    </div>
  );
}

function SkillCard({
  category,
  isDark,
  language,
  columns,
}: {
  category: SkillCategory;
  isDark: boolean;
  language: 'fr' | 'en';
  columns?: number;
}) {
  const accent = accentStyles[category.accent];
  const Icon = categoryIcons[category.id as keyof typeof categoryIcons] ?? HelpCircle;

  return (
    <article
      className="scroll-animate group/card relative z-20 overflow-visible p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1"
    >
      <svg
        className="pointer-events-none absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        style={{ filter: `drop-shadow(0 20px 42px rgba(0,0,0,.34)) drop-shadow(0 0 24px ${accent.color})` }}
      >
        <defs>
          <radialGradient id={`${category.id}-blob-fill`} cx="50%" cy="44%" r="72%">
            <stop offset="0%" stopColor={accent.color} stopOpacity={isDark ? 0.16 : 0.1} />
            <stop offset="48%" stopColor={isDark ? '#071225' : '#ffffff'} stopOpacity={isDark ? 0.9 : 0.9} />
            <stop offset="100%" stopColor={isDark ? '#030816' : '#f8fafc'} stopOpacity={isDark ? 0.97 : 0.96} />
          </radialGradient>
          <linearGradient id={`${category.id}-blob-stroke`} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={accent.color} stopOpacity="0.95" />
            <stop offset="48%" stopColor="#ffffff" stopOpacity={isDark ? 0.26 : 0.38} />
            <stop offset="100%" stopColor={accent.color} stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path
          d={categoryBlobPaths[category.id] ?? categoryBlobPaths.frontend}
          fill="none"
          stroke={accent.color}
          strokeWidth="3.2"
          vectorEffect="non-scaling-stroke"
          opacity={isDark ? 0.16 : 0.2}
        />
        <path
          d={categoryBlobPaths[category.id] ?? categoryBlobPaths.frontend}
          fill={`url(#${category.id}-blob-fill)`}
          stroke={`url(#${category.id}-blob-stroke)`}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          opacity="1"
          className="skills-blob-edge"
          style={{ color: accent.color }}
        />
        <path
          d={categoryBlobPaths[category.id] ?? categoryBlobPaths.frontend}
          fill="none"
          stroke={accent.color}
          strokeWidth="0.36"
          strokeDasharray="5 10"
          vectorEffect="non-scaling-stroke"
          opacity={isDark ? 0.6 : 0.5}
        />
      </svg>

      {(categoryBlobBubbles[category.id] ?? []).map((bubble, index) => (
        <span
          key={`${category.id}-bubble-${index}`}
          className="skills-blob-bubble pointer-events-none absolute z-10 rounded-full border"
          style={{
            left: bubble.left,
            top: bubble.top,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
            backgroundColor: `${accent.color}22`,
            borderColor: `${accent.color}99`,
            boxShadow: `0 0 ${bubble.size + 10}px ${accent.color}66`,
          }}
        />
      ))}

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2">
          <Icon className="h-5 w-5 shrink-0" style={{ color: accent.color }} />
          <h3 className={`text-sm font-black uppercase tracking-wide ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {getCategoryTitle(category, language)}
          </h3>
        </div>
        <div className="mb-4 h-px w-full opacity-35" style={{ backgroundColor: accent.colorSoft }} />

        <div
          className="grid grid-cols-3 gap-x-4 gap-y-4 sm:grid-cols-4 md:grid-cols-5"
          style={columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
        >
          {category.skills.map((skill) => (
            <SkillTile key={`${category.id}-${skill.name}`} skill={skill} accent={category.accent} isDark={isDark} />
          ))}
        </div>
      </div>
    </article>
  );
}

function NeuralLines({ isDark }: { isDark: boolean }) {
  return (
    <svg
      className="absolute inset-0 z-0 hidden h-full w-full overflow-visible xl:block"
      viewBox={`0 0 ${treeSize.width} ${treeSize.height}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {skillCategories.map((category, index) => {
        const layout = nodeLayoutsById[category.id];
        if (!layout) return null;
        const accent = accentStyles[category.accent];
        const connection = buildConnection(layout.anchor);

        return (
          <g key={category.id}>
            <path
              d={connection.path}
              fill="none"
              stroke={accent.color}
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={isDark ? 0.14 : 0.09}
            />
            <path
              d={connection.path}
              fill="none"
              stroke={accent.color}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="7 11"
              className="skills-neural-line"
              opacity={isDark ? 0.88 : 0.62}
            />
            <circle r="6" fill={accent.color} className="skills-neural-dot" opacity={isDark ? 0.92 : 0.72}>
              <animateMotion dur={`${6.5 + index * 0.35}s`} repeatCount="indefinite" path={connection.path} />
            </circle>
            <circle cx={connection.start.x} cy={connection.start.y} r="7" fill={accent.color} opacity={isDark ? 0.82 : 0.62} />
            <circle cx={layout.anchor.x} cy={layout.anchor.y} r="7" fill={accent.color} opacity={isDark ? 0.82 : 0.62} />
          </g>
        );
      })}
    </svg>
  );
}

function ThinkingAvatar({ isDark }: { isDark: boolean }) {
  return (
    <div className="scroll-animate relative z-30 mx-auto grid h-[272px] w-[272px] place-items-center xl:absolute xl:left-[814px] xl:top-[394px]">
      <div className="skills-avatar-ring absolute inset-0 rounded-full opacity-80" />
      <div className="absolute inset-[10px] rounded-full border border-cyan-300/30" />
      <div className="absolute inset-[20px] rounded-full border border-violet-300/25" />
      <div className="absolute inset-[30px] rounded-full border border-blue-300/18" />
      <div className="skills-avatar-pulse absolute inset-[42px] rounded-full border border-indigo-300/14" />
      <div className={`absolute inset-[13px] rounded-full ${isDark ? 'bg-slate-950/90' : 'bg-white/92'} shadow-2xl`} />
      <span className="absolute left-1/2 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,.85)]" />
      <span className="absolute right-4 top-1/3 h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(216,180,254,.75)]" />
      <span className="absolute bottom-8 left-8 h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(147,197,253,.75)]" />
      <span className="absolute bottom-5 right-12 h-2 w-2 rounded-full bg-indigo-300 shadow-[0_0_14px_rgba(165,180,252,.75)]" />

      <div className="skills-avatar-float relative h-[208px] w-[208px] overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
        <img
          src="/images/avatar/skills-avatar.png"
          alt={isDark ? 'Avatar développeuse en réflexion' : 'Avatar developpeuse en reflexion'}
          className="absolute left-1/2 top-1/2 h-[258px] w-[258px] -translate-x-1/2 -translate-y-[44%] object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-cyan-300/5" />
      </div>

      <Lightbulb className="skills-thinking-float absolute left-9 top-[70px] h-5 w-5 text-cyan-300/80" />
      <HelpCircle className="skills-thinking-float-delay absolute right-10 top-[62px] h-6 w-6 text-violet-300/75" />
      <HelpCircle className="skills-thinking-float absolute bottom-[72px] right-8 h-5 w-5 text-cyan-300/75" />
    </div>
  );
}

export default function TechnicalSkillsSection({ isDark, language, title }: TechnicalSkillsSectionProps) {
  return (
    <section id="competences" className="relative overflow-x-clip px-4 py-20">
      <div className="relative mx-auto w-full max-w-[1235px] 2xl:max-w-[1480px] min-[1800px]:max-w-[1670px]">
        <h2
          className={`scroll-animate mb-16 bg-clip-text text-center text-5xl font-bold text-transparent md:text-6xl ${isDark
              ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500'
              : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800'
            }`}
        >
          {title}
        </h2>

        <div className="relative mx-auto w-full xl:h-[720px] xl:w-[1235px] 2xl:h-[850px] 2xl:w-[1480px] min-[1800px]:h-[950px] min-[1800px]:w-[1670px]">
          <div className="xl:hidden">
            <ThinkingAvatar isDark={isDark} />
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:hidden">
            {skillCategories.map((category) => (
              <SkillCard key={category.id} category={category} isDark={isDark} language={language} />
            ))}
          </div>

          <div className="absolute left-1/2 top-0 hidden h-[1080px] w-[1900px] origin-top -translate-x-1/2 scale-[0.64] xl:block 2xl:scale-[0.77] min-[1800px]:scale-[0.88]">
            <NeuralLines isDark={isDark} />
            <ThinkingAvatar isDark={isDark} />

            <div>
              {skillCategories.map((category) => {
                const layout = nodeLayoutsById[category.id];
                if (!layout) return null;
                return (
                  <div
                    key={category.id}
                    className="absolute"
                    style={{
                      left: `${layout.left}px`,
                      top: `${layout.top}px`,
                      width: `${layout.width}px`,
                    }}
                  >
                    <SkillCard category={category} isDark={isDark} language={language} columns={layout.columns} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
