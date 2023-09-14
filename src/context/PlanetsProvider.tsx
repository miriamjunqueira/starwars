import React, { useState, useEffect } from 'react';
import PlanetsContext,
{ PlanetContextType, SistemaPlanetarioType } from './PlanetsContext';
import Table from '../pages/Table';
import { pegaTudo } from '../requisicoes';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

export default function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planets, setPlanets] = useState<PlanetContextType[]>([]);

  useEffect(() => {
    async function buscaInfos() {
      const infos = await pegaTudo();
      setPlanets(infos);
    }
    buscaInfos();
  }, []);

  //   async function pegaInfosApi() {
  //     return pegaTudo();
  //   }

  return (
    <PlanetsContext.Provider value={ { planetas: planets } }>
      {children}
    </PlanetsContext.Provider>
  );
}
