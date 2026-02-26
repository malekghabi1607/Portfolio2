import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, Code2, Layers, ExternalLink, Sun, Moon, Globe } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projects, Project } from '../data/projects';

type Lang = 'fr' | 'en';
type Tab = 'overview' | 'details' | 'media';

// ---------- Helpers (au-dessus du composant) ----------
const toText = (v: string | string[] | undefined): string =>
  Array.isArray(v) ? v.join(' ') : (v ?? '');

const renderLong = (val?: string | string[]) =>
  Array.isArray(val)
    ? val.map((p, i) => (
        <p key={i} className="mb-4 leading-relaxed">
          {p}
        </p>
      ))
    : <p className="whitespace-pre-line leading-relaxed">{val}</p>;

// -----------------------------------------------------

interface ProjectDetailPageProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  language: Lang;
  setLanguage: (language: Lang) => void;
}

export default function ProjectDetailPage({ isDark, setIsDark, language, setLanguage }: ProjectDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Récupère le projet par son id (depuis data/projects.ts)
  const project = useMemo<Project | undefined>(() => {
    if (!id) return undefined;
    return projects.find((p) => p.id === id);
  }, [id]);

  // utilitaire mini pour choisir FR/EN
  const t = (
    fr: string | string[] | undefined,
    en: string | string[] | undefined
  ): string | string[] | undefined =>
    language === 'fr' ? (fr ?? en) : (en ?? fr);

  if (!project) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white'
            : 'bg-gradient-to-br from-stone-50 via-amber-50/30 to-white text-gray-900'
        }`}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'fr' ? 'Projet non trouvé' : 'Project not found'}
          </h1>
          <button
            onClick={() => navigate('/')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              isDark
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
                : 'bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 text-white'
            }`}
          >
            {language === 'fr' ? "Retour à l'accueil" : 'Back to home'}
          </button>
        </div>
      </div>
    );
  }

  // Données dépendantes de la langue
  const title = t(project.title, project.titleEn);
  const shortDescription = t(project.descriptionFr, project.descriptionEn);
  const longDescription = t(project.longDescriptionFr, project.longDescriptionEn) || shortDescription;
  const features = (language === 'fr' ? project.featuresFr : project.featuresEn) ?? [];
  const challenges = (language === 'fr' ? project.challengesFr : project.challengesEn) ?? [];

  // Compteurs dynamiques
  const techCount = project.tech?.length ?? 0;
  const functionalityCount = features.length;

  // `alt` doit être une string
  const titleText = toText(title);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-stone-50 via-amber-50/30 to-white text-gray-900'
      }`}
    >
      {/* Topbar */}
      <nav
        className={`fixed top-0 w-full backdrop-blur-lg z-50 border-b shadow-md transition-colors duration-500 ${
          isDark ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className={`text-4xl font-bold ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              gm
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDark ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-slate-900 hover:bg-slate-800'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5 text-slate-900" /> : <Moon className="w-5 h-5 text-white" />}
              </button>
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-white transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg ${
                  isDark
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                    : 'bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800'
                }`}
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                {language === 'fr' ? 'EN' : 'FR'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fil d’Ariane */}
      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 transition-colors mb-8 group font-medium ${
            isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-blue-900'
          }`}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>{language === 'fr' ? 'Retour' : 'Back'}</span>
          <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>&gt;</span>
          <span>{language === 'fr' ? 'Projets' : 'Projects'}</span>
          <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>&gt;</span>
          <span className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{toText(title)}</span>
        </button>

        {/* Titre + Tabs */}
        <div className="mb-8">
          <h1
            className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-6 ${
              isDark ? 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500' : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800'
            }`}
          >
            {toText(title)}
          </h1>
          <div className={`w-20 h-1 mb-8 ${isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900'}`} />

          <div className="flex gap-4 mb-8">
            {(['overview', 'details', 'media'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? isDark
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                      : 'bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-md'
                    : isDark
                    ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-800'
                    : 'bg-white/60 text-gray-700 hover:bg-white'
                }`}
              >
                {tab === 'overview'
                  ? language === 'fr'
                    ? "Vue d'ensemble"
                    : 'Overview'
                  : tab === 'details'
                  ? language === 'fr'
                    ? 'Détails'
                    : 'Details'
                  : language === 'fr'
                  ? 'Médias'
                  : 'Media'}
              </button>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Colonne gauche */}
            <div>
              <div className={`text-base md:text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {renderLong(shortDescription)}
              </div>

              {/* Cards chiffres */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div
                  className={`backdrop-blur-sm rounded-xl p-5 border transition-all shadow-md ${
                    isDark ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/30' : 'bg-white/60 border-stone-200 hover:border-blue-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Code2 className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} />
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{techCount}</h3>
                  </div>
                  <p className={`text-xs uppercase font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'fr' ? 'Technologies totales' : 'Total technologies'}
                  </p>
                </div>

                <div
                  className={`backdrop-blur-sm rounded-xl p-5 border transition-all shadow-md ${
                    isDark ? 'bg-gray-800/60 border-gray-700 hover:border-orange-500/30' : 'bg-white/60 border-stone-200 hover:border-blue-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Layers className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} />
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{functionalityCount}</h3>
                  </div>
                  <p className={`text-xs uppercase font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'fr' ? 'Principales fonctionnalités' : 'Main features'}
                  </p>
                </div>
              </div>

              {(project.githubUrl || project.liveUrl) && (
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium ${
                          isDark
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                            : 'bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800'
                        }`}
                      >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                        <ExternalLink className="w-4 h-4 opacity-80" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium ${
                          isDark
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                            : 'bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600'
                        }`}
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>{language === 'fr' ? 'Voir le site' : 'View site'}</span>
                      </a>
                    )}
                  </div>

                  {(project.liveNoteFr || project.liveNoteEn) && (
                    <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'fr' ? (project.liveNoteFr ?? project.liveNoteEn) : (project.liveNoteEn ?? project.liveNoteFr)}
                    </p>
                  )}
                </div>
              )}

              {/* Tech badges */}
              <div
                className={`backdrop-blur-sm rounded-2xl p-6 md:p-8 border shadow-lg ${
                  isDark ? 'bg-gray-800/60 border-gray-700' : 'bg-white/60 border-stone-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} />
                  <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    {language === 'fr' ? 'Technologies utilisées' : 'Technologies used'}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 text-white text-sm rounded-lg font-medium shadow-sm ${
                        isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600' : 'bg-gradient-to-r from-slate-900 to-blue-900'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite : Image + features */}
            <div>
              <div
                className={`rounded-2xl overflow-hidden mb-8 border-2 shadow-lg hover:shadow-xl transition-shadow ${
                  isDark ? 'border-gray-700' : 'border-stone-200'
                }`}
              >
                <img src={project.image} alt={titleText} className="w-full h-64 md:h-80 object-cover" />
              </div>

              {features.length > 0 && (
                <div
                  className={`backdrop-blur-sm rounded-2xl p-6 md:p-8 border shadow-lg ${
                    isDark ? 'bg-gray-800/60 border-gray-700' : 'bg-white/60 border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Layers className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-900'}`} />
                    <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                      {language === 'fr' ? 'Principales fonctionnalités' : 'Main features'}
                    </h3>
                  </div>

                  {/* clé dépendante de la langue pour forcer le remount propre */}
                  <ul key={`features-${language}`} className="space-y-3">
                    {features.map((f) => (
                      <li
                        key={`${language}-${f}`}
                        className={`flex items-start gap-3 text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900'
                          }`}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DETAILS */}
        {activeTab === 'details' && (
          <div key={`details-${language}`} className="max-w-4xl mx-auto">
            <div
              className={`backdrop-blur-sm rounded-2xl p-8 border shadow-lg mb-8 ${
                isDark ? 'bg-gray-800/60 border-gray-700' : 'bg-white/60 border-stone-200'
              }`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {language === 'fr' ? 'Description détaillée' : 'Detailed description'}
              </h2>
              <div className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {renderLong(longDescription)}
              </div>
            </div>

            {challenges.length > 0 && (
              <div
                className={`backdrop-blur-sm rounded-2xl p-8 border shadow-lg mb-8 ${
                  isDark ? 'bg-gray-800/60 border-gray-700' : 'bg-white/60 border-stone-200'
                }`}
              >
                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  {language === 'fr' ? 'Défis et solutions' : 'Challenges and solutions'}
                </h2>
                <ul key={`challenges-${language}`} className="space-y-4">
                  {challenges.map((c) => (
                    <li
                      key={`${language}-${c}`}
                      className={`flex items-start gap-3 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mt-2.5 flex-shrink-0 ${
                          isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-slate-900 to-blue-900'
                        }`}
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* MEDIA */}
        {activeTab === 'media' && (
          <div key={`media-${language}`} className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {language === 'fr' ? 'Image principale' : 'Main image'}
              </h2>
              <div
                className={`rounded-2xl overflow-hidden border-2 shadow-lg ${
                  isDark ? 'border-gray-700' : 'border-stone-200'
                }`}
              >
                <img src={project.image} alt={titleText} className="w-full h-96 object-cover" />
              </div>
            </div>

            {project.galleryImages && project.galleryImages.length > 0 && (
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  {language === 'fr' ? 'Galerie' : 'Gallery'}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {project.galleryImages.map((url, i) => (
                    <div
                      key={i}
                      className={`rounded-xl overflow-hidden border-2 shadow-lg hover:shadow-xl transition-shadow ${
                        isDark ? 'border-gray-700' : 'border-stone-200'
                      }`}
                    >
                      <img src={url} alt={`${titleText} - Image ${i + 1}`} className="w-full h-64 object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Placeholder vidéo si un jour tu ajoutes des URLs */}
            {/* {project.videoUrls?.length ? ... : null} */}
          </div>
        )}
      </div>
    </div>
  );
}
