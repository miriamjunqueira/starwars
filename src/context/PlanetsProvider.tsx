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
      setPlanets(infos); // array de planetas (objetos)!
      // console.log(infos[0].name);    teste
    }
    buscaInfos();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planetas: planets } }>
      {children}
    </PlanetsContext.Provider>
  );
}
