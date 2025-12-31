import { PAGE_KEYS, type PageKey } from '../types'

interface NavigationProps {
  currentPage: PageKey
}

function navigateToPage(pageKey: PageKey) {
  const url = new URL(window.location.href)
  url.searchParams.set('page', pageKey)
  window.history.pushState({}, '', url.toString())
  // Dispatch a custom event so the shell can react to navigation
  window.dispatchEvent(new CustomEvent('pagechange'))
}

export function Navigation({ currentPage }: NavigationProps) {
  const currentIndex = PAGE_KEYS.indexOf(currentPage)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === PAGE_KEYS.length - 1

  const handlePrevious = () => {
    if (!isFirst) {
      navigateToPage(PAGE_KEYS[currentIndex - 1])
    }
  }

  const handleNext = () => {
    if (!isLast) {
      navigateToPage(PAGE_KEYS[currentIndex + 1])
    }
  }

  const handleRestart = () => {
    navigateToPage(PAGE_KEYS[0])
  }

  return (
    <>
      {/* Counter at top */}
      <div className="fixed pt-6 top-0 left-0 right-0 flex justify-center nav-counter z-50 bg-gradient-to-b from-[var(--bg-deep)] to-transparent">
        <span className="mt-6 retro-text text-responsive-base">
          {currentIndex + 1} / {PAGE_KEYS.length}
        </span>
      </div>
      
      {/* Navigation buttons at bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center nav-buttons z-50 bg-gradient-to-t from-[var(--bg-deep)] to-transparent">
        <button
          onClick={handlePrevious}
          disabled={isFirst}
          className="mb-6 retro-button disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">◀ PREV</span>
          <span className="sm:hidden">◀</span>
        </button>
        {isLast ? (
          <button
            onClick={handleRestart}
            className="mb-6 retro-button"
            aria-label="Restart from beginning"
          >
            <span className="hidden sm:inline">RESTART</span>
            <span className="sm:hidden">RESTART</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="mb-6 retro-button"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">NEXT ▶</span>
            <span className="sm:hidden">▶</span>
          </button>
        )}
      </div>
    </>
  )
}
