import { createContext } from 'react';

export type PlanetsContextType = {
  name: string,
  rotation_period: number,
  orbital_period: number,
  diameter: number,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: number,
  population: number,
  residents: [],
  films: [],
  created: string
  edited: string
  url: string
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
