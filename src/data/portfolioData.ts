import { assetUrl } from '../utils/assetUrl';

export interface PersonalInfo {
  name: string;
  brand: string;
  profession: string;
  university: string;
  faculty: string;
  major: string;
  semester: string;
  origin: string;
  email: string;
  github: string;
  instagram: string;
  linkedin: string;
  linkedinHandle: string;
  tagline: string;
  description: string;
  status: string;
  cvFileName: string;
  cvPath: string;
  profileImagePath: string;
  profileCutoutPath: string;
}

export const personalInfo: PersonalInfo = {
  name: "Muhammad Ilham Rizki",
  brand: "MIR.",
  profession: "Informatics Student & Aspiring Web Developer",
  university: "Universitas PGRI Semarang",
  faculty: "Fakultas Teknik dan Informatika",
  major: "Informatika",
  semester: "5",
  origin: "Pemalang, Jawa Tengah",
  email: "ir6595187@gmail.com",
  github: "https://github.com/IlhamRizki09",
  instagram: "https://instagram.com/ilhammrzz",
  linkedin: "https://www.linkedin.com/in/muhammad-ilham-rizki-3285123b3",
  linkedinHandle: "muhammad-ilham-rizki-3285123b3",
  tagline: "Building Ideas Into Digital Experiences.",
  description: "Mahasiswa Informatika di Universitas PGRI Semarang dengan fokus pada Web Development, UI/UX Design, dan rekayasa perangkat lunak modern. Memiliki komitmen kuat dalam menciptakan solusi digital fungsional, performan tinggi, dan berorientasi pengguna.",
  status: "Open to Internship Opportunities",
  cvFileName: "CV_Muhammad_Ilham_Rizki.pdf",
  cvPath: assetUrl("/assets/cv/CV_Muhammad_Ilham_Rizki.pdf"),
  profileImagePath: assetUrl("/assets/images/profile.jpg"),
  profileCutoutPath: assetUrl("/profile-cutout.png"),
};

