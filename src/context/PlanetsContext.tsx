import { createContext } from 'react';

export type PlanetContextType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  // residents: [],
  films: [],
  created: string
  edited: string
  url: string
};

export type SistemaPlanetarioType = {
  planetas: PlanetContextType[]
};

const PlanetsContext = createContext({} as SistemaPlanetarioType);

export default PlanetsContext;
