import PointDiagram from './diagrams/PointDiagram'
import LineDiagram from './diagrams/LineDiagram'
import TwoPointsDiagram from './diagrams/TwoPointsDiagram'
import TwoLinesDiagram from './diagrams/TwoLinesDiagram'

const diagramComponents = {
  point: PointDiagram,
  line: LineDiagram,
  twoPoints: TwoPointsDiagram,
  twoLines: TwoLinesDiagram
}

export default function TopicCard({ topic }) {
  const DiagramComponent = diagramComponents[topic.diagramType]

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
      {/* Topic Info */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-primary-400">{topic.title}</h3>
        <p className="text-slate-300 text-lg">{topic.description}</p>
        <div className="bg-slate-700/50 border border-primary-400/30 rounded-lg p-4">
          <p className="text-primary-300">{topic.tip}</p>
        </div>
      </div>

      {/* Interactive Diagram */}
      <div className="bg-slate-900 p-6">
        <DiagramComponent />
      </div>

      {/* Example Question */}
      <div className="p-6 bg-slate-800/50 border-t border-slate-700">
        <h4 className="text-lg font-semibold text-accent-400 mb-2">Example Question:</h4>
        <p className="text-slate-300 mb-4">{topic.example.question}</p>
        <div className="bg-slate-900 rounded-lg p-4">
          <h5 className="text-sm font-semibold text-primary-400 mb-2">Answer:</h5>
          <p className="text-slate-300 text-sm">{topic.example.answer}</p>
        </div>
      </div>
    </div>
  )
}
