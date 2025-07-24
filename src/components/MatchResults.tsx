'use client';

import { X } from 'lucide-react';
import type { Salesperson } from '@/lib/db-utils';
import Image from 'next/image';

interface MatchResultsProps {
  results: Salesperson[];
  onClose: () => void;
}

export function MatchResults({ results, onClose }: MatchResultsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-2">Your Perfect Matches</h2>
          <p className="text-gray-600 text-center">
            Based on your preferences, we've found these great matches for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto p-4">
          {results.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                  {person.image_url ? (
                    <Image
                      src={person.image_url}
                      alt={`${person.first_name} ${person.last_name}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xl font-bold">
                      {person.first_name[0]}
                      {person.last_name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {person.first_name} {person.last_name}
                  </h3>
                  <p className="text-gray-600">{person.position}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">Languages</h4>
                  <p className="text-gray-600">{person.languages.join(', ')}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Specialties</h4>
                  <p className="text-gray-600">{person.specialties.join(', ')}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">About</h4>
                  <p className="text-gray-600 line-clamp-3">
                    {person.bio || person.work_motivation}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule Meeting
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Back to All Team Members
          </button>
        </div>
      </div>
    </div>
  );
} 