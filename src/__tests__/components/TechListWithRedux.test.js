import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import TechListWIthRedux from '~/components/TechListWIthRedux'
import { addTech, addTech2 } from '~/store/modules/techs/actions'

jest.mock('react-redux');

describe('TechListWithRedux component', () => {
  it('should render tech list with redux', () => {
    // mockImplementation: mock da implementação do useSelector   
    useSelector.mockImplementation(callback => callback({
      // reducer de tecnologias
      techs: ['Node.js', 'ReactJs'],
      techs2: ['React Native', 'AdonisJS'],
    }));

    const { getByText, getByTestId } = render(<TechListWIthRedux />);

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJs'));
    expect(getByTestId('tech-list2')).toContainElement(getByText('React Native'));
    expect(getByTestId('tech-list2')).toContainElement(getByText('AdonisJS'));
  });

  it('should be able to add new tech', () => {
    const { getByTestId, getByLabelText } = render(<TechListWIthRedux />);

    // moca o useDispatch
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    // toHaveBeenCalled: espera que foi chamado
    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
  })
});