import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, MapPin, Phone, GraduationCap, Briefcase, ExternalLink, Globe, Sparkles, Sun, Moon, CalendarDays, CheckCircle2, Building2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendContactEmail } from '../utils/emailService';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import BackgroundAnimation from '../components/BackgroundAnimation';
import TechnicalSkillsSection from '../components/TechnicalSkillsSection';
import { projects as portfolioProjects } from '../data/projects';
import { experiences as portfolioExperiences } from '../data/experiences';
import { education as educationData } from '../data/education';

interface HomePageProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  language: 'fr' | 'en';
  setLanguage: (language: 'fr' | 'en') => void;
}

export default function HomePage({ isDark, setIsDark, language, setLanguage }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
    fallbackMailtoUrl?: string;
  } | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useScrollAnimation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [location.hash]);

  const translations = {
    fr: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      education: 'Formation',
      experience: 'Expériences',
      projects: 'Projets',
      contact: 'Contact',
      lookingFor: 'En alternance chez NOVOUTILS',
      jobTitle: 'Développement logiciel · Data · IA',
      discoverProjects: 'Contactez-moi',
      hello: 'Bonjour, je suis',
      aboutText: 'Diplômée d’une Licence Informatique à Avignon Université, je m’intéresse au développement logiciel, aux systèmes, aux données et à l’intelligence artificielle. Mon parcours combine des bases solides en algorithmique, programmation orientée objet, bases de données, réseaux et projets applicatifs.',
      aboutText2: 'Je poursuis un Master en informatique à l’Université Catholique de Lille, parcours Informatique appliquée et systèmes intelligents, en alternance chez NOVOUTILS. Mon objectif est de concevoir des solutions utiles, fiables et adaptées aux besoins métier, en combinant développement logiciel, data et intelligence artificielle.',
      totalProjects: 'PROJETS RÉALISÉS',
      totalProjectsDesc: 'Solutions Web innovantes',
      certificates: 'DIPLÔMES',
      certificatesDesc: 'Compétences certifiées',
      yearsExp: 'ANNÉES D\'EXPÉRIENCE',
      yearsExpDesc: 'Apprentissage continu',
      languages: 'Langues',
      personalSkills: 'Compétences personnelles',
      interests: 'Centres d\'intérêt',
      technicalSkills: 'Compétences techniques',
      viewDetails: 'Voir les détails',
      contactMe: 'Contactez-moi',
      contactText: 'Une opportunité, un projet ou une question ? N\'hésitez pas à me contacter.',
      sendMessage: 'Envoyer le message',
      sending: 'Envoi en cours...',
      successMessage: 'Message envoyé avec succès !',
      errorMessage: 'Erreur lors de l\'envoi. Veuillez réessayer.',
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      teamwork: 'Travail d\'équipe',
      autonomy: 'Autonomie',
      creativity: 'Créativité',
      sport: 'Sport',
      music: 'Musique - Guitare',
      design: 'Design - peinture',
      travel: 'Voyage - culture étrangère',
      podcast: 'Podcast - montage vidéo',
      phone: 'Téléphone',
      french: 'Français',
      arabic: 'Arabe',
      english: 'Anglais',
      italian: 'Italien',
      native: 'Natif',
      intermediate: 'Intermédiaire'
    },
    en: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      education: 'Education',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      lookingFor: 'Apprenticeship at NOVOUTILS',
      jobTitle: 'Software Development · Data · AI',
      discoverProjects: 'Contact me',
      hello: 'Hello, I am',
      aboutText: 'I hold a Bachelor’s Degree in Computer Science from Avignon University, with a strong interest in software development, systems, data and artificial intelligence. My background combines solid foundations in algorithms, object-oriented programming, databases, networks and applied software projects.',
      aboutText2: 'I am pursuing a Master’s Degree in Computer Science at Université Catholique de Lille, specializing in Applied Computer Science and Intelligent Systems, through an apprenticeship at NOVOUTILS. My goal is to design useful, reliable solutions aligned with business needs by combining software development, data and artificial intelligence.',
      totalProjects: 'COMPLETED PROJECTS',
      totalProjectsDesc: 'Innovative Web solutions',
      certificates: 'CERTIFICATES',
      certificatesDesc: 'Certified skills',
      yearsExp: 'YEARS OF EXPERIENCE',
      yearsExpDesc: 'Continuous learning',
      languages: 'Languages',
      personalSkills: 'Personal Skills',
      interests: 'Interests',
      technicalSkills: 'Technical Skills',
      viewDetails: 'View details',
      contactMe: 'Contact me',
      contactText: 'An opportunity, a project or a question? Feel free to get in touch.',
      sendMessage: 'Send message',
      sending: 'Sending...',
      successMessage: 'Message sent successfully!',
      errorMessage: 'Error sending message. Please try again.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      teamwork: 'Teamwork',
      autonomy: 'Autonomy',
      creativity: 'Creativity',
      sport: 'Sport',
      music: 'Music - Guitar',
      design: 'Design - painting',
      travel: 'Travel - foreign culture',
      podcast: 'Podcast - video editing',
      phone: 'Phone',
      french: 'French',
      arabic: 'Arabic',
      english: 'English',
      italian: 'Italian',
      native: 'Native',
      intermediate: 'Intermediate'
    }
  };

  const t = translations[language];
  const cvFile =
    language === 'fr'
      ? '/documents/CV_Malek_Ghabi_FR.pdf'
      : '/documents/CV_Malek_Ghabi_EN.pdf';
  const cvDownloadName =
    language === 'fr'
      ? 'CV_Malek_Ghabi_FR.pdf'
      : 'CV_Malek_Ghabi_EN.pdf';
  const contactLinks = [
    {
      href: 'mailto:malekghabi.education@gmail.com',
      label: 'Email: malekghabi.education@gmail.com',
      icon: Mail,
    },
    {
      href: 'tel:+33604102156',
      label: `${t.phone}: +33 6 04 10 21 56`,
      icon: Phone,
    },
    {
      href: 'https://github.com/malekghabi1607',
      label: 'GitHub: malekghabi1607',
      icon: Github,
    },
    {
      href: 'https://www.linkedin.com/in/malek-ghabi-3b3267a9/',
      label: 'LinkedIn: malek-ghabi-3b3267a9',
      icon: Linkedin,
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const displayedProjects = portfolioProjects.map((p) => ({
    id: p.id,
    title: language === 'fr' ? p.title : (p.titleEn ?? p.title),
    description: language === 'fr' ? p.descriptionFr : p.descriptionEn,
    tech: p.tech,
    image: p.image,
  }));

  const education = educationData.map((edu) => ({
    year: edu.year,
    degree: language === 'fr' ? edu.degreeFr : edu.degreeEn,
    school: language === 'fr' ? edu.schoolFr : edu.schoolEn,
    status: language === 'fr' ? edu.statusFr : edu.statusEn,
    summary: language === 'fr' ? edu.summaryFr : edu.summaryEn,
    tags: language === 'fr' ? edu.tagsFr : edu.tagsEn,
  }));

  const experiences = portfolioExperiences.map((experience) => ({
    year: language === 'fr' ? (experience.yearFr ?? experience.year) : (experience.yearEn ?? experience.year),
    title: language === 'fr' ? experience.titleFr : experience.titleEn,
    company: experience.company,
    tasks: language === 'fr' ? experience.tasksFr : experience.tasksEn,
    status: language === 'fr' ? experience.statusFr : experience.statusEn,
  }));

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${isDark ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-stone-50 via-amber-50/30 to-white text-gray-900'}`}>
      <BackgroundAnimation isDark={isDark} />
      <nav className={`fixed top-0 w-full backdrop-blur-lg z-50 border-b shadow-md transition-colors duration-500 ${isDark ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className={`text-4xl font-bold ${isDark ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent'}`} style={{fontFamily: 'Georgia, serif'}}>
                gm
              </div>
            </div>

            <div className="hidden lg:flex space-x-8 items-center">
              {[t.home, t.about, t.skills, t.education, t.experience, t.projects, t.contact].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['home', 'about', 'competences', 'formation', 'experiences', 'projets', 'contact'][index])}
                  className={`transition-all duration-300 font-medium ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-blue-900'}`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-slate-900 hover:bg-slate-800'}`}
              >
                {isDark ? <Sun className="w-5 h-5 text-slate-900" /> : <Moon className="w-5 h-5 text-white" />}
              </button>
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-white transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800'}`}
              >
                <Globe className="w-4 h-4" />
                {language === 'fr' ? 'EN' : 'FR'}
              </button>
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-slate-900 hover:bg-slate-800'}`}
              >
                {isDark ? <Sun className="w-4 h-4 text-slate-900" /> : <Moon className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-900 to-blue-900 text-white hover:from-slate-800 hover:to-blue-800 transition-all duration-300 font-medium text-sm"
              >
                <Globe className="w-4 h-4" />
                {language === 'fr' ? 'EN' : 'FR'}
              </button>
              <button
                className={isDark ? 'text-gray-300' : 'text-gray-700'}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`lg:hidden backdrop-blur-lg border-t transition-colors duration-500 ${isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-stone-200'}`}>
            <div className="px-4 py-4 space-y-3">
              {[t.home, t.about, t.skills, t.education, t.experience, t.projects, t.contact].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['home', 'about', 'competences', 'formation', 'experiences', 'projets', 'contact'][index])}
                  className={`block w-full text-left transition-all duration-300 py-2 font-medium ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-blue-900'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-stone-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-900/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-900/20 to-slate-800/20 rounded-full blur-xl animate-float-shape-1"></div>
          <div className="absolute top-40 right-40 w-40 h-40 bg-gradient-to-br from-slate-800/15 to-blue-900/15 rounded-lg blur-2xl animate-float-shape-2"></div>
          <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-gradient-to-br from-blue-900/25 to-slate-900/25 rotate-45 blur-xl animate-float-shape-3"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-slate-900/20 to-blue-800/20 rounded-full blur-2xl animate-float-shape-1" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-800/15 to-slate-900/15 rotate-12 blur-xl animate-float-shape-2" style={{animationDelay: '8s'}}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-block animate-fade-in-down">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-1 shadow-2xl animate-float">
              <div className={`w-full h-full rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                <img
                  src="images/photo.jpg"
                  alt="Malek Ghabi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-center gap-2 animate-fade-in">
            <Sparkles className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} />
            <span className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-blue-900'}`}>{t.lookingFor}</span>
            <Sparkles className={`w-5 h-5 ${isDark ? 'text-blue-300' : 'text-slate-900'}`} />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in">
            <span className={`bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800'}`}>
              Malek Ghabi
            </span>
          </h1>

          <p className={`text-xl md:text-2xl mb-8 leading-relaxed animate-fade-in font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.jobTitle}
          </p>

          <div className={`flex flex-wrap justify-center gap-4 mb-8 animate-fade-in ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
            <div className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm ${isDark ? 'bg-gray-800/60' : 'bg-white/60'}`}>
              <MapPin className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} />
              <span>Cluses</span>
            </div>
            <div className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm ${isDark ? 'bg-gray-800/60' : 'bg-white/60'}`}>
              <Phone className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-slate-900'}`} />
              <span>+33 6 04 10 21 56</span>
            </div>
            <div className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm ${isDark ? 'bg-gray-800/60' : 'bg-white/60'}`}>
              <Mail className={`w-4 h-4 ${isDark ? 'text-blue-300' : 'text-blue-900'}`} />
              <span>malekghabi.education@gmail.com</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-8 animate-fade-in">
            <a
              href={contactLinks[0].href}
              className={`p-3 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800'}`}
              title={contactLinks[0].label}
              aria-label={contactLinks[0].label}
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={contactLinks[1].href}
              className={`p-3 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${isDark ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500' : 'bg-gradient-to-r from-slate-800 to-blue-900 hover:from-slate-700 hover:to-blue-800'}`}
              title={contactLinks[1].label}
              aria-label={contactLinks[1].label}
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href={contactLinks[2].href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${isDark ? 'bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600' : 'bg-gradient-to-r from-blue-900 to-slate-900 hover:from-blue-800 hover:to-slate-800'}`}
              title={contactLinks[2].label}
              aria-label={contactLinks[2].label}
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={contactLinks[3].href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800'}`}
              title={contactLinks[3].label}
              aria-label={contactLinks[3].label}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href={cvFile}
              download={cvDownloadName}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl animate-fade-in min-w-[280px] ${isDark ? 'bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 hover:from-orange-500 hover:via-red-500 hover:to-orange-600' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 hover:from-slate-800 hover:via-blue-800 hover:to-slate-700'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11V3m0 8l-3 3m3-3l3 3m-9 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {language === 'fr' ? 'Télécharger mon CV' : 'Download my CV'}
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl animate-fade-in min-w-[280px] ${isDark ? 'bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 hover:from-orange-500 hover:via-red-500 hover:to-orange-600' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 hover:from-slate-800 hover:via-blue-800 hover:to-slate-700'}`}
            >
              <Mail className="w-5 h-5" />
              {t.discoverProjects}
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className={`scroll-animate text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800'}`}>
            {t.about}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="scroll-animate">
              <h3 className={`text-3xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                {t.hello}{' '}
                <span className={`bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-cyan-300 to-blue-400' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`}>
                  Malek Ghabi
                </span>
              </h3>
              <p className={`text-lg leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.aboutText}
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.aboutText2}
              </p>
            </div>

            <div className="flex justify-center scroll-animate">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-blue-900 shadow-2xl animate-float">
                <img
                  src="images/photo2.jpg"
                  alt="Malek Ghabi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={`scroll-animate backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 shadow-lg hover:shadow-xl ${isDark ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/30' : 'bg-white/60 border-stone-200 hover:border-blue-900/30'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`}>
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-4xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{displayedProjects.length}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.totalProjects}</p>
                </div>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.totalProjectsDesc}</p>
            </div>

            <div className={`scroll-animate backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 shadow-lg hover:shadow-xl ${isDark ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/30' : 'bg-white/60 border-stone-200 hover:border-blue-900/30'}`} style={{transitionDelay: '0.1s'}}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${isDark ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-blue-900 to-slate-900'}`}>
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-4xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>3</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.certificates}</p>
                </div>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.certificatesDesc}</p>
            </div>

            <div className={`scroll-animate backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 shadow-lg hover:shadow-xl ${isDark ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/30' : 'bg-white/60 border-stone-200 hover:border-blue-900/30'}`} style={{transitionDelay: '0.2s'}}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${isDark ? 'bg-gradient-to-r from-indigo-600 to-blue-700' : 'bg-gradient-to-r from-blue-900 to-slate-800'}`}>
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-4xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>4</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.yearsExp}</p>
                </div>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.yearsExpDesc}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className={`scroll-animate backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 shadow-md hover:shadow-lg ${isDark ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/30' : 'bg-white/60 border-stone-200 hover:border-blue-900/30'}`}>
              <h3 className={`text-2xl font-bold bg-clip-text text-transparent mb-6 ${isDark ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`}>{t.languages}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.french}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.native}</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-full rounded-full ${isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`} style={{width: '100%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.arabic}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.native}</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-full rounded-full ${isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`} style={{width: '100%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.english}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>B2</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-full rounded-full ${isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`} style={{width: '75%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.italian}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.intermediate}</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-full rounded-full ${isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`} style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`scroll-animate backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 shadow-md hover:shadow-lg ${isDark ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/30' : 'bg-white/60 border-stone-200 hover:border-blue-900/30'}`} style={{transitionDelay: '0.1s'}}>
              <h3 className={`text-2xl font-bold bg-clip-text text-transparent mb-6 ${isDark ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-900 to-slate-900'}`}>{t.personalSkills}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.teamwork}</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-blue-900 to-slate-900'}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.autonomy}</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-gradient-to-r from-indigo-600 to-blue-700' : 'bg-gradient-to-r from-slate-800 to-blue-900'}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.creativity}</span>
                </div>
              </div>
            </div>

            <div className={`scroll-animate backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 shadow-md hover:shadow-lg ${isDark ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/30' : 'bg-white/60 border-stone-200 hover:border-blue-900/30'}`} style={{transitionDelay: '0.2s'}}>
              <h3 className={`text-2xl font-bold bg-clip-text text-transparent mb-6 ${isDark ? 'bg-gradient-to-r from-blue-400 to-cyan-500' : 'bg-gradient-to-r from-blue-900 to-slate-800'}`}>{t.interests}</h3>
              <div className="space-y-3">
                <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/50 hover:bg-white'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.sport}</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/50 hover:bg-white'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.music}</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/50 hover:bg-white'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.design}</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/50 hover:bg-white'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.travel}</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/50 hover:bg-white'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.podcast}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TechnicalSkillsSection isDark={isDark} language={language} title={t.technicalSkills} />

      <section id="formation" className="flex min-h-screen items-center justify-center px-4 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className={`scroll-animate text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800'}`}>
            {t.education}
          </h2>

          <div className="relative mx-auto max-w-5xl">
            <div className={`absolute left-5 top-5 bottom-5 hidden w-px md:block ${isDark ? 'bg-gradient-to-b from-cyan-400/80 via-blue-500/70 to-indigo-500/60' : 'bg-gradient-to-b from-slate-900 via-blue-900 to-slate-500'}`}></div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="scroll-animate relative md:pl-16"
                  style={{transitionDelay: `${index * 0.1}s`}}
                >
                  <div className={`absolute left-0 top-7 hidden h-10 w-10 items-center justify-center rounded-full border shadow-lg md:flex ${isDark ? 'border-cyan-400/30 bg-slate-900 text-cyan-300 shadow-cyan-950/40' : 'border-blue-900/20 bg-white text-blue-900 shadow-blue-900/10'}`}>
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <div className={`group relative overflow-hidden rounded-xl border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDark ? 'border-gray-700 bg-gray-800/65 hover:border-cyan-500/40' : 'border-stone-200 bg-white/75 hover:border-blue-900/30'}`}>
                    <div className={`absolute inset-y-0 left-0 w-1 ${isDark ? 'bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500' : 'bg-gradient-to-b from-slate-900 via-blue-900 to-slate-700'}`} />

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-md ${isDark ? 'bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-400/25' : 'bg-slate-900 text-white'}`}>
                            <CalendarDays className="h-4 w-4" />
                            {edu.year}
                          </span>

                          {edu.status && (
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${isDark ? 'bg-blue-500/10 text-blue-200 ring-1 ring-blue-400/25' : 'bg-blue-50 text-blue-900 ring-1 ring-blue-200'}`}>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {edu.status.replace(/[()]/g, '')}
                            </span>
                          )}
                        </div>

                        <h3 className={`mb-3 text-2xl font-bold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                          {edu.degree}
                        </h3>

                        <div className="mb-4 flex items-center gap-2">
                          <Building2 className={`h-5 w-5 shrink-0 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} />
                          <p className={`text-base font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{edu.school}</p>
                        </div>

                        <p className={`max-w-3xl text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {edu.summary}
                        </p>
                      </div>

                      <div className="flex max-w-sm flex-wrap gap-2 lg:justify-end">
                        {edu.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${isDark ? 'bg-gray-700/70 text-gray-200 ring-1 ring-gray-600' : 'bg-blue-50/80 text-blue-900 ring-1 ring-blue-100'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`mt-5 h-px w-full ${isDark ? 'bg-gradient-to-r from-cyan-400/30 via-blue-400/10 to-transparent' : 'bg-gradient-to-r from-blue-900/20 via-slate-300/40 to-transparent'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experiences" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className={`scroll-animate text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800'}`}>
            {t.experience}
          </h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`scroll-animate backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:-translate-x-2 shadow-md hover:shadow-lg ${isDark ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/30' : 'bg-white/60 border-stone-200 hover:border-blue-900/30'}`}
                style={{transitionDelay: `${index * 0.1}s`}}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex items-center gap-3 md:w-32">
                    <Briefcase className={`w-6 h-6 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-slate-900'}`} />
                    <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-slate-900'}`}>{exp.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                      {exp.title} {exp.status && <span className={`text-base font-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{exp.status}</span>}
                    </h3>
                    <p className={`mb-3 font-medium ${isDark ? 'text-cyan-400' : 'text-blue-900'}`}>{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className={`flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span className={`mt-1.5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`}>•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projets" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className={`scroll-animate text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800'}`}>
            {t.projects}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className={`scroll-animate backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl cursor-pointer group ${isDark ? 'bg-gray-800/80 border-gray-700 hover:border-orange-500' : 'bg-white/80 border-stone-200 hover:border-blue-900'}`}
                style={{transitionDelay: `${index * 0.1}s`}}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{project.title}</h3>
                  <p className={`mb-4 leading-relaxed line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-white rounded-full text-sm font-medium shadow-sm ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className={`flex items-center transition-colors font-medium ${isDark ? 'text-orange-300 group-hover:text-orange-200' : 'text-blue-900 group-hover:text-slate-800'}`}>
                    {t.viewDetails} <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto w-full">
          <h2 className={`scroll-animate text-5xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800'}`}>
            {t.contactMe}
          </h2>
          <p className={`scroll-animate text-center mb-12 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.contactText}
          </p>

          <div className="scroll-animate mb-8">
            <div className="flex justify-center items-center gap-6">
              <a
                href={contactLinks[0].href}
                className="group"
                title={contactLinks[0].label}
                aria-label={contactLinks[0].label}
              >
                <div className={`p-4 text-white rounded-full transition-all duration-300 group-hover:scale-125 shadow-lg ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800'}`}>
                  <Mail className="w-6 h-6" />
                </div>
              </a>
              <a
                href={contactLinks[1].href}
                className="group"
                title={contactLinks[1].label}
                aria-label={contactLinks[1].label}
              >
                <div className={`p-4 text-white rounded-full transition-all duration-300 group-hover:scale-125 shadow-lg ${isDark ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500' : 'bg-gradient-to-r from-slate-800 to-blue-900 hover:from-slate-700 hover:to-blue-800'}`}>
                  <Phone className="w-6 h-6" />
                </div>
              </a>
              <a
                href={contactLinks[2].href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                title={contactLinks[2].label}
                aria-label={contactLinks[2].label}
              >
                <div className={`p-4 text-white rounded-full transition-all duration-300 group-hover:scale-125 shadow-lg ${isDark ? 'bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600' : 'bg-gradient-to-r from-blue-900 to-slate-900 hover:from-blue-800 hover:to-slate-800'}`}>
                  <Github className="w-6 h-6" />
                </div>
              </a>
              <a
                href={contactLinks[3].href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                title={contactLinks[3].label}
                aria-label={contactLinks[3].label}
              >
                <div className={`p-4 text-white rounded-full transition-all duration-300 group-hover:scale-125 shadow-lg ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800'}`}>
                  <Linkedin className="w-6 h-6" />
                </div>
              </a>
            </div>
          </div>

          <form
            className={`scroll-animate space-y-6 backdrop-blur-sm rounded-xl p-8 border shadow-lg ${isDark ? 'bg-gray-800/70 border-gray-700' : 'bg-white/70 border-stone-200'}`}
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              setSubmitStatus(null);

              const result = await sendContactEmail(formData);

              if (result.success) {
                setSubmitStatus({
                  type: 'success',
                  message: t.successMessage
                });
                setFormData({ name: '', email: '', message: '' });
              } else {
                setSubmitStatus({
                  type: 'error',
                  message: language === 'fr'
                    ? 'Le formulaire est momentanément indisponible. Vous pouvez envoyer votre message par e-mail.'
                    : 'The form is temporarily unavailable. You can send your message by email.',
                  fallbackMailtoUrl: result.fallbackMailtoUrl
                });
              }

              setIsSubmitting(false);
            }}
          >
            {submitStatus && (
              <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? (isDark ? 'bg-green-900/50 text-green-200 border border-green-700' : 'bg-green-100 text-green-800 border border-green-300') : (isDark ? 'bg-red-900/50 text-red-200 border border-red-700' : 'bg-red-100 text-red-800 border border-red-300')}`}>
                {submitStatus.message}
                {submitStatus.type === 'error' && submitStatus.fallbackMailtoUrl && (
                  <a
                    href={submitStatus.fallbackMailtoUrl}
                    className={`inline-flex mt-3 px-3 py-2 rounded-md text-sm font-medium ${
                      isDark
                        ? 'bg-amber-600 text-white hover:bg-amber-500'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    }`}
                  >
                    {language === 'fr' ? 'Envoyer via mon app mail' : 'Send via my mail app'}
                  </a>
                )}
              </div>
            )}

            <div>
              <label htmlFor="name" className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {t.name}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className={`w-full px-4 py-3 backdrop-blur-sm border rounded-lg focus:outline-none transition-colors shadow-sm ${isDark ? 'bg-slate-800/70 border-gray-600 focus:border-blue-400 text-gray-100' : 'bg-white/70 border-stone-300 focus:border-blue-900 text-gray-800'}`}
                placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
              />
            </div>

            <div>
              <label htmlFor="email" className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className={`w-full px-4 py-3 backdrop-blur-sm border rounded-lg focus:outline-none transition-colors shadow-sm ${isDark ? 'bg-slate-800/70 border-gray-600 focus:border-blue-400 text-gray-100' : 'bg-white/70 border-stone-300 focus:border-blue-900 text-gray-800'}`}
                placeholder={language === 'fr' ? 'votre@email.com' : 'your@email.com'}
              />
            </div>

            <div>
              <label htmlFor="message" className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {t.message}
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className={`w-full px-4 py-3 backdrop-blur-sm border rounded-lg focus:outline-none transition-colors resize-none shadow-sm ${isDark ? 'bg-slate-800/70 border-gray-600 focus:border-blue-400 text-gray-100' : 'bg-white/70 border-stone-300 focus:border-blue-900 text-gray-800'}`}
                placeholder={language === 'fr' ? 'Votre message...' : 'Your message...'}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${isDark ? 'bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 hover:from-orange-500 hover:via-red-500 hover:to-orange-600' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 hover:from-slate-800 hover:via-blue-800 hover:to-slate-700'}`}
            >
              {isSubmitting ? t.sending : t.sendMessage}
            </button>
          </form>
        </div>
      </section>

      <footer className={`py-10 ${isDark ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                Malek Ghabi
              </p>
              <p className="mt-2 text-sm text-gray-300">
                {language === 'fr'
                  ? 'Développement / Systèmes / Data - Cluses'
                  : 'Development / Systems / Data - Cluses'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                    title={link.label}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-300">
            <p>
              © {new Date().getFullYear()} Malek Ghabi. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <a href={contactLinks[0].href} className="hover:text-white transition-colors">
                malekghabi.education@gmail.com
              </a>
              <a href={contactLinks[1].href} className="hover:text-white transition-colors">
                +33 6 04 10 21 56
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
