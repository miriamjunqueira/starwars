import { useState, useContext, ChangeEvent } from 'react';
import PlanetsContext, { PlanetContextType } from '../context/PlanetsContext';

function useBuscaTextualInput(initialValue: string) {
  const contextoPlanetas = useContext(PlanetsContext);
  const arrayDePlanetas = contextoPlanetas.planetas;

  const [palavraBuscada, setPalavraBuscada] = useState(initialValue);
  const [planetasBuscados, setPlanetasBuscados] = useState<PlanetContextType[]>([]);

  function handleSearchChange(newValue: string) {
    setPalavraBuscada(newValue);

    const lowerCaracteresBuscados = palavraBuscada.toLocaleLowerCase();

    const retornoDaBusca = arrayDePlanetas.filter((planeta) => {
      return planeta.name.toLocaleLowerCase().includes(lowerCaracteresBuscados);
    });

    setPlanetasBuscados(retornoDaBusca);
  }

  let arrayASerExibido: PlanetContextType[] = [];
  arrayASerExibido = [...arrayDePlanetas];
  if (palavraBuscada.length > 0) {
    arrayASerExibido = [...planetasBuscados];
  }

  return {
    value: arrayASerExibido,
    onchange: handleSearchChange,
  };
}

export default useBuscaTextualInput;
