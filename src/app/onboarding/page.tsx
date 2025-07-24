'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SalespersonFormData, BADGES, MODELS } from '@/types';
import { generateBioAction } from '../actions/generate-bio';
import { uploadImage } from '../actions/upload-image';
import { createSalesperson } from '@/lib/db-utils';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Image from 'next/image';

const DEPARTMENTS = {
  SALES: 'Sales',
  MANAGERS: 'Managers',
  PARTS: 'Parts'
} as const;

// Opciones para los selectores múltiples
const LANGUAGES = [
  { value: 'English', label: 'English' },
  { value: 'Mandarin Chinese', label: 'Mandarin Chinese' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'Modern Arabic', label: 'Modern Arabic' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Indonesian', label: 'Indonesian' },
  { value: 'German', label: 'German' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Swahili', label: 'Swahili' },
  { value: 'Marathi', label: 'Marathi' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Turkish', label: 'Turkish' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Vietnamese', label: 'Vietnamese' },
  { value: 'Korean', label: 'Korean' }
];

const SPECIALTIES = [
  { value: 'Luxury Cars', label: 'Luxury Cars' },
  { value: 'Sports Cars', label: 'Sports Cars' },
  { value: 'Electric Vehicles', label: 'Electric Vehicles' },
  { value: 'Hybrid Vehicles', label: 'Hybrid Vehicles' },
  { value: 'SUVs', label: 'SUVs' },
  { value: 'Trucks', label: 'Trucks' },
  { value: 'Commercial Vehicles', label: 'Commercial Vehicles' },
  { value: 'Classic Cars', label: 'Classic Cars' },
  { value: 'Performance Vehicles', label: 'Performance Vehicles' },
  { value: 'Family Cars', label: 'Family Cars' },
  { value: 'Off-road Vehicles', label: 'Off-road Vehicles' },
  { value: 'Compact Cars', label: 'Compact Cars' },
  { value: 'Motorcycles', label: 'Motorcycles' },
  { value: 'RVs', label: 'RVs' },
  { value: 'Fleet Vehicles', label: 'Fleet Vehicles' }
];

const SOFT_SKILLS = [
  { value: 'Communication', label: 'Communication' },
  { value: 'Active Listening', label: 'Active Listening' },
  { value: 'Negotiation', label: 'Negotiation' },
  { value: 'Problem Solving', label: 'Problem Solving' },
  { value: 'Relationship Building', label: 'Relationship Building' },
  { value: 'Time Management', label: 'Time Management' },
  { value: 'Adaptability', label: 'Adaptability' },
  { value: 'Emotional Intelligence', label: 'Emotional Intelligence' },
  { value: 'Persuasion', label: 'Persuasion' },
  { value: 'Customer Service', label: 'Customer Service' },
  { value: 'Conflict Resolution', label: 'Conflict Resolution' },
  { value: 'Team Collaboration', label: 'Team Collaboration' },
  { value: 'Strategic Thinking', label: 'Strategic Thinking' },
  { value: 'Decision Making', label: 'Decision Making' },
  { value: 'Leadership', label: 'Leadership' }
];

// Convertir BADGES y MODELS a opciones para react-select
const BADGE_OPTIONS = BADGES.map(badge => ({ value: badge, label: badge }));
const MODEL_OPTIONS = MODELS.map(model => ({ value: model, label: model }));

export default function OnboardingPage() {
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<SalespersonFormData>();
  const formData = watch();
  const selectedDepartment = watch('department');
  const isSalesDepartment = selectedDepartment === DEPARTMENTS.SALES;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Crear URL temporal para la vista previa
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const onGenerateBio = async (data: SalespersonFormData) => {
    setIsLoading(true);
    setError('');
    try {
      const formattedData = {
        ...data,
        languages: data.languages?.map(lang => lang.value) || [],
        specialties: data.specialties?.map(spec => spec.value) || [],
        softSkills: data.softSkills?.map(skill => skill.value) || [],
        badges: data.badges?.map(badge => badge.value) || [],
        favoriteModels: data.favoriteModels?.map(model => model.value) || []
      };

      const generatedBio = await generateBioAction(formattedData);
      setBio(generatedBio);
    } catch (error) {
      console.error('Error:', error);
      setError('Error generating biography. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveSalesperson = async () => {
    if (isSalesDepartment && !bio) {
      setError('Please generate a biography first');
      return;
    }

    setIsSaving(true);
    setError('');
    try {
      let imageUrl = undefined;
      const file = fileInputRef.current?.files?.[0];
      
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        imageUrl = await uploadImage(formData);
      }

      // Si no es departamento de ventas, generar la biografía automáticamente
      let finalBio = bio;
      if (!isSalesDepartment) {
        const formattedData = {
          ...formData,
          languages: [],
          specialties: [],
          softSkills: formData.softSkills?.map(skill => skill.value) || [],
          badges: [],
          favoriteModels: []
        };
        finalBio = await generateBioAction(formattedData);
      }

      const dataToSave = {
        ...formData,
        bioGenerated: finalBio,
        yearsExperience: Number(formData.yearsExperience),
        languages: formData.languages?.map(lang => lang.value) || [],
        specialties: formData.specialties?.map(spec => spec.value) || [],
        softSkills: formData.softSkills?.map(skill => skill.value) || [],
        badges: formData.badges?.map(badge => badge.value) || [],
        favoriteModels: formData.favoriteModels?.map(model => model.value) || [],
        imageUrl
      };

      await createSalesperson(dataToSave);
      alert('Profile created successfully!');
      router.push('/team');
    } catch (error) {
      console.error('Error:', error);
      setError('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Limpiar las URLs de vista previa al desmontar
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Team Member</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(isSalesDepartment ? onGenerateBio : onSaveSalesperson)} className="space-y-4">
          <div>
            <label className="block mb-1">Profile Image</label>
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Department</label>
            <select 
              {...register('department', { required: true })} 
              className="input"
              defaultValue=""
            >
              <option value="" disabled>Select a department</option>
              <option value={DEPARTMENTS.SALES}>{DEPARTMENTS.SALES}</option>
              <option value={DEPARTMENTS.MANAGERS}>{DEPARTMENTS.MANAGERS}</option>
              <option value={DEPARTMENTS.PARTS}>{DEPARTMENTS.PARTS}</option>
            </select>
            {errors.department && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

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
              placeholder={isSalesDepartment ? "Senior Sales Executive" : "Position Title"}
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
            <label className="block mb-1">Soft Skills</label>
            <Controller
              name="softSkills"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={SOFT_SKILLS}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select soft skills..."
                />
              )}
            />
            {errors.softSkills && <span className="text-red-500 text-sm">Please select at least one soft skill</span>}
          </div>

          {isSalesDepartment && (
            <>
              <div>
                <label className="block mb-1">Languages</label>
                <Controller
                  name="languages"
                  control={control}
                  rules={{ required: isSalesDepartment }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={LANGUAGES}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select languages..."
                    />
                  )}
                />
                {errors.languages && <span className="text-red-500 text-sm">Please select at least one language</span>}
              </div>

              <div>
                <label className="block mb-1">Vehicle Specialties</label>
                <Controller
                  name="specialties"
                  control={control}
                  rules={{ required: isSalesDepartment }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={SPECIALTIES}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select specialties..."
                    />
                  )}
                />
                {errors.specialties && <span className="text-red-500 text-sm">Please select at least one specialty</span>}
              </div>

              <div>
                <label className="block mb-1">Badges</label>
                <Controller
                  name="badges"
                  control={control}
                  rules={{ required: isSalesDepartment }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={BADGE_OPTIONS}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select your badges..."
                    />
                  )}
                />
                {errors.badges && <span className="text-red-500 text-sm">Please select at least one badge</span>}
              </div>

              <div>
                <label className="block mb-1">Favorite Models</label>
                <Controller
                  name="favoriteModels"
                  control={control}
                  rules={{ required: isSalesDepartment }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={MODEL_OPTIONS}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select your favorite models..."
                    />
                  )}
                />
                {errors.favoriteModels && <span className="text-red-500 text-sm">Please select at least one model</span>}
              </div>

              <div>
                <label className="block mb-1">Sales Style</label>
                <select {...register('salesStyle', { required: isSalesDepartment })} className="input">
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
                  {...register('workMotivation', { required: isSalesDepartment })}
                  className="textarea"
                  rows={3}
                  placeholder="What motivates you to sell cars?"
                />
                {errors.workMotivation && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading || isSaving}
          >
            {isLoading ? 'Generating...' : isSaving ? 'Saving...' : isSalesDepartment ? 'Generate Biography' : 'Save Profile'}
          </button>
        </form>

        {isSalesDepartment && bio && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Generated Biography:</h2>
            <p className="whitespace-pre-wrap mb-4">{bio}</p>
            <button
              onClick={onSaveSalesperson}
              className="btn-primary w-full"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Team Member'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 