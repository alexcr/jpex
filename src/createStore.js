import { observable } from 'mobx';
import jsonpath from 'jsonpath';

const defaultJson = {
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      }, {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }, {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      }, {
         "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95,
      "sold": false,
      "notSold": true,
      "null": null
    },
    "array": [
      ["other", ["yet another", "one"]],
      "scalar",
      [{"foo": "bar"}, "zoo"]
    ]
  }
};

export function createStore() {
  const store = observable.object({
    json: defaultJson,
    collapsedNodes: {},
    query: '',
    invalidQuery: false,
    matches: [],

    get nodeList() {
      const nodes = [];

      const parseNode = (node, path = [], parent = null) => {
        const entries = (
          Array.isArray(node) ?
          Array.from(node.entries()) :
          Object.entries(node)
        );
        return entries.forEach(([key, value]) => {
          const depth = path.length - 1;
          const nextPath = [...path, key];
          const isObject = value !== null && typeof value === 'object';
          const isArray = Array.isArray(value);
          const isScalar = !isArray && !isObject;
          const isArrayItem = parent && parent.isArray;
          const rowNumber = nodes.length;
          const isCollapsed = !!this.collapsedNodes[rowNumber];
          const isExpandable = !isScalar || isCollapsed;

          // If the parent node is matched then this child node
          // is also matched; otherwise, compare the current path
          // with all paths matched by the jsonpath.
          const isMatch = (
            (parent && parent.isMatch) ||
            this.matches.some(matchPath => (
              nextPath.length === matchPath.length &&
              nextPath.every((key, i) => key === matchPath[i])
            ))
          );

          // We want to omit these nodes from the tree viewer:
          // - Root node ($)
          // - Descendant nodes of a collapsed node
          // - Expanded non-scalar array nodes (only omit the index
          //   label, but their children are still displayed and the
          //   expand button is displayed next to the first child)
          const isAscendantCollapsed = n => (
            n && (n.isCollapsed || isAscendantCollapsed(n.parent))
          );
          const isVisible = (
            !!parent &&
            (!parent.parent || !isAscendantCollapsed(parent))
          );

          const node = {
            id: Math.random(),
            key, value, depth, rowNumber, parent, isMatch, isVisible,
            isScalar, isArray, isArrayItem, isCollapsed, isExpandable,
            getPreview: () => {
              // 100 characters should be enough to fill in the entire
              // width of our tree container
              return limitedStringify(node.value, 100);
            }
          };

          nodes.push(node);
          if (isArray || isObject) {
            parseNode(value, nextPath, node);
          }
        })
      };

      if (this.json !== null) {
        parseNode({'$': this.json});
      }
      return nodes.filter(n => n.isVisible);
    },

    setJSON(json) {
      this.json = json;
      this.collapsedNodes = {};
      this.query = '';
    },

    setQuery(query) {
      try {
        this.matches = jsonpath.paths(this.json, query);
        this.invalidQuery = false;
      } catch(e) {
        this.matches = [];
        this.invalidQuery = (query !== '');
      }
      this.query = query;
    },
  });

  return store;
}

// This function implements a cheaper JSON.stringify method that
// allows us to create a truncated representation of the given
// object without having to stringify the whole object first,
// saving a lot of time for huge JSON objects.
// It stringifies each property recursively until the resulting
// string reaches a minimum number of characters or the whole
// object is stringified (whichever happens first).
// Note that the minChars parameter is only a target number of
// characters, but the output is not guaranteed to be the minimum
// string possible - e.g. surrounding {} and commas are not
// taken into consideration when calculating the string length
// for
function limitedStringify(json, minChars = Infinity) {
  const props = [];
  let countChars = 2; // start with '{ ' or '[ '

  const isArray = Array.isArray(json);
  const entries = isArray ? Array.from(json.entries()) : Object.entries(json);
  for (let i = 0; i < entries.length && countChars < minChars; i++) {
    const [key, value] = entries[i];
    countChars += isArray ? 0 : key.length + 2; // '${key}: '
    const parsedValue = (
      value !== null && typeof value === 'object' ?
      limitedStringify(value, minChars - countChars) :
      String(value)
    );
    countChars += parsedValue.length;
    props.push(isArray ? parsedValue : `${key}: ${parsedValue}`);
    countChars += 2; // ', ' or ' }' or ' ]'
  }

  return (
    isArray ?
    '[ ' + props.join(', ') + ' ]' :
    '{ ' + props.join(', ') + ' }'
  );
}
