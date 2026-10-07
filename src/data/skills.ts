export type Skill = {
  name: string;
  logo: string;
  percent: number;
};

export type SkillCategory = {
  id: string;
  titleFr: string;
  titleEn: string;
  accent: 'cyan' | 'blue' | 'orange' | 'green' | 'violet' | 'rose' | 'amber';
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    titleFr: 'Développement Frontend',
    titleEn: 'Frontend Development',
    accent: 'cyan',
    skills: [
      { name: 'HTML5', logo: '/images/skills/html5.svg', percent: 90 },
      { name: 'CSS3', logo: '/images/skills/css3.svg', percent: 85 },
      { name: 'JavaScript', logo: '/images/skills/javascript.svg', percent: 82 },
      { name: 'TypeScript', logo: '/images/skills/typescript.svg', percent: 70 },
      { name: 'React', logo: '/images/skills/react.svg', percent: 78 },
      { name: 'Vue.js', logo: '/images/skills/vuejs.svg', percent: 62 },
      { name: 'PHP', logo: '/images/skills/php.svg', percent: 75 },
      { name: 'Tailwind CSS', logo: '/images/skills/tailwind.svg', percent: 72 },
      { name: 'Bootstrap 5', logo: '/images/skills/bootstrap.svg', percent: 68 },
      { name: 'Chart.js', logo: '/images/skills/chartjs.svg', percent: 60 },
      { name: 'Vite', logo: '/images/skills/vite.svg', percent: 68 },
      { name: 'Yii Framework', logo: '/images/skills/yii.svg', percent: 42 },
    ],
  },
  {
    id: 'backend',
    titleFr: 'Développement Backend',
    titleEn: 'Backend Development',
    accent: 'orange',
    skills: [
      { name: 'Node.js', logo: '/images/skills/nodejs.svg', percent: 68 },
      { name: 'Python', logo: '/images/skills/python.svg', percent: 80 },
      { name: 'Bash', logo: '/images/skills/bash.svg', percent: 64 },
      { name: 'Flask', logo: '/images/skills/flask.svg', percent: 66 },
      { name: 'Java', logo: '/images/skills/java.svg', percent: 76 },
      { name: 'JavaFX', logo: '/images/skills/javafx.svg', percent: 60 },
      { name: 'Spring', logo: '/images/skills/spring.svg', percent: 62 },
      { name: 'Laravel', logo: '/images/skills/laravel.svg', percent: 58 },
      { name: 'Socket.io', logo: '/images/skills/socketio.svg', percent: 56 },
      { name: 'JWT', logo: '/images/skills/jwt.svg', percent: 64 },
      { name: 'C', logo: '/images/skills/c.svg', percent: 74 },
      { name: 'C++', logo: '/images/skills/cplusplus.svg', percent: 70 },
      { name: 'R', logo: '/images/skills/r.svg', percent: 58 },
      { name: 'Matlab', logo: '/images/skills/matlab.svg', percent: 55 },
      { name: 'Arduino', logo: '/images/skills/arduino.svg', percent: 58 },
      { name: 'Julia', logo: '/images/skills/julia.svg', percent: 45 },
    ],
  },
  {
    id: 'devops',
    titleFr: 'DevSecOps & Cloud',
    titleEn: 'DevSecOps & Cloud',
    accent: 'blue',
    skills: [
      { name: 'Docker', logo: '/images/skills/docker.svg', percent: 66 },
      { name: 'Kubernetes', logo: '/images/skills/kubernetes.svg', percent: 38 },
      { name: 'Terraform', logo: '/images/skills/terraform.svg', percent: 36 },
      { name: 'Ansible', logo: '/images/skills/ansible.svg', percent: 38 },
      { name: 'GitLab CI', logo: '/images/skills/gitlab.svg', percent: 62 },
      { name: 'GitHub Actions', logo: '/images/skills/github.svg', percent: 64 },
      { name: 'Netlify', logo: '/images/skills/netlify.svg', percent: 68 },
      { name: 'Render', logo: '/images/skills/render.svg', percent: 60 },
      { name: 'Railway', logo: '/images/skills/railway.svg', percent: 58 },
      { name: 'AWS', logo: '/images/skills/aws.svg', percent: 55 },
    ],
  },
  {
    id: 'database',
    titleFr: 'Base de Données',
    titleEn: 'Databases',
    accent: 'green',
    skills: [
      { name: 'SQL', logo: '/images/skills/sql.svg', percent: 78 },
      { name: 'PostgreSQL', logo: '/images/skills/postgresql.svg', percent: 76 },
      { name: 'MySQL', logo: '/images/skills/mysql.svg', percent: 76 },
      { name: 'SQLite', logo: '/images/skills/sqlite.svg', percent: 66 },
      { name: 'MongoDB', logo: '/images/skills/mongodb.svg', percent: 62 },
      { name: 'Redis', logo: '/images/skills/redis.svg', percent: 55 },
      { name: 'Supabase', logo: '/images/skills/supabase.svg', percent: 58 },
      { name: 'Firebase', logo: '/images/skills/firebase.svg', percent: 62 },
    ],
  },
  {
    id: 'networks',
    titleFr: 'Réseaux',
    titleEn: 'Networks',
    accent: 'violet',
    skills: [
      { name: 'Cisco CCNA 1 & 2', logo: '/images/skills/cisco.svg', percent: 65 },
      { name: 'OSI Model', logo: '/images/skills/osi.svg', percent: 70 },
      { name: 'TCP/IP', logo: '/images/skills/tcpip.svg', percent: 68 },
      { name: 'VLAN', logo: '/images/skills/vlan.svg', percent: 60 },
      { name: 'Routing & Switching', logo: '/images/skills/routing.svg', percent: 60 },
      { name: 'DNS/DHCP', logo: '/images/skills/dns-dhcp.svg', percent: 64 },
      { name: 'Firewall', logo: '/images/skills/firewall.svg', percent: 55 },
      { name: 'VPN', logo: '/images/skills/vpn.svg', percent: 55 },
      { name: 'Network Security', logo: '/images/skills/network-security.svg', percent: 58 },
      { name: 'Packet Tracer', logo: '/images/skills/packet-tracer.svg', percent: 64 },
      { name: 'Wireshark', logo: '/images/skills/wireshark.svg', percent: 58 },
    ],
  },
  {
    id: 'tools',
    titleFr: 'Outils',
    titleEn: 'Tools',
    accent: 'rose',
    skills: [
      { name: 'GitHub', logo: '/images/skills/github.svg', percent: 80 },
      { name: 'Git', logo: '/images/skills/git.svg', percent: 78 },
      { name: 'Postman', logo: '/images/skills/postman.svg', percent: 68 },
      { name: 'Swagger', logo: '/images/skills/swagger.svg', percent: 60 },
      { name: 'Jira', logo: '/images/skills/jira.svg', percent: 58 },
      { name: 'Notion', logo: '/images/skills/notion.svg', percent: 62 },
      { name: 'npm', logo: '/images/skills/npm.svg', percent: 66 },
      { name: 'Composer', logo: '/images/skills/composer.svg', percent: 58 },
      { name: 'ESLint', logo: '/images/skills/eslint.svg', percent: 62 },
      { name: 'Figma', logo: '/images/skills/figma.svg', percent: 60 },
      { name: 'Pack Office', logo: '/images/skills/office.svg', percent: 76 },
      { name: 'VS Code', logo: '/images/skills/vscode.svg', percent: 82 },
      { name: 'Eclipse', logo: '/images/skills/eclipse.svg', percent: 58 },
    ],
  },
  {
    id: 'platforms',
    titleFr: 'Plateformes & IDE',
    titleEn: 'Platforms & IDE',
    accent: 'amber',
    skills: [
      { name: 'Linux', logo: '/images/skills/linux.svg', percent: 74 },
      { name: 'Windows', logo: '/images/skills/windows.svg', percent: 82 },
      { name: 'VirtualBox', logo: '/images/skills/virtualbox.svg', percent: 62 },
      { name: 'IntelliJ', logo: '/images/skills/intellij.svg', percent: 72 },
      { name: 'PyCharm', logo: '/images/skills/pycharm.svg', percent: 64 },
      { name: 'WebStorm', logo: '/images/skills/webstorm.svg', percent: 60 },
      { name: 'PHPStorm', logo: '/images/skills/phpstorm.svg', percent: 62 },
      { name: 'Eclipse', logo: '/images/skills/eclipse.svg', percent: 58 },
    ],
  },
];
