import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import TaskList from '../components/TaskList'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'
import { AlertTriangle } from 'lucide-react'

const filters = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'completed', label: 'Завершённые' },
]

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  // --- Загрузка ---
  const fetchTasks = async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setTasks(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // --- Переключение статуса ---
  const handleToggle = async (id, currentStatus) => {
    const { error: updateError } = await supabase
      .from('todos')
      .update({ is_completed: !currentStatus })
      .eq('id', id)

    if (!updateError) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, is_completed: !currentStatus } : t
        )
      )
    }
  }

  // --- Удаление ---
  const handleDelete = async (id) => {
    const { error: deleteError } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (!deleteError) {
      setTasks((prev) => prev.filter((t) => t.id !== id))
    }
  }

  // --- Фильтрация ---
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'active') return !task.is_completed
    if (activeFilter === 'completed') return task.is_completed
    return true
  })

  // --- Рендер ---
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Задачи
      </h1>

      {/* Фильтры */}
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === f.key
                ? 'bg-indigo-500 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Контент */}
      {loading && <Loader />}

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate-fade-in">
          <AlertTriangle size={20} className="text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-400">
            Ошибка загрузки: {error}
          </p>
        </div>
      )}

      {!loading && !error && filteredTasks.length === 0 && (
        <EmptyState
          title={
            activeFilter === 'all'
              ? 'Задач пока нет'
              : activeFilter === 'active'
              ? 'Нет активных задач'
              : 'Нет завершённых задач'
          }
          description={
            activeFilter === 'all'
              ? 'Добавьте первую задачу, чтобы начать!'
              : 'Попробуйте другой фильтр'
          }
          showAction={activeFilter === 'all'}
        />
      )}

      {!loading && !error && filteredTasks.length > 0 && (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}