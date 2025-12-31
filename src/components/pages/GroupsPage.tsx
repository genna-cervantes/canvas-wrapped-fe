import type { Groups } from '../../types'
import { Navigation } from '../Navigation'

interface GroupsPageProps {
  data: Groups
}

function getGroupsMessage(total: number): string {
  if (total >= 10) {
    return "Social butterfly! 🦋 You joined so many groups, your calendar is having an identity crisis."
  } else if (total >= 5) {
    return "A healthy mix of collaboration and sanity. You've mastered the art of being a team player without losing yourself."
  } else if (total >= 1) {
    return "Quality over quantity, right? You're selective about your squad. Introvert energy strong."
  } else {
    return "Lone wolf status: activated. Group projects fear you, and honestly, same."
  }
}

export function GroupsPage({ data }: GroupsPageProps) {
  const total = data?.total ?? 0
  const message = getGroupsMessage(total)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="groups" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '30vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
        GROUPS
        </h2>
        
        <div className="">
          <div className="retro-row flex items-center">
            <div className='py-3 flex items-center gap-x-5'>
              <span className="retro-label text-responsive-base flex items-center">TOTAL</span>
              <div className="retro-text text-responsive-base flex-1 ml-2">
                <p className='text-[0.75rem]'>Groups joined:</p>
                <p className='mt-2 text-lg font-bold'>{total}</p>
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
