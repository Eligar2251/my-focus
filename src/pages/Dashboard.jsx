import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link } from 'react-router-dom'
import {
  ListTodo,
  CheckCircle2,
  Clock,
  PlusCircle,
} from 'lucide-react'
import Loader from '../components/Loader'

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 })
  const [recentTasks, setRecentTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setStats({
          total: data.length,
          completed: data.filter((t) => t.is_completed).length,
          active: data.filter((t) => !t.is_completed).length,
        })
        setRecentTasks(data.slice(0, 5))
      }

      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) return <Loader />

  const cards = [
    {
      label: 'Всего задач',
      value: stats.total,
      icon: ListTodo,
      color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    },
    {
      label: 'Выполнено',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'В процессе',
      value: stats.active,
      icon: Clock,
      color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    },
  ]

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Дашборд
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Обзор ваших задач
          </p>
        </div>
        <Link
          to="/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <PlusCircle size={18} />
          <span className="hidden sm:inline">Новая задача</span>
        </Link>
      </div>

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {card.label}
                </p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Последние задачи */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Последние задачи
          </h2>
          <Link
            to="/tasks"
            className="text-sm text-indigo-500 hover:text-indigo-600 font-medium"
          >
            Смотреть все →
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 py-6 text-center">
            Задач пока нет
          </p>
        ) : (
          <div className="space-y-2">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    task.is_completed ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span
                  className={`text-sm flex-1 truncate ${
                    task.is_completed
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}