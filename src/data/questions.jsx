import React from 'react'

export const questions = [
  {
    id: 1,
    question: 'What shape is formed by the locus of points equidistant from a single point P?',
    options: [
      'A circle',
      'A straight line',
      'A square',
      'An ellipse'
    ],
    correct: 0,
    explanation: 'All points at a fixed distance from point P form a circle with center P.'
  },
  {
    id: 2,
    question: 'The locus of points equidistant from two points A and B is:',
    options: [
      'A circle passing through A and B',
      'The line joining A and B',
      'The perpendicular bisector of AB',
      'Two parallel lines'
    ],
    correct: 2,
    explanation: 'The perpendicular bisector is the set of all points equidistant from A and B.'
  },
  {
    id: 3,
    question: 'What shape is formed by the locus of points at a fixed distance from a line segment?',
    options: [
      'A rectangle',
      'Two parallel lines with semicircular ends',
      'A circle',
      'Two straight lines only'
    ],
    correct: 1,
    explanation: 'This creates a "stadium" or "running track" shape - parallel lines with semicircles at the ends.'
  },
  {
    id: 4,
    question: 'The angle bisector represents points that are:',
    options: [
      'Equidistant from the two lines forming the angle',
      'On one of the two lines',
      'At the midpoint of the angle',
      'Perpendicular to both lines'
    ],
    correct: 0,
    explanation: 'Every point on the angle bisector is equidistant from both lines that form the angle.'
  },
  {
    id: 5,
    question: 'A radio tower broadcasts with a range of 50km. What locus represents the boundary of its coverage?',
    options: [
      'A square with side 50km',
      'A circle with radius 50km',
      'A line 50km long',
      'Two parallel lines 50km apart'
    ],
    correct: 1,
    explanation: 'All points exactly 50km from the tower form a circle - this is the locus equidistant from a point.'
  },
  {
    id: 6,
    question: 'Two rival pizza shops are 2km apart. Which locus shows where you would be equidistant from both shops?',
    options: [
      'A circle around both shops',
      'The line joining the two shops',
      'The perpendicular bisector between them',
      'Two circles, one around each shop'
    ],
    correct: 2,
    explanation: 'The perpendicular bisector gives all points equidistant from the two pizza shops.'
  },
  {
    id: 7,
    question: 'A railway line runs straight for 500m. A safety zone extends 10m from the track. What shape is this zone?',
    options: [
      'A rectangle',
      'A stadium shape (rectangle with semicircular ends)',
      'A circle',
      'Just two parallel lines'
    ],
    correct: 1,
    explanation: 'The locus 10m from a line segment forms a stadium shape with the track down the middle.'
  },
  {
    id: 8,
    question: 'Two roads meet at a crossroads forming an angle. A new park bench must be equidistant from both roads. Where should it be placed?',
    options: [
      'At the corner where the roads meet',
      'On one of the roads',
      'Anywhere along the angle bisector',
      'At the midpoint of one road'
    ],
    correct: 2,
    explanation: 'The angle bisector contains all points equidistant from the two roads - the bench can go anywhere along it.'
  },
  // Visual diagram questions
  {
    id: 9,
    type: 'diagram',
    question: 'A goat is tied to a post with a 6m rope. Which diagram shows the locus of all points the goat can reach?',
    diagramOptions: [
      // Option A - Correct: Circle
      <>
        <circle cx="100" cy="100" r="4" fill="rgb(34 211 238)" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgb(34 211 238)" strokeWidth="2" strokeDasharray="4,2" />
        <text x="100" y="105" fill="rgb(148 163 184)" fontSize="10" textAnchor="middle">P</text>
      </>,
      // Option B - Square
      <>
        <circle cx="100" cy="100" r="4" fill="rgb(34 211 238)" />
        <rect x="40" y="40" width="120" height="120" fill="none" stroke="rgb(100 116 139)" strokeWidth="2" />
        <text x="100" y="105" fill="rgb(148 163 184)" fontSize="10" textAnchor="middle">P</text>
      </>,
      // Option C - Ellipse
      <>
        <circle cx="100" cy="100" r="4" fill="rgb(34 211 238)" />
        <ellipse cx="100" cy="100" rx="70" ry="40" fill="none" stroke="rgb(100 116 139)" strokeWidth="2" />
        <text x="100" y="105" fill="rgb(148 163 184)" fontSize="10" textAnchor="middle">P</text>
      </>,
      // Option D - Two circles
      <>
        <circle cx="80" cy="100" r="4" fill="rgb(34 211 238)" />
        <circle cx="120" cy="100" r="4" fill="rgb(34 211 238)" />
        <circle cx="80" cy="100" r="40" fill="none" stroke="rgb(100 116 139)" strokeWidth="2" />
        <circle cx="120" cy="100" r="40" fill="none" stroke="rgb(100 116 139)" strokeWidth="2" />
      </>
    ],
    correct: 0,
    explanation: 'All points at a fixed distance (6m) from the post form a circle. This is the locus equidistant from a point.'
  },
  {
    id: 10,
    type: 'diagram',
    question: 'Points A and B are shown. Which diagram correctly shows the locus of all points equidistant from both A and B?',
    diagramOptions: [
      // Option A - Line joining A and B
      <>
        <circle cx="60" cy="100" r="5" fill="rgb(244 114 182)" />
        <circle cx="140" cy="100" r="5" fill="rgb(244 114 182)" />
        <line x1="60" y1="100" x2="140" y2="100" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="4,2" />
        <text x="60" y="90" fill="rgb(148 163 184)" fontSize="12" fontWeight="bold">A</text>
        <text x="140" y="90" fill="rgb(148 163 184)" fontSize="12" fontWeight="bold">B</text>
      </>,
      // Option B - Parallel lines
      <>
        <circle cx="60" cy="100" r="5" fill="rgb(244 114 182)" />
        <circle cx="140" cy="100" r="5" fill="rgb(244 114 182)" />
        <line x1="20" y1="70" x2="180" y2="70" stroke="rgb(100 116 139)" strokeWidth="2" />
        <line x1="20" y1="130" x2="180" y2="130" stroke="rgb(100 116 139)" strokeWidth="2" />
        <text x="60" y="90" fill="rgb(148 163 184)" fontSize="12" fontWeight="bold">A</text>
        <text x="140" y="90" fill="rgb(148 163 184)" fontSize="12" fontWeight="bold">B</text>
      </>,
      // Option C - Perpendicular bisector (Correct)
      <>
        <circle cx="60" cy="100" r="5" fill="rgb(244 114 182)" />
        <circle cx="140" cy="100" r="5" fill="rgb(244 114 182)" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="rgb(34 211 238)" strokeWidth="2" strokeDasharray="4,2" />
        <text x="60" y="90" fill="rgb(148 163 184)" fontSize="12" fontWeight="bold">A</text>
        <text x="140" y="90" fill="rgb(148 163 184)" fontSize="12" fontWeight="bold">B</text>
      </>,
      // Option D - Circle through both points
      <>
        <circle cx="60" cy="100" r="5" fill="rgb(244 114 182)" />
        <circle cx="140" cy="100" r="5" fill="rgb(244 114 182)" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="rgb(100 116 139)" strokeWidth="2" />
        <text x="60" y="90" fill="rgb(148 163 184)" fontSize="12" fontWeight="bold">A</text>
        <text x="140" y="90" fill="rgb(148 163 184)" fontSize="12" fontWeight="bold">B</text>
      </>
    ],
    correct: 2,
    explanation: 'The perpendicular bisector (vertical line through the midpoint) contains all points equidistant from A and B.'
  },
  {
    id: 11,
    type: 'diagram',
    question: 'A fence line is shown. Which diagram shows the locus of all points exactly 3m from the fence?',
    diagramOptions: [
      // Option A - Circle around midpoint
      <>
        <line x1="60" y1="100" x2="140" y2="100" stroke="rgb(100 116 139)" strokeWidth="3" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="4,2" />
      </>,
      // Option B - Stadium shape (Correct)
      <>
        <line x1="60" y1="100" x2="140" y2="100" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="60" y1="70" x2="140" y2="70" stroke="rgb(34 211 238)" strokeWidth="2" strokeDasharray="4,2" />
        <line x1="60" y1="130" x2="140" y2="130" stroke="rgb(34 211 238)" strokeWidth="2" strokeDasharray="4,2" />
        <path d="M 140 70 A 30 30 0 0 1 140 130" fill="none" stroke="rgb(34 211 238)" strokeWidth="2" strokeDasharray="4,2" />
        <path d="M 60 130 A 30 30 0 0 1 60 70" fill="none" stroke="rgb(34 211 238)" strokeWidth="2" strokeDasharray="4,2" />
      </>,
      // Option C - Rectangle only
      <>
        <line x1="60" y1="100" x2="140" y2="100" stroke="rgb(100 116 139)" strokeWidth="3" />
        <rect x="60" y="70" width="80" height="60" fill="none" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="4,2" />
      </>,
      // Option D - Parallel lines only (no ends)
      <>
        <line x1="60" y1="100" x2="140" y2="100" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="40" y1="70" x2="160" y2="70" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="4,2" />
        <line x1="40" y1="130" x2="160" y2="130" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="4,2" />
      </>
    ],
    correct: 1,
    explanation: 'The locus forms a stadium shape - two parallel lines with semicircular ends at both ends of the fence.'
  },
  {
    id: 12,
    type: 'diagram',
    question: 'Two roads meet at an angle. Which diagram shows the locus of points equidistant from both roads?',
    diagramOptions: [
      // Option A - Perpendicular to one line
      <>
        <line x1="50" y1="100" x2="150" y2="100" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="100" y1="50" x2="100" y2="150" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="120" y1="50" x2="120" y2="150" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="4,2" />
        <circle cx="100" cy="100" r="4" fill="rgb(34 211 238)" />
      </>,
      // Option B - Circle at intersection
      <>
        <line x1="50" y1="100" x2="150" y2="100" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="100" y1="50" x2="100" y2="150" stroke="rgb(100 116 139)" strokeWidth="3" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="4,2" />
        <circle cx="100" cy="100" r="4" fill="rgb(34 211 238)" />
      </>,
      // Option C - Both bisectors
      <>
        <line x1="50" y1="100" x2="150" y2="100" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="100" y1="50" x2="100" y2="150" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="60" y1="60" x2="140" y2="140" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="4,2" />
        <line x1="140" y1="60" x2="60" y2="140" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="4,2" />
        <circle cx="100" cy="100" r="4" fill="rgb(34 211 238)" />
      </>,
      // Option D - Angle bisector (Correct)
      <>
        <line x1="50" y1="100" x2="150" y2="100" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="100" y1="50" x2="100" y2="150" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="60" y1="60" x2="140" y2="140" stroke="rgb(34 211 238)" strokeWidth="2" strokeDasharray="4,2" />
        <circle cx="100" cy="100" r="4" fill="rgb(34 211 238)" />
      </>
    ],
    correct: 3,
    explanation: 'The angle bisector (diagonal line splitting the angle in half) contains all points equidistant from both roads.'
  },
  // Drawing questions
  {
    id: 13,
    type: 'drawing',
    question: 'Draw the locus of all points at a fixed distance from point P',
    instruction: 'Trace over the dashed guide circle with your finger or mouse',
    locusType: 'circle',
    referencePoints: {
      center: { x: 250, y: 200 },
      radius: 80
    },
    referenceElements: (
      <>
        <circle cx="250" cy="200" r="6" fill="rgb(34 211 238)" />
        <text x="250" y="190" fill="rgb(148 163 184)" fontSize="14" fontWeight="bold" textAnchor="middle">P</text>
      </>
    ),
    explanation: 'The locus of points at a fixed distance from point P forms a circle with center P and radius 80 pixels.'
  },
  {
    id: 14,
    type: 'drawing',
    question: 'Draw the locus of all points equidistant from points A and B',
    instruction: 'Trace over the dashed vertical line (the perpendicular bisector)',
    locusType: 'perpendicularBisector',
    referencePoints: {
      pointA: { x: 150, y: 200 },
      pointB: { x: 350, y: 200 }
    },
    referenceElements: (
      <>
        <circle cx="150" cy="200" r="6" fill="rgb(244 114 182)" />
        <circle cx="350" cy="200" r="6" fill="rgb(244 114 182)" />
        <text x="150" y="185" fill="rgb(148 163 184)" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
        <text x="350" y="185" fill="rgb(148 163 184)" fontSize="14" fontWeight="bold" textAnchor="middle">B</text>
        <line x1="150" y1="200" x2="350" y2="200" stroke="rgb(100 116 139)" strokeWidth="2" strokeDasharray="3,3" opacity="0.3" />
      </>
    ),
    explanation: 'The perpendicular bisector is a vertical line through the midpoint of AB. Every point on this line is equidistant from A and B.'
  },
  {
    id: 15,
    type: 'drawing',
    question: 'Draw the locus of all points equidistant from the two lines',
    instruction: 'Trace over the dashed diagonal line (the angle bisector)',
    locusType: 'angleBisector',
    referencePoints: {
      origin: { x: 250, y: 200 },
      angle: 90
    },
    referenceElements: (
      <>
        <line x1="100" y1="200" x2="400" y2="200" stroke="rgb(100 116 139)" strokeWidth="3" />
        <line x1="250" y1="50" x2="250" y2="350" stroke="rgb(100 116 139)" strokeWidth="3" />
        <circle cx="250" cy="200" r="4" fill="rgb(34 211 238)" />
      </>
    ),
    explanation: 'The angle bisector splits the 90° angle into two 45° angles. Every point on this bisector is equidistant from both lines.'
  }
]
