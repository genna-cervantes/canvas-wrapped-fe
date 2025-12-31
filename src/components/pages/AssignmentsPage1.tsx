import type { Assignments } from '../../types'
import { Navigation } from '../Navigation'

interface AssignmentsPage1Props {
  data: Assignments
}

function getAssignmentsMessage(average: number, total: number): string {
  if (average >= 90 && total >= 50) {
    return "Amazing scores across 50+ assignments! You really brought your A-game this year. 🌟"
  } else if (average >= 90) {
    return "Impressive scores! Quality over quantity, and your quality is top-notch. 🌟"
  } else if (average >= 75 && total >= 50) {
    return "Solid grades on 50+ assignments, consistent and dedicated work all around!"
  } else if (average >= 75) {
    return "Great scores! You clearly know your stuff when you put your mind to it."
  } else if (average >= 50 && total >= 50) {
    return "50+ assignments done—that's some serious dedication! Keep building on that momentum."
  } else if (average >= 50) {
    return "You're on the board! Every assignment is a step forward. 📚"
  } else if (total >= 50) {
    return "50+ submissions shows real commitment! The effort is there, and that counts. 📚"
  } else if (total >= 25) {
    return "You've got some work under your belt, every submission matters!"
  } else {
    return "A fresh start awaits! Next semester is full of opportunities. ✨"
  }
}

export function AssignmentsPage1({ data }: AssignmentsPage1Props) {
  const total = data?.total ?? 0
  const average = data?.average ?? 0
  const message = getAssignmentsMessage(average, total)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="assignments-1" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '30vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
          📝 ASSIGNMENTS
        </h2>
        
        <div className="">
          <div className="retro-row flex items-center">
            <div className='py-3 flex items-center gap-x-5'>
              <span className="retro-label text-responsive-base flex items-center justify-center" style={{ width: '4.5rem' }}>TOTAL</span>
              <div className="retro-text text-responsive-base flex-1 ml-2">
                <p className='text-[0.75rem]'>Assignments completed:</p>
                <p className='mt-2 text-lg font-bold'>{total}</p>
              </div>
            </div>
          </div>
          
          <div className="retro-row flex items-center">
            <div className='py-3 flex items-center gap-x-5'>
              <span className="retro-label text-responsive-base flex items-center justify-center" style={{ width: '4.5rem' }}>AVG</span>
              <div className="retro-text text-responsive-base flex-1 ml-2">
                <p className='text-[0.75rem]'>Average score:</p>
                <p className='mt-2 text-lg font-bold'>{average.toFixed(2)}%</p>
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
