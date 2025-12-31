import type { Assignments } from '../../types'
import { Navigation } from '../Navigation'

interface AssignmentsPage2Props {
  data: Assignments
}

export function AssignmentsPage2({ data }: AssignmentsPage2Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="assignments-2" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '20vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
          TOP ASSIGNMENTS
        </h2>
        
        <div className="">
          <div className="retro-row flex items-center overflow-hidden">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1'>
              <span className="retro-label text-responsive-base flex items-center justify-center shrink-0" style={{ width: '4.5rem' }}>🥇 1ST</span>
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-0">
                <p className='text-xs'>{data.first?.transformedScore != null ? data.first.transformedScore.toFixed(2) : 'N/A'}%</p>
                <p className='mt-1 text-[1rem]'>{data.first?.name || 'N/A'}</p>
                <p className='mt-1 text-[0.6rem] opacity-75 truncate'>{data.first?.course?.name || ''}</p>
              </div>
            </div>
          </div>
          
          <div className="retro-row flex items-center overflow-hidden">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1'>
              <span className="retro-label text-responsive-base flex items-center justify-center shrink-0" style={{ width: '4.5rem' }}>🥈 2ND</span>              
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-0">
                <p className='text-xs'>{data.second?.transformedScore != null ? data.second.transformedScore.toFixed(2) : 'N/A'}%</p>
                <p className='mt-1 text-[1rem]'>{data.second?.name || 'N/A'}</p>
                <p className='mt-1 text-[0.6rem] opacity-75 truncate'>{data.second?.course?.name || ''}</p>
              </div>
            </div>
          </div>
          
          <div className="retro-row flex items-center overflow-hidden">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1'>
              <span className="retro-label text-responsive-base flex items-center justify-center shrink-0" style={{ width: '4.5rem' }}>🥉 3RD</span>
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-0">
                <p className='text-xs'>{data.third?.transformedScore != null ? data.third.transformedScore.toFixed(2) : 'N/A'}%</p>
                <p className='mt-1 text-[1rem]'>{data.third?.name || 'N/A'}</p>
                <p className='mt-1 text-[0.6rem] opacity-75 truncate'>{data.third?.course?.name || ''}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
