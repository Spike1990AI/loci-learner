export default function Question({ question, selectedAnswer, showExplanation, onAnswerSelect }) {
  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6">
      <h3 className="text-xl font-semibold text-slate-100 mb-6">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correct
          const showResult = showExplanation

          let buttonClasses = 'w-full text-left p-4 rounded-lg font-medium transition-all '

          if (!showResult) {
            // Before answering
            buttonClasses += 'bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white'
          } else {
            // After answering
            if (isCorrect) {
              buttonClasses += 'bg-emerald-500 text-white'
            } else if (isSelected && !isCorrect) {
              buttonClasses += 'bg-rose-500 text-white'
            } else {
              buttonClasses += 'bg-slate-700 text-slate-400'
            }
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={showExplanation}
              className={buttonClasses}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && (
                  <>
                    {isCorrect && <span className="text-xl">✓</span>}
                    {isSelected && !isCorrect && <span className="text-xl">✗</span>}
                  </>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`mt-6 p-4 rounded-lg ${
          selectedAnswer === question.correct
            ? 'bg-emerald-900/30 border border-emerald-500/50'
            : 'bg-rose-900/30 border border-rose-500/50'
        }`}>
          <h4 className="font-semibold mb-2 text-slate-100">
            {selectedAnswer === question.correct ? 'Correct! 🎉' : 'Not quite...'}
          </h4>
          <p className="text-slate-300 text-sm">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
