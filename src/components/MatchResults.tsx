'use client';

import { useState } from 'react';
import { Salesperson } from '@/lib/db-utils';
import { Star, Award } from 'lucide-react';
import Image from 'next/image';

interface MatchResultsProps {
  matches: Salesperson[];
  onClose: () => void;
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function MatchResults({ matches, onClose }: MatchResultsProps) {
  const [selectedPerson, setSelectedPerson] = useState<Salesperson | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 relative">
        <h2 className="text-2xl font-bold mb-6">Your Best Matches</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matches.map((person, index) => (
            <div
              key={person.id}
              className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform hover:scale-105 ${
                selectedPerson?.id === person.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedPerson(person)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-lg overflow-hidden relative">
                  {person.image_url ? (
                    <Image
                      src={person.image_url}
                      alt={`${person.first_name} ${person.last_name}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                      {getInitials(person.first_name, person.last_name)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {person.first_name} {person.last_name}
                  </h3>
                  <p className="text-sm text-gray-600">{person.position}</p>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm">Match Score: {95 - index * 5}%</span>
                  </div>
                </div>
              </div>

              <div className="text-sm space-y-2">
                <div className="flex flex-wrap gap-1">
                  {person.badges?.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {badge}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600">
                  Languages: {person.languages.join(', ')}
                </p>
                <p className="text-gray-600">
                  Specialties: {person.specialties.join(', ')}
                </p>
                <p className="text-gray-600">
                  Experience: {person.years_experience} years
                </p>
                {person.favorite_models?.length > 0 && (
                  <p className="text-gray-600">
                    Favorite Models: {person.favorite_models.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedPerson && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Why this is a great match:</h3>
            <p className="text-gray-700 mb-4">
              {selectedPerson.bio || selectedPerson.work_motivation}
            </p>
            <button
              className="btn-primary w-full"
              onClick={() => {
                // Aquí iría la lógica para agendar una cita
                alert('Scheduling functionality coming soon!');
              }}
            >
              Schedule Appointment
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 