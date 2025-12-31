import type { Attendance } from '../../types'
import { Navigation } from '../Navigation'

interface AttendancePageProps {
  data: Attendance
}

function getAttendanceMessage(average: number): string {
  if (average >= 75) {
    return "Teacher's pet alert! 🎓 You showed up so much, even the chairs started recognizing you."
  } else if (average >= 50) {
    return "Perfectly balanced, as all things should be. You attended just enough to not get in trouble. Strategic genius or lazy? Yes."
  } else if (average >= 25) {
    return "Your bed must have a very convincing personality. It somehow won most arguments against your alarm clock."
  } else {
    return "Legend has it you're still enrolled here. Your classmates think you're a myth, like Bigfoot but with tuition debt."
  }
}

export function AttendancePage({ data }: AttendancePageProps) {
  const average = data?.average ?? 0
  const message = getAttendanceMessage(average)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="attendance" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '30vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
          ATTENDANCE
        </h2>
        
        <div className="">
          <div className="retro-row flex items-center">
            <div className='py-3 flex items-center gap-x-5'>
              <span className="retro-label text-responsive-base flex items-center">AVG</span>
              <div className="retro-text text-responsive-base flex-1 ml-2">
                <p className='text-[0.75rem]'>Average attendance:</p>
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
