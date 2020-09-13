import React from 'react';
import { render } from 'enzyme';
import { QueryInput } from '../QueryInput';
import { StoreProvider } from '../../store';

describe('QueryInput', () => {
  it('should render the query input correctly', () => {
    expect(
      render(<StoreProvider><QueryInput /></StoreProvider>)
    ).toMatchSnapshot();
  });
});
