import { isObservable } from 'mobx';
import { createStore } from '../createStore';

export const testJson = {
  cities: [
    {
      city: 'São Paulo',
      country: 'Brazil'
    },
    {
      city: 'London',
      country: 'United Kingdom'
    },
    {
      city: 'Krakow',
      country: 'Poland'
    }
  ],
  duplicatePathTest:
  {
    a: {b: 'first path a>b'},
    'a>b': 'second path a>b',
  },
  typeTest: [1.2, true, false, null, {}, []],
};

export const expectedNodeList = [
  // $
  {
    nodeIndex: 0, nodeId: /^\d+-0$/, depth: -1,
    key: '$', value: testJson,
    isScalar: false, isArray: false, isArrayItem: null
  },
  // $.cities
  {
    nodeIndex: 1, nodeId: /^\d+-1$/, depth: 0,
    key: 'cities', value: testJson.cities,
    isScalar: false, isArray: true, isArrayItem: false
  },
  // $.cities[0]
  {
    nodeIndex: 2, nodeId: /^\d+-2$/, depth: 1,
    key: 0, value: testJson.cities[0],
    isScalar: false, isArray: false, isArrayItem: true
  },
  {
    nodeIndex: 3, nodeId: /^\d+-3$/, depth: 2,
    key: 'city', value: testJson.cities[0].city,
    isScalar: true, isArray: false, isArrayItem: false
  },
  {
    nodeIndex: 4, nodeId: /^\d+-4$/, depth: 2,
    key: 'country', value: testJson.cities[0].country,
    isScalar: true, isArray: false, isArrayItem: false
  },
  // $.cities[1]
  {
    nodeIndex: 5, nodeId: /^\d+-5$/, depth: 1,
    key: 1, value: testJson.cities[1],
    isScalar: false, isArray: false, isArrayItem: true
  },
  {
    nodeIndex: 6, nodeId: /^\d+-6$/, depth: 2,
    key: 'city', value: testJson.cities[1].city,
    isScalar: true, isArray: false, isArrayItem: false
  },
  {
    nodeIndex: 7, nodeId: /^\d+-7$/, depth: 2,
    key: 'country', value: testJson.cities[1].country,
    isScalar: true, isArray: false, isArrayItem: false
  },
  // $.cities[2]
  {
    nodeIndex: 8, nodeId: /^\d+-8$/, depth: 1,
    key: 2, value: testJson.cities[2],
    isScalar: false, isArray: false, isArrayItem: true
  },
  {
    nodeIndex: 9, nodeId: /^\d+-9$/, depth: 2,
    key: 'city', value: testJson.cities[2].city,
    isScalar: true, isArray: false, isArrayItem: false
  },
  {
    nodeIndex: 10, nodeId: /^\d+-10$/, depth: 2,
    key: 'country', value: testJson.cities[2].country,
    isScalar: true, isArray: false, isArrayItem: false
  },
  // $.duplicatePathTest
  {
    nodeIndex: 11, nodeId: /^\d+-11$/, depth: 0,
    key: 'duplicatePathTest', value: testJson.duplicatePathTest,
    isScalar: false, isArray: false, isArrayItem: false
  },
  {
    nodeIndex: 12, nodeId: /^\d+-12$/, depth: 1,
    key: 'a', value: testJson.duplicatePathTest.a,
    isScalar: false, isArray: false, isArrayItem: false
  },
  {
    nodeIndex: 13, nodeId: /^\d+-13$/, depth: 2,
    key: 'b', value: testJson.duplicatePathTest.a.b,
    isScalar: true, isArray: false, isArrayItem: false
  },
  {
    nodeIndex: 14, nodeId: /^\d+-14$/, depth: 1,
    key: 'a>b', value: testJson.duplicatePathTest['a>b'],
    isScalar: true, isArray: false, isArrayItem: false
  },
  // $.typeTest
  {
    nodeIndex: 15, nodeId: /^\d+-15$/, depth: 0,
    key: 'typeTest', value: testJson.typeTest,
    isScalar: false, isArray: true, isArrayItem: false
  },
  {
    nodeIndex: 16, nodeId: /^\d+-16$/, depth: 1,
    key: 0, value: testJson.typeTest[0],
    isScalar: true, isArray: false, isArrayItem: true
  },
  {
    nodeIndex: 17, nodeId: /^\d+-17$/, depth: 1,
    key: 1, value: testJson.typeTest[1],
    isScalar: true, isArray: false, isArrayItem: true
  },
  {
    nodeIndex: 18, nodeId: /^\d+-18$/, depth: 1,
    key: 2, value: testJson.typeTest[2],
    isScalar: true, isArray: false, isArrayItem: true
  },
  {
    nodeIndex: 19, nodeId: /^\d+-19$/, depth: 1,
    key: 3, value: testJson.typeTest[3],
    isScalar: true, isArray: false, isArrayItem: true
  },
  {
    nodeIndex: 20, nodeId: /^\d+-20$/, depth: 1,
    key: 4, value: testJson.typeTest[4],
    isScalar: false, isArray: false, isArrayItem: true
  },
  {
    nodeIndex: 21, nodeId: /^\d+-21$/, depth: 1,
    key: 5, value: testJson.typeTest[5],
    isScalar: false, isArray: true, isArrayItem: true
  },
];

