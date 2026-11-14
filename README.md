# MIR. — Personal Portfolio

Interactive 3D portfolio of **Muhammad Ilham Rizki**, an Informatics student at Universitas PGRI Semarang and aspiring web developer.

**Live:** https://ilhamrizki09.github.io/portfolio/

Built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, and a Three.js hero scene.

## Features

- Premium 3D hero scene with real portrait frame
- Bilingual interface (Bahasa Indonesia / English)
- Light and dark theme
- Recruiter Mode with CV preview and download
- Digital business card with QR code, copy, and native share
- Command palette (`Ctrl` / `Cmd` + `K`)
- Certificate gallery with document preview and download
- Responsive layout, reduced-motion and keyboard-friendly interactions
- Accessible focus states, custom cursor, and magnetic buttons

## Tech Stack

| Layer | Tools |
| --- | --- |
| Build | Vite 8, TypeScript |
| UI | React 19, Tailwind CSS 4, Framer Motion, Lucide |
| 3D | Three.js |
| Utilities | qrcode |
| Quality | oxlint, tsc |

## Getting Started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-check and build for production
npm run preview  # serve the production build
npm run lint     # run oxlint
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages at https://ilhamrizki09.github.io/portfolio/. The production base path is configured in `vite.config.ts` (`/portfolio/`), and public assets are resolved through `src/utils/assetUrl.ts` so they work both in development (`/`) and on Pages.

## Project Structure

```
public/
  assets/
    images/profile.jpg
    cv/CV_Muhammad_Ilham_Rizki.pdf
    certificates/            # original PDFs + preview images
src/
  components/                # shared UI, modals, icons
  context/                   # theme, language, global UI state
  data/portfolioData.ts      # single source of truth for content
  sections/                  # Hero, About, Skills, Experience, ...
  translations/index.ts      # ID and EN strings
  assets/
```

All personal content (experience, education, skills, certificates) lives in `src/data/portfolioData.ts`. The Projects section is intentionally left empty until real case studies are ready — no placeholder projects are shown.

## Certificates

Original documents are published in `public/assets/certificates/` together with their preview images:

- Gemini Academy for Higher Education — Certificate of Completion (Google for Education × Paideia)
- Sertifikat Kepesertaan — Kuliah Umum Gemini AI, Prodi Informatika UPGRIS
- Pelatihan Media Kreatif 2 — BEM FTI UPGRIS
- Pelatihan Media Kreatif — BEM FTI UPGRIS

## Contact

- Email: [ir6595187@gmail.com](mailto:ir6595187@gmail.com)
- LinkedIn: [muhammad-ilham-rizki-3285123b3](https://www.linkedin.com/in/muhammad-ilham-rizki-3285123b3)
- GitHub: [@IlhamRizki09](https://github.com/IlhamRizki09)
- Instagram: [@ilhammrzz](https://instagram.com/ilhammrzz)

---

© 2026 MIR. — Muhammad Ilham Rizki.
