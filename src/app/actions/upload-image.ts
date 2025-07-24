'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function uploadImage(data: FormData): Promise<string> {
  try {
    const file = data.get('file') as File;
    if (!file) {
      throw new Error('No file uploaded');
    }

    // Convertir el archivo a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear un nombre de archivo único
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `profile_${timestamp}.${extension}`;
    
    // Ruta donde se guardará la imagen
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'team');
    const filepath = join(uploadDir, filename);

    // Guardar el archivo
    await writeFile(filepath, buffer);

    // Devolver la URL relativa
    return `/uploads/team/${filename}`;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
} 