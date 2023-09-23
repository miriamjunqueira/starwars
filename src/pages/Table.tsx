import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import PlanetsContext, { PlanetContextType } from '../context/PlanetsContext';
import { Filter } from '../types/Filter';

function Table() {
  const contextoPlanetas = useContext(PlanetsContext);
  const arrayDePlanetas = contextoPlanetas.planetas;

  const [palavraBuscada, setPalavraBuscada] = useState('');
  const [planetasBuscados, setPlanetasBuscados] = useState<PlanetContextType[]>([]);
  const [coluna, setColuna] = useState('population');
  const [operadorLogico, setOperadorLogico] = useState('maior que');
  const [valor, setValor] = useState(0);
  const [arrayDeFiltros, setArrayDeFiltros] = useState<Filter[]>([]);
  const [colunasASeremExibidasNoFiltro,
    setColunasASeremExibidasNoFiltro] = useState<string[]>(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [colunasSelecionadas, setColunasSelecionadas] = useState<string[]>([]);
  const columns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  // Renderização padrão:
  useEffect(() => {
    setPlanetasBuscados(arrayDePlanetas);
  }, [arrayDePlanetas]);

  // Rederização conforme busca textual:
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const caracteresBucados = event.target.value;
    setPalavraBuscada(caracteresBucados);

    const lowerCaracteresBuscados = caracteresBucados.toLocaleLowerCase();

    const retornoDaBusca = arrayDePlanetas.filter((planeta) => {
      return planeta.name.toLocaleLowerCase().includes(lowerCaracteresBuscados);
    });

    setPlanetasBuscados(retornoDaBusca);
  }

  // Rederização conforme busca numérica:
  function handleColumnOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setColuna(event.target.value);
  }

  function handleOperatorChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setOperadorLogico(event.target.value);
  }

  function handleNumberInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValor(parseInt(event.target.value, 10)); // conversão para decimal.
  }

  function filtraNumericamente(filtros: any) {
    let planetasFiltrados = planetasBuscados; // array de partida
    filtros.forEach((filtro: Filter) => {
      const planetasFiltradosAtual = planetasFiltrados.filter((planeta: any) => {
        if (filtro.operator === 'maior que') {
          return parseInt(planeta[filtro.column], 10) > filtro.value;
        } if (filtro.operator === 'menor que') {
          return parseInt(planeta[filtro.column], 10) < filtro.value;
        }
        return parseInt(planeta[filtro.column], 10) === filtro.value;
      });
      planetasFiltrados = planetasFiltradosAtual;
    });
    return planetasFiltrados;
  }

  // Teste:
  function handleClick(event:any) {
    event.preventDefault();

    const novoFiltro = {
      column: coluna,
      operator: operadorLogico,
      value: valor,
    };
    const filtrosAtualizados = [...arrayDeFiltros, novoFiltro];
    setArrayDeFiltros(filtrosAtualizados);
    console.log(filtrosAtualizados);

    const arrayFiltrado = filtraNumericamente(filtrosAtualizados);
    setPlanetasBuscados(arrayFiltrado);

    // Atualiza as opções disponiveis no selectde colunas:
    const atualizacaoSelecao = [...colunasSelecionadas, coluna];
    setColunasSelecionadas(atualizacaoSelecao);

    const resultado = columns.filter((column) => {
      const estaSelecionada = atualizacaoSelecao.some((colunaSelecionada) => {
        return colunaSelecionada === column;
      });
      return !estaSelecionada;
    });
    const atualizacaoExibicao = resultado;
    setColunasASeremExibidasNoFiltro(atualizacaoExibicao);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          name="pesquisa"
          value={ palavraBuscada }
          onChange={ handleSearchChange }
          data-testid="name-filter"
          className="search"
        />
      </div>
      <div>
        <form>
          <select
            name="coluna"
            id="column-select"
            data-testid="column-filter"
            onChange={ handleColumnOptionChange }
          >
            {colunasASeremExibidasNoFiltro.map((column, index:number) => {
              return (
                <option
                  key={ index }
                >
                  {column}
                </option>
              );
            })}
          </select>

          <select
            name="faixa-valorativa"
            id="value-range"
            data-testid="comparison-filter"
            onChange={ handleOperatorChange }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>

          <input
            type="number"
            data-testid="value-filter"
            id="input_number"
            name="numbers"
            value={ valor }
            onChange={ handleNumberInputChange }
          />

          <button data-testid="button-filter" onClick={ handleClick }>Filtrar</button>
        </form>
      </div>
      <div>
        { arrayDeFiltros.map((filtro: Filter, index: number) => {
          return (
            <p key={ `filtro-${index}` }>
              <span>
                {filtro.column}
                {' '}
              </span>
              <span>
                {filtro.operator}
                {' '}
              </span>
              <span>
                {filtro.value}
                {' '}
              </span>
              <span><button>Excluir</button></span>
            </p>
          );
        })}
      </div>
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
          { planetasBuscados.map((planeta: PlanetContextType) => {
            return (
              <tr
                key={ planeta.name }
              >
                <td className="planet-name" width={ 1 }>{`${planeta.name}`}</td>
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
