import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Мобильный хедер */}
      <MobileHeader
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex">
        {/* Десктоп сайдбар — всегда видим на lg+ */}
        <div className="hidden lg:block flex-shrink-0">
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </div>

        {/* Мобильный сайдбар — оверлей */}
        {sidebarOpen && (
          <>
            {/* Затемнение фона */}
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Боковое меню */}
            <div className="fixed inset-y-0 left-0 z-50 lg:hidden animate-fade-in">
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Основной контент */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}