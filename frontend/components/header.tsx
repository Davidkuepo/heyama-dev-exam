'use client';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur dark:bg-slate-950/80">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Heyama
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Object Manager
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition">
            Gallery
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
