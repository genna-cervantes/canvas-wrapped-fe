import type { Assignments } from '../../types'
import { Navigation } from '../Navigation'

interface AssignmentsPage3Props {
  data: Assignments
}

function getLowestScoreMessage(score: number | undefined): string {
  if (score == undefined || score == null) return "No low scores? Either you're a genius or you haven't submitted anything yet."
  if (score >= 70) return "Your 'worst' is still pretty good. Humble brag much?"
  if (score >= 50) return "Not your proudest moment, but hey, at least you tried!"
  if (score >= 30) return "We don't talk about this one. What happens in Canvas stays in Canvas."
  return "Ouch. This one hurt. But remember: even Einstein probably bombed a quiz once. Probably."
}

export function AssignmentsPage3({ data }: AssignmentsPage3Props) {
  const message = getLowestScoreMessage(data.min?.transformedScore)
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="assignments-3" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '30vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
          LOWEST SCORE
        </h2>
        
        <div className="">
          <div className="retro-row flex items-center overflow-hidden">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1'>
              <span className="retro-label text-responsive-base flex items-center justify-center shrink-0" style={{ width: '4.5rem' }}>😅 MIN</span>
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-0">
                <p className='text-xs'>{data.min?.transformedScore != null ? `${data.min.transformedScore.toFixed(2)}%` : 'N/A'}</p>
                <p className='mt-1 text-[1rem]'>{data.min?.name || 'No low scores!'}</p>
                <p className='mt-1 text-[0.6rem] opacity-75 truncate'>{data.min?.course?.name || ''}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className='text-[0.75rem] mt-8 sm:mt-12 text-center text-white opacity-60'>{message}</p>
        </div>
      </div>
    </div>
  )
}
