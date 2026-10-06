/**
 * Education Data
 *
 * This file contains all educational background information.
 * Includes degrees, schools, years, and current status.
 */

export interface Education {
  year: string;
  degreeFr: string;
  degreeEn: string;
  schoolFr: string;
  schoolEn: string;
  statusFr: string;
  statusEn: string;
  summaryFr: string;
  summaryEn: string;
  tagsFr: string[];
  tagsEn: string[];
}

export const education: Education[] = [
  {
    year: '2026-2028',
    degreeFr: 'Master Informatique — Informatique appliquée et systèmes intelligents',
    degreeEn: 'Master’s Degree in Computer Science — Applied Computer Science and Intelligent Systems',
    schoolFr: 'Université Catholique de Lille',
    schoolEn: 'Université Catholique de Lille',
    statusFr: '(alternance)',
    statusEn: '(apprenticeship)',
    summaryFr: 'Master en informatique orienté informatique appliquée, ingénierie logicielle, systèmes intelligents, data, IA, bases de données et transformation numérique.',
    summaryEn: 'Master’s degree in Computer Science, specializing in applied computer science, software engineering, intelligent systems, data, AI, databases and digital transformation.',
    tagsFr: ['Master', 'Informatique appliquée', 'Systèmes intelligents', 'Alternance'],
    tagsEn: ['Master’s Degree', 'Applied Computer Science', 'Intelligent Systems', 'Apprenticeship']
  },
  {
    year: '2023-2026',
    degreeFr: 'Licence Informatique',
    degreeEn: 'Bachelor’s Degree in Computer Science',
    schoolFr: 'Avignon Université',
    schoolEn: 'Avignon University',
    statusFr: '(obtenue)',
    statusEn: '(completed)',
    summaryFr: 'Licence Informatique orientée algorithmique, programmation orientée objet, bases de données, systèmes, réseaux, statistiques appliquées et projets data/IA.',
    summaryEn: 'Bachelor’s degree in Computer Science focused on algorithms, object-oriented programming, databases, systems, networks, applied statistics and data/AI projects.',
    tagsFr: ['Algorithmique', 'POO', 'Bases de données', 'Data / IA'],
    tagsEn: ['Algorithms', 'OOP', 'Databases', 'Data / AI']
  },
  {
    year: '2025-2026',
    degreeFr: 'Bachelor en sciences informatiques',
    degreeEn: 'Bachelor of Science in Computer Science',
    schoolFr: 'Université de Genève',
    schoolEn: 'University of Geneva, Switzerland',
    statusFr: '',
    statusEn: '',
    summaryFr: 'Double cursus avec la Licence Informatique d’Avignon Université : première année suivie en sciences informatiques, avec des bases en programmation, raisonnement algorithmique et approche académique internationale.',
    summaryEn: 'Dual enrollment alongside the Computer Science Bachelor’s at Avignon University: first year completed in computer science, covering programming foundations, algorithmic reasoning and an international academic perspective.',
    tagsFr: ['Double cursus', 'Informatique', 'Programmation', 'Algorithmique'],
    tagsEn: ['Dual enrollment', 'Computer Science', 'Programming', 'Algorithms']
  },
  {
    year: '2023',
    degreeFr: 'Baccalauréat Général Scientifique',
    degreeEn: 'Scientific General Baccalaureate',
    schoolFr: 'Lycée Jean-Henri Fabre',
    schoolEn: 'Jean-Henri Fabre High School',
    statusFr: '',
    statusEn: '',
    summaryFr: 'Mathématiques, Physique-Chimie, Sciences de l’Ingénieur.',
    summaryEn: 'Mathematics, Physics-Chemistry and Engineering Sciences.',
    tagsFr: ['Mathématiques', 'Physique-Chimie', 'Sciences de l’Ingénieur'],
    tagsEn: ['Mathematics', 'Physics-Chemistry', 'Engineering Sciences']
  }
];
