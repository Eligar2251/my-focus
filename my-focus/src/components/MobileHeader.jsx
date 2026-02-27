import { Menu, X, Focus } from 'lucide-react'

export default function MobileHeader({ isOpen, onToggle }) {
  return (
    <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
          <Focus size={18} className="text-white" />
        </div>
        <span className="text-lg font-bold text-slate-800 dark:text-white">
          MyFocus
        </span>
      </div>

      <button
        onClick={onToggle}
        className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  )
}