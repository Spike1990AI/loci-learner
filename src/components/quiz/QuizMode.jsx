import { useState } from 'react'
import { questions } from '../../data/questions'
import Question from './Question'
import Results from './Results'

export default function QuizMode() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const handleAnswerSelect = (answerIndex) => {
    if (showExplanation) return // Already answered

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizComplete(false)
  }

  if (quizComplete) {
    return <Results score={score} total={questions.length} onRestart={handleRestart} />
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-100">
          Loci Quiz
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="bg-slate-800 px-4 py-2 rounded-lg">
            <span className="text-primary-400 font-bold">Score: {score}/{questions.length}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8 bg-slate-800 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-500 to-accent-500 h-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <Question
        question={questions[currentQuestion]}
        selectedAnswer={selectedAnswer}
        showExplanation={showExplanation}
        onAnswerSelect={handleAnswerSelect}
      />

      {showExplanation && (
        <button
          onClick={handleNext}
          className="w-full mt-6 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  )
}
