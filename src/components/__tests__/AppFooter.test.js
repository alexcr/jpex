import React from 'react';
import { shallow } from 'enzyme';
import { AppFooter } from '../AppFooter';

describe('AppFooter', () => {
  it('should render footer correctly', () => {
    expect(
      shallow(<AppFooter />)
    ).toMatchSnapshot();
  });
});
