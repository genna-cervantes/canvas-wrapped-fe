import { useQuery } from '@tanstack/react-query'
import { useEffect, useState, useCallback, type FormEvent, Component, type ReactNode } from 'react'
import { PAGE_KEYS, isValidPageKey, type PageKey, type ReportData } from '../types'
import {
  ArchetypePage,
  AssignmentsPage1,
  AssignmentsPage2,
  AssignmentsPage3,
  AttendancePage,
  CoursesPage,
  DiscussionPage,
  GroupsPage,
  HellWeekPage,
  QuizzesPage1,
  QuizzesPage2,
  QuizzesPage3,
  SummaryPage,
  TokenHelpPage,
} from './pages'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1/wrapped'
const STORAGE_KEY = 'canvas-wrapped-data'
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours

interface CachedReportData {
  data: ReportData
  timestamp: number
}

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode
  onReset: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
          <div className="retro-card max-w-[400px] w-full text-center fade-in">
            <div className="retro-title text-base sm:text-lg mb-3 sm:mb-4">
              ⚠️ SOMETHING WENT WRONG
            </div>
            <p className="retro-text text-responsive-base mb-4 sm:mb-6">
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false })
                this.props.onReset()
              }}
              className="retro-button"
            >
              🔄 RESTART
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function getPageFromUrl(): PageKey {
  const params = new URLSearchParams(window.location.search)
  const page = params.get('page')
  return isValidPageKey(page) ? page : PAGE_KEYS[0]
}

function navigateToPage(pageKey: PageKey) {
  const url = new URL(window.location.href)
  url.searchParams.set('page', pageKey)
  window.history.pushState({}, '', url.toString())
  window.dispatchEvent(new CustomEvent('pagechange'))
}

function getThemeClass(pageKey: PageKey): string {
  if (pageKey === 'attendance') return 'theme-attendance'
  if (pageKey.startsWith('assignments')) return 'theme-assignments'
  if (pageKey.startsWith('quizzes')) return 'theme-quizzes'
  if (pageKey === 'discussion') return 'theme-discussion'
  if (pageKey === 'groups') return 'theme-groups'
  if (pageKey === 'hellWeek') return 'theme-hellweek'
  if (pageKey === 'courses') return 'theme-courses'
  if (pageKey === 'archetype') return 'theme-archetype'
  if (pageKey === 'summary') return 'theme-summary'
  return ''
}

function getCachedData(): ReportData | null {
  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) {
      const parsed: CachedReportData = JSON.parse(cached)
      // Check if cache has expired
      if (Date.now() - parsed.timestamp > CACHE_EXPIRY_MS) {
        localStorage.removeItem(STORAGE_KEY)
        return null
      }
      return parsed.data
    }
  } catch {
    // Silently handle parse errors and clear corrupted cache
    localStorage.removeItem(STORAGE_KEY)
  }
  return null
}

function setCachedData(data: ReportData): void {
  try {
    const cacheEntry: CachedReportData = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheEntry))
  } catch {
    // Silently handle storage errors (e.g., quota exceeded)
  }
}

function clearCachedData(): void {
  localStorage.removeItem(STORAGE_KEY)
}

function isHelpPage(): boolean {
  const params = new URLSearchParams(window.location.search)
  return params.get('help') === 'token'
}

const LOADING_MESSAGES = [
  "Crunching your data...",
  "Your token is never stored on our servers",
  "All processing happens in real-time",
  "We don't keep any of your Canvas data",
  "Analyzing your semester...",
  "Your privacy is our priority",
  "No accounts, no tracking, no cookies",
  "Fetching your achievements...",
  "Data is discarded after each session",
  "Almost there...",
]

function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center fade-in">
        <div className="retro-title text-base sm:text-lg animate-glow mb-3 sm:mb-4">
          ⏳ LOADING...
        </div>
        <p className="retro-text text-responsive-base animate-pixel min-h-[2em]">
          {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>
    </div>
  )
}