export const expectedPathMap = {
  '$': [{path: ['$'], nodeIndex: 0}],
  '$>cities': [{path: ['$', 'cities'], nodeIndex: 1}],
  '$>cities>0': [{path: ['$', 'cities', 0], nodeIndex: 2}],
  '$>cities>0>city': [{path: ['$', 'cities', 0, 'city'], nodeIndex: 3}],
  '$>cities>0>country': [{path: ['$', 'cities', 0, 'country'], nodeIndex: 4}],
  '$>cities>1': [{path: ['$', 'cities', 1], nodeIndex: 5}],
  '$>cities>1>city': [{path: ['$', 'cities', 1, 'city'], nodeIndex: 6}],
  '$>cities>1>country': [{path: ['$', 'cities', 1, 'country'], nodeIndex: 7}],
  '$>cities>2': [{path: ['$', 'cities', 2], nodeIndex: 8}],
  '$>cities>2>city': [{path: ['$', 'cities', 2, 'city'], nodeIndex: 9}],
  '$>cities>2>country': [{path: ['$', 'cities', 2, 'country'], nodeIndex: 10}],
  '$>duplicatePathTest': [{path: ['$', 'duplicatePathTest'], nodeIndex: 11}],
  '$>duplicatePathTest>a': [{path: ['$', 'duplicatePathTest', 'a'], nodeIndex: 12}],
  '$>duplicatePathTest>a>b': [
    {path: ['$', 'duplicatePathTest', 'a', 'b'], nodeIndex: 13},
    {path: ['$', 'duplicatePathTest', 'a>b'], nodeIndex: 14},
  ],
  '$>typeTest': [{path: ['$', 'typeTest'], nodeIndex: 15}],
  '$>typeTest>0': [{path: ['$', 'typeTest', 0], nodeIndex: 16}],
  '$>typeTest>1': [{path: ['$', 'typeTest', 1], nodeIndex: 17}],
  '$>typeTest>2': [{path: ['$', 'typeTest', 2], nodeIndex: 18}],
  '$>typeTest>3': [{path: ['$', 'typeTest', 3], nodeIndex: 19}],
  '$>typeTest>4': [{path: ['$', 'typeTest', 4], nodeIndex: 20}],
  '$>typeTest>5': [{path: ['$', 'typeTest', 5], nodeIndex: 21}],
};

let store;
beforeEach(() => {
  store = createStore();
  store.setJSON(testJson);
  store.matchNode = store.matchNode.bind(store);
  store.collapseNode = store.collapseNode.bind(store);
  store.expandNode = store.expandNode.bind(store);
});

test('store is observable', () => {
  expect(isObservable(store)).toBe(true);
});

