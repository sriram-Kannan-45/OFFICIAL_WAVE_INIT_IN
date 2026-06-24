# WAVE INIT — AI-Powered Product Studio

**WAVE INIT** is a full-stack AI startup website built with the MERN stack (MongoDB + Express + React + Node.js). It features a stunning, animation-rich frontend with GSAP/Framer Motion scroll effects, a custom cursor, particle backgrounds, and a fully functional contact form backend with email notifications.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Animations | Framer Motion + GSAP ScrollTrigger |
| Smooth Scroll | Lenis (installed, optional integration) |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (via Mongoose) |
| Auth | JWT + bcryptjs (ready for expansion) |
| Email | Nodemailer (Gmail SMTP) |
| Icons | Lucide React |

---

## Prerequisites

- Node.js 18+ with npm
- MongoDB Atlas account (or local MongoDB)
- Gmail account with App Password (for email notifications)

---

## Project Structure

```
wave-init/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-level pages
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── styles/       # Global CSS + Tailwind
│   ├── public/
│   └── dist/            # Production build
├── server/          # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── .env
└── ai-service/      # Python FastAPI (empty — future)
```

---

## Environment Setup

### 1. Server Environment (`server/.env`)

Create or edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wave-init?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development

# Email configuration (Gmail SMTP)
EMAIL_USER=wave.init.45@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=wave.init.45@gmail.com
```

> **Note:** For Gmail, generate an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

### 2. Client Configuration

The client is already configured with a Vite proxy that forwards `/api` requests to `http://localhost:5000` during development.

---

## Running the Project

### Option A: Run Both (Recommended for Development)

Open **two terminal windows/tabs**:

#### Terminal 1 — Backend

```bash
cd wave-init/server
npm install          # First time only
npm start            # Production mode
# OR
npm run dev          # Requires nodemon: npm install -g nodemon
```

Server starts on **http://localhost:5000**
- Health check: `GET http://localhost:5000/api/health`
- Contact API: `POST http://localhost:5000/api/contact`

#### Terminal 2 — Frontend

```bash
cd wave-init/client
npm install          # First time only
npm run dev          # Starts Vite dev server
```

Client starts on **http://localhost:3000**
- The Vite proxy automatically forwards `/api/*` calls to the backend

### Option B: Production Build

```bash
# 1. Build the client
cd wave-init/client
npm install
npm run build

# 2. Start the server (serves static files from ../client/dist)
cd ../server
npm install
npm start
```

> **Note:** For production, update `server.js` to serve static files from `client/dist` and configure CORS for your production domain.

---

## Available Scripts

### Client (`client/`)

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `npm run dev` | Start Vite dev server (port 3000) |
| Build | `npm run build` | Production build to `dist/` |
| Preview | `npm run preview` | Preview production build locally |
| Lint | `npm run lint` | Run ESLint |

### Server (`server/`)

| Script | Command | Description |
|--------|---------|-------------|
| Start | `npm start` | Start Node.js server (port 5000) |
| Dev | `npm run dev` | Start with nodemon auto-reload |

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Full landing page with all sections |
| `/services` | Services | Detailed service cards + FAQ |
| `/products` | Products | Product showcase + roadmap |
| `/lms` | LMS Portal | AI LMS feature deep-dive |
| `/about` | About | Company story, values, timeline |
| `/contact` | Contact | Full contact form + info |
| `/privacy` | Privacy Policy | Data privacy policy |
| `*` | 404 | Catch-all not found page |

---

## Key Features

- **Custom Cursor** — Glowing cyan orb with trailing dots (desktop only)
- **Scroll Progress Bar** — Animated progress indicator at top
- **Particle Hero Background** — Canvas-based particle system with mouse interaction
- **Animated Counters** — Stats count up on scroll into view
- **Horizontal Scroll Services** — CSS snap-scroll on mobile, horizontal layout on desktop
- **Sticky Process Section** — Step-by-step reveal animation
- **Glass Morphism Cards** — Backdrop blur with glowing borders
- **Contact Form** — Submits to MongoDB + sends email notification
- **Responsive Design** — Mobile-first with breakpoints at 768px and 1024px
- **SEO Ready** — React Helmet with meta tags, JSON-LD schema markup

---

## Email Setup (Nodemailer)

The contact form sends email notifications using Gmail SMTP. To enable:

1. Enable [2-Factor Authentication](https://myaccount.google.com/security) on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords) for "Mail"
3. Copy the 16-character password into `server/.env` as `EMAIL_PASS`

---

## Deployment

### Frontend (Vercel)
```bash
cd client
vercel --prod
```

### Backend (Render / Railway / Heroku)
```bash
cd server
# Push to GitHub, connect to Render/Railway
# Set environment variables in dashboard
```

### Database (MongoDB Atlas)
- Create a free cluster at [mongodb.com/cloud](https://www.mongodb.com/cloud)
- Whitelist all IPs (`0.0.0.0/0`) for development
- Copy the connection string to `MONGODB_URI`

---

## License

© 2024 WAVE INIT. All rights reserved.

---

## Contact

- Email: [wave.init.45@gmail.com](mailto:wave.init.45@gmail.com)
- LinkedIn: [linkedin.com/in/wave-init-227377412](https://www.linkedin.com/in/wave-init-227377412/)
- Instagram: [@__wave__init__](https://www.instagram.com/__wave__init__)
