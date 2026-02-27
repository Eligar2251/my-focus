import { Loader2 } from 'lucide-react'

export default function Loader({ text = 'Загрузка...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <Loader2
        size={40}
        className="animate-spin text-indigo-500 dark:text-indigo-400"
      />
      <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">
        {text}
      </p>
    </div>
  )
}