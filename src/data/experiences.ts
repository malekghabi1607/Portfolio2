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
    titleFr: 'Stagiaire Développeuse Full-Stack',
    titleEn: 'Full-Stack Developer Intern',
    company: 'CEA Marcoule (INSTN / UEM) - Bagnols-sur-Cèze',
    tasksFr: [
      'Conception et développement des interfaces front-end et back-end de l’application CADI Web.',
      'Développement d’applications et d’outils Python destinés à automatiser les traitements de données et les processus documentaires.',
      'Développement de fonctionnalités web pour le traitement de fichiers Excel, d’exports IRIS et la génération automatisée de documents.',
      'Participation à la conception technique : maquettes, diagrammes UML, architecture applicative et documentation.',
      'Application des bonnes pratiques de développement logiciel (architecture modulaire, gestion des erreurs, qualité du code) et utilisation de Git pour le suivi des développements.'
    ],
    tasksEn: [
      'Designed and developed both front-end and back-end interfaces of the CADI Web application.',
      'Developed Python applications and tools to automate data processing and document workflows.',
      'Built web features for Excel file processing, IRIS exports and automated document generation.',
      'Contributed to technical design through mockups, UML diagrams, application architecture and documentation.',
      'Applied software engineering best practices (modular architecture, error handling, code quality) and used Git for version control.'
    ],
    statusFr: '(stage)',
    statusEn: '(internship)'
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
