import React from 'react';
import { render } from 'enzyme';
import { JSONTreeNode } from '../JSONTreeNode';
import { storeContext } from '../../store';
import { createStore } from '../../createStore';
import { testJson } from '../../__tests__/store.test';

describe('JSONTreeNode', () => {
  it('should render a node correctly', () => {
    const store = createStore();
    store.setJSON(testJson);
    expect(store.visibleNodeList).forEach((_, i) => {
      expect(
        render(
          <storeContext.Provider value={store}>
            <JSONTreeNode
              index={i}
              style={{height: '25px'}}
            />
          </storeContext.Provider>
        )
      ).toMatchSnapshot();
    });
  });
});
