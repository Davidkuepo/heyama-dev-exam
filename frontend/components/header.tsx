'use client';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              Heyama
            </div>
          </a>

          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Gallery
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Docs
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
