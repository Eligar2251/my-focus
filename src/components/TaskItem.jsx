import { Trash2, Check } from 'lucide-react'

const categoryStyles = {
  work: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    label: 'Работа',
  },
  personal: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    label: 'Личное',
  },
  study: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-600 dark:text-amber-400',
    label: 'Учёба',
  },
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const cat = categoryStyles[task.category] || categoryStyles.personal

  return (
    <div
      className={`group flex items-center gap-3 p-4 rounded-xl border transition-all animate-fade-in ${
        task.is_completed
          ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md'
      }`}
    >
      {/* Чекбокс */}
      <button
        onClick={() => onToggle(task.id, task.is_completed)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          task.is_completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
        }`}
      >
        {task.is_completed && <Check size={14} className="text-white" />}
      </button>

      {/* Текст */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            task.is_completed
              ? 'line-through text-slate-400 dark:text-slate-500'
              : 'text-slate-800 dark:text-slate-100'
          }`}
        >
          {task.title}
        </p>
        <span
          className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${cat.bg} ${cat.text}`}
        >
          {cat.label}
        </span>
      </div>

      {/* Удалить */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}