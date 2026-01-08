import { useState } from 'react'
import Navigation from './components/Navigation'
import LearnMode from './components/learn/LearnMode'
import QuizMode from './components/quiz/QuizMode'

function App() {
  const [mode, setMode] = useState('learn') // 'learn' or 'quiz'

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation mode={mode} setMode={setMode} />
      <main className="container mx-auto px-4 py-8">
        {mode === 'learn' ? <LearnMode /> : <QuizMode />}
      </main>
    </div>
  )
}

export default App
