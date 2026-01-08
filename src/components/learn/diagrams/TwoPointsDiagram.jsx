import { useState, useRef } from 'react'
import StatusBar from '../../shared/StatusBar'

export default function TwoPointsDiagram() {
  const [testPoint, setTestPoint] = useState({ x: 250, y: 200 })
  const [dragging, setDragging] = useState(null)
  const [pointA, setPointA] = useState({ x: 180, y: 200 })
  const [pointB, setPointB] = useState({ x: 320, y: 200 })
  const svgRef = useRef(null)

  const TOLERANCE = 10

  // Calculate distances
  const distToA = Math.sqrt((testPoint.x - pointA.x) ** 2 + (testPoint.y - pointA.y) ** 2)
  const distToB = Math.sqrt((testPoint.x - pointB.x) ** 2 + (testPoint.y - pointB.y) ** 2)
  const diff = Math.abs(distToA - distToB)

  const isOnLocus = diff < TOLERANCE

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

  // Calculate perpendicular bisector
  const midX = (pointA.x + pointB.x) / 2
  const midY = (pointA.y + pointB.y) / 2

  // Perpendicular direction
  const dx = pointB.x - pointA.x
  const dy = pointB.y - pointA.y
  const length = Math.sqrt(dx * dx + dy * dy)
  const perpX = -dy / length
  const perpY = dx / length

  // Extend bisector across the canvas
  const bisectorLength = 300
  const bisectorStart = {
    x: midX - perpX * bisectorLength,
    y: midY - perpY * bisectorLength
  }
  const bisectorEnd = {
    x: midX + perpX * bisectorLength,
    y: midY + perpY * bisectorLength
  }

  const measurements = [
    { label: 'Distance to A', value: `${distToA.toFixed(1)}px` },
    { label: 'Distance to B', value: `${distToB.toFixed(1)}px` },
    { label: 'Difference', value: `${diff.toFixed(1)}px` }
  ]

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox="0 0 500 400"
        className="w-full bg-slate-950 rounded-lg"
        style={{ touchAction: 'none' }}
      >
        {/* Grid */}
        <defs>
          <pattern id="grid-two-points" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgb(71 85 105)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid-two-points)" />

        {/* Line connecting A and B */}
        <line
          x1={pointA.x}
          y1={pointA.y}
          x2={pointB.x}
          y2={pointB.y}
          stroke="rgb(100 116 139)"
          strokeWidth="2"
        />

        {/* Perpendicular bisector (the locus) */}
        <line
          x1={bisectorStart.x}
          y1={bisectorStart.y}
          x2={bisectorEnd.x}
          y2={bisectorEnd.y}
          stroke="rgb(34 211 238)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Midpoint marker */}
        <circle cx={midX} cy={midY} r="3" fill="rgb(34 211 238)" opacity="0.5" />

        {/* Distance lines from test point */}
        <line
          x1={testPoint.x}
          y1={testPoint.y}
          x2={pointA.x}
          y2={pointA.y}
          stroke="rgb(244 114 182)"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.6"
        />
        <line
          x1={testPoint.x}
          y1={testPoint.y}
          x2={pointB.x}
          y2={pointB.y}
          stroke="rgb(244 114 182)"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.6"
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
        💡 <strong>Drag points A and B</strong> to move them, or drag the <strong>test point</strong>. It turns green when equidistant from both!
      </div>
    </div>
  )
}
