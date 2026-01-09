export async function fetchAPI<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la llamada a la API');
    return response.json();
  } catch (error) {
    console.error('Error en fetchAPI:', error);
    throw error;
  }
}
