export default function Question({ question, selectedAnswer, showExplanation, onAnswerSelect }) {
  const isIDK = selectedAnswer === 'idk'

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6">
        {question.question}
      </h3>

      {/* Visual diagram if this is a visual question */}
      {question.diagram && (
        <div className="mb-6 bg-slate-900 rounded-lg p-4">
          <img
            src={question.diagram}
            alt="Question diagram"
            className="w-full max-w-md mx-auto"
          />
        </div>
      )}

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correct
          const showResult = showExplanation

          let buttonClasses = 'w-full text-left p-3 sm:p-4 rounded-lg font-medium transition-all text-sm sm:text-base '

          if (!showResult) {
            // Before answering
            buttonClasses += 'bg-slate-700 active:bg-slate-600 text-slate-200'
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
      </div>

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
