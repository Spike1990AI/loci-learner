import { useState, useRef } from 'react'

export default function DrawingQuestion({ question, onComplete }) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [path, setPath] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const [showGuide, setShowGuide] = useState(true)
  const svgRef = useRef(null)

  const handlePointerDown = (e) => {
    setIsDrawing(true)
    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse())
    setPath([{ x: svgP.x, y: svgP.y }])
  }

  const handlePointerMove = (e) => {
    if (!isDrawing) return

    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse())
    setPath(prev => [...prev, { x: svgP.x, y: svgP.y }])
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
  }

  const handleClear = () => {
    setPath([])
    setSubmitted(false)
    setResult(null)
    setShowGuide(true)
  }

  const handleSubmit = () => {
    if (path.length < 10) {
      alert('Please draw a longer path')
      return
    }

    // Validate the drawn path against the expected locus type
    const isCorrect = validatePath(path, question.locusType, question.referencePoints)
    setResult(isCorrect)
    setSubmitted(true)
  }

  const validatePath = (drawnPath, locusType, referencePoints) => {
    if (drawnPath.length < 10) return false

    const TOLERANCE = 20 // pixels

    switch (locusType) {
      case 'circle': {
        // Check if path forms a circle around center point
        const center = referencePoints.center
        const expectedRadius = referencePoints.radius

        // Calculate average distance from center
        const distances = drawnPath.map(p =>
          Math.sqrt(Math.pow(p.x - center.x, 2) + Math.pow(p.y - center.y, 2))
        )
        const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length
        const variance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length

        // Check if average radius is close to expected and variance is low (consistent circle)
        return Math.abs(avgDistance - expectedRadius) < TOLERANCE && variance < TOLERANCE * TOLERANCE
      }

      case 'perpendicularBisector': {
        // Check if path is a straight line perpendicular to line AB
        const { pointA, pointB } = referencePoints
        const midX = (pointA.x + pointB.x) / 2
        const midY = (pointA.y + pointB.y) / 2

        // Check if most points are close to the perpendicular bisector
        const correctPoints = drawnPath.filter(p => {
          // For horizontal AB, bisector is vertical through midpoint
          if (Math.abs(pointA.y - pointB.y) < 10) {
            return Math.abs(p.x - midX) < TOLERANCE
          }
          // For vertical AB, bisector is horizontal through midpoint
          if (Math.abs(pointA.x - pointB.x) < 10) {
            return Math.abs(p.y - midY) < TOLERANCE
          }
          // General case: perpendicular line
          const slope = (pointB.y - pointA.y) / (pointB.x - pointA.x)
          const perpSlope = -1 / slope
          const expectedY = midY + perpSlope * (p.x - midX)
          return Math.abs(p.y - expectedY) < TOLERANCE
        })

        return correctPoints.length / drawnPath.length > 0.7 // 70% of points must be correct
      }

      case 'angleBisector': {
        // Check if path bisects the angle
        const { origin, angle } = referencePoints
        const bisectorAngle = angle / 2

        const correctPoints = drawnPath.filter(p => {
          const dx = p.x - origin.x
          const dy = p.y - origin.y
          const pointAngle = Math.atan2(dy, dx) * 180 / Math.PI

          // Normalize angles
          const diff = Math.abs(pointAngle - bisectorAngle)
          return diff < 15 || Math.abs(diff - 360) < 15 // Within 15 degrees
        })

        return correctPoints.length / drawnPath.length > 0.7
      }

      default:
        return false
    }
  }

  // Render guide based on locus type
  const renderGuide = () => {
    if (!showGuide) return null

    const { locusType, referencePoints } = question

    switch (locusType) {
      case 'circle': {
        const { center, radius } = referencePoints
        return (
          <circle
            cx={center.x}
            cy={center.y}
            r={radius}
            fill="none"
            stroke="rgb(34 211 238)"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.4"
          />
        )
      }

      case 'perpendicularBisector': {
        const { pointA, pointB } = referencePoints
        const midX = (pointA.x + pointB.x) / 2

        // Draw vertical line through midpoint
        return (
          <line
            x1={midX}
            y1={50}
            x2={midX}
            y2={350}
            stroke="rgb(34 211 238)"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.4"
          />
        )
      }

      case 'angleBisector': {
        const { origin, angle } = referencePoints
        const bisectorAngle = (angle / 2) * Math.PI / 180
        const length = 200

        return (
          <line
            x1={origin.x - Math.cos(bisectorAngle) * length}
            y1={origin.y - Math.sin(bisectorAngle) * length}
            x2={origin.x + Math.cos(bisectorAngle) * length}
            y2={origin.y + Math.sin(bisectorAngle) * length}
            stroke="rgb(34 211 238)"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.4"
          />
        )
      }

      default:
        return null
    }
  }

  // Convert path array to SVG path string
  const pathString = path.length > 0
    ? `M ${path.map(p => `${p.x},${p.y}`).join(' L ')}`
    : ''

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4">
        {question.question}
      </h3>

      <p className="text-slate-300 text-sm mb-2">
        {question.instruction || 'Draw the locus on the diagram below'}
      </p>

      {/* Guide Toggle */}
      {!submitted && (
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            {showGuide ? '👁️ Hide Guide' : '👁️‍🗨️ Show Guide'}
          </button>
          <span className="text-xs text-slate-500">
            (Dashed cyan line shows the target locus)
          </span>
        </div>
      )}

      {/* Drawing Canvas */}
      <div className="bg-slate-900 rounded-lg overflow-hidden mb-4">
        <svg
          ref={svgRef}
          viewBox="0 0 500 400"
          className="w-full"
          style={{ touchAction: 'none' }}
          onPointerDown={!submitted ? handlePointerDown : undefined}
          onPointerMove={!submitted ? handlePointerMove : undefined}
          onPointerUp={!submitted ? handlePointerUp : undefined}
        >
          {/* Grid */}
          <defs>
            <pattern id="grid-draw" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgb(71 85 105)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="500" height="400" fill="url(#grid-draw)" />

          {/* Reference points/lines from question */}
          {question.referenceElements}

          {/* Guide (dashed cyan line showing the target) */}
          {renderGuide()}

          {/* User's drawn path */}
          {path.length > 0 && (
            <path
              d={pathString}
              fill="none"
              stroke={submitted ? (result ? 'rgb(16 185 129)' : 'rgb(244 63 94)') : 'rgb(244 114 182)'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!submitted ? (
          <>
            <button
              onClick={handleClear}
              disabled={path.length === 0}
              className="flex-1 px-4 py-3 bg-slate-700 active:bg-slate-600 text-slate-200 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              disabled={path.length < 10}
              className="flex-1 px-4 py-3 bg-primary-500 active:bg-primary-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-3 bg-slate-700 active:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => onComplete(result)}
              className="flex-1 px-4 py-3 bg-primary-500 active:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
            >
              Continue
            </button>
          </>
        )}
      </div>

      {/* Result feedback */}
      {submitted && (
        <div className={`mt-4 p-4 rounded-lg ${
          result
            ? 'bg-emerald-900/30 border border-emerald-500/50'
            : 'bg-rose-900/30 border border-rose-500/50'
        }`}>
          <h4 className="font-semibold mb-2 text-slate-100">
            {result ? 'Correct! 🎉' : 'Not quite...'}
          </h4>
          <p className="text-slate-300 text-sm">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
