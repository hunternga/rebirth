# Rebirth Fitness School

Website for Rebirth Fitness School by Dr. Isacc Abbas — personalized, panel-reviewed wellness programs.

Built with React 18, React Router and Vite.

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build in dist/
npm run preview  # preview the production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/data.js` | Site content: contact details, services, team, fees, hero slides, testimonials |
| `src/blogIndex.json` | Blog article list (title, category, date, image, excerpt) |
| `public/blog/*.json` | Full article bodies, loaded on demand |
| `src/pages/` | One component per page (Home, About, Process, Services, Team, Fees, Reviews, Blog, Contact) |
| `src/components/` | Shared pieces (navbar, footer, hero carousel, reading tools, video gallery, …) |
| `src/index.css` | All styles, including light/dark theme tokens |
| `public/images/`, `public/videos/` | Photos, blog images and testimonial videos |

## Deployment

The site is a single-page app. `public/_redirects` (Netlify) and `vercel.json` (Vercel) send every
route to `index.html` so direct links and refreshes work. On other hosts, configure the same fallback.
