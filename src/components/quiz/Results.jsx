export default function Results({ score, total, onRestart }) {
  const percentage = (score / total) * 100

  // Determine message based on score
  let message, emoji, colorClass
  if (percentage === 100) {
    message = 'Perfect score! You\'ve mastered loci!'
    emoji = '🏆'
    colorClass = 'text-primary-400'
  } else if (percentage >= 75) {
    message = 'Excellent work! You really understand loci!'
    emoji = '⭐'
    colorClass = 'text-primary-400'
  } else if (percentage >= 50) {
    message = 'Good effort! Keep practicing and you\'ll get there!'
    emoji = '👍'
    colorClass = 'text-accent-400'
  } else {
    message = 'Keep learning! Try the Learn mode again and come back.'
    emoji = '💪'
    colorClass = 'text-accent-500'
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">{emoji}</div>

        <h2 className="text-3xl font-bold text-slate-100 mb-4">
          Quiz Complete!
        </h2>

        <div className="mb-6">
          <div className={`text-6xl font-bold ${colorClass} mb-2`}>
            {score}/{total}
          </div>
          <div className="text-2xl text-slate-400">
            {percentage.toFixed(0)}%
          </div>
        </div>

        <p className="text-xl text-slate-300 mb-8">
          {message}
        </p>

        {/* Score breakdown */}
        <div className="bg-slate-900 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-emerald-400 text-3xl font-bold">{score}</div>
              <div className="text-slate-400 text-sm">Correct</div>
            </div>
            <div>
              <div className="text-rose-400 text-3xl font-bold">{total - score}</div>
              <div className="text-slate-400 text-sm">Incorrect</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${colorClass}`}>{percentage.toFixed(0)}%</div>
              <div className="text-slate-400 text-sm">Score</div>
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
