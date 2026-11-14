# MIR. — Personal Portfolio

Interactive 3D portfolio of **Muhammad Ilham Rizki**, an Informatics student at Universitas PGRI Semarang and aspiring web developer.

**Live:** https://ilhamrizki09.github.io/portfolio/ · https://ilham-pages.vercel.app/

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

The site is deployed to two targets from the same codebase:

| Target | URL | Trigger |
| --- | --- | --- |
| GitHub Pages | https://ilhamrizki09.github.io/portfolio/ | Push to `main` via `.github/workflows/deploy.yml` |
| Vercel | https://ilham-pages.vercel.app/ | Push to `main` (Git integration) or `vercel deploy --prod` |

`vite.config.ts` uses `/portfolio/` for GitHub Pages builds and `/` for Vercel builds (detected via the `VERCEL` environment variable). OG/Twitter metadata is driven by `VITE_SITE_URL`, with a default in `.env` for Pages and a production override in Vercel.

The contact form posts directly to FormSubmit's AJAX endpoint, so messages are delivered to `personalInfo.email` without opening a mail client. The endpoint requires a one-time activation from the recipient inbox.

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
