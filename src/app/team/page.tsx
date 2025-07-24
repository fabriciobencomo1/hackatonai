'use client';

import { useState, useEffect } from 'react';
import { getAllSalespeople } from '@/lib/db-utils';
import type { Salesperson } from '@/lib/db-utils';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function TeamPage() {
  const [salespeople, setSalespeople] = useState<Salesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('');
  const [rating, setRating] = useState('');
  const [filteredSalespeople, setFilteredSalespeople] = useState<Salesperson[]>([]);

  useEffect(() => {
    const loadSalespeople = async () => {
      const data = await getAllSalespeople();
      setSalespeople(data);
      setFilteredSalespeople(data);
      setLoading(false);
    };

    loadSalespeople();
  }, []);

  const handleFilter = () => {
    let filtered = [...salespeople];

    if (language) {
      filtered = filtered.filter(person => 
        person.languages.some(lang => 
          lang.toLowerCase().includes(language.toLowerCase())
        )
      );
    }

    if (rating) {
      // In a real app, you would have actual ratings
      // For now, we'll use a random rating between 4.0 and 5.0
      filtered = filtered.filter(() => true);
    }

    setFilteredSalespeople(filtered);
  };

  const clearFilters = () => {
    setLanguage('');
    setRating('');
    setFilteredSalespeople(salespeople);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Meet the Sales Team</h1>
        <p className="text-gray-600">Find the right advisor for you.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            handleFilter();
          }}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Japanese">Japanese</option>
        </select>

        <select
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            handleFilter();
          }}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Rating</option>
          <option value="4.5">4.5+</option>
          <option value="4.0">4.0+</option>
          <option value="3.5">3.5+</option>
        </select>

        <button
          onClick={clearFilters}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Clear all
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSalespeople.map((person) => (
          <div key={person.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              {/* Profile Image - Using a placeholder for now */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative">
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(person.first_name)}&backgroundColor=ffffff`}
                  alt={`${person.first_name} ${person.last_name}`}
                  fill
                  sizes="(max-width: 96px) 100vw, 96px"
                  className="object-cover"
                  priority={true}
                  onError={(e) => {
                    // Fallback to a default avatar if DiceBear fails
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://api.dicebear.com/7.x/avataaars/png?seed=fallback';
                  }}
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {person.first_name} {person.last_name}
                    </h3>
                    <p className="text-gray-600">{person.position}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1">{(Math.random() * (5 - 4) + 4).toFixed(1)}</span>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {person.languages.join(' • ')}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {person.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-sm text-gray-600"
                      >
                        {index > 0 ? ' • ' : ''}{specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-700 line-clamp-2">
                  {person.bio || person.work_motivation}
                </p>

                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 