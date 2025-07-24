'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface MatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: MatchingSurveyData) => void;
}

export interface MatchingSurveyData {
  name?: string;
  preferredLanguage: string;
  vehicleType: string;
  isFirstTime: boolean;
  preferences: string[];
  additionalInfo?: string;
}

const STEPS = [
  'About You',
  'Your Car Buying Journey',
  'Preferences'
] as const;

export function MatchingModal({ isOpen, onClose, onComplete }: MatchingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<MatchingSurveyData>({
    preferredLanguage: '',
    vehicleType: '',
    isFirstTime: false,
    preferences: [],
  });

  const updateFormData = (data: Partial<MatchingSurveyData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index < STEPS.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <div
                  className={`text-sm ml-2 ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">About You</h2>
              <div>
                <label className="block mb-2">Name (optional)</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  className="input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block mb-2">Preferred Language</label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => updateFormData({ preferredLanguage: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Select a language</option>
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Cantonese">Cantonese</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Your Car Buying Journey</h2>
              <div>
                <label className="block mb-2">What type of vehicle are you looking for?</label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => updateFormData({ vehicleType: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Select a vehicle type</option>
                  <option value="Electric">Electric</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Not Sure">Not Sure Yet</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Is this your first time buying a car?</label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={formData.isFirstTime}
                      onChange={() => updateFormData({ isFirstTime: true })}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={!formData.isFirstTime}
                      onChange={() => updateFormData({ isFirstTime: false })}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Preferences</h2>
              <div>
                <label className="block mb-2">I prefer to work with someone who:</label>
                <div className="space-y-2">
                  {[
                    'Speaks my language',
                    'Is patient with first-time buyers',
                    'Knows a lot about EVs',
                    'Specializes in trucks or utility vehicles',
                    'Can guide me virtually (email/video)'
                  ].map((pref) => (
                    <label key={pref} className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.preferences.includes(pref)}
                        onChange={(e) => {
                          const newPreferences = e.target.checked
                            ? [...formData.preferences, pref]
                            : formData.preferences.filter((p) => p !== pref);
                          updateFormData({ preferences: newPreferences });
                        }}
                        className="mt-1 mr-2"
                      />
                      {pref}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-2">Anything else you'd like us to know?</label>
                <textarea
                  value={formData.additionalInfo || ''}
                  onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
                  className="textarea"
                  rows={3}
                  placeholder="Additional information..."
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className={`btn-secondary ${currentStep === 0 ? 'invisible' : ''}`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="btn-primary"
            disabled={
              (currentStep === 0 && !formData.preferredLanguage) ||
              (currentStep === 1 && !formData.vehicleType) ||
              (currentStep === 2 && formData.preferences.length === 0)
            }
          >
            {currentStep === STEPS.length - 1 ? 'Find My Match' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
} 