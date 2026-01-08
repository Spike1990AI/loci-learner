# Loci Learner

An interactive GCSE Maths revision app for learning about loci (geometric constructions).

**Live Demo:** https://spike1990ai.github.io/loci-learner/

## Features

### Learn Mode
Interactive diagrams for all 4 types of loci:

1. **Locus Equidistant from a Point** - Circle locus
   - Drag the test point to explore
   - Adjust the radius to see how the locus changes
   - Real-time distance calculations

2. **Locus Equidistant from a Line Segment** - Stadium shape
   - Drag points A and B to change the line
   - Adjust the distance parameter
   - See the parallel lines and semicircular ends

3. **Locus Equidistant from Two Points** - Perpendicular bisector
   - Move points A and B around
   - Watch the perpendicular bisector update
   - See distances to both points in real-time

4. **Locus Equidistant from Two Lines** - Angle bisector
   - Adjust the angle between the lines
   - Drag the test point
   - See when it's equidistant from both lines

### Quiz Mode
- 8 multiple choice questions
- Mix of theory and real-world applications
- Immediate feedback with explanations
- Score tracking and encouraging results messages

## Tech Stack

- **React** - UI framework with hooks
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling with dark theme
- **SVG** - Interactive diagrams with drag support
- **Pointer Events** - Unified mouse and touch handling

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Key Features

- **Interactive Diagrams** - Fully draggable points with smooth pointer capture
- **Visual Feedback** - Test points turn green when on the locus, red when off
- **Real-time Measurements** - See exact distances and calculations
- **Mobile Friendly** - Touch events fully supported
- **Dark Theme** - Easy on the eyes with slate/cyan/pink color scheme

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx              # Mode switcher
│   ├── learn/
│   │   ├── LearnMode.jsx          # Learn mode container
│   │   ├── TopicCard.jsx          # Topic display with diagram
│   │   └── diagrams/
│   │       ├── PointDiagram.jsx   # Circle locus
│   │       ├── LineDiagram.jsx    # Stadium shape
│   │       ├── TwoPointsDiagram.jsx # Perpendicular bisector
│   │       └── TwoLinesDiagram.jsx # Angle bisector
│   ├── quiz/
│   │   ├── QuizMode.jsx           # Quiz container
│   │   ├── Question.jsx           # MCQ component
│   │   └── Results.jsx            # Final score screen
│   └── shared/
│       └── StatusBar.jsx          # Distance display
└── data/
    ├── topics.js                   # Learn mode content
    └── questions.js                # Quiz questions
```

## Credits

Content based on GCSE maths curriculum. Reference material from [wtmaths.com](https://wtmaths.com/loci.html).

## License

MIT
