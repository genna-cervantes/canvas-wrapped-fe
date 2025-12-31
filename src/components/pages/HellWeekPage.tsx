import type { HellWeek } from '../../types'
import { Navigation } from '../Navigation'

interface HellWeekPageProps {
  data: HellWeek
}

export function HellWeekPage({ data }: HellWeekPageProps) {
  // Calculate total assignments during hell week
  const totalAssignments = data.days 
    ? Object.values(data.days).reduce((sum, count) => sum + count, 0)
    : 0

  // Get days sorted by typical week order
  const dayOrder = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  const sortedDays = data.days 
    ? dayOrder.filter(day => day in data.days).map(day => ({
        name: day,
        count: data.days[day as keyof typeof data.days]
      }))
    : []

  // Format date range
  const formatDateRange = () => {
    if (!data.start) return 'N/A'
    const startDate = new Date(data.start)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 6)
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  // Get message based on total assignments
  const getHellWeekMessage = () => {
    if (totalAssignments === 0) return "A peaceful week... suspicious"
    if (totalAssignments <= 3) return "That's not so bad, you got this!"
    if (totalAssignments <= 5) return "A solid challenge, but manageable"
    if (totalAssignments <= 8) return "Now THAT'S a hell week!"
    if (totalAssignments <= 12) return "Absolute chaos. You survived! 💀"
    return "HOW ARE YOU STILL ALIVE?!"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="hellWeek" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '20vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
          🔥 HELL WEEK
        </h2>
        
        <div className="">
          <div className="retro-row flex items-center overflow-hidden">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1'>
              <span className="retro-label text-responsive-base flex items-center">WEEK</span>
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-0">
                <p className='text-[1rem]'>{formatDateRange()}</p>
              </div>
            </div>
          </div>

          {sortedDays.length > 0 && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 ">
              
              {/* Bar Chart */}
              <div className="flex items-end justify-center gap-2 sm:gap-3">
                {(() => {
                  const maxCount = Math.max(...sortedDays.map(d => d.count))
                  const maxHeight = 140 // max bar height in pixels
                  
                  return sortedDays.map(({ name, count }) => {
                    const barHeight = maxCount > 0 ? (count / maxCount) * maxHeight : 0
                    const finalHeight = Math.max(barHeight, count > 0 ? 28 : 0)
                    
                    return (
                      <div key={name} className="flex flex-col items-center">
                        {/* Bar */}
                        <div 
                          className="w-10 sm:w-12 flex items-end justify-center rounded-t-sm"
                          style={{ 
                            height: `${finalHeight}px`,
                            background: 'linear-gradient(to top, var(--bg-row) 0%, var(--bg-row-hover) 100%)',
                            borderLeft: '3px solid var(--text-gold-dim)'
                          }}
                        >
                          <span className="text-xs sm:text-sm font-bold pb-1" style={{ color: 'var(--text-gold)' }}>
                            {count}
                          </span>
                        </div>
                        
                        {/* Day Label */}
                        <span className="text-[0.6rem] mt-3" style={{ color: 'var(--text-cyan-dim)' }}>
                          {name.slice(0, 3)}
                        </span>
                      </div>
                    )
                  })
                })()}
              </div>
            </div>
          )}

        <p className="retro-text text-center mt-10 sm:mt-12" style={{ fontSize: '0.8rem' }}>
          {totalAssignments} assignments due
        </p>
        <p className="retro-title text-center mt-3" style={{ fontSize: '0.75rem' }}>
          {getHellWeekMessage()}
        </p>
        </div>
      </div>
    </div>
  )
}
