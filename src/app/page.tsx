'use client';

import { useState } from 'react';
import Link from "next/link";
import { MatchingModal, type MatchingSurveyData } from '@/components/MatchingModal';
import { MatchResults } from '@/components/MatchResults';
import { matchSalesperson } from './actions/match-salesperson';
import type { Salesperson } from '@/lib/db-utils';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<Salesperson[] | null>(null);

  const handleSurveyComplete = async (data: MatchingSurveyData) => {
    setIsLoading(true);
    try {
      const matchedSalespeople = await matchSalesperson(data);
      setMatches(matchedSalespeople);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error finding matches:', error);
      alert('Error finding matches. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Demo AI</h1>
        <p className="text-xl text-gray-600">AI-Powered Car Sales Professional Platform</p>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">

          <Link
            href="/onboarding"
            className="btn-primary"
          >
            Add Team Member
          </Link>
          
          <Link
            href="/team"
            className="btn-primary"
          >
            View Team
          </Link>
          
          <a
            className="btn-secondary"
            href="https://github.com/fabriciobencomo1/hackatonai"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code
          </a>
        </div>
      </main>
      
      <footer className="row-start-3 text-center text-gray-500">
        © 2024 Demo AI. All rights reserved.
      </footer>

      <MatchingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleSurveyComplete}
      />

      {matches && (
        <MatchResults
          matches={matches}
          onClose={() => setMatches(null)}
        />
      )}
    </div>
  );
}