export function ReportShell() {
  const [currentPage, setCurrentPage] = useState<PageKey>(getPageFromUrl)
  const [token, setToken] = useState('')
  const [cachedData, setCachedDataState] = useState<ReportData | null>(getCachedData)
  const [submittedToken, setSubmittedToken] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [showHelp, setShowHelp] = useState(isHelpPage)

  const validateToken = (value: string): string | null => {
    if (!value.trim()) {
      return 'Token cannot be empty'
    }
    if (value.trim().length < 20) {
      return 'Token must be at least 20 characters'
    }
    return null
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const error = validateToken(token)
    if (error) {
      setValidationError(error)
      return
    }
    setValidationError(null)
    const trimmedToken = token.trim()
    setToken('') // Clear token from state for security
    setSubmittedToken(trimmedToken)
  }

  const handleLogout = () => {
    clearCachedData()
    setCachedDataState(null)
    setSubmittedToken(null)
    setToken('')
    setValidationError(null)
    // Reset to first page
    navigateToPage(PAGE_KEYS[0])
  }

  // Fetch report data
  const { data, isLoading, error } = useQuery<ReportData, Error>({
    queryKey: ['report', submittedToken],
    queryFn: async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: submittedToken }),
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)

        if (response.status === 401 || response.status === 403) {
          throw new Error('Invalid or expired token. Please check your Canvas token.')
        }
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.')
        }
        if (!response.ok) {
          throw new Error('Failed to fetch your Canvas data. Please try again.')
        }
        
        const responseData = await response.json()
        
        // Basic validation of response structure
        if (!responseData || typeof responseData !== 'object') {
          throw new Error('Invalid response from server.')
        }
        
        return responseData as ReportData
      } catch (err) {
        clearTimeout(timeoutId)
        if (err instanceof Error && err.name === 'AbortError') {
          throw new Error('Request timed out. Please check your connection and try again.')
        }
        throw err
      }
    },
    enabled: !!submittedToken,
    retry: 1,
    retryDelay: 1000,
  })

  // Cache data when available
  useEffect(() => {
    if (data) {
      setCachedData(data)
      setCachedDataState(data)
    }
  }, [data])

  // Handle URL changes (back/forward navigation and custom pagechange event)
  const handleUrlChange = useCallback(() => {
    setCurrentPage(getPageFromUrl())
    setShowHelp(isHelpPage())
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', handleUrlChange)
    window.addEventListener('pagechange', handleUrlChange)

    return () => {
      window.removeEventListener('popstate', handleUrlChange)
      window.removeEventListener('pagechange', handleUrlChange)
    }
  }, [handleUrlChange])

  // Use cached data if available, otherwise show token input
  const reportData = cachedData || data

  // Show help page if requested
  if (showHelp) {
    return <TokenHelpPage />
  }

  // Show token input form if no token submitted and no cached data
  if (!submittedToken && !cachedData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-[500px] w-full fade-in">
          <h1 className="retro-title text-lg sm:text-2xl text-center mb-6 sm:mb-8 animate-glow">
            CANVAS WRAPPED
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="canvas-token" className="block mb-3 sm:mb-4 text-responsive-base retro-text">
              YOUR CANVAS TOKEN
            </label>
            <input
              id="canvas-token"
              type="password"
              autoComplete="off"
              value={token}
              onChange={(e) => {
                setToken(e.target.value)
                if (validationError) setValidationError(null)
              }}
              placeholder="Enter your token..."
              className={`retro-input w-full ${
                validationError ? 'border-red-500' : ''
              }`}
            />
            {validationError && (
              <p className="text-red-400 text-responsive-base mt-3 retro-text">
                ⚠️ {validationError}
              </p>
            )}
            <button
              type="submit"
              className="retro-button w-full mt-4 sm:mt-6"
            >
              START
            </button>
          </form>
          <a 
            href="?help=token" 
            className="block text-responsive-sm text-center mt-4 sm:mt-6 retro-text-dim hover:text-(--retro-accent) transition-colors underline"
          >
            How do I get my Canvas token?
          </a>
        </div>
      </div>
    )
  }

  // Handle loading state (only if no cached data)
  if (isLoading && !cachedData) {
    return <LoadingScreen />
  }

  // Handle error state (only if no cached data)
  if (error && !cachedData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-[400px] w-full text-center fade-in">
          <div className="retro-title text-base sm:text-lg mb-3 sm:mb-4">
            ❌ ERROR
          </div>
          <p className="retro-text text-responsive-base mb-4 sm:mb-6">
            {error.message || 'Failed to fetch report. Please check your token and try again.'}
          </p>
          <button
            onClick={() => setSubmittedToken(null)}
            className="retro-button"
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    )
  }

  // Handle no data
  if (!reportData) {
    return null
  }

  // Render the appropriate page component
  const renderPage = () => {
    switch (currentPage) {
      case 'info':
        return (
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="max-w-[500px] w-full text-center fade-in">
              <h1 className="retro-title text-lg sm:text-2xl mb-4 sm:mb-6 animate-glow">
                CANVAS WRAPPED
              </h1>
              <p className="retro-text text-responsive-base mb-6 sm:mb-8 leading-5 sm:leading-6">
                Your year in Canvas,<br />wrapped up pixel by pixel.
              </p>
              <button
                onClick={() => navigateToPage('attendance')}
                className="retro-button"
              >
                START
              </button>
              {cachedData && (
                <button
                  onClick={handleLogout}
                  className="block w-full mt-4 text-responsive-sm retro-text-dim hover:text-red-400 transition-colors underline"
                >
                  🗑️ Erase cached data
                </button>
              )}
            </div>
          </div>
        )
      case 'attendance':
        return <AttendancePage data={reportData.attendance} />
      case 'assignments-1':
        return <AssignmentsPage1 data={reportData.assignments} />
      case 'assignments-2':
        return <AssignmentsPage2 data={reportData.assignments} />
      case 'assignments-3':
        return <AssignmentsPage3 data={reportData.assignments} />
      case 'quizzes-1':
        return <QuizzesPage1 data={reportData.quizzes} />
      case 'quizzes-2':
        return <QuizzesPage2 data={reportData.quizzes} />
      case 'quizzes-3':
        return <QuizzesPage3 data={reportData.quizzes} />
      case 'courses':
        return <CoursesPage data={reportData.courses} />
      case 'discussion':
        return <DiscussionPage data={reportData.discussion} />
      case 'groups':
        return <GroupsPage data={reportData.groups} />
      case 'hellWeek':
        return <HellWeekPage data={reportData.hellWeek} />
      case 'archetype':
        return <ArchetypePage data={reportData.archetype} />
      case 'summary':
        return <SummaryPage data={reportData} />
      default:
        // TypeScript exhaustive check
        const _exhaustive: never = currentPage
        return _exhaustive
    }
  }

  const themeClass = getThemeClass(currentPage)

  return (
    <ErrorBoundary onReset={handleLogout}>
      <div className={`min-h-screen ${themeClass}`}>{renderPage()}</div>
    </ErrorBoundary>
  )
}

