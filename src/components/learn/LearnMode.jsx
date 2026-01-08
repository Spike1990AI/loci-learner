import { useState } from 'react'
import { topics } from '../../data/topics'
import TopicCard from './TopicCard'

export default function LearnMode() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0])

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-100">
        Learn About Loci
      </h2>

      {/* Topic Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className={`p-3 sm:p-4 rounded-lg font-medium transition-all text-xs sm:text-sm min-h-[60px] sm:min-h-[auto] ${
              selectedTopic.id === topic.id
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                : 'bg-slate-800 text-slate-300 active:bg-slate-700'
            }`}
          >
            {topic.title.replace('Locus Equidistant from ', '')}
          </button>
        ))}
      </div>

      {/* Selected Topic Card */}
      <TopicCard topic={selectedTopic} />
    </div>
  )
}
