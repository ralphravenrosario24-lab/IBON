import { PortfolioData } from '../types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Ralph Raven C. Rosario',
    brandTagline: 'RALPH RAVEN // STEM RESEARCH × CYBERSECURITY & TECH',
    heroHeadline: 'RALPH RAVEN C. ROSARIO // PORTFOLIO',
    heroStatementSeen: 'Engineering what is calculated.',
    heroStatementUnseen: "Analyzing what is uncertain.",
    heroSubheadline: 'STEM Researcher × Probability Modeling × Python & Web Development × Tech Leadership',
    bio: [
      'I am a Senior High School STEM student at Las Piñas City National Senior High School – Talon Dos Campus, passionate about probability-based structural reliability modeling, Monte Carlo simulation, cybersecurity fundamentals, and computer systems.',
      'As a Research Leader and academic club officer, I spearhead empirical studies on structural risk assessment, coordinate technical teams, and develop software and web solutions.',
      'Junior High School Top 10 Student (GWA: 94.50%) with practical certifications across Python, Cybersecurity Fundamentals, Computer Systems & Network Servicing, and English for IT.'
    ],
    avatarUrl: '/avatar.jpg',
    currentlyExploring: [
      'Monte Carlo Simulation & Structural Reliability',
      'Python Automation & Systems Programming',
      'Cybersecurity Fundamentals & Network Defense',
      'Computer Systems Servicing & Network Infrastructure',
      'Modern Web Design & Development'
    ],
    systemStatus: 'PORTFOLIO STATUS // ONLINE',
    email: 'ralphravenrosario24@gmail.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    location: '91 JP Rizal St., Tuazon Village, Pamplona Uno, Las Piñas City, Metro Manila'
  },
  skills: [
    {
      id: 'cybersec',
      name: 'CYBERSECURITY',
      description: 'Network defense, vulnerability assessments, penetration testing foundations, and security protocols.',
      iconName: 'Shield',
      skills: [
        { name: 'Vulnerability Assessment', level: 'Advanced', tools: ['Nmap', 'Burp Suite', 'Wireshark'] },
        { name: 'Network Packet Analysis', level: 'Advanced', tools: ['Wireshark', 'Tcpdump', 'Zeek'] },
        { name: 'Web Application Security (OWASP)', level: 'Advanced', tools: ['OWASP Top 10', 'ZAP', 'CSRF/XSS Mitigation'] },
        { name: 'Linux Hardening & SysAdmin', level: 'Proficient', tools: ['Ubuntu Server', 'Debian', 'iptables', 'UFW'] },
        { name: 'Cryptography Fundamentals', level: 'Practicing', tools: ['RSA', 'AES-GCM', 'TLS 1.3', 'Hashing'] },
        { name: 'Threat Modeling & Risk Analysis', level: 'Practicing', tools: ['STRIDE', 'DREAD', 'MITRE ATT&CK'] }
      ]
    },
    {
      id: 'programming',
      name: 'PROGRAMMING & SYSTEMS',
      description: 'Clean, structured code for scripts, security tools, backends, and algorithmic problem solving.',
      iconName: 'Terminal',
      skills: [
        { name: 'Python for Security & Automation', level: 'Advanced', tools: ['Scapy', 'Requests', 'FastAPI', 'Pandas'] },
        { name: 'TypeScript / JavaScript', level: 'Advanced', tools: ['React', 'Node.js', 'Express', 'Vite'] },
        { name: 'C / C++ Basics', level: 'Practicing', tools: ['Memory Management', 'Pointers', 'POSIX'] },
        { name: 'Bash Scripting', level: 'Proficient', tools: ['Shell Automation', 'Cron Jobs', 'CLI Tooling'] },
        { name: 'SQL & Database Architecture', level: 'Proficient', tools: ['PostgreSQL', 'SQLite', 'Redis'] }
      ]
    },
    {
      id: 'webdev',
      name: 'WEB DEVELOPMENT',
      description: 'High-performance, accessible, and responsive user interfaces with modern full-stack architectures.',
      iconName: 'Globe',
      skills: [
        { name: 'Modern React & Component Design', level: 'Advanced', tools: ['React 19', 'Hooks', 'State Management'] },
        { name: 'Tailwind CSS & Styling', level: 'Advanced', tools: ['Tailwind', 'Responsive Layouts', 'CSS Grid'] },
        { name: 'REST & GraphQL API Design', level: 'Proficient', tools: ['Express', 'Axios', 'CORS', 'JWT Auth'] },
        { name: 'Web Performance & Accessibility', level: 'Proficient', tools: ['Lighthouse', 'WCAG 2.1 AA', 'Core Web Vitals'] },
        { name: 'Git & Version Control', level: 'Advanced', tools: ['Git CLI', 'GitHub Actions', 'Branching'] }
      ]
    },
    {
      id: 'design',
      name: 'DIGITAL & UI/UX DESIGN',
      description: 'Visual hierarchy, wireframing, interactive prototyping, micro-interactions, and design systems.',
      iconName: 'Palette',
      skills: [
        { name: 'UI/UX Interface Design', level: 'Advanced', tools: ['Figma', 'Auto-Layout', 'Design Tokens'] },
        { name: 'Design Systems & Component Libraries', level: 'Proficient', tools: ['Atomic Design', 'Style Guides'] },
        { name: 'Vector Illustration & Graphics', level: 'Proficient', tools: ['Illustrator', 'SVG Manipulation'] },
        { name: 'User Flow & Wireframing', level: 'Advanced', tools: ['Information Architecture', 'Prototyping'] },
        { name: 'Motion & Micro-interactions', level: 'Practicing', tools: ['Framer Motion', 'CSS Keyframes'] }
      ]
    },
    {
      id: 'research',
      name: 'RESEARCH & ANALYSIS',
      description: 'Empirical experimentation, literature reviews, security auditing, and technical documentation.',
      iconName: 'FileText',
      skills: [
        { name: 'Academic & Technical Writing', level: 'Advanced', tools: ['LaTeX', 'Markdown', 'IEEE Format'] },
        { name: 'Security Auditing & Reporting', level: 'Proficient', tools: ['CVSS Scoring', 'Remediation Steps'] },
        { name: 'Usability Testing & User Studies', level: 'Proficient', tools: ['A/B Testing', 'Qualitative Interviews'] },
        { name: 'Data Visualization & Synthesis', level: 'Practicing', tools: ['D3.js', 'Matplotlib', 'Recharts'] }
      ]
    }
  ],
  projects: [
    {
      id: 'sentinel-hud',
      title: 'AegisNet: Real-Time Network Threat Telemetry Dashboard',
      category: 'CYBERSECURITY',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
      ],
      shortDescription: 'Interactive packet inspection and anomaly detection interface visualizing live intrusion attempts and port scan signatures.',
      fullDescription: 'A comprehensive security interface engineered to capture network packets via Python/Scapy backend and stream anomalous telemetry onto a responsive React/Tailwind dashboard. Emphasizes clean UI visualization of dark traffic, SYN flood patterns, and geo-IP lookup of malicious originators.',
      date: 'Jan 2026',
      year: '2026',
      role: 'Lead Developer & Security Researcher',
      technologies: ['Python', 'Scapy', 'FastAPI', 'React', 'Tailwind CSS', 'WebSockets'],
      skills: ['Packet Analysis', 'Intrusion Detection', 'Data Visualization', 'UI Engineering'],
      tags: ['Cybersecurity', 'Network Defense', 'Full-Stack', 'Real-Time'],
      status: 'Active Defense',
      featured: true,
      links: {
        github: 'https://github.com',
        liveDemo: '#',
        research: '#'
      },
      process: 'Constructed an asynchronous packet sniffer using Scapy filter strings, integrated with a lightweight FastAPI WebSocket broadcaster, and designed a dark HUD interface with sub-100ms render latency.',
      outcome: 'Successfully benchmarked against simulated nmap scans and port enumeration, flagging anomalous bursts with 94.8% accuracy in test lab environments.',
      order: 1
    },
    {
      id: 'cipher-vault',
      title: 'CipherCraft: Zero-Knowledge Browser Cryptographic Suite',
      category: 'PROGRAMMING',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80'
      ],
      shortDescription: 'Client-side encrypted notes and payload container utilizing WebCrypto SubtleCrypto (AES-256-GCM and PBKDF2).',
      fullDescription: 'An exploratory zero-knowledge web application that generates ephemeral, password-derived encrypted envelopes directly inside client memory without server-side plaintext exposure.',
      date: 'Nov 2025',
      year: '2025',
      role: 'Sole Architect & UI Designer',
      technologies: ['TypeScript', 'WebCrypto API', 'PBKDF2', 'React', 'Tailwind CSS'],
      skills: ['Applied Cryptography', 'Frontend Security', 'Memory Safety', 'UI Design'],
      tags: ['Cryptography', 'Client Security', 'Zero-Knowledge', 'Web'],
      status: 'Completed',
      featured: true,
      links: {
        github: 'https://github.com',
        liveDemo: '#'
      },
      process: 'Implemented key derivation using 600,000 iterations of PBKDF2 with SHA-256, strictly isolating keys from localStorage to prevent XSS exfiltration.',
      outcome: 'Engineered an accessible cryptographic playground demonstrating the mechanics of authenticated encryption (AEAD) to undergraduate peers.',
      order: 2
    },
    {
      id: 'kroma-design-system',
      title: 'Nexus UI: High-Contrast Cyber-Minimalist Design System',
      category: 'GRAPHIC DESIGN',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=80'
      ],
      shortDescription: 'Comprehensive Figma component library and token architecture engineered for deep dark mode cybersecurity applications.',
      fullDescription: 'A modular design system created from scratch in Figma featuring over 120 accessible components, strict WCAG 2.1 AA color contrast pairings, precision HUD corner matrices, and fluid typography tokens.',
      date: 'Aug 2025',
      year: '2025',
      role: 'Product Designer & Design System Lead',
      technologies: ['Figma', 'Design Tokens', 'SVG', 'Typography Systems', 'Design Specs'],
      skills: ['UI/UX', 'Design Systems', 'Visual Identity', 'Typography'],
      tags: ['Design System', 'UI/UX', 'Dark Theme', 'Figma'],
      status: 'Completed',
      featured: true,
      links: {
        officialWebsite: 'https://figma.com',
        liveDemo: '#'
      },
      process: 'Defined optical mathematical step ratios (1.25) across headings and engineered custom SVG icon sets and HUD status indicators with electric blue luminescence.',
      outcome: 'Adopted across 4 student development projects and reduced UI build friction by over 40%.',
      order: 3
    },
    {
      id: 'auth-security-audit',
      title: 'OAuth2 & OIDC Implementation Flaws in Modern SPAs',
      category: 'RESEARCH',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
      ],
      shortDescription: 'Academic research paper auditing state persistence, PKCE bypass vectors, and token storage vulnerabilities across 15 web frameworks.',
      fullDescription: 'A detailed comparative security review evaluating authentication flows in single-page applications. Analyzed token leakage via browser history, Referrer headers, XSS injection paths, and improper CORS misconfigurations.',
      date: 'Dec 2025',
      year: '2025',
      role: 'Author & Primary Researcher',
      technologies: ['OAuth 2.1', 'PKCE', 'JWT RFC 7519', 'Burp Suite', 'LaTeX'],
      skills: ['Security Auditing', 'Protocol Verification', 'Technical Research', 'LaTeX'],
      tags: ['Research', 'Authentication', 'Web Security', 'Academic'],
      status: 'Published',
      featured: false,
      links: {
        research: '#',
        publication: '#'
      },
      process: 'Conducted automated and manual vulnerability assessments against sample architectures using Burp Suite proxy and custom Python fuzzing scripts.',
      outcome: 'Compiled a 22-page technical guide with reproducible threat proofs and mitigation architectures for student and junior engineers.',
      order: 4
    },
    {
      id: 'vortex-sec-portal',
      title: 'Vortex SecOps: Modern Incident Response Portal',
      category: 'WEB DESIGN',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
      ],
      shortDescription: 'High-density web dashboard for triage officers to coordinate alert ticketing, SIEM log parsing, and mitigation playbooks.',
      fullDescription: 'Crafted an intuitive user interface blending high-density tabular data with visual timeline graphs, enabling fast decision-making during simulated incident response drills.',
      date: 'Oct 2025',
      year: '2025',
      role: 'Full-Stack Developer & UI Designer',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Express'],
      skills: ['Frontend Architecture', 'Dashboard UX', 'Data Density', 'REST APIs'],
      tags: ['Web Design', 'SecOps', 'Dashboard', 'TypeScript'],
      status: 'Completed',
      featured: false,
      links: {
        github: 'https://github.com',
        liveDemo: '#'
      },
      process: 'Iterated through 3 distinct user flow prototypes with university cybersecurity club members to optimize triage time.',
      outcome: 'Streamlined mock incident escalation times by 32% during internal collegiate CTF operations.',
      order: 5
    },
    {
      id: 'malware-behavior-paper',
      title: 'Static & Dynamic Heuristics in Sandboxed Linux Environments',
      category: 'PUBLICATIONS',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
      ],
      shortDescription: 'Technical publication evaluating system call tracing (ptrace, strace) to detect obfuscated ELF binaries in isolated containers.',
      fullDescription: 'Exploration of runtime behavioral analysis for suspicious Linux binaries, comparing static strings/symbols against dynamic memory mapping inspection in Dockerized sandboxes.',
      date: 'Feb 2026',
      year: '2026',
      role: 'Co-Author & Lead Experimenter',
      technologies: ['Linux ELF', 'strace', 'GDB', 'Python', 'Docker Isolation'],
      skills: ['Reverse Engineering Basics', 'Sandboxing', 'Systems Programming', 'Scientific Method'],
      tags: ['Publication', 'Linux Security', 'Malware Analysis', 'Research'],
      status: 'Published',
      featured: false,
      links: {
        publication: '#',
        officialWebsite: '#'
      },
      process: 'Ran automated instrumentation on 50 controlled benign and test-pattern executable samples to catalog entropy signatures.',
      outcome: 'Published as part of the University Technical Research Journal Series.',
      order: 6
    }
  ],
  experiences: [
    {
      id: 'exp-structsure',
      position: 'Research Leader',
      organization: 'StructSURE: Reliability Analysis of a Simply Supported Beam Under Random Load and Resistance Using Monte Carlo Simulation',
      location: 'Las Piñas City, Metro Manila',
      date: 'August 2026',
      current: false,
      description: [
        'Spearheaded the research and development of STRUCTSURE, establishing a probability-based framework for assessing structural reliability and infrastructure risk.',
        'Formulated the research methodology, objectives, and analytical framework, creating a systematic approach for evaluating uncertainty in structural systems.',
        'Investigated probability, structural reliability, and risk mitigation through relevant literature, building an evidence-based foundation for the project.',
        'Implemented Monte Carlo simulation and limit-state analysis using random load and resistance variables, generating quantitative estimates of structural failure probability.',
        'Coordinated research tasks, calculations, data analysis, and documentation among team members, maintaining an organized workflow and timely project completion.',
        'Defended STRUCTSURE before a research panel, effectively communicating its methodology, findings, significance, and technical implications.'
      ],
      skills: ['Monte Carlo Simulation', 'Structural Reliability', 'Limit-State Analysis', 'Risk Assessment', 'Research Leadership'],
      externalLink: '',
      order: 1
    },
    {
      id: 'exp-prob-civil',
      position: 'Research Leader',
      organization: 'The Importance of Probability in Civil Engineer Risk Assessment And Mitigation Practices in Structural Infrastructure Projects',
      location: 'Las Piñas City, Metro Manila',
      date: 'March 2026',
      current: false,
      description: [
        'Orchestrated the research team in investigating the role of probability in civil engineers’ risk assessment and mitigation practices, resulting in a focused study on uncertainty in structural infrastructure projects.',
        'Structured the research methodology and analytical framework, establishing a systematic approach to evaluating structural risk and reliability.',
        'Examined and synthesized literature on probability, structural reliability, and risk mitigation, providing an evidence-based foundation for the study.',
        'Utilized Monte Carlo simulation and limit-state analysis to model random load and resistance conditions, generating quantitative estimates of structural failure probability.',
        'Defended the research before a panel, effectively communicating the methodology, findings, and significance while addressing technical questions and feedback.'
      ],
      skills: ['Probability Modeling', 'Risk Mitigation', 'Infrastructure Reliability', 'Literature Synthesis', 'Technical Defense'],
      externalLink: '',
      order: 2
    },
    {
      id: 'exp-luntian-sec',
      position: 'Secretary',
      organization: 'Ang Luntian',
      location: 'Las Piñas City, Metro Manila',
      date: 'June 2026 – Present',
      current: true,
      description: [
        'Documented meeting minutes and key discussions, maintaining accurate records of club decisions, plans, and action items.',
        'Recorded participant attendance and involvement, ensuring organized documentation of member participation in club activities.',
        'Drafted official letters, requests, and correspondence, supporting smooth communication between the club, school, and stakeholders.',
        'Prepared narrative reports for club activities and events, providing clear documentation of completed programs, outcomes, and member involvement.',
        'Organized and maintained club records and administrative documents, improving accessibility and continuity of organizational information.'
      ],
      skills: ['Administrative Management', 'Official Correspondence', 'Documentation', 'Reporting'],
      externalLink: '',
      order: 3
    },
    {
      id: 'exp-luntian-radio',
      position: 'Radiobroadcasting Head',
      organization: 'Ang Luntian',
      location: 'Las Piñas City, Metro Manila',
      date: 'June 2026 – Present',
      current: true,
      description: [
        'Led the radio broadcasting team in planning and producing news segments, ensuring organized and timely delivery of broadcast content.',
        'Coordinated team members during scriptwriting, reporting, editing, and broadcasting, maintaining a smooth and efficient production workflow.',
        'Developed and reviewed broadcast scripts, ensuring accurate, engaging, and well-structured news delivery.',
        'Directed rehearsals and broadcasting preparations, improving the team’s coordination, delivery, and on-air performance.',
        'Managed the delegation of roles and responsibilities, maximizing each member’s strengths throughout the broadcasting process.'
      ],
      skills: ['Broadcasting Direction', 'Scriptwriting & Editing', 'Team Coordination', 'Public Speaking'],
      externalLink: '',
      order: 4
    },
    {
      id: 'exp-math-damath',
      position: 'Cluster Lead DaMATH',
      organization: 'Math Club - Talon Dos Campus',
      location: 'Las Piñas City, Metro Manila',
      date: 'June 2026 – Present',
      current: true,
      description: [
        'Coordinated team members and assigned responsibilities during preparation and competition, ensuring an organized and collaborative workflow.',
        'Guided participants through DaMath strategies and techniques, improving their confidence and competitive readiness.',
        'Communicated with organizers, coaches, and team members regarding schedules, requirements, and competition procedures, ensuring smooth participation.'
      ],
      skills: ['DaMATH Strategy', 'Competition Coaching', 'Team Leadership'],
      externalLink: '',
      order: 5
    },
    {
      id: 'exp-math-treasurer',
      position: 'Treasurer',
      organization: 'Math Club - Talon Dos Campus',
      location: 'Las Piñas City, Metro Manila',
      date: 'June 2025 – March 2026',
      current: false,
      description: [
        'Managed the Math Club’s financial records and transactions, ensuring accurate and organized documentation of funds.',
        'Monitored income, expenses, and budget allocations, supporting responsible financial management throughout club activities.',
        'Prepared financial reports and liquidation documents, providing transparency and accountability for club funds.',
        'Coordinated with club officers regarding budget requirements, ensuring that activities were properly funded and financially organized.',
        'Maintained receipts and supporting documents, ensuring complete records of club expenditures and transactions.',
        'Assisted in planning and budgeting for Math Club activities, helping maximize available resources while meeting program needs.'
      ],
      skills: ['Financial Management', 'Budgeting & Liquidation', 'Auditing', 'Resource Allocation'],
      externalLink: '',
      order: 6
    },
    {
      id: 'exp-math-events',
      position: 'Event Organizer & Emcee',
      organization: 'Math Club - Talon Dos Campus',
      location: 'Las Piñas City, Metro Manila',
      date: 'January 2026',
      current: false,
      description: [
        'Developed and prepared questions for the Battle of the Brains, ensuring challenging, relevant, and well-structured competition content.',
        'Hosted the Math Quiz Bee as emcee, facilitating the program and maintaining an engaging and organized competition flow.',
        'Facilitated the Mathlympics program as emcee, coordinating segments, announcements, and participant transitions throughout the event.',
        'Moderated the Math Club closing program, guiding the event flow and delivering announcements to ensure a smooth and engaging conclusion.',
        'Coordinated with organizers and participants during events, ensuring that program schedules, competition procedures, and activities were executed efficiently.'
      ],
      skills: ['Academic Event Management', 'Quiz Item Development', 'Public Speaking & Emceeing'],
      externalLink: '',
      order: 7
    }
  ],
  research: [
    {
      id: 'res-structsure',
      title: 'StructSURE: Reliability Analysis of a Simply Supported Beam Under Random Load and Resistance Using Monte Carlo Simulation',
      category: 'Structural Reliability & Probabilistic Modeling',
      date: 'August 2026',
      role: 'Research Leader',
      description: 'A probability-based engineering framework for evaluating structural reliability, limit-state uncertainty, and infrastructure risk in simply supported beams under stochastic load variables.',
      methodology: 'Formulated Monte Carlo simulation pipelines and limit-state functions incorporating random load distribution and resistance variables to quantify failure probability distributions.',
      findings: 'Successfully demonstrated quantitative limit-state reliability indices and defended research before an academic evaluation panel with high distinction.',
      officialSource: 'Las Piñas City National Senior High School – Talon Dos Campus',
      documentUrl: '',
      type: 'Research'
    },
    {
      id: 'res-prob-civil',
      title: 'The Importance of Probability in Civil Engineer Risk Assessment And Mitigation Practices in Structural Infrastructure Projects',
      category: 'Civil Engineering Risk Assessment',
      date: 'March 2026',
      role: 'Research Leader',
      description: 'An empirical investigation examining how civil engineers incorporate stochastic probability distributions, statistical risk assessment, and mitigation protocols across major structural infrastructure initiatives.',
      methodology: 'Investigated and synthesized empirical literature, applied limit-state uncertainty models, and evaluated probabilistic risk reduction practices across industry case studies.',
      findings: 'Structured a systematic risk methodology highlighting critical reduction in failure incidence through early-stage probabilistic modeling.',
      officialSource: 'Las Piñas City National Senior High School – Talon Dos Campus',
      documentUrl: '',
      type: 'Research'
    }
  ],
  certifications: [
    {
      id: 'cert-python-essentials',
      courseTitle: 'Python Essentials',
      certificateTitle: 'Python Essentials Certification',
      provider: 'Cisco Networking Academy / Python Institute',
      completionDate: '2026',
      credentialId: 'PY-ESS-2026',
      category: 'PROGRAMMING',
      skills: ['Python Basics', 'Algorithms & Logic', 'Data Structures', 'Automation'],
      certificateImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'cert-cyber-fundamentals',
      courseTitle: 'Cybersecurity Fundamentals',
      certificateTitle: 'Cybersecurity Fundamentals Certification',
      provider: 'Industry / Academic Training',
      completionDate: '2026',
      credentialId: 'CYBER-FUND-2026',
      category: 'CYBERSECURITY',
      skills: ['Threat Concepts', 'Network Security', 'Security Protocols', 'Risk Assessment'],
      certificateImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'cert-css-install',
      courseTitle: 'Computer Systems Services: Installing and Configuring Systems',
      certificateTitle: 'Installing and Configuring Computer Systems (CSS)',
      provider: 'Technical Vocational / DepEd Training',
      completionDate: '2026',
      credentialId: 'CSS-CONFIG-2026',
      category: 'COMPUTER SYSTEMS',
      skills: ['OS Installation', 'Hardware Diagnostics', 'System Configuration', 'Troubleshooting'],
      certificateImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'cert-css-maintain',
      courseTitle: 'Maintaining Computer Systems and Network',
      certificateTitle: 'Computer Systems & Network Maintenance',
      provider: 'Technical Vocational / DepEd Training',
      completionDate: '2026',
      credentialId: 'CSS-MAINT-2026',
      category: 'COMPUTER SYSTEMS',
      skills: ['Network Maintenance', 'System Optimization', 'Hardware Servicing', 'Backup Protocols'],
      certificateImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'cert-css-network',
      courseTitle: 'Setting Up Computer Networks & Computer Servers',
      certificateTitle: 'Computer Networks & Server Setup',
      provider: 'Technical Vocational / DepEd Training',
      completionDate: '2026',
      credentialId: 'CSS-NET-SERV-2026',
      category: 'NETWORKING',
      skills: ['Network Setup', 'Server Deployment', 'IP Addressing', 'Cabling & Routing'],
      certificateImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'cert-english-it',
      courseTitle: 'English for IT 1',
      certificateTitle: 'English for Information Technology 1',
      provider: 'Cisco Networking Academy',
      completionDate: '2026',
      credentialId: 'ENG-IT-2026',
      category: 'COMMUNICATION',
      skills: ['Technical Documentation', 'IT Communication', 'Professional Reporting'],
      certificateImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80',
      featured: false
    }
  ],
  resume: {
    lastUpdated: 'August 2026',
    pdfUrl: '',
    summary: 'Senior High School STEM student with specialized academic focus in probability-based structural reliability modeling, Monte Carlo simulation, and computer systems. Proven research leadership and student organization leadership with certifications in Python, Cybersecurity Fundamentals, and Computer Systems & Network Servicing.',
    education: [
      {
        institution: 'Las Piñas City National Senior High School – Talon Dos Campus',
        degree: 'Senior High School Student - Science, Technology, Engineering and Mathematics (STEM)',
        period: 'Expected May 2027',
        details: 'Specializing in advanced mathematics, probabilistic engineering analysis, physics, and computer science fundamentals.',
        gpaOrFocus: 'Research Leader in Structural Reliability & Monte Carlo Simulation'
      },
      {
        institution: 'Equitable Village National High School',
        degree: 'Junior High School Graduate',
        period: 'Completed April 2025',
        details: 'Consistent academic achiever with strong performance across science, mathematics, and technology curricula.',
        gpaOrFocus: 'Top 10 Student | General Weighted Average (GWA): 94.50%'
      }
    ],
    coreCompetencies: [
      'Monte Carlo Simulation & Structural Reliability',
      'Research Methodology, Planning & Defense',
      'Python Programming & Algorithm Design',
      'Computer Systems Servicing (Installation & Maintenance)',
      'Computer Network & Server Setup',
      'Cybersecurity Fundamentals',
      'Web Design & Web Development',
      'Microsoft Office (Word, Excel, PowerPoint) & Google Workspace',
      'Canva & Graphic Presentation',
      'Public Speaking, Event Emceeing & Radio Broadcasting',
      'Financial Management & Organizational Leadership',
      'Bilingual Communication (English Proficient, Filipino Native)'
    ]
  },
  messages: []
};
