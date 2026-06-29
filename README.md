# Shobha Digital Studio — Website

A premium, mobile-first marketing site for **Shobha Digital Studio, Belvai** — built with
[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), hosted **free on GitHub
Pages**. The only running cost is the domain name.

- **Pages:** Home, Portfolio (filterable gallery + lightbox + films), Services, About, Contact.
- **Look:** warm-traditional (maroon · gold · cream), serif display type, Kannada accents.
- **Photos** are optimized automatically at build time (AVIF/WebP) via `astro:assets`.
- **Films** are embedded from YouTube (no large files in the repo).
- **Contact** via WhatsApp click-to-chat + a free Web3Forms enquiry form.

---

## How it deploys (no local install needed)

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site on GitHub's
runners and publishes it to GitHub Pages. You do **not** need Node or npm on your computer.

### One-time setup on GitHub
1. Push this repo to GitHub (branch `main`).
2. Go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Wait for the **Deploy to GitHub Pages** action to finish (Actions tab).
4. Your test site is live at `https://<your-username>.github.io/<repo-name>/`.

---

## Attaching the custom domain (when ready)

1. Buy a domain (suggested: `shobhadigitalstudio.in`).
2. At your registrar, add DNS records:
   - Four `A` records for the apex/root → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - One `CNAME` for `www` → `<your-username>.github.io`
3. In **Settings → Pages → Custom domain**, enter the domain and save; tick **Enforce HTTPS**.
4. Add the domain to `public/CNAME` (create the file, one line, e.g. `shobhadigitalstudio.in`).
5. Set the site to serve from the root by adding two **repo variables**
   (**Settings → Secrets and variables → Actions → Variables**):
   - `BASE_PATH` = `/`
   - `SITE_URL` = `https://shobhadigitalstudio.in`
6. Re-run the deploy (push any commit, or "Run workflow" from the Actions tab).

---

## Editing content

All business content lives in `src/data/` — no need to touch the page markup:

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Name, phone, email, address, hours, socials, WhatsApp, **Web3Forms key** |
| `src/data/services.ts` | The list of services |
| `src/data/portfolio.ts` | Gallery photos + **films (YouTube ids)** |
| `src/data/testimonials.ts` | Client testimonials |

### Add / change photos
1. Drop the image into `src/assets/portfolio/`.
2. Add an entry in `src/data/portfolio.ts` (its `file`, `title`, `category`, `alt`,
   `orientation`, and `featured: true` to show it on the home page).
   New categories automatically appear as gallery filters.

### Add films
1. Upload each video to **YouTube** (unlisted or public).
2. Copy the 11-character video id from the URL (`youtube.com/watch?v=XXXXXXXXXXX`).
3. Paste it into the matching film's `youtubeId` in `src/data/portfolio.ts`.
   (Films without an id show a tasteful "Coming soon" card.)

### Turn on the enquiry form
1. Create a free key at [web3forms.com](https://web3forms.com) using the studio's email.
2. Paste it into `web3formsKey` in `src/data/site.ts`. Submissions then arrive by email.

---

## ✅ Content to finish before going live (TODO)

These are marked `TODO` in the code:

- [ ] Confirm **email address** → `src/data/site.ts`
- [ ] Confirm **Belvai PIN code** and exact **map coordinates** → `src/data/site.ts`
- [ ] Add **Web3Forms key** to enable the form → `src/data/site.ts`
- [ ] Confirm the **Kannada tagline** wording → `src/data/site.ts`
- [ ] Upload films to YouTube and add **`youtubeId`**s → `src/data/portfolio.ts`
- [ ] Replace placeholder **testimonials** with real ones → `src/data/testimonials.ts`
- [ ] Swap in the client's **logo** when it arrives (see `src/components/Logo.astro`)
- [ ] Add more **photos** as the client sends them → `src/assets/portfolio/` + `portfolio.ts`

---

## Notes

- The original full-size videos and raw photos at the repo root are **git-ignored** (GitHub rejects
  files over 100 MB). Only the optimized copies under `src/assets/` are committed.
- If you ever do want to run it locally: `npm install` then `npm run dev` (needs Node 20+).
