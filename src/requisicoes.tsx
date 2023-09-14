import { PlanetContextType } from './context/PlanetsContext';

export async function pegaTudo() {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const resultados = data.results; // peguei o array de planetas (objetos).

  resultados.forEach((planeta: any) => { // pensei em colocar o type como sendo "PlanetContextType".
    delete planeta.residents;
  });
  return resultados;
}
