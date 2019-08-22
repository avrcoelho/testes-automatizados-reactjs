import React from 'react'
// render: cria o html fake
// fireEvent: simula um evento (clique)
import { render, fireEvent } from '@testing-library/react';

import TechList from '~/components/TechList'

// describe: categoriza os testes
describe('TechList component', () => {
  // it: descreve o teste
  it('should be able to add new tech', () => {
    // obtem o texto do botão que tiver na TechList
    // getByTestId: usado para encontarr elemntos que não são faceis de encontrar
    const { getByText, getByTestId, debug, getByLabelText } = render(<TechList />);
    //debug:  exibe no console a estrutura do html
    // debug();

    // acha a lable com input tech e envia o valor como Node.js
    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    // da um submit no form "tech-form"
    fireEvent.submit(getByTestId('tech-form'))

    // procura o botão que tem o texto "DICIONAR"
    // fireEvent.click(getByText('Adicionar'));
    // debug();

    // espara que a lista "tech-list" tenha um elemento que contenha o texto "Node.js"
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    // espera que o input id label esteja vazio
    expect(getByLabelText('Tech')).toHaveValue('');
  })
})