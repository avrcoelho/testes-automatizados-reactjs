import React from 'react'
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import TechListWIthRedux from '~/components/TechListWIthRedux'

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
});