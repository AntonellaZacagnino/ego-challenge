import { API_BASE_URL } from './config';
import { fetchAPI } from './apiClient';

const DETAILS_API_URL = `${API_BASE_URL}models/`;

export interface DetailsModel {
    id: number,
    name: string,
    segment: string,
    year: number,
    price: number,
    title: string,
    description: string,
    thumbnail: string,
    photo: string,
    model_features: [
        {
            name: string;
            description: string;
            image: string;
        }
    ],
    model_highlights: [
        {
            title: string;
            content: string;
            image: string;
        }
    ]
}

export async function getDetailsModel(id: number): Promise<DetailsModel> {
  return fetchAPI<DetailsModel>(`${DETAILS_API_URL}${id}`);
}