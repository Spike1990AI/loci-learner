import { useState, useMemo } from 'react'
import { questions } from '../../data/questions.jsx'
import Question from './Question'
import DiagramQuestion from './DiagramQuestion'
import DrawingQuestion from './DrawingQuestion'
import Results from './Results'

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Shuffle diagram options and update correct index
const shuffleDiagramQuestions = (questions) => {
  return questions.map(q => {
    if (q.type === 'diagram') {
      const correctOption = q.diagramOptions[q.correct]
      const shuffledOptions = shuffleArray(q.diagramOptions)
      const newCorrectIndex = shuffledOptions.indexOf(correctOption)

      return {
        ...q,
        diagramOptions: shuffledOptions,
        correct: newCorrectIndex
      }
    }
    return q
  })
}

export default function QuizMode() {
  const [shuffleKey, setShuffleKey] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  // Shuffle diagram questions on mount and restart
  const shuffledQuestions = useMemo(() =>
    shuffleDiagramQuestions(questions),
    [shuffleKey]
  )

  const handleAnswerSelect = (answerIndex) => {
    if (showExplanation) return // Already answered

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    // Only increment score if answer is correct (not 'idk')
    if (answerIndex !== 'idk' && answerIndex === shuffledQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handleDrawingComplete = (isCorrect) => {
    // Score the drawing question
    if (isCorrect) {
      setScore(score + 1)
    }
    // Move to next question
    handleNext()
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizComplete(false)
    setShuffleKey(prev => prev + 1) // Trigger new shuffle
  }

  if (quizComplete) {
    return <Results score={score} total={shuffledQuestions.length} onRestart={handleRestart} />
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Loci Quiz
          </h2>
          <div className="bg-slate-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg">
            <span className="text-primary-400 font-bold text-sm sm:text-base">
              {score}/{shuffledQuestions.length}
            </span>
          </div>
        </div>
        <span className="text-slate-400 text-sm sm:text-base">
          Question {currentQuestion + 1} of {shuffledQuestions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 sm:mb-8 bg-slate-800 rounded-full h-2.5 sm:h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-500 to-accent-500 h-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
        />
      </div>

      {shuffledQuestions[currentQuestion].type === 'drawing' ? (
        <DrawingQuestion
          key={shuffledQuestions[currentQuestion].id}
          question={shuffledQuestions[currentQuestion]}
          onComplete={handleDrawingComplete}
        />
      ) : shuffledQuestions[currentQuestion].type === 'diagram' ? (
        <DiagramQuestion
          question={shuffledQuestions[currentQuestion]}
          selectedAnswer={selectedAnswer}
          showExplanation={showExplanation}
          onAnswerSelect={handleAnswerSelect}
        />
      ) : (
        <Question
          question={shuffledQuestions[currentQuestion]}
          selectedAnswer={selectedAnswer}
          showExplanation={showExplanation}
          onAnswerSelect={handleAnswerSelect}
        />
      )}

      {/* Only show Next button for non-drawing questions */}
      {showExplanation && shuffledQuestions[currentQuestion].type !== 'drawing' && (
        <button
          onClick={handleNext}
          className="w-full mt-6 px-6 py-3 bg-primary-500 active:bg-primary-600 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
        >
          {currentQuestion < shuffledQuestions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  )
}
