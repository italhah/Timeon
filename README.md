# Timeon — Digital Clock

A minimal, premium, distraction-free digital clock with world timezone support, inspired by the Fliqlo screensaver aesthetic.

## Features

- **Large, elegant flip-card digital clock display** with smooth animations
- **195 country/timezone selection** via dropdown covering all major world regions
- **Light/dark mode toggle** with persistent preference saved to localStorage
- **Real-time clock updates** with minimal API usage (API called only on location change)
- **Custom Timeon logo** integrated throughout the application
- **Responsive design** optimized for desktop, tablet, and mobile devices
- **Secure server-side API proxy** via Supabase Edge Functions to protect API keys
- **Error handling** with user-friendly error messages
- **12-hour format** with AM/PM indicator

## Architecture

- **Frontend**: React 18 (Create React App)
- **Backend**: Supabase Edge Function proxies IPGeolocation API calls, keeping the API key server-side
- **Clock ticking**: The API is called only when the user changes the country. The clock then ticks locally using the timezone offset, avoiding repeated API requests.
- **State Management**: React hooks (useState, useEffect, useRef, useCallback)
- **Styling**: Custom CSS with CSS variables for theming

## Getting Started

### Prerequisites

- Node.js 16+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

The app will run at `http://localhost:3000`

### Production Build

```bash
npm run build
```

## Environment Variables

The following are pre-configured in the hosted environment:

- `REACT_APP_SUPABASE_URL` — Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` — Supabase anonymous key (used for edge function auth)
- `IPGEOLOCATION_API_KEY` — IPGeolocation API key (server-side only, configured as an Edge Function secret)

The IPGeolocation API key is NEVER exposed in client-side code. It is stored as a Supabase Edge Function secret and accessed only server-side.

## Tech Stack

- **React 18** — UI framework
- **Supabase Edge Functions** — Serverless backend for secure API proxying
- **IPGeolocation Timezone API** — Timezone data provider
- **Lucide React** — Icon library (Sun, Moon, Globe icons)
- **Axios** — HTTP client (available for future API integrations)
- **Custom CSS** — Styling with CSS variables for theme switching

## Project Structure

```
Digital-Watch/
├── public/
│   ├── favicon.svg          # Custom Timeon logo favicon
│   ├── index.html           # HTML template
│   └── manifest.json        # PWA manifest
├── src/
│   ├── components/
│   │   ├── Clock.js         # Flip-card clock component
│   │   ├── NavBar.js        # Navigation bar with location selector
│   │   └── TimeonLogo.js    # Custom SVG logo component
│   ├── data/
│   │   └── locations.js     # 195 country/timezone data
│   ├── styles/
│   │   ├── Clock.css        # Clock animations and styling
│   │   ├── NavBar.css       # Navigation bar styling
│   │   └── global.css       # Global styles and theme variables
│   └── App.js               # Main application component
├── supabase/
│   └── functions/
│       └── timezone-proxy  # Edge function for secure API calls
└── package.json
```

## Default Location

The application defaults to Pakistan (Asia/Karachi timezone) but can be changed by modifying the `defaultLocationIndex` in `src/data/locations.js`.

---

Developed by Talha Rahman
