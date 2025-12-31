import type { Archetype } from '../../types'
import { Navigation } from '../Navigation'

interface ArchetypePageProps {
  data: Archetype
}

export function ArchetypePage({ data }: ArchetypePageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="archetype" />
      <div className="page-container fade-in flex-1 flex flex-col justify-center" style={{ paddingBottom: '30vh' }}>
        <h2 className="retro-title text-base sm:text-lg text-center mb-3 sm:mb-8">
          YOUR ARCHETYPE
        </h2>
        
        <div className="text-center">
          <div className="emoji-responsive-xl mb-4 sm:mb-6">
            {data.type === 'The Steady Navigator' && '🧭'}
            {data.type === 'The Quiz-Focused Path' && '📝'}
            {data.type === 'The Project-Heavy Route' && '🛠️'}
            {data.type === 'The High-Load Juggler' && '🤹'}
            {data.type === 'The Low-Noise Semester' && '🏖️'}
            {data.type === 'The Engagement Explorer' && '🗣️'}
            {!['The Steady Navigator', 'The Quiz-Focused Path', 'The Project-Heavy Route', 'The High-Load Juggler', 'The Low-Noise Semester', 'The Engagement Explorer'].includes(data.type) && '✨'}
          </div>
          
          <h3 className="retro-title text-lg sm:text-xl mb-3 sm:mb-4">
            {data.type}
          </h3>
          
          <p className="mt-6 sm:mt-8 retro-text text-responsive-base leading-5 sm:leading-6 max-w-md mx-auto px-2">
            {data.message}
          </p>
        </div>
        
      </div>
    </div>
  )
}
