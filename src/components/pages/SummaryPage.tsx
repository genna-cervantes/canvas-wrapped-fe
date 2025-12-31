import type { ReportData } from '../../types'
import { Navigation } from '../Navigation'

interface SummaryPageProps {
  data: ReportData
}

export function SummaryPage({ data }: SummaryPageProps) {
  // Calculate hell week total
  const hellWeekTotal = data.hellWeek.days 
    ? Object.values(data.hellWeek.days).reduce((sum, count) => sum + count, 0)
    : 0

  // Format date range for hell week
  const formatDateRange = () => {
    if (!data.hellWeek.start) return 'N/A'
    const startDate = new Date(data.hellWeek.start)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 6)
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  return (
    <div className="min-h-screen">
      <Navigation currentPage="summary" />
      <div className="page-container fade-in">
        <h2 className="retro-title text-[0.7rem] sm:text-lg text-center mb-3 sm:mb-4 mt-6 animate-glow">
          📊 YOUR YEAR IN REVIEW
        </h2>
        
        {/* Archetype highlight */}
        <div className="retro-card text-center mb-2 sm:mb-3">
          <h3 className="retro-title text-[0.6rem] sm:text-[0.75rem]">
          {data.archetype.type === 'The Steady Navigator' && '🧭'}
            {data.archetype.type === 'The Quiz-Focused Path' && '📝'}
            {data.archetype.type === 'The Project-Heavy Route' && '🛠️'}
            {data.archetype.type === 'The High-Load Juggler' && '🤹'}
            {data.archetype.type === 'The Low-Noise Semester' && '🏖️'}
            {data.archetype.type === 'The Engagement Explorer' && '🗣️'}
            {!['The Steady Navigator', 'The Quiz-Focused Path', 'The Project-Heavy Route', 'The High-Load Juggler', 'The Low-Noise Semester', 'The Engagement Explorer'].includes(data.archetype.type) && '✨'} {data.archetype.type}
          </h3>    
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
          {/* Attendance */}
          <div className="retro-card">
            <div className="text-center">
              <p className="retro-text text-responsive-base">{data.attendance?.average != null ? data.attendance.average.toFixed(2) : 'N/A'}%</p>
              <p className="retro-text-dim text-responsive-xs">ATTENDANCE</p>
            </div>
          </div>

          {/* Groups */}
          <div className="retro-card">
            <div className="text-center">
              <p className="retro-text text-responsive-base">{data.groups?.total ?? 0}</p>
              <p className="retro-text-dim text-responsive-xs">GROUPS JOINED</p>
            </div>
          </div>
        </div>

        {/* Assignments & Quizzes */}
        <div className="retro-card mb-2 sm:mb-3">
          <p className="retro-text-dim text-responsive-xs text-center mb-2">ACADEMIC PERFORMANCE</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="text-center border-r border-[var(--bg-light)] pr-2 sm:pr-3">
              <p className="retro-title text-[10px] sm:text-xs">{data.assignments?.total ?? 0}</p>
              <p className="retro-text-dim text-responsive-xs">ASSIGNMENTS</p>
              <p className="retro-text text-responsive-sm">{data.assignments?.average != null ? data.assignments.average.toFixed(2) : 'N/A'}%</p>
            </div>
            <div className="text-center pl-2 sm:pl-3">
              <p className="retro-title text-[10px] sm:text-xs">{data.quizzes?.total ?? 0}</p>
              <p className="retro-text-dim text-responsive-xs">QUIZZES</p>
              <p className="retro-text text-responsive-sm">{data.quizzes?.average != null ? data.quizzes.average.toFixed(2) : 'N/A'}%</p>
            </div>
          </div>
        </div>

        {/* Discussions */}
        <div className="retro-card mb-2 sm:mb-3">
          <p className="retro-text-dim text-responsive-xs text-center mb-2">DISCUSSIONS</p>
          <div className="flex flex-row justify-between items-center">
            <div className="text-center flex-1">
              <p className="retro-title text-[10px] sm:text-xs">{data.discussion?.posts ?? 0}</p>
              <p className="retro-text-dim text-responsive-xs">POSTS</p>
            </div>
            <div className="text-center flex-1 border-x border-[var(--bg-light)]">
              <p className="retro-title text-[10px] sm:text-xs">{data.discussion?.replies ?? 0}</p>
              <p className="retro-text-dim text-responsive-xs">REPLIES</p>
            </div>
            <div className="text-center flex-1">
              <p className="retro-title text-[10px] sm:text-xs">{data.discussion?.words ?? 0}</p>
              <p className="retro-text-dim text-responsive-xs">WORDS</p>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="retro-card mb-2 sm:mb-3">
          <p className="retro-text-dim text-responsive-xs text-center mb-2">COURSES</p>
          <div className="space-y-1">
            <div className="retro-row flex items-center">
              <span className="emoji-responsive">🌟</span>
              <div className="flex-1 min-w-0">
                <p className="retro-text text-responsive-sm truncate">{data.courses.max?.name || 'N/A'}</p>
                <p className="retro-text-dim text-responsive-xs">TOP COURSE</p>
              </div>
            </div>
            <div className="retro-row flex items-center">
              <span className="emoji-responsive">📖</span>
              <div className="flex-1 min-w-0">
                <p className="retro-text text-responsive-sm truncate">{data.courses.min?.name || 'N/A'}</p>
                <p className="retro-text-dim text-responsive-xs">NEEDS ATTENTION</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hell Week */}
        <div className="retro-card mb-2 sm:mb-3">
          <p className="retro-text-dim text-responsive-xs text-center mb-2">HELL WEEK</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="text-center">
              <p className="retro-title text-[10px] sm:text-xs">{formatDateRange()}</p>
            </div>
            <div className="text-center">
              <p className="retro-title text-[10px] sm:text-xs">{hellWeekTotal}</p>
              <p className="retro-text-dim text-responsive-xs">ASSIGNMENTS</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="retro-text-dim text-responsive-xs">
            🎉 Thanks for using Canvas Wrapped!
          </p>
          <p className="retro-text-dim text-responsive-xs mt-2">
            https://canvas-wrapped.ph/
          </p>
        </div>
      </div>
    </div>
  )
}

