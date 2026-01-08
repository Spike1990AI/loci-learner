export default function Navigation({ mode, setMode }) {
  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-400">
            Loci Learner
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('learn')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                mode === 'learn'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setMode('quiz')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                mode === 'quiz'
                  ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/50'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Quiz
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
