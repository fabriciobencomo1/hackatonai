'use client'

import { useState, useEffect, useMemo } from 'react'
import { getAllSalespeople } from '@/lib/db-utils'
import type { Salesperson } from '@/lib/db-utils'

import CardTeamSales from '@/components/CardTeamSales'

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

// Función para generar una calificación basada en el ID
function generateRating(id: string): string {
  // Usar el último carácter del ID para generar un número entre 4.0 y 5.0
  const lastChar = id.charAt(id.length - 1)
  const decimal = parseInt(lastChar, 16) % 10 // Convertir a número y obtener último dígito
  return (4 + decimal / 10).toFixed(1)
}

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function TeamPage({ searchParams }: PageProps) {
  const [salespeople, setSalespeople] = useState<Salesperson[]>([])
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState('')
  const [rating, setRating] = useState('')
  const [filteredSalespeople, setFilteredSalespeople] = useState<Salesperson[]>(
    []
  )

  // Memorizar las calificaciones para que sean consistentes
  const ratings = useMemo(() => {
    return salespeople.reduce((acc, person) => {
      acc[person.id] = generateRating(person.id)
      return acc
    }, {} as Record<string, string>)
  }, [salespeople])

  useEffect(() => {
    const loadSalespeople = async () => {
      try {
        const data = await getAllSalespeople()
        setSalespeople(data)
        setFilteredSalespeople(data)
      } catch (error) {
        console.error('Error loading team:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSalespeople()
  }, [])

  const handleFilter = () => {
    let filtered = [...salespeople]

    if (department) {
      filtered = filtered.filter(
        (person) => person.department.toLowerCase() === department.toLowerCase()
      )
    }

    if (rating) {
      filtered = filtered.filter(
        (person) =>
          person.department === 'Sales' &&
          parseFloat(ratings[person.id]) >= parseFloat(rating)
      )
    }

    setFilteredSalespeople(filtered)
  }

  const clearFilters = () => {
    setDepartment('')
    setRating('')
    setFilteredSalespeople(salespeople)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Meet Our {searchParams?.rol} Team
        </h1>
        <p className="text-gray-600">Find the right professional for you.</p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSalespeople.map((person) => (
          <>
            <CardTeamSales
              rol={searchParams?.rol as string}
              name={`${person.first_name} ${person.last_name}`}
              position={person.department}
              image={person.image_url || ''}
              languages={['English', 'French', 'Spanish']}
              traits={{ friendly: true, efficient: true, respectful: true }}
              description="I've been an advisor for over 6 years. I love helping families find the perfect car that fits their needs and budget."
              onScheduleMeeting={() => console.log('Schedule meeting')}
              onGetToKnow={() => console.log('Get to know')}
            />
          </>
        ))}
      </div>
    </div>
  )
}

//  <div
//                 key={person.id}
//                 className="bg-white rounded-lg shadow-md p-6"
//               >
//                 <div className="flex items-start gap-4">
//                   {/* Profile Image */}
//                   <div className="w-24 h-24 bg-blue-600 rounded-lg overflow-hidden relative">
//                     {person.image_url ? (
//                       <Image
//                         src={person.image_url}
//                         alt={`${person.first_name} ${person.last_name}`}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
//                         {getInitials(person.first_name, person.last_name)}
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="text-xl font-semibold">
//                           {person.first_name} {person.last_name}
//                         </h3>
//                         <p className="text-gray-600">{person.position}</p>
//                         <p className="text-sm text-gray-500">
//                           {person.department}
//                         </p>
//                       </div>
//                       {person.department === 'Sales' && (
//                         <div className="flex items-center">
//                           <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                           <span className="ml-1">{ratings[person.id]}</span>
//                         </div>
//                       )}
//                     </div>

//                     {person.department === 'Sales' && (
//                       <div className="mt-2">
//                         <p className="text-sm text-gray-600">
//                           {person.languages.join(' • ')}
//                         </p>
//                         <div className="mt-1 flex flex-wrap gap-2">
//                           {person.specialties.map((specialty, index) => (
//                             <span key={index} className="text-sm text-gray-600">
//                               {index > 0 ? ' • ' : ''}
//                               {specialty}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     <p className="mt-3 text-sm text-gray-700 line-clamp-2">
//                       {person.bio ||
//                         person.work_motivation ||
//                         `${person.first_name} is a dedicated member of our ${person.department} team.`}
//                     </p>

//                     <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
//                       Schedule Appointment
//                     </button>
//                   </div>
//                 </div>
//               </div>
