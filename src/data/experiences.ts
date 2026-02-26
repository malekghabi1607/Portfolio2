/**
 * Professional Experience Data
 *
 * This file contains all work experience and internship information.
 * Each experience includes position, company, years, tasks, and status.
 */

export interface Experience {
  year: string;
  titleFr: string;
  titleEn: string;
  company: string;
  tasksFr: string[];
  tasksEn: string[];
  statusFr?: string;
  statusEn?: string;
}

export const experiences: Experience[] = [
  {
    year: '2026',
    titleFr: 'Stagiaire Développeuse Python',
    titleEn: 'Python Developer Intern',
    company: 'CEA - Marcoule (INSTN, UEM) - Bagnols-sur-Cèze',
    tasksFr: [
      'Développement d\'une suite d\'outils Python pour l\'automatisation de documents (Word, Excel, PowerPoint, PDF, Outlook).',
      'Création d\'une interface graphique (Tkinter / PySimpleGUI).',
      'Implémentation d\'un code modulaire, maintenable et structuré (PEP8, gestion des erreurs, logs).',
      'Participation à la mise en place d\'un système qualité documentaire (vérification, archivage, structuration des données).',
      'Collaboration avec l\'équipe métier et gestion de versions avec Git.'
    ],
    tasksEn: [
      'Developed a Python tool suite for document automation (Word, Excel, PowerPoint, PDF, Outlook).',
      'Built a graphical interface (Tkinter / PySimpleGUI).',
      'Implemented modular, maintainable, and structured code (PEP8, error handling, logging).',
      'Contributed to a document-quality workflow (verification, archiving, and data structuring).',
      'Collaborated with business teams and used Git for version control.'
    ],
    statusFr: '(stage)',
    statusEn: '(internship)'
  },
  {
    year: '2025-2026',
    titleFr: 'Caissière',
    titleEn: 'Cashier',
    company: 'B&M - Sorgues',
    tasksFr: [
      'Accueil clients et gestion des encaissements.',
      'Mise en rayon et suivi des stocks.'
    ],
    tasksEn: [
      'Customer reception and cash management.',
      'Shelving and inventory tracking.'
    ],
    statusFr: '(en cours)',
    statusEn: '(ongoing)'
  },
  {
    year: '2025',
    titleFr: 'Animatrice',
    titleEn: 'Activity Leader',
    company: 'MJC - Annemasse',
    tasksFr: [
      'Encadrement et animation d\'activités pour enfants.',
      'Développement du sens de l\'organisation et du travail en équipe.'
    ],
    tasksEn: [
      'Supervision and animation of children\'s activities.',
      'Development of organizational and teamwork skills.'
    ],
    statusFr: '(job d\'été)',
    statusEn: '(summer job)'
  },
  {
    year: '2023-2024',
    titleFr: 'Gestionnaire d\'exploitation',
    titleEn: 'Operations Manager',
    company: 'CERP - Laboratoire pharmaceutique',
    tasksFr: [
      'Vérification des lots et péremptions.',
      'Réception, gestion du stock et préparation des médicaments.'
    ],
    tasksEn: [
      'Batch and expiration verification.',
      'Reception, inventory management and drug preparation.'
    ]
  },
  {
    year: '2022',
    titleFr: 'Stagiaire Architecte',
    titleEn: 'Architecture Intern',
    company: 'Cabinet Gilles - Carpentras',
    tasksFr: [
      'Participation aux relevés de terrain et à la conception des plans.',
      'Assistance à la préparation de dossiers de permis de construire.'
    ],
    tasksEn: [
      'Participation in field surveys and plan design.',
      'Assistance in preparing building permit applications.'
    ]
  },
  {
    year: '2021',
    titleFr: 'Stagiaire Géomètre Expert',
    titleEn: 'Land Surveyor Intern',
    company: 'Cabinet Grimont - Carpentras',
    tasksFr: [
      'Aide au levé topographique et au bornage de terrains.',
      'Traitement de données sur logiciel de géomatique.'
    ],
    tasksEn: [
      'Assistance with topographic surveys and land demarcation.',
      'Data processing on geomatics software.'
    ]
  }
];
