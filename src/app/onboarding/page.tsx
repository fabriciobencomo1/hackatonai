'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SalespersonData } from '@/types';
import { generateBioAction } from '../actions/generate-bio';

export default function OnboardingPage() {
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SalespersonData>();

  const onSubmit = async (data: SalespersonData) => {
    setIsLoading(true);
    try {
      // Convert arrays from string to array if they come as comma-separated strings
      const formattedData: SalespersonData = {
        ...data,
        languages: Array.isArray(data.languages) ? data.languages : data.languages.toString().split(',').map((l: string) => l.trim()),
        specialties: Array.isArray(data.specialties) ? data.specialties : data.specialties.toString().split(',').map((s: string) => s.trim())
      };
      
      const generatedBio = await generateBioAction(formattedData);
      setBio(generatedBio);
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating biography');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Demo AI - Salesperson Registration</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                {...register('firstName', { required: true })}
                className="input"
                placeholder="John"
              />
              {errors.firstName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                {...register('lastName', { required: true })}
                className="input"
                placeholder="Doe"
              />
              {errors.lastName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              className="input"
              type="email"
              placeholder="john@example.com"
            />
            {errors.email && <span className="text-red-500 text-sm">Invalid email</span>}
          </div>

          <div>
            <label className="block mb-1">Position</label>
            <input
              {...register('position', { required: true })}
              className="input"
              placeholder="Senior Sales Executive"
            />
            {errors.position && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block mb-1">Years of Experience</label>
            <input
              {...register('yearsExperience', { required: true, min: 0 })}
              className="input"
              type="number"
              placeholder="5"
            />
            {errors.yearsExperience && <span className="text-red-500 text-sm">Must be a positive number</span>}
          </div>

          <div>
            <label className="block mb-1">Languages (comma-separated)</label>
            <input
              {...register('languages', { required: true })}
              className="input"
              placeholder="English, Spanish"
            />
            {errors.languages && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block mb-1">Specialties (comma-separated)</label>
            <input
              {...register('specialties', { required: true })}
              className="input"
              placeholder="Sports cars, Luxury vehicles"
            />
            {errors.specialties && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block mb-1">Sales Style</label>
            <select {...register('salesStyle', { required: true })} className="input">
              <option value="">Select a style</option>
              <option value="Consultative">Consultative</option>
              <option value="Relationship">Relationship-based</option>
              <option value="Direct">Direct</option>
            </select>
            {errors.salesStyle && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block mb-1">Work Motivation</label>
            <textarea
              {...register('workMotivation', { required: true })}
              className="textarea"
              rows={3}
              placeholder="What motivates you to sell cars?"
            />
            {errors.workMotivation && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Biography'}
          </button>
        </form>

        {bio && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Generated Biography:</h2>
            <p className="whitespace-pre-wrap">{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
} 