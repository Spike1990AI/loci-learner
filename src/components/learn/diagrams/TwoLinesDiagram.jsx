import { useState, useRef } from 'react'
import StatusBar from '../../shared/StatusBar'

export default function TwoLinesDiagram() {
  const [angle, setAngle] = useState(60)
  const [testPoint, setTestPoint] = useState({ x: 300, y: 150 })
  const [dragging, setDragging] = useState(false)
  const svgRef = useRef(null)

  const origin = { x: 250, y: 250 }
  const TOLERANCE = 8

  // Convert angle to radians
  const angleRad = (angle * Math.PI) / 180

  // Calculate perpendicular distance from point to a line (defined by origin and direction)
  const distanceToLine = (point, lineOrigin, lineAngle) => {
    const dx = Math.cos(lineAngle)
    const dy = Math.sin(lineAngle)

    const vx = point.x - lineOrigin.x
    const vy = point.y - lineOrigin.y

    // Cross product gives perpendicular distance
    const crossProduct = Math.abs(vx * dy - vy * dx)
    return crossProduct
  }

  // Line 1: horizontal (0 degrees)
  const distToLine1 = distanceToLine(testPoint, origin, 0)

  // Line 2: at specified angle
  const distToLine2 = distanceToLine(testPoint, origin, -angleRad)

  const diff = Math.abs(distToLine1 - distToLine2)
  const isOnLocus = diff < TOLERANCE

  const handlePointerDown = (e) => {
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!dragging) return

    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse())

    setTestPoint({ x: svgP.x, y: svgP.y })
  }

  const handlePointerUp = (e) => {
    setDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  // Calculate line endpoints for display (long enough to cross the canvas)
  const lineLength = 400

  // Line 1 (horizontal)
  const line1End = { x: origin.x + lineLength, y: origin.y }

  // Line 2 (angled)
  const line2End = {
    x: origin.x + Math.cos(-angleRad) * lineLength,
    y: origin.y + Math.sin(-angleRad) * lineLength
  }

  // Angle bisector (splits the angle in half)
  const bisectorAngle = -angleRad / 2
  const bisectorStart = {
    x: origin.x - Math.cos(bisectorAngle) * 100,
    y: origin.y - Math.sin(bisectorAngle) * 100
  }
  const bisectorEnd = {
    x: origin.x + Math.cos(bisectorAngle) * lineLength,
    y: origin.y + Math.sin(bisectorAngle) * lineLength
  }

  const measurements = [
    { label: 'Distance to Line 1', value: `${distToLine1.toFixed(1)}px` },
    { label: 'Distance to Line 2', value: `${distToLine2.toFixed(1)}px` },
    { label: 'Difference', value: `${diff.toFixed(1)}px` }
  ]

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Adjust Angle: {angle.toFixed(0)}°
        </label>
        <input
          type="range"
          min="30"
          max="120"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
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
          <pattern id="grid-two-lines" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgb(71 85 105)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid-two-lines)" />

        {/* Line 1 (horizontal) */}
        <line
          x1={origin.x}
          y1={origin.y}
          x2={line1End.x}
          y2={line1End.y}
          stroke="rgb(100 116 139)"
          strokeWidth="3"
        />

        {/* Line 2 (angled) */}
        <line
          x1={origin.x}
          y1={origin.y}
          x2={line2End.x}
          y2={line2End.y}
          stroke="rgb(100 116 139)"
          strokeWidth="3"
        />

        {/* Angle bisector (the locus) */}
        <line
          x1={bisectorStart.x}
          y1={bisectorStart.y}
          x2={bisectorEnd.x}
          y2={bisectorEnd.y}
          stroke="rgb(34 211 238)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Origin point */}
        <circle
          cx={origin.x}
          cy={origin.y}
          r="4"
          fill="rgb(34 211 238)"
        />

        {/* Perpendicular distance indicators */}
        {/* Perpendicular from test point to line 1 */}
        <line
          x1={testPoint.x}
          y1={testPoint.y}
          x2={testPoint.x}
          y2={origin.y}
          stroke="rgb(244 114 182)"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.5"
        />

        {/* Test point (draggable) */}
        <circle
          cx={testPoint.x}
          cy={testPoint.y}
          r="8"
          fill={isOnLocus ? 'rgb(16 185 129)' : 'rgb(244 63 94)'}
          cursor="grab"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        />
        <text x={testPoint.x + 12} y={testPoint.y - 10} fill="white" fontSize="14" fontWeight="bold">
          Test
        </text>
      </svg>

      <StatusBar measurements={measurements} isOnLocus={isOnLocus} />

      <div className="mt-4 text-sm text-slate-400">
        💡 <strong>Adjust the angle</strong> between the lines and <strong>drag the test point</strong>. It turns green when equidistant from both lines!
      </div>
    </div>
  )
}
