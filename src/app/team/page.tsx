'use client'

import { useState, useEffect, useMemo } from 'react'
import { getAllSalespeople } from '@/lib/db-utils'
import type { Salesperson } from '@/lib/db-utils'

import CardTeam from '@/components/CardTeam'

const teamData = [
  {
    title: 'Executive Team',
    image: '/uploads/team/ian.jpg', // Replace with your actual image paths
    href: '/meet',
    colorOverlay: 'bg-blue-600',
    rol: 'Executive',
  },
  {
    title: 'Sales',
    image: '/uploads/team/chris.png',
    href: '/meet',
    colorOverlay: 'bg-green-600',
    rol: 'Sales',
  },
  {
    title: 'Marketing',
    image: '/uploads/team/marketing.png',
    href: '/meet',
    colorOverlay: 'bg-purple-600',
    rol: 'Marketing',
  },
  {
    title: 'Account Management',
    image: '/uploads/team/victor.png',
    href: '/meet',
    colorOverlay: 'bg-orange-600',
    rol: 'Account Management',
  },
]

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

export default function TeamPage() {
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
        <h1 className="text-3xl font-bold mb-2">Meet Our Team</h1>
        <p className="text-gray-600">Find the right professional for you.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value)
            handleFilter()
          }}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Departments</option>
          <option value="Sales">Sales</option>
          <option value="Managers">Managers</option>
          <option value="Parts">Parts</option>
        </select>

        {department === 'Sales' && (
          <select
            value={rating}
            onChange={(e) => {
              setRating(e.target.value)
              handleFilter()
            }}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Rating</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
          </select>
        )}

        <button
          onClick={clearFilters}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Clear all
        </button>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {teamData.map((team, index) => (
            <CardTeam
              key={index}
              title={team.title}
              image={team.image}
              href={team.href}
              colorOverlay={team.colorOverlay}
              rol={team.rol}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
