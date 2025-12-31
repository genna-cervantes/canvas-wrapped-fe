import type { Courses } from '../../types'
import { Navigation } from '../Navigation'

interface CoursesPageProps {
  data: Courses
}

function getCoursesMessage(hasMax: boolean, hasMin: boolean): string {
  if (hasMax && hasMin) {
    return "Every course tells a story. Some we love, some we survive. That's the college experience! 📚"
  } else if (hasMax) {
    return "You've got a clear favorite! Sometimes one course just hits different. 🌟"
  } else if (hasMin) {
    return "At least you showed up somewhere! That counts for something. 📖"
  }
  return "No courses yet? The semester awaits with endless possibilities! ✨"
}

export function CoursesPage({ data }: CoursesPageProps) {
  const message = getCoursesMessage(!!data.max, !!data.min)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="courses" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '20vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
        📚 COURSES
        </h2>
        
        <div className="">
          <div className="retro-row flex items-center overflow-hidden">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1'>
              <span className="retro-label text-responsive-base flex items-center justify-center shrink-0" style={{ width: '4.5rem' }}>🌟 MAX</span>
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-0">
                <p className='text-xs opacity-80'>Strongest</p>
                <p className='mt-1 text-[1rem]'>{data.max?.name || 'N/A'}</p>
                <p className='mt-1 text-[0.6rem] opacity-75 truncate'>{data.max?.course_code}</p>
              </div>
            </div>
          </div>
          
          <div className="retro-row flex items-center overflow-hidden">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1'>
              <span className="retro-label text-responsive-base flex items-center justify-center shrink-0" style={{ width: '4.5rem' }}>📖 MIN</span>              
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-0">
                <p className='text-xs opacity-80'>Weakest</p>
                <p className='mt-1 text-[1rem]'>{data.min?.name || 'N/A'}</p>
                <p className='mt-1 text-[0.6rem] opacity-75 truncate'>{data.min?.course_code}</p>
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

