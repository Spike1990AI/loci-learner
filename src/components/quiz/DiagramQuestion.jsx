export default function DiagramQuestion({ question, selectedAnswer, showExplanation, onAnswerSelect }) {
  const isIDK = selectedAnswer === 'idk'

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6">
        {question.question}
      </h3>

      {/* Diagram options */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
        {question.diagramOptions.map((diagram, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correct
          const showResult = showExplanation

          let borderClass = 'border-2 '
          if (!showResult) {
            borderClass += isSelected ? 'border-primary-500' : 'border-slate-700'
          } else {
            if (isCorrect) {
              borderClass += 'border-emerald-500 bg-emerald-900/20'
            } else if (isSelected && !isCorrect) {
              borderClass += 'border-rose-500 bg-rose-900/20'
            } else {
              borderClass += 'border-slate-700'
            }
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={showExplanation}
              className={`relative p-3 sm:p-4 rounded-lg transition-all bg-slate-900 ${borderClass}`}
            >
              {/* Label */}
              <div className="text-xs sm:text-sm font-bold text-slate-400 mb-2">
                Option {String.fromCharCode(65 + index)}
              </div>

              {/* SVG Diagram */}
              <svg viewBox="0 0 200 200" className="w-full">
                {diagram}
              </svg>

              {/* Result indicator */}
              {showResult && (
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold">
                  {isCorrect && <span className="text-emerald-400">✓</span>}
                  {isSelected && !isCorrect && <span className="text-rose-400">✗</span>}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* I Don't Know option */}
      <button
        onClick={() => onAnswerSelect('idk')}
        disabled={showExplanation}
        className={`w-full text-center p-3 sm:p-4 rounded-lg font-medium transition-all text-sm sm:text-base border-2 ${
          !showExplanation
            ? 'border-slate-600 bg-slate-700/50 text-slate-400 active:bg-slate-600/50'
            : isIDK
            ? 'border-amber-500 bg-amber-900/30 text-amber-300'
            : 'border-slate-700 bg-slate-700/30 text-slate-500'
        }`}
      >
        🤷 I Don't Know
      </button>

      {/* Explanation */}
      {showExplanation && (
        <div className={`mt-6 p-4 rounded-lg ${
          isIDK
            ? 'bg-amber-900/30 border border-amber-500/50'
            : selectedAnswer === question.correct
            ? 'bg-emerald-900/30 border border-emerald-500/50'
            : 'bg-rose-900/30 border border-rose-500/50'
        }`}>
          <h4 className="font-semibold mb-2 text-slate-100">
            {isIDK
              ? "That's okay! Let's learn 📚"
              : selectedAnswer === question.correct
              ? 'Correct! 🎉'
              : 'Not quite...'}
          </h4>
          <p className="text-slate-300 text-sm">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
