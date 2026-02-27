import { ClipboardList } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EmptyState({
  title = 'Задач пока нет',
  description = 'Добавьте первую задачу, чтобы начать!',
  showAction = true,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
        <ClipboardList size={36} className="text-indigo-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
        {title}
      </h3>
      <p className="text-slate-400 dark:text-slate-500 text-sm mt-1 text-center max-w-xs">
        {description}
      </p>
      {showAction && (
        <Link
          to="/add"
          className="mt-6 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Создать задачу
        </Link>
      )}
    </div>
  )
}