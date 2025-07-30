# Elcompia

Elementary Computational Thinking Platform - Educational application for children focusing on reading, mathematics, and logic.

## Project Structure

- **Frontend**: Svelte application with Vite build system
- **Styling**: TailwindCSS with PostCSS
- **Training modules**:
  - Math operations (addition, subtraction, multiplication, division, decimals, fractions, percentages)
  - Reading and typing games
  - Letter learning

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

- Main entry: `App.svelte`
- Training components organized in `/training` directory
- Math operations in `/training/math/components/operation`
- Reading components in `/training/read/components`

## Key Components

- `MathGame.svelte` - Main math game logic
- `TypingGame.svelte` - Typing practice interface
- `NextQuestion.svelte` - Question navigation
- `QuestionTimer.svelte` - Timer functionality
- `TrainingScore.svelte` - Score tracking

## Dependencies

- Svelte 4.0.5
- Vite 4.4.5
- TailwindCSS 3.3.0
- Tone.js (audio)