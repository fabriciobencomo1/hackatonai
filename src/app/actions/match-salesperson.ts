'use server';

import OpenAI from 'openai';
import { getAllSalespeople } from '@/lib/db-utils';
import type { MatchingSurveyData } from '@/components/MatchingModal';
import type { Salesperson } from '@/lib/db-utils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function matchSalesperson(surveyData: MatchingSurveyData): Promise<Salesperson[]> {
  try {
    // Obtener todos los vendedores
    const salespeople = (await getAllSalespeople()).filter(person => person.department === 'Sales');

    // Crear el prompt para OpenAI
    const prompt = `
    Given a car buyer's preferences and a list of salespeople, rank the top 3 most suitable matches.
    
    Buyer Preferences:
    - Name: ${surveyData.name || 'Not provided'}
    - Preferred Language: ${surveyData.preferredLanguage}
    - Vehicle Interest: ${surveyData.vehicleType}
    - First Time Buyer: ${surveyData.isFirstTime ? 'Yes' : 'No'}
    - Preferences: ${surveyData.preferences.join(', ')}
    - Additional Info: ${surveyData.additionalInfo || 'None'}
    
    Available Salespeople:
    ${salespeople.map((person, index) => `
    ${index + 1}. ${person.first_name} ${person.last_name}
    - Languages: ${person.languages.join(', ')}
    - Specialties: ${person.specialties.join(', ')}
    - Experience: ${person.years_experience} years
    - Sales Style: ${person.sales_style}
    - Bio: ${person.bio || person.work_motivation}
    `).join('\n')}
    
    Return only a JSON array with the IDs of the top 3 most suitable salespeople in order of best match, like this:
    ["id1", "id2", "id3"]
    
    Base your ranking on:
    1. Language match
    2. Vehicle type expertise
    3. Experience level (especially for first-time buyers)
    4. Specialties matching buyer preferences
    5. Sales style compatibility
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from OpenAI');

    // Parsear la respuesta y obtener los IDs
    const { matches } = JSON.parse(response);
    if (!Array.isArray(matches)) throw new Error('Invalid response format');

    // Obtener los vendedores correspondientes
    const matchedSalespeople = matches
      .map(id => salespeople.find(person => person.id === id))
      .filter((person): person is Salesperson => person !== undefined);

    return matchedSalespeople;
  } catch (error) {
    console.error('Error matching salesperson:', error);
    // En caso de error, devolver los 3 primeros vendedores disponibles
    const salespeople = (await getAllSalespeople()).filter(person => person.department === 'Sales');
    return salespeople.slice(0, 3);
  }
} 