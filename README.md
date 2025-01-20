# LinkedIn Interactive GDP Timeline

An interactive visualization of global GDP growth from 1700 to 2050, featuring historical periods, technological milestones, and future projections.

## Features

- Interactive timeline visualization using D3.js
- Scrollytelling experience with react-scrollama
- Historical periods from Pre-Industrial Era to AI Revolution
- GDP data with confidence intervals
- Regional impact visualization
- Mobile-first responsive design

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- D3.js for visualizations
- Tailwind CSS for styling
- React-scrollama for scrollytelling

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd linkedin_interactive
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript checks

## Project Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # React components
├── lib/          # Utilities and helpers
├── styles/       # Global styles
└── types/        # TypeScript type definitions
```

## Data Sources

- Historical GDP data (1700-2020): Maddison Project Database, World Bank, IMF
- Future projections (2020-2050): PwC "The World in 2050", IMF projections
- Values normalized to 1990 International Geary-Khamis dollars

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and ensure code quality
4. Submit a pull request

## License

[License Type] - See LICENSE file for details 