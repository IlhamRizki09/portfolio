export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    education: string;
    certificates: string;
    projects: string;
    contact: string;
    recruiterMode: string;
    viewCv: string;
    businessCard: string;
  };
  hero: {
    greeting: string;
    role: string;
    status: string;
    description: string;
    exploreBtn: string;
    downloadCvBtn: string;
    contactBtn: string;
    businessCardBtn: string;
  };
  about: {
    label: string;
    title: string;
    subtitle: string;
    bio1: string;
    bio2: string;
    bio3: string;
    bio4: string;
    fullName: string;
    educationLabel: string;
    majorLabel: string;
    originLabel: string;
    focusLabel: string;
    statusLabel: string;
    copyInfoBtn: string;
    infoCopied: string;
    viewCardBtn: string;
    viewProjectsBtn: string;
  };
  skills: {
    label: string;
    title: string;
    subtitle: string;
    allFilter: string;
    emptyNote: string;
  };
  experience: {
    label: string;
    title: string;
    subtitle: string;
    committeeTag: string;
    orgTag: string;
    workTag: string;
    present: string;
  };
  education: {
    label: string;
    title: string;
    subtitle: string;
    currentStudent: string;
    graduated: string;
  };
  certificates: {
    label: string;
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    viewCredential: string;
    viewCertificate: string;
    downloadPdf: string;
    downloadImage: string;
    openNewTab: string;
    issuer: string;
    issuedBy: string;
    issuedDate: string;
    location: string;
    category: string;
    credentialId: string;
    detailsTitle: string;
    materialsTitle: string;
    signersTitle: string;
    verification: string;
    pdfFallback: string;
    imageNote: string;
    imageOnlyNote: string;
    close: string;
  };
  projects: {
    label: string;
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    viewLive: string;
    sourceCode: string;
  };
  recruiter: {
    title: string;
    subtitle: string;
    modeActive: string;
    exitMode: string;
    summaryHeading: string;
    candidateProfile: string;
    targetRole: string;
    targetRoleDesc: string;
    statusBadge: string;
    coreCompetencies: string;
    keyStrengths: string;
    whyHireTitle: string;
    whyHireDesc: string;
    ctaDownloadCv: string;
    ctaContact: string;
  };
  cvViewer: {
    title: string;
    previewNote: string;
    download: string;
    openNewTab: string;
    close: string;
    fallbackMsg: string;
  };
  businessCard: {
    title: string;
    subtitle: string;
    scanQr: string;
    scanQrHint: string;
    copyContact: string;
    contactCopied: string;
    shareCard: string;
    downloadQr: string;
    close: string;
  };
  contact: {
    label: string;
    title: string;
    heading: string;
    subtitle: string;
    infoTitle: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    successNotice: string;
    errorNotice: string;
    copyEmail: string;
    emailCopied: string;
    validationName: string;
    validationEmail: string;
    validationEmailFormat: string;
    validationSubject: string;
    validationMessage: string;
    openGmail: string;
  };
  cmdPalette: {
    placeholder: string;
    quickActions: string;
    navigation: string;
    themeToggle: string;
    langToggle: string;
    openCv: string;
    openCard: string;
    recruiterToggle: string;
    noResults: string;
    hint: string;
  };
  notFound: {
    code: string;
    title: string;
    desc: string;
    backHome: string;
  };
  footer: {
    tagline: string;
    rightsReserved: string;
    backToTop: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      certificates: "Certificates",
      projects: "Projects",
      contact: "Contact",
      recruiterMode: "Recruiter Mode",
      viewCv: "Lihat CV",
      businessCard: "Kartu Nama Digital",
    },
    hero: {
      greeting: "HALO, SAYA",
      role: "Informatics Student & Aspiring Web Developer",
      status: "Terbuka untuk Peluang Magang (Internship)",
      description:
        "Saya Muhammad Ilham Rizki, mahasiswa Informatika Semester 5 di Universitas PGRI Semarang. Saya membangun antarmuka web yang bersih, cepat, dan mudah digunakan — terus belajar, terus bereksperimen.",
      exploreBtn: "Explore Portfolio",
      downloadCvBtn: "Download CV",
      contactBtn: "Hubungi Saya",
      businessCardBtn: "Digital Card",
    },
    about: {
      label: "Identitas Digital & Profil",
      title: "About Me",
      subtitle: "Mengenal latar belakang akademis, minat teknologi, dan visi profesional saya",
      bio1: "Halo! Saya Muhammad Ilham Rizki, mahasiswa aktif Program Studi Informatika Semester 5 di Universitas PGRI Semarang.",
      bio2: "Saya memiliki ketertarikan mendalam pada ekosistem web modern, desain interaksi UI/UX, dan perancangan aplikasi digital yang bersih, cepat, serta mudah digunakan.",
      bio3: "Dengan latar belakang vokasi di bidang Teknik Komputer dan Jaringan (TKJ), saya memiliki pemahaman teknis perangkat keras dan jaringan yang melengkapi keahlian rekayasa perangkat lunak saya.",
      bio4: "Selain fokus akademik, saya aktif berkontribusi di organisasi BEM Fakultas Teknik dan Informatika serta mengemban amanah sebagai Ketua Departemen Bakat dan Minat.",
      fullName: "Muhammad Ilham Rizki",
      educationLabel: "Universitas PGRI Semarang",
      majorLabel: "Informatika (Semester 5)",
      originLabel: "Pemalang, Jawa Tengah",
      focusLabel: "Web Development & UI/UX",
      statusLabel: "Siap Magang & Kolaborasi",
      copyInfoBtn: "Salin Info Profil",
      infoCopied: "Informasi profil berhasil disalin!",
      viewCardBtn: "Lihat Kartu Nama",
      viewProjectsBtn: "Lihat Proyek",
    },
    skills: {
      label: "Keahlian Teknis",
      title: "Skills & Technologies",
      subtitle: "Kompetensi nyata yang dipelajari dan dipraktikkan dalam rekayasa perangkat lunak",
      allFilter: "Semua Kategori",
      emptyNote: "Data keahlian dalam kategori ini sedang diperbarui.",
    },
    experience: {
      label: "Rekam Jejak & Kontribusi",
      title: "Experience",
      subtitle: "Pengalaman kepemimpinan organisasi mahasiswa, kepanitiaan, dan riwayat kerja nyata",
      committeeTag: "Kepanitiaan",
      orgTag: "Organisasi",
      workTag: "Pengalaman Kerja",
      present: "Sekarang",
    },
    education: {
      label: "Riwayat Akademik",
      title: "Education",
      subtitle: "Perjalanan pendidikan formal dan landasan keilmuan teknologi informasi",
      currentStudent: "Mahasiswa Aktif",
      graduated: "Lulus",
    },
    certificates: {
      label: "Kredensial & Penghargaan",
      title: "Certificates",
      subtitle: "Arsip sertifikasi kompetensi, lisensi keahlian, dan pelatihan profesional",
      emptyTitle: "Sertifikat Sedang Dalam Kurasi",
      emptyDesc: "Certificates and achievements will be updated soon.",
      viewCredential: "Lihat Kredensial",
      viewCertificate: "Lihat Sertifikat",
      downloadPdf: "Unduh PDF",
      downloadImage: "Unduh Gambar",
      openNewTab: "Buka di Tab Baru",
      issuer: "Penerbit",
      issuedBy: "Diterbitkan oleh",
      issuedDate: "Tanggal",
      location: "Lokasi",
      category: "Kategori",
      credentialId: "ID Kredensial",
      detailsTitle: "Detail Sertifikat",
      materialsTitle: "Materi Pelatihan",
      signersTitle: "Penandatangan",
      verification: "Verifikasi",
      pdfFallback: "Pratinjau PDF tidak tersedia di perangkat ini. Silakan buka atau unduh dokumen asli.",
      imageNote: "Pratinjau dokumen asli. Buka PDF untuk tampilan interaktif.",
      imageOnlyNote: "Salinan digital sertifikat asli.",
      close: "Tutup",
    },
    projects: {
      label: "Showcase Proyek",
      title: "Projects",
      subtitle: "Koleksi proyek nyata dan eksperimen digital terkurasi",
      emptyTitle: "Projects are currently being curated.",
      emptyDesc: "Selected works and digital experiments will be showcased here.",
      viewLive: "Live Demo",
      sourceCode: "Kode Sumber",
    },
    recruiter: {
      title: "Recruiter Fast Mode",
      subtitle: "Ringkasan instan profil kandidat untuk tim HR, Talent Acquisition, dan Recruiter",
      modeActive: "Recruiter Mode Aktif",
      exitMode: "Tutup Mode Recruiter",
      summaryHeading: "Ringkasan Kualifikasi Kandidat",
      candidateProfile: "Profil Kandidat",
      targetRole: "Posisi yang Diminati",
      targetRoleDesc: "Web Developer Intern, Frontend Developer, UI/UX Designer, IT Support",
      statusBadge: "Tersedia untuk Magang / Internship 2026",
      coreCompetencies: "Keahlian Inti Terverifikasi",
      keyStrengths: "Keunggulan Utama",
      whyHireTitle: "Nilai Tambah",
      whyHireDesc: "Memiliki perpaduan kemampuan teknis pemrograman (React, JS, PHP, Python), pemahaman jaringan & hardware dari vokasi TKJ, serta kepemimpinan nyata sebagai Ketua Panitia tingkat fakultas dan pengurus BEM.",
      ctaDownloadCv: "Unduh CV Resmi",
      ctaContact: "Hubungi Sekarang",
    },
    cvViewer: {
      title: "Curriculum Vitae Preview",
      previewNote: "Dokumen resmi Curriculum Vitae Muhammad Ilham Rizki",
      download: "Download CV (PDF)",
      openNewTab: "Buka Tab Baru",
      close: "Tutup",
      fallbackMsg: "Browser Anda tidak mendukung preview PDF langsung. Silakan klik tombol di bawah untuk mengunduh atau membuka di tab baru.",
    },
    businessCard: {
      title: "Digital Business Card",
      subtitle: "Identitas digital resmi MIR — Muhammad Ilham Rizki",
      scanQr: "Scan QR Code",
      scanQrHint: "Arahkan kamera smartphone untuk membuka langsung portofolio ini",
      copyContact: "Salin Kontak",
      contactCopied: "Detail kontak berhasil disalin ke clipboard!",
      shareCard: "Bagikan Profil",
      downloadQr: "Unduh QR Code",
      close: "Tutup",
    },
    contact: {
      label: "Mari Terhubung",
      title: "Let's Build Something Together",
      heading: "Mari Terhubung",
      subtitle: "Terbuka untuk diskusi kesempatan magang, proyek kolaboratif, dan ide digital",
      infoTitle: "Informasi Kontak Langsung",
      formTitle: "Kirim Pesan Langsung",
      nameLabel: "Nama Lengkap",
      namePlaceholder: "Masukkan nama Anda",
      emailLabel: "Alamat Email",
      emailPlaceholder: "nama@perusahaan.com",
      subjectLabel: "Subjek Pesan",
      subjectPlaceholder: "Peluang Magang / Kolaborasi Proyek",
      messageLabel: "Pesan Anda",
      messagePlaceholder: "Tuliskan pesan atau penawaran Anda di sini...",
      sendBtn: "Kirim Pesan",
      sendingBtn: "Mengirim...",
      successNotice: "Pesan berhasil terkirim. Terima kasih!",
      errorNotice: "Pesan gagal dikirim. Silakan coba lagi atau kirim langsung melalui Gmail.",
      copyEmail: "Salin Alamat Email",
      emailCopied: "Alamat email berhasil disalin!",
      validationName: "Nama lengkap wajib diisi.",
      validationEmail: "Alamat email wajib diisi.",
      validationEmailFormat: "Format alamat email tidak valid.",
      validationSubject: "Subjek pesan wajib diisi.",
      validationMessage: "Pesan tidak boleh kosong.",
      openGmail: "Buka Gmail",
    },
    cmdPalette: {
      placeholder: "Ketik perintah atau cari bagian website...",
      quickActions: "Tindakan Cepat",
      navigation: "Navigasi Halaman",
      themeToggle: "Ganti Tema (Dark / Light)",
      langToggle: "Ganti Bahasa (ID / EN)",
      openCv: "Buka CV Viewer",
      openCard: "Buka Digital Business Card",
      recruiterToggle: "Toggle Recruiter Fast Mode",
      noResults: "Tidak ada perintah atau menu yang cocok.",
      hint: "Gunakan tombol panah ↑ ↓ untuk navigasi, Enter untuk memilih, Esc untuk keluar",
    },
    notFound: {
      code: "404",
      title: "Halaman Tidak Ditemukan",
      desc: "Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.",
      backHome: "Kembali ke Beranda",
    },
    footer: {
      tagline: "Building Ideas Into Digital Experiences.",
      rightsReserved: "All rights reserved.",
      backToTop: "Kembali ke Atas",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      certificates: "Certificates",
      projects: "Projects",
      contact: "Contact",
      recruiterMode: "Recruiter Mode",
      viewCv: "View CV",
      businessCard: "Digital Card",
    },
    hero: {
      greeting: "HELLO, I AM",
      role: "Informatics Student & Aspiring Web Developer",
      status: "Open to Internship Opportunities",
      description:
        "I'm Muhammad Ilham Rizki, a 5th-semester Informatics student at Universitas PGRI Semarang. I build clean, fast, and accessible web interfaces — always learning, always experimenting.",
      exploreBtn: "Explore Portfolio",
      downloadCvBtn: "Download CV",
      contactBtn: "Contact Me",
      businessCardBtn: "Digital Card",
    },
    about: {
      label: "Digital Identity & Profile",
      title: "About Me",
      subtitle: "Discover my academic journey, technological passion, and professional aspirations",
      bio1: "Hello! I am Muhammad Ilham Rizki, an active 5th-semester Informatics student at Universitas PGRI Semarang.",
      bio2: "I possess a deep enthusiasm for the modern web ecosystem, clean UI/UX interaction design, and building resilient software solutions with great user experiences.",
      bio3: "With a vocational background in Computer Network Engineering, I combine fundamental hardware and networking expertise with modern software development skills.",
      bio4: "Beyond academics, I actively contribute to the Student Executive Board (BEM FTI) and serve as the Head of the Talent and Interest Department.",
      fullName: "Muhammad Ilham Rizki",
      educationLabel: "Universitas PGRI Semarang",
      majorLabel: "Informatics (Semester 5)",
      originLabel: "Pemalang, Central Java",
      focusLabel: "Web Development & UI/UX",
      statusLabel: "Open to Internships",
      copyInfoBtn: "Copy Profile Info",
      infoCopied: "Profile info copied to clipboard!",
      viewCardBtn: "Digital Card",
      viewProjectsBtn: "View Projects",
    },
    skills: {
      label: "Technical Expertise",
      title: "Skills & Technologies",
      subtitle: "Verified competencies and technologies applied in software engineering",
      allFilter: "All Categories",
      emptyNote: "Skills in this category will be updated soon.",
    },
    experience: {
      label: "Track Record & Leadership",
      title: "Experience",
      subtitle: "Leadership in student governance, faculty committee, and professional work history",
      committeeTag: "Committee",
      orgTag: "Organization",
      workTag: "Work Experience",
      present: "Present",
    },
    education: {
      label: "Academic Journey",
      title: "Education",
      subtitle: "Formal education and foundational background in Information Technology",
      currentStudent: "Active Student",
      graduated: "Graduated",
    },
    certificates: {
      label: "Credentials & Honors",
      title: "Certificates",
      subtitle: "Repository of verified certificates, licenses, and technical training",
      emptyTitle: "Certificates are currently being curated.",
      emptyDesc: "Certificates and achievements will be updated soon.",
      viewCredential: "View Credential",
      viewCertificate: "View Certificate",
      downloadPdf: "Download PDF",
      downloadImage: "Download Image",
      openNewTab: "Open in New Tab",
      issuer: "Issuer",
      issuedBy: "Issued by",
      issuedDate: "Date",
      location: "Location",
      category: "Category",
      credentialId: "Credential ID",
      detailsTitle: "Certificate Details",
      materialsTitle: "Learning Materials",
      signersTitle: "Signatories",
      verification: "Verification",
      pdfFallback: "PDF preview is not available on this device. Please open or download the original document.",
      imageNote: "Preview of the original document. Open the PDF for the interactive version.",
      imageOnlyNote: "Digital copy of the original certificate.",
      close: "Close",
    },
    projects: {
      label: "Project Showcase",
      title: "Projects",
      subtitle: "Curated collection of digital builds, web apps, and technical experiments",
      emptyTitle: "Projects are currently being curated.",
      emptyDesc: "Selected works and digital experiments will be showcased here.",
      viewLive: "Live Demo",
      sourceCode: "Source Code",
    },
    recruiter: {
      title: "Recruiter Fast Mode",
      subtitle: "High-density candidate summary designed for HR, Talent Acquisition, and Hiring Managers",
      modeActive: "Recruiter Mode Active",
      exitMode: "Exit Recruiter Mode",
      summaryHeading: "Candidate Summary Overview",
      candidateProfile: "Candidate Profile",
      targetRole: "Target Roles",
      targetRoleDesc: "Web Developer Intern, Frontend Developer, UI/UX Designer, IT Support",
      statusBadge: "Available for Internship 2026",
      coreCompetencies: "Verified Core Competencies",
      keyStrengths: "Key Value Offerings",
      whyHireTitle: "Why Consider Ilham",
      whyHireDesc: "Strong synergy of programming skills (React, JavaScript, PHP, Python), practical networking and hardware diagnostics from vocational training, paired with verified leadership as Faculty Event Chairman and student executive board member.",
      ctaDownloadCv: "Download Official CV",
      ctaContact: "Direct Contact",
    },
    cvViewer: {
      title: "Curriculum Vitae Preview",
      previewNote: "Official Curriculum Vitae of Muhammad Ilham Rizki",
      download: "Download CV (PDF)",
      openNewTab: "Open in New Tab",
      close: "Close",
      fallbackMsg: "Your browser does not support inline PDF viewing. Please click the button below to download or open in a new tab.",
    },
    businessCard: {
      title: "Digital Business Card",
      subtitle: "Official digital identity of MIR — Muhammad Ilham Rizki",
      scanQr: "Scan QR Code",
      scanQrHint: "Point your smartphone camera to immediately access this portfolio",
      copyContact: "Copy Contact Info",
      contactCopied: "Contact details copied to clipboard!",
      shareCard: "Share Profile",
      downloadQr: "Download QR Code",
      close: "Close",
    },
    contact: {
      label: "Get In Touch",
      title: "Let's Build Something Together",
      heading: "Let's Connect",
      subtitle: "Open for internship opportunities, project collaborations, and digital inquiries",
      infoTitle: "Direct Contact Details",
      formTitle: "Send a Direct Message",
      nameLabel: "Full Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "name@company.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Internship Inquiry / Project Collaboration",
      messageLabel: "Your Message",
      messagePlaceholder: "Write your message or inquiry here...",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      successNotice: "Message sent successfully. Thank you!",
      errorNotice: "Failed to send the message. Please try again or send it directly via Gmail.",
      copyEmail: "Copy Email Address",
      emailCopied: "Email address copied!",
      validationName: "Full name is required.",
      validationEmail: "Email address is required.",
      validationEmailFormat: "Invalid email format.",
      validationSubject: "Subject is required.",
      validationMessage: "Message cannot be empty.",
      openGmail: "Open Gmail",
    },
    cmdPalette: {
      placeholder: "Type a command or search sections...",
      quickActions: "Quick Actions",
      navigation: "Navigation",
      themeToggle: "Toggle Theme (Dark / Light)",
      langToggle: "Toggle Language (ID / EN)",
      openCv: "Open CV Viewer",
      openCard: "Open Digital Business Card",
      recruiterToggle: "Toggle Recruiter Fast Mode",
      noResults: "No matching commands or sections found.",
      hint: "Use ↑ ↓ arrows to navigate, Enter to choose, Esc to close",
    },
    notFound: {
      code: "404",
      title: "Page Not Found",
      desc: "The page you are looking for does not exist or has been moved.",
      backHome: "Back to Home",
    },
    footer: {
      tagline: "Building Ideas Into Digital Experiences.",
      rightsReserved: "All rights reserved.",
      backToTop: "Back to Top",
    },
  },
};
