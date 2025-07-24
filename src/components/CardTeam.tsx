import Image from 'next/image'
import Link from 'next/link'

type CardTeamProps = {
  title: string
  image: string | null
  href?: string
  colorOverlay?: string
  rol: string
}

export default function CardTeam({
  title,
  image,
  href = '#',
  rol,
}: CardTeamProps) {
  return (
    <Link
      href={{ pathname: href, query: { rol } }}
      className="group block relative overflow-hidden rounded-lg aspect-[4/5] transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image ? image : ''}
          alt={title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
      </div>

      {/* Overlay - transitions from dark grayscale to colored */}
      <div
        className={`absolute inset-0 transition-all duration-500  opacity-0 group-hover:opacity-90`}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 transition-all duration-500 group-hover:bg-opacity-20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white items-center">
        <h3 className="text-2xl font-bold mb-3 transform transition-all duration-300 group-hover:translate-y-[-8px] text-center">
          {title}
        </h3>

        {/* View All Button */}
        <div className="inline-flex items-center justify-center px-6 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-semibold transition-all duration-300 group-hover:bg-white group-hover:bg-opacity-100 group-hover:text-gray-900 w-fit">
          View All
        </div>
      </div>

      {/* Subtle border on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white group-hover:border-opacity-20 rounded-lg transition-all duration-300" />
    </Link>
  )
}
