import { useContext, useState, ChangeEvent } from 'react';
import PlanetsContext, { PlanetContextType } from '../context/PlanetsContext';

function Table() {
  const contextoPlanetas = useContext(PlanetsContext);
  const arrayDePlanetas = contextoPlanetas.planetas;

  const [palavraBuscada, setPalavraBuscada] = useState('');
  const [planetasBuscados, setPlanetasBuscados] = useState<PlanetContextType[]>([]);

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const caracteresBucados = event.target.value;
    setPalavraBuscada(caracteresBucados);

    // console.log('Caracteres buscados:');
    // console.log(caracteresBucados);
    // console.log('palavra buscada:');
    // console.log(palavraBuscada);

    const lowerCaracteresBuscados = caracteresBucados.toLocaleLowerCase();

    // console.log('Caracteres buscados em lower case:');
    // console.log(lowerCaracteresBuscados);

    const retornoDaBusca = arrayDePlanetas.filter((planeta) => {
      return planeta.name.toLocaleLowerCase().includes(lowerCaracteresBuscados);
    });

    // console.log('retorno da busca:');
    // console.log(retornoDaBusca);

    setPlanetasBuscados(retornoDaBusca);

    // console.log('Planetas buscado:');
    // console.log(planetasBuscados);
  }

  let arrayASerExibido: PlanetContextType[] = [];
  arrayASerExibido = [...arrayDePlanetas];
  if (palavraBuscada.length > 0) {
    arrayASerExibido = [...planetasBuscados];
  }

  return (
    <div>
      <input
        type="text"
        name="pesquisa"
        value={ palavraBuscada }
        onChange={ handleSearchChange }
        data-testid="name-filter"
      />
      <table border={ 1 } width={ 500 }>
        <thead>
          <th colSpan={ 20 }>Projeto Star Wars:</th>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { arrayASerExibido.map((planeta: PlanetContextType, index: number) => {
            return (
              <tr
                key={ planeta.name }
              >
                <td width={ 1 }>{`${planeta.name}`}</td>
                <td width={ 1 }>{`${planeta.rotation_period}`}</td>
                <td width={ 1 }>{`${planeta.orbital_period}`}</td>
                <td width={ 1 }>{`${planeta.diameter}`}</td>
                <td width={ 1 }>{`${planeta.climate}`}</td>
                <td width={ 1 }>{`${planeta.gravity}`}</td>
                <td width={ 1 }>{`${planeta.terrain}`}</td>
                <td width={ 1 }>{`${planeta.surface_water}`}</td>
                <td width={ 1 }>{`${planeta.population}`}</td>
                <td width={ 1 }>{`${planeta.films}`}</td>
                <td width={ 1 }>{`${planeta.created}`}</td>
                <td width={ 1 }>{`${planeta.edited}`}</td>
                <td width={ 1 }>{`${planeta.url}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
