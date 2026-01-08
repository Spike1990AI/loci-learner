import { useState, useRef } from 'react'
import StatusBar from '../../shared/StatusBar'

export default function PointDiagram() {
  const [radius, setRadius] = useState(100)
  const [testPoint, setTestPoint] = useState({ x: 250, y: 200 })
  const [dragging, setDragging] = useState(false)
  const svgRef = useRef(null)

  const centerP = { x: 250, y: 200 }
  const TOLERANCE = 8

  // Calculate distance from test point to center
  const distance = Math.sqrt(
    Math.pow(testPoint.x - centerP.x, 2) + Math.pow(testPoint.y - centerP.y, 2)
  )

  const isOnLocus = Math.abs(distance - radius) < TOLERANCE

  const handlePointerDown = (e, pointId) => {
    if (pointId === 'test') {
      setDragging(true)
      e.currentTarget.setPointerCapture(e.pointerId)
    }
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

  const measurements = [
    { label: 'Distance from P', value: `${distance.toFixed(1)}px` },
    { label: 'Target radius', value: `${radius.toFixed(1)}px` },
    { label: 'Difference', value: `${Math.abs(distance - radius).toFixed(1)}px` }
  ]

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Adjust Radius: {radius.toFixed(0)}px
        </label>
        <input
          type="range"
          min="50"
          max="150"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
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
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgb(71 85 105)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid)" />

        {/* Locus circle */}
        <circle
          cx={centerP.x}
          cy={centerP.y}
          r={radius}
          fill="none"
          stroke="rgb(34 211 238)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Center point P */}
        <circle
          cx={centerP.x}
          cy={centerP.y}
          r="6"
          fill="rgb(34 211 238)"
        />
        <text x={centerP.x + 12} y={centerP.y - 10} fill="rgb(34 211 238)" fontSize="14" fontWeight="bold">
          P
        </text>

        {/* Test point (draggable) */}
        <circle
          cx={testPoint.x}
          cy={testPoint.y}
          r="8"
          fill={isOnLocus ? 'rgb(16 185 129)' : 'rgb(244 63 94)'}
          cursor="grab"
          onPointerDown={(e) => handlePointerDown(e, 'test')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        />
        <text x={testPoint.x + 12} y={testPoint.y - 10} fill="white" fontSize="14" fontWeight="bold">
          Test
        </text>

        {/* Distance line */}
        <line
          x1={centerP.x}
          y1={centerP.y}
          x2={testPoint.x}
          y2={testPoint.y}
          stroke="rgb(148 163 184)"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
      </svg>

      <StatusBar measurements={measurements} isOnLocus={isOnLocus} />

      <div className="mt-4 text-sm text-slate-400">
        💡 <strong>Try dragging</strong> the test point around. It turns <strong className="text-emerald-400">green</strong> when it's on the circle!
      </div>
    </div>
  )
}
