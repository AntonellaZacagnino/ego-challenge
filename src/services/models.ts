import { API_BASE_URL } from './config';
import { fetchAPI } from './apiClient';

const MODELS_API_URL = `${API_BASE_URL}models/`;

export interface Model {
    id: number,
    name: string,
    segment: string,
    year: number,
    price: number,
    thumbnail: string,
    photo: string
}

export async function getModels(): Promise<Model[]> {
  return fetchAPI<Model[]>(MODELS_API_URL);
}