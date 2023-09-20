import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Testa a pagina da tabela', () => {
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

});
