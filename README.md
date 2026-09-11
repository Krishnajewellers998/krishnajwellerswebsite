# Krishna Jewellers — React Customer Website

Modern customer website built with **React 19 + Vite** adhering to **Feature-First Architecture**.

## Architecture

```
website/src/
├── features/
│   ├── gold-rates/         # Live 24K, 22K, 18K ticker with real-time polling
│   ├── categories/         # Category cards, collections grid
│   ├── jewellery/          # Product catalog, search, filter, detail modal
│   └── home/               # Hero banner, brand values, showroom location
├── shared/
│   ├── components/         # Navbar, Footer, UI elements
│   └── services/           # Centralized API client with image URL resolver
├── index.css               # Pure CSS luxury gold & obsidian design system
└── App.jsx                 # Main application view
```

## Running the Website

```bash
cd website
npm run dev
```
Open `http://localhost:5173`.
