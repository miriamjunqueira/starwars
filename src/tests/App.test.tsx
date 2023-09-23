import { vi } from 'vitest';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import * as qualquerCoisa from '../requisicoes'
import retornoPadraoChamadaAPI from './retornoPadraoChamadaAPI';
import userEvent from '@testing-library/user-event';


// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Testa a pagina da tabela', () => {

  const mockPegaTudo = vi.spyOn(qualquerCoisa, 'pegaTudo');

  beforeEach(() => {
    mockPegaTudo.mockResolvedValue(retornoPadraoChamadaAPI);
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Testa a presença de título na página', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>,
    );
    const headingElement = screen.getByRole('heading', {name: 'Star Wars Planets Search'});
    expect(headingElement).toBeInTheDocument();
  });

  test('Testa a presença de um botão filtrar na página', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>,
    );
    const botao = screen.getByTestId('button-filter');
    expect(botao).toBeInTheDocument();
  });

  test('Testa se a api é achamada', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>,
    );
    
   const retorno = qualquerCoisa.pegaTudo();

    expect(mockPegaTudo).toHaveBeenCalled();
  });

  test('Testa o retorno da api',() => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>,
    );

    const chamada = qualquerCoisa.pegaTudo();

    expect(chamada).resolves.toBe(retornoPadraoChamadaAPI);
  });

  test('Testa a adição de filtros', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );

    const button = screen.getByTestId("button-filter");
    await userEvent.click(button);
    const filtros = document.querySelectorAll("p > span");
    expect(filtros).toHaveLength(4);
  });

  test('Testa a alteração na tela após busca textual', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>,
    );

    await waitFor(async () => {
      expect(document.getElementsByClassName("planet-name")).toHaveLength(10);
    });

    const TERMO = 'Tatooine';
    const campoPesquisar = screen.getByTestId('name-filter');
    await userEvent.type(campoPesquisar, TERMO);

    expect(document.getElementsByClassName("planet-name")).toHaveLength(1);

  });

});
