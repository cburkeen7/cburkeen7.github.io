export interface Animal {
  _id?: string;           // MongoDB ObjectId as string, optional for new animals
  name: string;
  species: string;
  gender: string;
  age: number;
  weight: string;
  trainingStatus: string;
  reserved: boolean;
  inServiceCountry: string;
  image?: string;         // optional, since some animals might not have an image yet
}