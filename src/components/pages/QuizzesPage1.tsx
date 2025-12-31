import type { Quizzes } from '../../types'
import { Navigation } from '../Navigation'

interface QuizzesPage1Props {
  data: Quizzes
}

function getQuizzesMessage(average: number, total: number): string {
  if (average >= 90 && total >= 30) {
    return "Quiz master! 30+ quizzes with stellar scores—you're unstoppable! 🌟"
  } else if (average >= 90) {
    return "Outstanding quiz performance! You really know your material. 🌟"
  } else if (average >= 75 && total >= 30) {
    return "Solid quiz results across 30+ attempts, great consistency!"
  } else if (average >= 75) {
    return "Nice quiz scores! You've got a good grasp on the content."
  } else if (average >= 50 && total >= 30) {
    return "30+ quizzes completed—that's dedication! Keep pushing forward."
  } else if (average >= 50) {
    return "You're making progress! Every quiz is a learning opportunity. 📚"
  } else if (total >= 30) {
    return "30+ quiz attempts shows real commitment! The effort counts. 📚"
  } else if (total >= 15) {
    return "You've tackled some quizzes, keep building that momentum!"
  } else {
    return "More quiz adventures await! Next semester brings new chances. ✨"
  }
}

export function QuizzesPage1({ data }: QuizzesPage1Props) {
  const total = data?.total ?? 0
  const average = data?.average ?? 0
  const message = getQuizzesMessage(average, total)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="quizzes-1" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '30vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
          🎯 QUIZZES
        </h2>
        
        <div className="">
          <div className="retro-row flex items-center">
            <div className='py-3 flex items-center gap-x-5'>
              <span className="retro-label text-responsive-base flex items-center justify-center" style={{ width: '4.5rem' }}>TOTAL</span>
              <div className="retro-text text-responsive-base flex-1 ml-2">
                <p className='text-[0.75rem]'>Quizzes taken:</p>
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