describe('parsing a new JSON object', () => {
  it('resets state if the JSON object is invalid', () => {
    store.setJSON(null);

    // Static values
    expect(store.json).toBeNull();
    expect(store.invalidJson).toBe(true);
    expect(store.collapsedNodes.size).toBe(0);
    expect(store.matchedNodes.size).toBe(0);
    expect(store.query).toHaveLength(0);
    expect(store.invalidQuery).toBe(false);

    // Computed values
    expect(store.nodeList).toHaveLength(0);
    expect(store.visibleNodeList).toHaveLength(0);
    expect(store.pathMap).toMatchObject({});
  });

  it('updates state if the JSON object is valid', () => {
    // Static values
    expect(store.json).toMatchObject(testJson);
    expect(store.invalidJson).toBe(false);
    expect(store.collapsedNodes.size).toBe(0);
    expect(store.matchedNodes.size).toBe(0);
    expect(store.query).toHaveLength(0);
    expect(store.invalidQuery).toBe(false);

    // Computed values
    expect(store.nodeList).toHaveLength(expectedNodeList.length);
    expect(store.visibleNodeList).toHaveLength(expectedNodeList.length - 1);
    expect(store.pathMap).toMatchObject(expectedPathMap);
  });

  it('computes the node list correctly', () => {
    expect(store.nodeList).forEach((node, i) => {
      const expectedNode = expectedNodeList[i];
      expect(node.nodeIndex).toBe(expectedNode.nodeIndex);
      expect(node.nodeId).toMatch(expectedNode.nodeId);
      expect(node.depth).toBe(expectedNode.depth);
      expect(node.key).toBe(expectedNode.key);
      expect(node.isScalar).toBe(expectedNode.isScalar);
      expect(node.isArray).toBe(expectedNode.isArray);
      expect(node.isArrayItem).toBe(expectedNode.isArrayItem);
      if (node.isScalar) {
        expect(node.value).toBe(expectedNode.value);
      } else {
        expect(node.value).toMatchObject(expectedNode.value);
      }
    });
  });

  it('creates unique node IDs to be used as key prop', () => {
    const initialNodeList = store.nodeList;
    store.setJSON(testJson);
    const newNodeList = store.nodeList;

    // Each node must have the same nodeId prefix and a sufix
    // that matches its nodeIndex.
    const initialJsonId = initialNodeList[0].nodeId.split('-')[0];
    expect(initialNodeList).forEach(node => {
      const [jsonId, nodeIndex] = node.nodeId.split('-');
      expect(jsonId).toBe(initialJsonId);
      expect(nodeIndex).toBe(String(node.nodeIndex));
    });

    // But after changing the JSON object, a new prefix must
    // have been assigned. The prefix is based on the timestamp
    // so we need to wait at least one millisecond to ensure
    // they are not the same.
    setTimeout(() => {
      const newJsonId = newNodeList[0].nodeId.split('-')[0];
      expect(newJsonId).not.toBe(initialJsonId);
      expect(newNodeList).forEach(node => {
        const [jsonId, nodeIndex] = node.nodeId.split('-');
        expect(jsonId).toBe(newJsonId);
        expect(nodeIndex).toBe(String(node.nodeIndex));
      });
    }, 1);
  });
});

