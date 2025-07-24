'use server';

import OpenAI from 'openai';
import { SalespersonSaveData } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBioAction(formData: SalespersonSaveData): Promise<string> {
  try {
    let prompt = '';

    if (formData.department === 'Sales') {
      prompt = `
      Generate a professional biography for a car salesperson:
      
      - Name: ${formData.firstName} ${formData.lastName}
      - Position: ${formData.position}
      - Years of Experience: ${formData.yearsExperience}
      - Languages: ${formData.languages.join(', ')}
      - Specialties: ${formData.specialties.join(', ')}
      - Sales Style: ${formData.salesStyle}
      - Badges: ${formData.badges.join(', ')}
      - Favorite Models: ${formData.favoriteModels.join(', ')}
      - Soft Skills: ${formData.softSkills.join(', ')}
      
      Requirements:
      - Maximum 120 words
      - Professional yet approachable tone
      - In English
      - Include a call-to-action at the end
      - Highlight their badges and expertise with specific models
      `;
    } else if (formData.department === 'Managers') {
      prompt = `
      Generate a professional biography for a dealership manager:
      
      - Name: ${formData.firstName} ${formData.lastName}
      - Position: ${formData.position}
      - Years of Experience: ${formData.yearsExperience}
      - Soft Skills: ${formData.softSkills.join(', ')}
      
      Requirements:
      - Maximum 100 words
      - Professional and authoritative tone
      - In English
      - Focus on leadership and management experience
      - Highlight their role in team development and dealership success
      `;
    } else if (formData.department === 'Parts') {
      prompt = `
      Generate a professional biography for a parts department professional:
      
      - Name: ${formData.firstName} ${formData.lastName}
      - Position: ${formData.position}
      - Years of Experience: ${formData.yearsExperience}
      - Soft Skills: ${formData.softSkills.join(', ')}
      
      Requirements:
      - Maximum 100 words
      - Professional and technical tone
      - In English
      - Focus on parts expertise and customer service
      - Highlight their role in vehicle maintenance and repair support
      `;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating bio:', error);
    // Biografías genéricas por departamento en caso de error
    const genericBios = {
      Sales: `${formData.firstName} is a dedicated sales professional with ${formData.yearsExperience} years of experience in the automotive industry. Specializing in ${formData.specialties.join(' and ')}, they are committed to helping customers find their perfect vehicle. Contact them today to start your car-buying journey.`,
      Managers: `${formData.firstName} ${formData.lastName} is an experienced ${formData.position} with ${formData.yearsExperience} years in automotive management. They excel in team leadership and ensuring exceptional customer service across all dealership operations.`,
      Parts: `${formData.firstName} ${formData.lastName} brings ${formData.yearsExperience} years of expertise to our parts department. As a ${formData.position}, they ensure our customers receive the right parts and technical support for their vehicles.`
    };

    return genericBios[formData.department as keyof typeof genericBios] || 'Biography not available.';
  }
} 