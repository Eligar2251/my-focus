import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  Settings,
  Focus,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Дашборд' },
  { to: '/tasks', icon: ListTodo, label: 'Задачи' },
  { to: '/add', icon: PlusCircle, label: 'Новая задача' },
  { to: '/settings', icon: Settings, label: 'Настройки' },
]

export default function Sidebar({ onClose }) {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Логотип */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 dark:border-slate-700">
        <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center">
          <Focus size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800 dark:text-white">
          MyFocus
        </span>
      </div>

      {/* Навигация */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Подвал */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-400 dark:text-slate-600">
          © 2025 MyFocus
        </p>
      </div>
    </aside>
  )
}