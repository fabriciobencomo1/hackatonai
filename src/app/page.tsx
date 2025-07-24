'use client';

import { useState } from 'react';
import { MatchingModal, type MatchingSurveyData } from '@/components/MatchingModal';
import { MatchResults } from '@/components/MatchResults';
import type { Salesperson } from '@/lib/db-utils';

export default function Home() {
  const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false);
  const [matchResults, setMatchResults] = useState<Salesperson[] | null>(null);

  const handleMatchingComplete = async (data: MatchingSurveyData) => {
    try {
      const response = await fetch('/api/match-salesperson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to match salesperson');
      }

      const matchedSalespeople = await response.json();
      setMatchResults(matchedSalespeople);
      setIsMatchingModalOpen(false);
    } catch (error) {
      console.error('Error matching salesperson:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            SmartStaff AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find your perfect automotive sales professional match with AI
          </p>
          <button
            onClick={() => setIsMatchingModalOpen(true)}
            className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Find Your Perfect Match
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature Cards */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
            <p className="text-gray-600">
              Our advanced AI algorithm finds the perfect sales professional based on your preferences and needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
            <p className="text-gray-600">
              Connect with experienced automotive professionals who understand your needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Seamless Experience</h3>
            <p className="text-gray-600">
              Schedule appointments and communicate effortlessly with your matched professional.
            </p>
          </div>
        </div>
      </div>

      <MatchingModal
        isOpen={isMatchingModalOpen}
        onClose={() => setIsMatchingModalOpen(false)}
        onComplete={handleMatchingComplete}
      />

      {matchResults && (
        <MatchResults
          results={matchResults}
          onClose={() => setMatchResults(null)}
        />
      )}
    </main>
  );
}
