'use server';

import OpenAI from 'openai';
import { SalespersonData } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateBioInput = Omit<SalespersonData, 'languages' | 'specialties' | 'softSkills'> & {
  languages: string[];
  specialties: string[];
  softSkills: string[];
};

export async function generateBioAction(formData: GenerateBioInput): Promise<string> {
  try {
    const prompt = `
    Generate a professional biography for a car salesperson:
    
    - Name: ${formData.firstName} ${formData.lastName}
    - Position: ${formData.position}
    - Years of Experience: ${formData.yearsExperience}
    - Languages: ${formData.languages.join(', ')}
    - Specialties: ${formData.specialties.join(', ')}
    - Sales Style: ${formData.salesStyle}
    - Soft Skills: ${formData.softSkills.join(', ')}
    
    Requirements:
    - Maximum 120 words
    - Professional yet approachable tone
    - In English
    - Include a call-to-action at the end
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating bio:', error);
    return 'Error generating biography. Please try again.';
  }
} 