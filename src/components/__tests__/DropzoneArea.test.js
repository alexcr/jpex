import React from 'react';
import { render } from 'enzyme';
import { DropzoneArea } from '../DropzoneArea';
import { StoreProvider } from '../../store';

describe('DropzoneArea', () => {
  it('should render a dropzone area correctly', () => {
    expect(
      render(
        <StoreProvider>
          <DropzoneArea>
            <div>Test Child</div>
          </DropzoneArea>
        </StoreProvider>
      )
    ).toMatchSnapshot();
  });
});
