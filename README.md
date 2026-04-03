# Conner Martin — Cybersecurity Portfolio

A professional, single-page cybersecurity portfolio website built with pure HTML, CSS, and vanilla JavaScript. Designed to impress recruiters and showcase skills as a Cybersecurity student at **California State University San Marcos (CSUSM)**.

🌐 **Live Site:** [connerm03.github.io/CyberPortfolio](https://connerm03.github.io/CyberPortfolio)

---

## ✨ Features

- **Dark cybersecurity aesthetic** — navy/charcoal background with electric blue and green accents
- **Animated hero section** — particle network canvas background + typing effect subtitle
- **Smooth scroll navigation** — sticky navbar with active section highlighting
- **Scroll-reveal animations** — elements fade in as you scroll (Intersection Observer API)
- **Responsive** — looks great on mobile, tablet, and desktop
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation, good contrast ratios
- **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript (no npm, no frameworks)

---

## 📁 Project Structure

```
CyberPortfolio/
├── index.html          ← Main single-page HTML (all sections)
├── css/
│   └── style.css       ← All styles (design tokens, layout, animations)
├── js/
│   └── main.js         ← Navbar, animations, typing effect, form handling
└── README.md           ← This file
```

---

## 🚀 Deploy to GitHub Pages

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. Go to **Settings → Pages** in your repository.
3. Under **Source**, select **Deploy from a branch**.
4. Choose **main** (or **master**) branch, root folder `/`.
5. Click **Save**.
6. Your site will be live at `https://connerm03.github.io/CyberPortfolio/` within a minute.

---

## ✏️ Customization Guide

### Update Your Email
Search for `conner.martin@example.com` in `index.html` and replace it with your real email.

### Update Project Links
In the **Projects** section of `index.html`, find each `<a href="https://github.com/Connerm03"` inside a `.project-links` div and replace with the specific repo URL for that project.

### Connect the Contact Form to Formspree
1. Sign up at [formspree.io](https://formspree.io) and create a new form.
2. In `index.html`, find the `<form id="contactForm">` tag.
3. Add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to the form tag.
4. In `js/main.js`, replace the `setTimeout` simulation block with a real `fetch()` call (instructions in comments).

### Add/Update Certifications
In the **Education & Certifications** section of `index.html`, find `.cert-card` elements and update badge statuses (`cert-badge active`, `cert-badge coming-soon`, or `cert-badge future`).

### Update TryHackMe / HackTheBox Rank
Find the TryHackMe cert card and update the badge text with your actual rank.

### Change the Color Scheme
All colors are defined as CSS custom properties at the top of `css/style.css`:
```css
--color-blue:  #00d4ff;   /* Electric blue accent */
--color-green: #00ff88;   /* Green highlight */
--color-bg:    #0a0a0f;   /* Background */
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 (semantic) | Structure & accessibility |
| CSS3 (custom properties, grid, flexbox) | Styling & responsive layout |
| Vanilla JavaScript (ES6+) | Interactivity & animations |
| Google Fonts (Space Grotesk + Inter) | Typography |
| Canvas API | Hero particle background |
| Intersection Observer API | Scroll-reveal animations |

---

## 📄 License

MIT — feel free to fork and adapt for your own portfolio.

---

*Built with ❤️ by Conner Martin · CSUSM Computer Science*