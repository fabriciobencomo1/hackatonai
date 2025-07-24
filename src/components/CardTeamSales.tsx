import Image from 'next/image'
import { MessageCircle, CheckCircle, Handshake } from 'lucide-react'

interface CardTeamSalesProps {
  name?: string
  position?: string
  image?: string
  languages: string[]
  traits: {
    friendly: boolean
    efficient: boolean
    respectful: boolean
  }
  description?: string
  onScheduleMeeting?: () => void
  onGetToKnow?: () => void
  rol?: string
}

export default function CardTeamSales({
  name,
  position,
  image,
  languages,
  traits,
  description,
  onScheduleMeeting,
  onGetToKnow,
  rol,
}: CardTeamSalesProps) {
  const traitIcons = {
    friendly: MessageCircle,
    efficient: CheckCircle,
    respectful: Handshake,
  }

  const traitLabels = {
    friendly: 'Friendly',
    efficient: 'Efficient',
    respectful: 'Respectful',
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg max-w-md mx-auto border border-gray-100">
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48 rounded-3xl overflow-hidden bg-gray-200">
          <Image
            src={image ? image : ''}
            alt={name ? name : ''}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Name and Position */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{name}</h2>
        <p className="text-xl text-gray-600">{position}</p>
      </div>

      {/* Languages */}
      {rol === 'Sales' && (
        <div className="flex justify-center gap-8 mb-8">
          {languages.map((language, index) => (
            <span key={index} className="text-lg font-medium text-gray-700">
              {language}
            </span>
          ))}
        </div>
      )}

      {/* Traits with Icons */}
      {rol === 'Sales' && (
        <div className="flex justify-center gap-6 mb-6">
          {Object.entries(traits).map(([trait, isActive]) => {
            if (!isActive) return null

            const IconComponent = traitIcons[trait as keyof typeof traitIcons]
            const label = traitLabels[trait as keyof typeof traitLabels]

            return (
              <div key={trait} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Traits Labels */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-800">
          {Object.entries(traits)
            .filter(([_, isActive]) => isActive)
            .map(([trait]) => traitLabels[trait as keyof typeof traitLabels])
            .join(' • ')}
        </p>
      </div>

      {/* Description */}
      <div className="text-center mb-8">
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onScheduleMeeting}
          className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Schedule a Meeting
        </button>
        <button
          onClick={onGetToKnow}
          className="flex-1 bg-white text-blue-600 py-4 px-6 rounded-2xl font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200"
        >
          Get to Know Me
        </button>
      </div>
    </div>
  )
}
