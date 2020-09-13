import React from 'react';
import { render } from 'enzyme';
import { JSONTreeViewer } from '../JSONTreeViewer';
import { storeContext } from '../../store';
import { createStore } from '../../createStore';
import { testJson } from '../../__tests__/store.test';

describe('JSONTreeViewer', () => {
  it('should render the tree viewer correctly', () => {
    const store = createStore();
    store.setJSON(testJson);
    expect(
      render(
        <storeContext.Provider value={store}>
          <JSONTreeViewer />
        </storeContext.Provider>
      )
    ).toMatchSnapshot();
  });
});
