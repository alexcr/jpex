import React from 'react';
import { render } from 'enzyme';
import { AppIntro } from '../AppIntro';
import { StoreProvider } from '../../store';

describe('AppIntro', () => {
  it('should render intro paragraph correctly', () => {
    expect(
      render(<StoreProvider><AppIntro /></StoreProvider>)
    ).toMatchSnapshot();
  });
});