describe('querying a JSON object', () => {
  it('validates queries', () => {
    store.setQuery('$');
    expect(store.query).toBe('$');
    expect(store.invalidQuery).toBe(false);
    store.setQuery('invalid query!');
    expect(store.query).toBe('invalid query!');
    expect(store.invalidQuery).toBe(true);
    store.setQuery('');
    expect(store.query).toBe('');
    expect(store.invalidQuery).toBe(false);
  });

  it('flags matched nodes', () => {
    // root node: matches all nodes
    store.setQuery('$');
    expect(store.matchedNodes.size).toBe(expectedNodeList.length);
    expect(expectedNodeList.slice(1)).forEach(node => {
      expect(store.matchedNodes).toContain(node.nodeIndex);
    });
    // descendants of root node: matches all nodes except root
    store.setQuery('$..*');
    expect(store.matchedNodes.size).toBe(expectedNodeList.length - 1);
    expect(expectedNodeList.slice(1)).forEach(node => {
      expect(store.matchedNodes).toContain(node.nodeIndex);
    });
    // first city name
    store.setQuery('$.cities[1].city');
    expect(store.matchedNodes.size).toBe(1);
    expect(store.matchedNodes).toContain(6);
    // all city countries
    store.setQuery('$..country');
    expect(store.matchedNodes.size).toBe(3);
    expect(store.matchedNodes).toContain(4);
    expect(store.matchedNodes).toContain(7);
    expect(store.matchedNodes).toContain(10);
    // city object with name Krakow
    store.setQuery('$.cities[?(@.city=="Krakow")]');
    expect(store.matchedNodes.size).toBe(3);
    expect(store.matchedNodes).toContain(8);
    expect(store.matchedNodes).toContain(9);
    expect(store.matchedNodes).toContain(10);
    // ambiguous paths
    store.setQuery('$.duplicatePathTest.a.b');
    expect(store.matchedNodes.size).toBe(1);
    expect(store.matchedNodes).toContain(13);
    store.setQuery('$.duplicatePathTest["a>b"]');
    expect(store.matchedNodes.size).toBe(1);
    expect(store.matchedNodes).toContain(14);
    // valid query with no matches
    store.setQuery('$.countries');
    expect(store.matchedNodes.size).toBe(0);
    // invalid query
    store.setQuery('invalid query!');
    expect(store.matchedNodes.size).toBe(0);
    // empty query
    store.setQuery('');
    expect(store.matchedNodes.size).toBe(0);
  });
});

describe('collapsing and expanding nodes', () => {
  it('computes collapsed nodes correctly', () => {
    const expectCollapsedTree = collapsedNodes => {
      expect(store.collapsedNodes.size).toBe(collapsedNodes.length);
      expect(collapsedNodes).forEach(nodeIndex => {
        expect(store.collapsedNodes).toContain(nodeIndex);
      })
    };

    // collapse first city
    store.collapseNode(store.nodeList[2]);
    expectCollapsedTree([2, 3, 4]);
    // collapse all cities
    store.collapseNode(store.nodeList[1]);
    expect(store.collapsedNodes.size).toBe(10);
    expectCollapsedTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // collapse ambiguous path duplicatePathTest>a>b
    store.collapseNode(store.nodeList[12]);
    expectCollapsedTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13]);
    // expand all cities
    store.expandNode(store.nodeList[1]);
    expectCollapsedTree([12, 13]);
    // expand ambiguous path duplicatePathTest>a>b
    store.expandNode(store.nodeList[12]);
    expectCollapsedTree([]);
  });
});

describe('helper function', () => {
  it('isNodeCollapsed works correctly', () => {
    const testNode = store.nodeList[2];
    expect(store.isNodeCollapsed(testNode)).toBe(false);
    store.collapsedNodes.add(testNode.nodeIndex, true);
    expect(store.isNodeCollapsed(testNode)).toBe(true);
    store.collapsedNodes.delete(testNode.nodeIndex);
    expect(store.isNodeCollapsed(testNode)).toBe(false);
  });

  it('isNodeMatched works correctly', () => {
    const testNode = store.nodeList[2];
    expect(store.isNodeMatched(testNode)).toBe(false);
    store.matchedNodes.add(testNode.nodeIndex, true);
    expect(store.isNodeMatched(testNode)).toBe(true);
    store.matchedNodes.delete(testNode.nodeIndex);
    expect(store.isNodeMatched(testNode)).toBe(false);
  });

  it('getNodePreview works correctly', () => {
    const preview = store.getNodePreview(store.nodeList[0]);
    expect(preview.length).toBeGreaterThanOrEqual(100);
    expect(preview.length).toBeLessThan(JSON.stringify(testJson).length);
  });
});