export interface SkillItem {
  name: string;
  category: string;
  badge?: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "core-cv",
    title: "Keahlian Utama (CV)",
    skills: [
      { name: "Teamwork", category: "core-cv", icon: "users" },
      { name: "Quality Control", category: "core-cv", icon: "check-circle" },
      { name: "Leadership", category: "core-cv", icon: "award" },
      { name: "Kreativitas", category: "core-cv", icon: "sparkles" },
      { name: "Menulis Kreatif", category: "core-cv", icon: "edit-3" },
      { name: "Pemrograman", category: "core-cv", icon: "code" },
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", category: "languages", icon: "javascript" },
      { name: "PHP", category: "languages", icon: "php" },
      { name: "Python", category: "languages", icon: "python" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    skills: [
      { name: "HTML5", category: "frontend", icon: "html" },
      { name: "CSS3", category: "frontend", icon: "css" },
      { name: "React.js", category: "frontend", icon: "react" },
      { name: "Tailwind CSS", category: "frontend", icon: "tailwind" },
    ],
  },
  {
    id: "backend-db",
    title: "Backend & Database",
    skills: [
      { name: "PHP", category: "backend-db", icon: "php" },
      { name: "Python", category: "backend-db", icon: "python" },
      { name: "MySQL / SQL", category: "backend-db", icon: "database" },
      { name: "Node.js (Basics)", category: "backend-db", icon: "nodejs" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    skills: [
      { name: "Git & GitHub", category: "tools", icon: "git" },
      { name: "VS Code", category: "tools", icon: "vscode" },
      { name: "Figma (UI/UX)", category: "tools", icon: "figma" },
      { name: "Vite", category: "tools", icon: "vite" },
      { name: "Computer Networking (TKJ)", category: "tools", icon: "network" },
      { name: "Hardware & Troubleshooting", category: "tools", icon: "cpu" },
    ],
  },
];

export interface ExperienceItem {
  title: string;
  organization: string;
  period?: string;
  type: string;
  roleType: 'work' | 'organization' | 'committee';
  description: string;
  responsibilities: string[];
}

export const experiences: ExperienceItem[] = [
  {
    title: "Praktik Kerja Lapangan",
    organization: "Atha Computer Pemalang",
    type: "Vokasi & Komputer",
    roleType: "work",
    description: "Melaksanakan praktik kerja lapangan di bidang perbaikan komputer, instalasi perangkat keras/lunak, dan layanan teknis teknologi informasi.",
    responsibilities: [
      "Perbaikan dan pemeliharaan perangkat komputer.",
      "Instalasi sistem operasi dan perangkat lunak pendukung.",
      "Layanan teknis dan dukungan operasional kepada pengguna.",
    ],
  },
  {
    title: "Production Staff",
    organization: "PT JustFluff Nusantara Indonesia",
    type: "Operasional Produksi",
    roleType: "work",
    description: "Bertanggung jawab atas kelancaran alur produksi harian serta kepatuhan prosedur operasional standar perusahaan.",
    responsibilities: [
      "Menjalankan proses produksi harian sesuai standar operasional prosedur.",
      "Menjaga konsistensi alur kerja dan efisiensi produksi.",
    ],
  },
  {
    title: "Supervisor Produksi",
    organization: "PT JustFluff Nusantara Indonesia",
    type: "Manajemen & Supervisi",
    roleType: "work",
    description: "Mengawasi, mengoordinasi jalannya proses produksi, serta memimpin tim kerja untuk mencapai target output yang ditetapkan.",
    responsibilities: [
      "Mengatur pembagian tugas dan alur kerja tim produksi.",
      "Memastikan kepatuhan keselamatan kerja dan pencapaian target harian.",
    ],
  },
  {
    title: "Quality Control Analyst",
    organization: "PT JustFluff Nusantara Indonesia",
    type: "Pengawasan Mutu",
    roleType: "work",
    description: "Menganalisis dan menginspeksi kualitas produk akhir guna memastikan mutu sesuai spesifikasi dan standar mutu perusahaan.",
    responsibilities: [
      "Inspeksi mutu produk akhir sebelum proses distribusi.",
      "Pencatatan dan analisis kesesuaian standar kualitas.",
    ],
  },
  {
    title: "Staff Operasional & Layanan",
    organization: "HR Coffe Roast",
    type: "Layanan & Operasional",
    roleType: "work",
    description: "Menjalankan kegiatan operasional, pelayanan pelanggan, serta manajemen inventaris produk di HR Coffe Roast.",
    responsibilities: [
      "Pengelolaan inventaris bahan dan operasional gerai.",
      "Pelayanan pelanggan dengan standar keramahan dan ketepatan.",
    ],
  },
  {
    title: "Ketua Panitia",
    organization: "Dekan Cup 2026 — BEM Fakultas Teknik dan Informatika",
    period: "2026",
    type: "Kepanitiaan Fakultas",
    roleType: "committee",
    description: "Memimpin perencanaan, koordinasi tim lintas divisi, dan pelaksanaan ajang kompetisi olahraga serta seni tingkat fakultas di Universitas PGRI Semarang.",
    responsibilities: [
      "Mengkoordinasi seluruh divisi kepanitiaan dalam perencanaan teknis dan logistik.",
      "Menjalin komunikasi formal dengan pimpinan dekanat dan perwakilan mahasiswa.",
      "Memastikan pelaksanaan kegiatan berjalan sesuai standar operasional dan waktu yang ditetapkan.",
    ],
  },
  {
    title: "Pengurus — Departemen Bakat dan Minat",
    organization: "BEM Fakultas Teknik dan Informatika (FTI UPGRIS)",
    type: "Organisasi Mahasiswa",
    roleType: "organization",
    description: "Aktif menginisiasi, menyusun, dan mengeksekusi program kerja pengembangan potensi minat dan bakat mahasiswa di lingkungan Fakultas Teknik dan Informatika.",
    responsibilities: [
      "Merancang agenda kegiatan pengembangan kreativitas dan bakat mahasiswa.",
      "Bekerja sama dalam tim organisasi untuk menyukseskan program kerja BEM FTI.",
    ],
  },
];

export interface EducationItem {
  institution: string;
  major: string;
  period: string;
  status: string;
  location: string;
  description: string;
  highlights: string[];
}

export const educations: EducationItem[] = [
  {
    institution: "Universitas PGRI Semarang",
    major: "Program Studi Informatika",
    period: "2024 – Sekarang",
    status: "Mahasiswa Aktif (Semester 5)",
    location: "Semarang, Jawa Tengah",
    description: "Mendalami rekayasa perangkat lunak, algoritma pemrograman, perancangan antarmuka web, arsitektur basis data, serta kecerdasan buatan dan interaksi manusia-komputer.",
    highlights: [
      "Fokus pada Web Development & UI/UX Design",
      "Aktif dalam kepengurusan BEM Fakultas Teknik dan Informatika",
      "Ketua Panitia Dekan Cup 2026",
    ],
  },
  {
    institution: "SMK Negeri 1 Randudongkal",
    major: "Teknik Komputer dan Jaringan (TKJ)",
    period: "2021 – 2024",
    status: "Lulus",
    location: "Pemalang, Jawa Tengah",
    description: "Mempelajari arsitektur jaringan komputer, administrasi server, instalasi perangkat keras, serta troubleshooting sistem.",
    highlights: [
      "Kompetensi Jaringan Komputer & Perangkat Keras",
      "Praktik Kerja Lapangan (PKL) di Atha Computer Pemalang",
    ],
  },
];

export interface CertificateItem {
  id: string;
  title: string;
  titleId: string;
  issuer: string;
  issuedBy: string;
  date: string;
  dateEn: string;
  credentialId?: string;
  pdfPath?: string;
  previewImage: string;
  category: string;
  summaryId: string;
  summaryEn: string;
  location?: string;
  topicsId?: string[];
  topicsEn?: string[];
  signers?: string[];
  verifyNoteId?: string;
  verifyNoteEn?: string;
}

export const certificates: CertificateItem[] = [
  {
    id: "gemini-academy-higher-education",
    title: "Certificate of Completion — Gemini Academy for Higher Education",
    titleId: "Sertifikat Penyelesaian — Gemini Academy for Higher Education",
    issuer: "Gemini Academy for Higher Education Training and Certification",
    issuedBy: "Google for Education × Paideia Educational Solutions",
    date: "9 November 2026",
    dateEn: "November 9, 2026",
    credentialId: "GGLM26111208",
    pdfPath: assetUrl("/assets/certificates/Certificate_Gemini_Academy_Completion.pdf"),
    previewImage: assetUrl("/assets/certificates/Certificate_Gemini_Academy_Completion.jpg"),
    category: "Artificial Intelligence",
    summaryId:
      "Menyelesaikan pelatihan dan sertifikasi Gemini Academy for Higher Education sebanyak 12 materi pembelajaran dengan total 24 JP, dilaksanakan secara synchronous di Jakarta.",
    summaryEn:
      "Successfully completed the Gemini Academy for Higher Education Training and Certification covering 12 learning materials with a total of 24 credit hours, delivered synchronously in Jakarta.",
    topicsId: [
      "Meringkas Konten dengan AI",
      "Membuat Learning Coach",
      "Pembelajaran Terpandu",
      "Riset Mendalam dengan Deep Research",
      "Menulis dan Mengedit Efektif",
      "Memanfaatkan Study Tools",
      "Pembuatan Video dengan Veo 3",
      "Audio Overview untuk Memperdalam Perkuliahan",
      "Riset dan Analisa Tugas dengan NotebookLM",
      "Gemini Live sebagai Asisten Pribadi",
      "Vibe Coding untuk Memperdalam Pembelajaran",
      "Berkreasi dengan Image Generator Nano Banana",
    ],
    topicsEn: [
      "Summarizing Content with AI",
      "Building a Learning Coach",
      "Guided Learning",
      "In-Depth Research with Deep Research",
      "Effective Writing and Editing",
      "Using Study Tools",
      "Video Creation with Veo 3",
      "Audio Overview for Deeper Coursework",
      "Research and Assignment Analysis with NotebookLM",
      "Gemini Live as a Personal Assistant",
      "Vibe Coding to Deepen Learning",
      "Creating with Nano Banana Image Generator",
    ],
    signers: [
      "Olivia Husli Basrin — Lead Country Google for Education Indonesia, Malaysia, Brunei Darussalam",
      "Yoshua B.A Sirait, B.Sc., M.Pd. — Founding CEO Paideia Educational Solutions",
    ],
    verifyNoteId: "Verifikasi melalui QR code resmi pada dokumen sertifikat.",
    verifyNoteEn: "Verify through the official QR code printed on the certificate document.",
  },
  {
    id: "gemini-kuliah-umum-upgris",
    title:
      "Sertifikat Kepesertaan — Kuliah Umum \"Think Smart, Code Smarter: Exploring the Power of Gemini AI\"",
    titleId:
      "Sertifikat Kepesertaan — Kuliah Umum \"Think Smart, Code Smarter: Exploring the Power of Gemini AI\"",
    issuer: "Program Studi Informatika, Universitas PGRI Semarang",
    issuedBy: "Program Studi Informatika UPGRIS × Gemini — Dikti SainsTek Berdampak",
    date: "9 November 2026",
    dateEn: "November 9, 2026",
    credentialId: "247/KU-IF/UPGRIS/XI/2026",
    pdfPath: assetUrl("/assets/certificates/Sertifikat_Kepesertaan_Gemini_UPGRIS.pdf"),
    previewImage: assetUrl("/assets/certificates/Sertifikat_Kepesertaan_Gemini_UPGRIS.jpg"),
    category: "Artificial Intelligence",
    summaryId:
      "Terdaftar sebagai peserta Kuliah Umum Program Studi Informatika UPGRIS dengan tema \"Think Smart, Code Smarter: Exploring the Power of Gemini AI\" pada 9 November 2026.",
    summaryEn:
      "Registered as a participant of the UPGRIS Informatics Study Program public lecture themed \"Think Smart, Code Smarter: Exploring the Power of Gemini AI\" on November 9, 2026.",
    signers: [
      "Dr. Ir. Ibnu Totoh Husodo, MT., IPU., ASEAN Eng. — Dekan Fakultas Teknik dan Informatika, Universitas PGRI Semarang",
      "Bambang Agus Herlambang, M.Kom — Ketua Program Studi Informatika, Universitas PGRI Semarang",
    ],
    verifyNoteId: "Dokumen ditandatangani secara elektronik menggunakan sertifikat elektronik Prodi Informatika UPGRIS.",
    verifyNoteEn: "The document is electronically signed using the UPGRIS Informatics Study Program electronic certificate.",
  },
  {
    id: "pelatihan-media-kreatif-2-bemfti",
    title: "Sertifikat Peserta — Pelatihan Media Kreatif 2",
    titleId: "Sertifikat Peserta — Pelatihan Media Kreatif 2",
    issuer: "Badan Eksekutif Mahasiswa Fakultas Teknik dan Informatika (BEM FTI) UPGRIS",
    issuedBy: "BEM FTI UPGRIS — Kabinet Intra",
    date: "20 Juni 2026",
    dateEn: "June 20, 2026",
    credentialId: "021/C/PAN_PMK/BEMFTI/VI/2026",
    previewImage: assetUrl("/assets/certificates/Sertifikat_Pelatihan_Media_Kreatif_2_BEMFTI.jpg"),
    category: "Creative Media",
    location: "Gedung D.4.12, Universitas PGRI Semarang",
    summaryId:
      "Diberikan atas dedikasi sebagai peserta Pelatihan Media Kreatif 2 yang diselenggarakan BEM FTI Universitas PGRI Semarang dengan tema \"Pelatihan Desain Pamflet Menggunakan Figma\".",
    summaryEn:
      "Awarded for dedication as a participant of Creative Media Training 2 organized by BEM FTI Universitas PGRI Semarang, themed \"Pamphlet Design Training Using Figma\".",
    signers: [
      "Dr. Ir. Ibnu Totoh Husodo, S.T., M.T., IPU., Asean., Eng — Dekan Fakultas Teknik dan Informatika (NIDN 136901387)",
      "Ketua Badan Eksekutif Mahasiswa Fakultas Teknik dan Informatika (NPM. 23660034)",
    ],
    verifyNoteId: "Sertifikat resmi BEM FTI UPGRIS dengan nomor 021/C/PAN_PMK/BEMFTI/VI/2026.",
    verifyNoteEn: "Official BEM FTI UPGRIS certificate numbered 021/C/PAN_PMK/BEMFTI/VI/2026.",
  },
  {
    id: "pelatihan-media-kreatif-bemfti",
    title: "Sertifikat Peserta — Pelatihan Media Kreatif",
    titleId: "Sertifikat Peserta — Pelatihan Media Kreatif",
    issuer: "Badan Eksekutif Mahasiswa Fakultas Teknik dan Informatika (BEM FTI) UPGRIS",
    issuedBy: "BEM FTI UPGRIS — Kabinet Intra",
    date: "31 Maret 2026",
    dateEn: "March 31, 2026",
    credentialId: "024/A/PAN_PMK/BEMFTI/IV/2026",
    previewImage: assetUrl("/assets/certificates/Sertifikat_Pelatihan_Media_Kreatif_BEMFTI.jpg"),
    category: "Creative Media",
    location: "Taman Srigunting, Kota Lama Semarang",
    summaryId:
      "Diberikan atas dedikasi sebagai peserta Pelatihan Media Kreatif yang diselenggarakan BEM FTI UPGRIS dengan tema \"Eksplorasi di Ruang Terbuka Menuju Karya Visual yang Bermakna.\"",
    summaryEn:
      "Awarded for dedication as a participant of the Creative Media Training organized by BEM FTI UPGRIS, themed \"Exploration in Open Spaces Towards Meaningful Visual Works.\"",
    signers: [
      "Dr. Ir. Ibnu Totoh Husodo, M.T., IPU., Asean., Eng — Dekan Fakultas Teknik dan Informatika (NIDN 136901387)",
      "Ketua Badan Eksekutif Mahasiswa Fakultas Teknik dan Informatika (NPM. 23660034)",
    ],
    verifyNoteId: "Sertifikat resmi BEM FTI UPGRIS dengan nomor 024/A/PAN_PMK/BEMFTI/IV/2026.",
    verifyNoteEn: "Official BEM FTI UPGRIS certificate numbered 024/A/PAN_PMK/BEMFTI/IV/2026.",
  },
];

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export const projects: ProjectItem[] = [];

export const navItems = [
  { id: "home", labelId: "Home", labelEn: "Home", href: "#home" },
  { id: "about", labelId: "About", labelEn: "About", href: "#about" },
  { id: "skills", labelId: "Skills", labelEn: "Skills", href: "#skills" },
  { id: "education", labelId: "Education", labelEn: "Education", href: "#education" },
  { id: "experience", labelId: "Experience", labelEn: "Experience", href: "#experience" },
  { id: "certificates", labelId: "Certificates", labelEn: "Certificates", href: "#certificates" },
  { id: "projects", labelId: "Projects", labelEn: "Projects", href: "#projects" },
  { id: "contact", labelId: "Contact", labelEn: "Contact", href: "#contact" },
];

export const heroTypingTexts = {
  id: [
    "Mahasiswa Informatika",
    "Aspiring Web Developer",
    "UI/UX Enthusiast",
    "Creative Digital Explorer",
  ],
  en: [
    "Informatics Student",
    "Aspiring Web Developer",
    "UI/UX Enthusiast",
    "Creative Digital Explorer",
  ],
};
