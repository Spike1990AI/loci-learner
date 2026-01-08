export const topics = [
  {
    id: 'point',
    title: 'Locus Equidistant from a Point',
    description: 'A locus of points at a fixed distance from a single point P forms a circle with center P.',
    tip: '💡 Think of it like a rope tied to a stake - wherever you walk, you trace a circle!',
    keyTerms: [
      { term: 'Locus', definition: 'A set of points that satisfy a particular rule or condition' },
      { term: 'Equidistant', definition: 'At an equal distance from a point, line, or surface' },
      { term: 'Radius', definition: 'The fixed distance from the center point to any point on the circle' },
      { term: 'Circle', definition: 'The shape formed by all points at a fixed distance from a center point' }
    ],
    examples: [
      {
        question: 'A goat is tied to a post with a 5m rope. Draw the locus of points the goat can reach.',
        answer: 'The locus is a circle with radius 5m, centered at the post. The goat can reach any point within or on this circle.'
      },
      {
        question: 'A radio mast broadcasts a signal with a range of 30km. What is the locus of all locations exactly 30km from the mast?',
        answer: 'A circle with radius 30km, centered at the mast. This is the boundary of the signal coverage area.'
      },
      {
        question: 'A sprinkler rotates and waters all grass within 8m. Draw the locus of the wet grass boundary.',
        answer: 'A circle with radius 8m, centered at the sprinkler position.'
      },
      {
        question: 'A lighthouse can be seen from 25km away. What is the locus of points where the lighthouse is just visible?',
        answer: 'A circle with radius 25km, centered at the lighthouse. This represents the visibility boundary.'
      }
    ],
    diagramType: 'point'
  },
  {
    id: 'line',
    title: 'Locus Equidistant from a Line Segment',
    description: 'A locus of points at a fixed distance from a line segment AB forms two parallel lines and two semicircles at the ends (like a running track or stadium shape).',
    tip: '💡 Imagine a running track - straight sides with curved ends!',
    keyTerms: [
      { term: 'Line segment', definition: 'A straight line with two endpoints (not infinite)' },
      { term: 'Parallel lines', definition: 'Lines that are always the same distance apart and never meet' },
      { term: 'Semicircle', definition: 'Half of a circle, formed at each end of the line segment' },
      { term: 'Stadium shape', definition: 'The shape formed: two parallel lines with semicircular ends (like a running track)' }
    ],
    examples: [
      {
        question: 'A treasure is buried 3m from a straight path. Draw the locus of possible locations.',
        answer: 'The locus consists of two parallel lines, each 3m from the path, plus semicircular ends with radius 3m at both ends of the path - forming a stadium shape.'
      },
      {
        question: 'A railway line runs straight for 500m. Safety rules require all buildings to be at least 10m from the track. Show the boundary.',
        answer: 'A stadium shape: two parallel lines 10m either side of the track, with semicircular ends of radius 10m at both ends of the 500m section.'
      },
      {
        question: 'A 20m fence stands in a field. You want to plant flowers exactly 2m from the fence. Where can you plant them?',
        answer: 'Form a stadium shape with the fence as the center line: parallel lines 2m on each side, and semicircular caps of radius 2m at each end.'
      },
      {
        question: 'A motorway bridge is 100m long. For safety, no trees can be within 5m of the bridge edge. Draw the exclusion zone.',
        answer: 'A stadium-shaped zone: parallel boundaries 5m either side of the bridge, with semicircular ends of radius 5m.'
      }
    ],
    diagramType: 'line'
  },
  {
    id: 'twoPoints',
    title: 'Locus Equidistant from Two Points',
    description: 'A locus of points equidistant from two points A and B is the perpendicular bisector of the line joining A and B.',
    tip: '💡 It\'s the "middle" line that keeps you equally far from both points!',
    keyTerms: [
      { term: 'Perpendicular', definition: 'At right angles (90°) to a line or surface' },
      { term: 'Bisector', definition: 'A line that divides something into two equal parts' },
      { term: 'Perpendicular bisector', definition: 'A line that cuts another line in half at 90°' },
      { term: 'Midpoint', definition: 'The exact center point between two other points' }
    ],
    examples: [
      {
        question: 'Points A and B are 10cm apart. Find the locus of points equidistant from A and B.',
        answer: 'The perpendicular bisector of AB - a straight line passing through the midpoint of AB at 90° to the line AB.'
      },
      {
        question: 'Two shops A and B are in a town. Draw the boundary where customers are equally likely to visit either shop.',
        answer: 'The perpendicular bisector of the line AB. Anyone on this line is the same distance from both shops.'
      },
      {
        question: 'A new school will serve villages P and Q. Where should it be built so it\'s equally far from both villages?',
        answer: 'Anywhere on the perpendicular bisector of PQ. Every point on this line is equidistant from both villages.'
      },
      {
        question: 'Two mobile phone towers A and B overlap their coverage. At what line do they have equal signal strength?',
        answer: 'The perpendicular bisector of AB divides the coverage area equally - equal distance means equal signal strength.'
      },
      {
        question: 'You\'re exactly the same distance from London and Manchester. Draw all possible locations you could be.',
        answer: 'A straight line perpendicular to and passing through the midpoint of the line joining London and Manchester.'
      }
    ],
    diagramType: 'twoPoints'
  },
  {
    id: 'twoLines',
    title: 'Locus Equidistant from Two Lines',
    description: 'A locus of points equidistant from two intersecting lines is the angle bisector of those lines.',
    tip: '💡 The bisector splits the angle perfectly in half - like cutting a pizza slice down the middle!',
    keyTerms: [
      { term: 'Angle', definition: 'The amount of turn between two lines that meet at a point, measured in degrees' },
      { term: 'Angle bisector', definition: 'A line that divides an angle into two equal parts' },
      { term: 'Intersecting lines', definition: 'Two or more lines that cross each other at a point' },
      { term: 'Perpendicular distance', definition: 'The shortest distance from a point to a line (at 90° to the line)' }
    ],
    examples: [
      {
        question: 'Two roads meet at an angle. A new lamp post must be equidistant from both roads. Where should it be placed?',
        answer: 'Anywhere along the angle bisector - the line that splits the angle between the roads exactly in half.'
      },
      {
        question: 'Two walls meet in a corner at 90°. You want to hang a picture equally far from both walls. Where do you position it?',
        answer: 'On the angle bisector - a line at 45° from each wall, splitting the 90° angle in half.'
      },
      {
        question: 'A river splits into two streams that meet at 60°. A bridge must be built equidistant from both streams. Show where.',
        answer: 'The bridge can be built anywhere along the angle bisector, which makes a 30° angle with each stream.'
      },
      {
        question: 'Two laser beams meet at a point. A sensor must be placed the same distance from both beams. Where is the locus?',
        answer: 'The angle bisector of the two laser beams. This line divides the angle equally and keeps equidistant from both.'
      },
      {
        question: 'A tent is pitched in the corner formed by two fences meeting at 120°. The tent entrance should be equally far from each fence. Where?',
        answer: 'Face the tent along the angle bisector, which is at 60° from each fence (splitting the 120° angle in half).'
      }
    ],
    diagramType: 'twoLines'
  }
]
