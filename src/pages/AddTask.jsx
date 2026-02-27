import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { CheckCircle2, AlertTriangle } from 'lucide-react'

const categories = [
  { value: 'work', label: 'Работа', emoji: '💼' },
  { value: 'personal', label: 'Личное', emoji: '🏠' },
  { value: 'study', label: 'Учёба', emoji: '📚' },
]

export default function AddTask() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('personal')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) return

    setSubmitting(true)
    setError(null)

    const { error: insertError } = await supabase
      .from('todos')
      .insert([{ title: title.trim(), category }])

    setSubmitting(false)

    if (insertError) {
      setError(insertError.message)
    } else {
      setSuccess(true)
      setTitle('')
      setTimeout(() => navigate('/tasks'), 1200)
    }
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Новая задача
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5 max-w-lg"
      >
        {/* Заголовок */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Что нужно сделать?
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Прочитать документацию React..."
            maxLength={200}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Категория */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Категория
          </label>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  category === cat.value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                <span className="text-xl block">{cat.emoji}</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1 block">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Ошибка */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="text-sm text-red-600 dark:text-red-400">
              {error}
            </span>
          </div>
        )}

        {/* Успех */}
        {success && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span className="text-sm text-emerald-600 dark:text-emerald-400">
              Задача создана! Переходим к списку...
            </span>
          </div>
        )}

        {/* Кнопка */}
        <button
          type="submit"
          disabled={!title.trim() || submitting || success}
          className="w-full py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white font-medium text-sm transition-colors"
        >
          {submitting ? 'Сохраняю...' : 'Создать задачу'}
        </button>
      </form>
    </div>
  )
}