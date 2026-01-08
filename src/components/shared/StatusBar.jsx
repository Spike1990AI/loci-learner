export default function StatusBar({ measurements, isOnLocus }) {
  return (
    <div className="mt-4 p-4 bg-slate-800 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-400">Status:</span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            isOnLocus
              ? 'bg-emerald-500 text-white'
              : 'bg-rose-500 text-white'
          }`}
        >
          {isOnLocus ? 'ON LOCUS ✓' : 'NOT ON LOCUS ✗'}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        {measurements.map((m, i) => (
          <div key={i} className="flex justify-between text-slate-300">
            <span>{m.label}:</span>
            <span className="font-mono">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
