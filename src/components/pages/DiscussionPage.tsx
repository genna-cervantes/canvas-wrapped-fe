import type { Discussion } from '../../types'
import { Navigation } from '../Navigation'

interface DiscussionPageProps {
  data: Discussion
}

export function DiscussionPage({ data }: DiscussionPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="discussion" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '30vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
          DISCUSSIONS
        </h2>
        
        <div className="w-full">
          <div className="retro-row flex items-center overflow-hidden w-full ">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1 w-full'>
              <span className="retro-label text-responsive-base flex items-center justify-center shrink-0" style={{ width: '6rem' }}>POSTS</span>
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-[200px]">
                <p className='text-[0.75rem]'>Posts created:</p>
                <p className='mt-2 text-lg font-bold'>{data?.posts ?? 0}</p>
              </div>
            </div>
          </div>
          
          <div className="retro-row flex items-center overflow-hidden w-full">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1 w-full'>
              <span className="retro-label text-responsive-base flex items-center justify-center shrink-0" style={{ width: '6rem' }}>REPLIES</span>
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-[200px]">
                <p className='text-[0.75rem]'>Replies made:</p>
                <p className='mt-2 text-lg font-bold'>{data?.replies ?? 0}</p>
              </div>
            </div>
          </div>
          
          <div className="retro-row flex items-center overflow-hidden w-full">
            <div className='py-3 flex items-center gap-x-5 min-w-0 flex-1 w-full'>
              <span className="retro-label text-responsive-base flex items-center justify-center shrink-0" style={{ width: '6rem' }}>WORDS</span>
              <div className="retro-text text-responsive-base flex-1 ml-2 min-w-[200px]">
                <p className='text-[0.75rem]'>Words written:</p>
                <p className='mt-2 text-lg font-bold'>{data?.words ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
