import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, Monitor } from 'lucide-react'

export default function Settings() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Настройки
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 max-w-lg">
        {/* Тема */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon size={20} className="text-indigo-400" />
            ) : (
              <Sun size={20} className="text-amber-500" />
            )}
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-white">
                Тёмная тема
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {isDark ? 'Включена' : 'Выключена'}
              </p>
            </div>
          </div>

          {/* Toggle switch */}
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              isDark ? 'bg-indigo-500' : 'bg-slate-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                isDark ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <hr className="my-5 border-slate-200 dark:border-slate-700" />

        {/* Инфо */}
        <div className="flex items-center gap-3">
          <Monitor size={20} className="text-slate-400" />
          <div>
            <p className="text-sm font-medium text-slate-800 dark:text-white">
              О приложении
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              MyFocus v1.0 — React + Supabase + Tailwind
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}