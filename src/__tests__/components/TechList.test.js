import React from 'react'
// render: cria o html fake
// fireEvent: simula um evento (clique)
// cleanup: limpa a DOM

// jest-localstorage-mock: sobre poem o localstorage

import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechList'

// describe: categoriza os testes
describe('TechList component', () => {
  // executa antes dos testes
  beforeEach(() => {
    localStorage.clear()
  })
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
  });

  it('should store techs in storage', () => {
    let { getByTestId, getByLabelText, getByText } = render(<TechList />);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    // limpa a lista para poder verificar se ela esta no storage
    cleanup();

    ({ getByTestId, getByLabelText, getByText } = render(<TechList />));

    // verifica se a funçã o localstorage.setItem foic hamada
    // para isso instale a dependencia: jest-localstorage-mockerifica
    // toHaveBeenCalledWith: verifica se a funação foi chamada com parametros
    expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']));
    // verifica se ha o item techs no local storage
    expect(localStorage.getItem).toBeCalledWith('techs');
    // vrifica o valor que se tem no getItem('techs')
    expect(localStorage.getItem('techs')).toEqual('["Node.js"]');
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  })
})