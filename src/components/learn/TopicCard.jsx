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
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary-400">{topic.title}</h3>
        <p className="text-slate-300 text-base sm:text-lg">{topic.description}</p>
        <div className="bg-slate-700/50 border border-primary-400/30 rounded-lg p-3 sm:p-4">
          <p className="text-primary-300 text-sm sm:text-base">{topic.tip}</p>
        </div>
      </div>

      {/* Key Terms */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <h4 className="text-base sm:text-lg font-semibold text-primary-400 mb-3">
          📚 Key Terms
        </h4>
        <div className="grid gap-3">
          {topic.keyTerms.map((item, index) => (
            <div key={index} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
              <dt className="font-semibold text-accent-400 text-sm sm:text-base mb-1">
                {item.term}
              </dt>
              <dd className="text-slate-300 text-xs sm:text-sm">
                {item.definition}
              </dd>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Diagram */}
      <div className="bg-slate-900 p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-semibold text-primary-400 mb-3">
          🎯 Interactive Diagram
        </h4>
        <DiagramComponent />
      </div>

      {/* Example Questions */}
      <div className="p-4 sm:p-6 bg-slate-800/50 border-t border-slate-700">
        <h4 className="text-lg sm:text-xl font-semibold text-accent-400 mb-4">
          💡 Example Questions ({topic.examples.length})
        </h4>
        <div className="space-y-4">
          {topic.examples.map((example, index) => (
            <div key={index} className="border border-slate-700 rounded-lg overflow-hidden">
              <div className="bg-slate-700/30 p-3 sm:p-4">
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-slate-200 text-sm sm:text-base">{example.question}</p>
                </div>
              </div>
              <div className="bg-slate-900/50 p-3 sm:p-4">
                <div className="flex items-start gap-2">
                  <span className="text-primary-400 font-semibold text-xs sm:text-sm flex-shrink-0">
                    Answer:
                  </span>
                  <p className="text-slate-300 text-xs sm:text-sm">{example.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
