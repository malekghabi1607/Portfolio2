/**
 * Professional Experience Data
 *
 * This file contains all work experience and internship information.
 * Each experience includes position, company, years, tasks, and status.
 */

export interface Experience {
  year: string;
  yearFr?: string;
  yearEn?: string;
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
    yearFr: 'sept. 2026 - aujourd’hui',
    yearEn: 'Sept. 2026 - Present',
    titleFr: 'Apprentie Software & Data Engineer',
    titleEn: 'Software & Data Engineer Apprentice',
    company: 'NOVOUTILS - Thyez',
    tasksFr: [
      'Contrat en alternance sur deux ans, orienté conception et amélioration de solutions logicielles et data métier.',
      'Refonte et optimisation de l’architecture de base de données connectée à l’ERP CEGID PMI : analyse des besoins, structuration des données et migration.',
      'Amélioration d’une solution de suivi commercial Power BI avec tableaux de bord dynamiques et reporting automatisé.',
      'Conception d’une application dédiée à la gestion des équipements de mesure : contrôle d’accès, journalisation, sauvegarde des données et notifications.',
      'Contribution à la coordination d’un projet logiciel orienté IA, en assurant l’alignement entre besoins métier, développement technique et spécifications projet.',
      'Domaines : développement logiciel, data, business intelligence, bases de données, IA et transformation numérique.'
    ],
    tasksEn: [
      'Two-year apprenticeship focused on designing and improving business-oriented software and data solutions.',
      'Redesigning and optimizing the database architecture connected to the CEGID PMI ERP, including requirements analysis, data structuring and migration.',
      'Enhancing a Power BI sales monitoring solution through dynamic dashboards and automated reporting.',
      'Designing a dedicated application for measurement equipment management, integrating access control, logging, data backup and notification features.',
      'Contributing to the coordination of an AI-driven software project, ensuring alignment between business requirements, technical development and project specifications.',
      'Focus areas: software development, data, business intelligence, databases, AI and digital transformation.'
    ],
    statusFr: '(contrat en alternance)',
    statusEn: '(apprenticeship contract)'
  },
  {
    year: '2026',
    yearFr: 'mai 2026 - août 2026',
    yearEn: 'May 2026 - August 2026',
    titleFr: 'Stagiaire Développeuse Full-Stack',
    titleEn: 'Full-Stack Developer Intern',
    company: 'CEA Marcoule - Marcoule',
    tasksFr: [
      'Stage sur CADI Web, application web full-stack conçue pour moderniser des outils internes et fluidifier des processus métier.',
      'Conception et développement d’interfaces utilisateur avec React, TypeScript et Vite.',
      'Développement de services back-end et d’API REST avec Python et FastAPI.',
      'Intégration d’outils de traitement existants en Python dans un environnement web centralisé.',
      'Automatisation du traitement de fichiers Excel, Word et CSV.',
      'Contribution à l’architecture logicielle, aux tests, au débogage et à l’amélioration continue.'
    ],
    tasksEn: [
      'Internship on CADI Web, a full-stack web application designed to modernize internal tools and streamline business processes.',
      'Designed and developed user interfaces with React, TypeScript and Vite.',
      'Developed backend services and REST APIs using Python and FastAPI.',
      'Integrated existing Python-based processing tools into a centralized web environment.',
      'Automated the processing of Excel, Word and CSV files.',
      'Contributed to software architecture, testing, debugging and continuous improvement.'
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
    titleFr: 'Stagiaire Géomètre Expert',
    titleEn: 'Land Surveying Intern',
    company: 'Cabinet Gilles Piquard - Carpentras',
    tasksFr: [
      'Assistance aux relevés topographiques et aux mesures de limites foncières.',
      'Préparation de documents techniques et traitement de données terrain.'
    ],
    tasksEn: [
      'Assisted with topographic surveys and land boundary measurements.',
      'Supported technical documentation and field data processing.'
    ]
  },
  {
    year: '2021',
    titleFr: 'Stagiaire Assistante Architecte',
    titleEn: 'Architectural Assistant Intern',
    company: 'Rogier Gilles - Carpentras',
    tasksFr: [
      'Participation aux relevés de terrain et à la préparation de plans architecturaux.',
      'Contribution à la préparation de dossiers de permis de construire.'
    ],
    tasksEn: [
      'Assisted with field surveys and the preparation of architectural drawings.',
      'Contributed to the preparation of building permit documentation.'
    ]
  }
];
