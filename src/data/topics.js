export const topics = [
  {
    id: 'point',
    title: 'Locus Equidistant from a Point',
    description: 'A locus of points at a fixed distance from a single point P forms a circle with center P.',
    tip: '💡 Think of it like a rope tied to a stake - wherever you walk, you trace a circle!',
    example: {
      question: 'A goat is tied to a post with a 5m rope. Draw the locus of points the goat can reach.',
      answer: 'The locus is a circle with radius 5m, centered at the post. The goat can reach any point within or on this circle.'
    },
    diagramType: 'point'
  },
  {
    id: 'line',
    title: 'Locus Equidistant from a Line Segment',
    description: 'A locus of points at a fixed distance from a line segment AB forms two parallel lines and two semicircles at the ends (like a running track or stadium shape).',
    tip: '💡 Imagine a running track - straight sides with curved ends!',
    example: {
      question: 'A treasure is buried 3m from a straight path. Draw the locus of possible locations.',
      answer: 'The locus consists of two parallel lines, each 3m from the path, plus semicircular ends with radius 3m at both ends of the path.'
    },
    diagramType: 'line'
  },
  {
    id: 'twoPoints',
    title: 'Locus Equidistant from Two Points',
    description: 'A locus of points equidistant from two points A and B is the perpendicular bisector of the line joining A and B.',
    tip: '💡 It\'s the "middle" line that keeps you equally far from both points!',
    example: {
      question: 'Points A and B are 10cm apart. Find the locus of points equidistant from A and B.',
      answer: 'The locus is the perpendicular bisector of AB - a straight line passing through the midpoint of AB at right angles.'
    },
    diagramType: 'twoPoints'
  },
  {
    id: 'twoLines',
    title: 'Locus Equidistant from Two Lines',
    description: 'A locus of points equidistant from two intersecting lines is the angle bisector of those lines.',
    tip: '💡 The bisector splits the angle perfectly in half - like cutting a pizza slice down the middle!',
    example: {
      question: 'Two roads meet at an angle. A new lamp post must be equidistant from both roads. Where should it be placed?',
      answer: 'The lamp post should be placed anywhere along the angle bisector of the two roads, which divides the angle between them in half.'
    },
    diagramType: 'twoLines'
  }
]
