# Power CV

A modern resume/CV builder with live preview and multiple themes.

## Features

- **Real-time Preview** — Edit your resume and see changes instantly
- **Multiple Themes** — Modern, Classic, Minimal, Technical, Elegant, Compact, Bold
- **YAML/JSON Export** — Save and load your data in standard formats
- **Print-Ready** — Export directly to PDF via browser print
- **Mobile Responsive** — Works on desktop and mobile devices

## Sections

- Personal Info (name, role, contact, links)
- Work Experience
- Education
- Projects
- Skills
- Languages

## Run Locally

**Prerequisites:** Node.js

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:8985](http://localhost:8985)

## Run with Docker

```bash
docker compose up
```

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Editor.tsx       # Form editor for resume data
│   ├── ResumePreview.tsx # Live preview with themes
│   └── SchemaDocs.tsx   # Data schema documentation
├── lib/
│   └── utils.ts         # Utility functions
├── types.ts             # TypeScript interfaces
├── constants.ts         # Default resume data
├── App.tsx              # Main application
└── main.tsx             # Entry point
```

## License

MIT
