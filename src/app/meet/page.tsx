'use client'

import { useState, useEffect, useMemo } from 'react'
import { getAllSalespeople } from '@/lib/db-utils'
import type { Salesperson } from '@/lib/db-utils'
import CardTeamSales from '@/components/CardTeamSales'
import { MatchingModal, type MatchingSurveyData } from '@/components/MatchingModal'
import { MatchResults } from '@/components/MatchResults'

export default function TeamPage() {
  const [salespeople, setSalespeople] = useState<Salesperson[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredSalespeople, setFilteredSalespeople] = useState<Salesperson[]>([])
  const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false)
  const [matchResults, setMatchResults] = useState<Salesperson[]>([])
  const [showResults, setShowResults] = useState(false)

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

  const handleMatchingComplete = async (data: MatchingSurveyData) => {
    try {
      const response = await fetch('/api/match-salesperson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to match salesperson')
      }

      const matchedSalespeople = await response.json()
      setMatchResults(matchedSalespeople)
      setIsMatchingModalOpen(false)
      setShowResults(true)
    } catch (error) {
      console.error('Error matching salesperson:', error)
      // Aquí podrías mostrar un mensaje de error al usuario
    }
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
        <h1 className="text-3xl font-bold mb-2">Meet Our Sales Team</h1>
        <p className="text-gray-600">Find the right professional for you.</p>
        
        {/* Find Your Salesperson Button */}
        <button
          onClick={() => setIsMatchingModalOpen(true)}
          className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Find Your Perfect Salesperson Match
        </button>
      </div>

      {/* Matching Modal */}
      <MatchingModal
        isOpen={isMatchingModalOpen}
        onClose={() => setIsMatchingModalOpen(false)}
        onComplete={handleMatchingComplete}
      />

      {/* Match Results */}
      {showResults && (
        <MatchResults
          results={matchResults}
          onClose={() => setShowResults(false)}
        />
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSalespeople.map((person) => (
          <CardTeamSales
            key={person.id}
            name={`${person.first_name} ${person.last_name}`}
            position={person.position}
            image={person.image_url || '/path/to/profile.jpg'}
            languages={person.languages}
            traits={{ friendly: true, efficient: true, respectful: true }}
            description={person.bio || person.work_motivation || `${person.first_name} is a dedicated member of our ${person.department} team.`}
            onScheduleMeeting={() => console.log('Schedule meeting')}
            onGetToKnow={() => console.log('Get to know')}
          />
        ))}
      </div>
    </div>
  )
}
