import { useState, useRef } from 'react'
import StatusBar from '../../shared/StatusBar'

export default function LineDiagram() {
  const [distance, setDistance] = useState(60)
  const [testPoint, setTestPoint] = useState({ x: 250, y: 150 })
  const [dragging, setDragging] = useState(null)
  const [pointA, setPointA] = useState({ x: 150, y: 200 })
  const [pointB, setPointB] = useState({ x: 350, y: 200 })
  const svgRef = useRef(null)

  const TOLERANCE = 8

  // Calculate distance from point to line segment
  const distanceToLineSegment = (p, a, b) => {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const lengthSquared = dx * dx + dy * dy

    if (lengthSquared === 0) return Math.sqrt((p.x - a.x) ** 2 + (p.y - a.y) ** 2)

    const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSquared))
    const projX = a.x + t * dx
    const projY = a.y + t * dy

    return Math.sqrt((p.x - projX) ** 2 + (p.y - projY) ** 2)
  }

  const distToLine = distanceToLineSegment(testPoint, pointA, pointB)
  const distToA = Math.sqrt((testPoint.x - pointA.x) ** 2 + (testPoint.y - pointA.y) ** 2)
  const distToB = Math.sqrt((testPoint.x - pointB.x) ** 2 + (testPoint.y - pointB.y) ** 2)

  // Check if on locus: within distance from line OR within semicircle at ends
  const isOnLocus = Math.abs(distToLine - distance) < TOLERANCE ||
                    Math.abs(distToA - distance) < TOLERANCE ||
                    Math.abs(distToB - distance) < TOLERANCE

  const handlePointerDown = (e, pointId) => {
    setDragging(pointId)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!dragging) return

    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse())

    if (dragging === 'test') setTestPoint({ x: svgP.x, y: svgP.y })
    if (dragging === 'A') setPointA({ x: svgP.x, y: svgP.y })
    if (dragging === 'B') setPointB({ x: svgP.x, y: svgP.y })
  }

  const handlePointerUp = (e) => {
    setDragging(null)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  // Calculate perpendicular offsets for parallel lines
  const lineLength = Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2)
  const perpX = -(pointB.y - pointA.y) / lineLength
  const perpY = (pointB.x - pointA.x) / lineLength

  const measurements = [
    { label: 'Distance to line', value: `${distToLine.toFixed(1)}px` },
    { label: 'Distance to A', value: `${distToA.toFixed(1)}px` },
    { label: 'Distance to B', value: `${distToB.toFixed(1)}px` },
    { label: 'Target distance', value: `${distance.toFixed(1)}px` }
  ]

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Adjust Distance: {distance.toFixed(0)}px
        </label>
        <input
          type="range"
          min="30"
          max="90"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 500 400"
        className="w-full bg-slate-950 rounded-lg"
        style={{ touchAction: 'none' }}
      >
        {/* Grid */}
        <defs>
          <pattern id="grid-line" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgb(71 85 105)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid-line)" />

        {/* Locus - stadium shape */}
        {/* Top parallel line */}
        <line
          x1={pointA.x + perpX * distance}
          y1={pointA.y + perpY * distance}
          x2={pointB.x + perpX * distance}
          y2={pointB.y + perpY * distance}
          stroke="rgb(34 211 238)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        {/* Bottom parallel line */}
        <line
          x1={pointA.x - perpX * distance}
          y1={pointA.y - perpY * distance}
          x2={pointB.x - perpX * distance}
          y2={pointB.y - perpY * distance}
          stroke="rgb(34 211 238)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        {/* Semicircle at A */}
        <circle
          cx={pointA.x}
          cy={pointA.y}
          r={distance}
          fill="none"
          stroke="rgb(34 211 238)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        {/* Semicircle at B */}
        <circle
          cx={pointB.x}
          cy={pointB.y}
          r={distance}
          fill="none"
          stroke="rgb(34 211 238)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Line segment AB */}
        <line
          x1={pointA.x}
          y1={pointA.y}
          x2={pointB.x}
          y2={pointB.y}
          stroke="rgb(100 116 139)"
          strokeWidth="3"
        />

        {/* Points A and B (draggable) */}
        <circle
          cx={pointA.x}
          cy={pointA.y}
          r="6"
          fill="rgb(34 211 238)"
          cursor="grab"
          onPointerDown={(e) => handlePointerDown(e, 'A')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ cursor: dragging === 'A' ? 'grabbing' : 'grab' }}
        />
        <text x={pointA.x - 20} y={pointA.y - 10} fill="rgb(34 211 238)" fontSize="14" fontWeight="bold">
          A
        </text>

        <circle
          cx={pointB.x}
          cy={pointB.y}
          r="6"
          fill="rgb(34 211 238)"
          cursor="grab"
          onPointerDown={(e) => handlePointerDown(e, 'B')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ cursor: dragging === 'B' ? 'grabbing' : 'grab' }}
        />
        <text x={pointB.x + 10} y={pointB.y - 10} fill="rgb(34 211 238)" fontSize="14" fontWeight="bold">
          B
        </text>

        {/* Test point (draggable) */}
        <circle
          cx={testPoint.x}
          cy={testPoint.y}
          r="12"
          fill={isOnLocus ? 'rgb(16 185 129)' : 'rgb(244 63 94)'}
          cursor="grab"
          onPointerDown={(e) => handlePointerDown(e, 'test')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ cursor: dragging === 'test' ? 'grabbing' : 'grab' }}
        />
        <text x={testPoint.x + 12} y={testPoint.y - 10} fill="white" fontSize="14" fontWeight="bold">
          Test
        </text>
      </svg>

      <StatusBar measurements={measurements} isOnLocus={isOnLocus} />

      <div className="mt-4 text-sm text-slate-400">
        💡 <strong>Drag points A and B</strong> to change the line, or drag the <strong>test point</strong> to explore the stadium-shaped locus!
      </div>
    </div>
  )
}
