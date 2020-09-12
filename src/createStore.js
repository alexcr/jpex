import { observable } from 'mobx';
import jsonpath from 'jsonpath';

// This function implements a cheaper JSON.stringify method that
// allows us to create a truncated representation of the given
// object without having to stringify the whole object first,
// saving a lot of time for huge JSON objects.
// It stringifies each property recursively until the resulting
// string reaches a minimum number of characters or the whole
// object is stringified (whichever happens first).
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

// This function converts a JSON object into a flat list of nodes.
// This flat list allows us to render the JSON tree as a virtualized
// list with react-window. Each node contains all information we
// need to make the list look visually like a tree.
// It returns an array with both the nodes list and a path map, which
// is an object that maps each path to its index in the list.
function parseJson(json) {
  const parsedJson = {
    nodeList: [],
    pathMap: {}
  };

  // Use the current time to generate a unique ID for this JSON object.
  // This will be used in conjunction with the node index as the key
  // property when rendering the list. It's safe to use the index as
  // key in this case because we guarantee that the node index never
  // changes for a given node, so we can use it to uniquely identify
  // each node within a JSON object.
  const jsonId = new Date().getTime();

  // This internal function creates a node object with all the information
  // we need and adds it to the node list.
  const addListNode = (key, value, parent, path) => {
    const nodeIndex = parsedJson.nodeList.length;
    const nodeId = `${jsonId}-${nodeIndex}`;
    const depth = path.length - 1;
    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);
    const isScalar = !isArray && !isObject;
    const isArrayItem = parent && parent.isArray;

    const listNode = {
      nodeIndex, nodeId, key, value, depth, parent, isScalar, isArray, isObject, isArrayItem
    };

    parsedJson.nodeList.push(listNode);
    return listNode;
  };

  // This internal function adds a path to the pathMap object. Each
  // path added maps to an array of node indices. This is because the
  // map key is a stringified version of the path, which might not be
  // unique. For example, this JSON object has two paths with the same
  // stringified path a>b: {"a": {"b": 1}, "a>b": 2}
  // When using the map, we compare the actual path array with each
  // matched path array under its stringified path key. For huge JSON
  // objects, this is much cheaper than comparing it with ALL paths.
  const addNodePath = (path, nodeIndex) => {
    const stringifiedPath = path.join('>')
    if (!parsedJson.pathMap[stringifiedPath]) {
      parsedJson.pathMap[stringifiedPath] = [];
    }
    parsedJson.pathMap[stringifiedPath].push({path, nodeIndex});
  };

  // This internal function is the recursive function responsible for
  // traversing the whole JSON tree calling the other functions above.
  const parseNode = (node, path = [], parent = null) => {
    const entries = (
      Array.isArray(node) ?
      Array.from(node.entries()) :
      Object.entries(node)
    );
    return entries.forEach(([key, value]) => {
      const nextPath = [...path, key];
      const listNode = addListNode(key, value, parent, path);
      addNodePath(nextPath, listNode.nodeIndex);

      if (listNode.isArray || listNode.isObject) {
        parseNode(value, nextPath, listNode);
      }
    })
  };

  parseNode({'$': json});
  return parsedJson;
}

export function createStore() {
  return observable.object({
    /* State */

    invalidJson: false,
    invalidQuery: false,
    query: '',
    matchedNodes: new Set(),
    collapsedNodes: new Set(),

    /* Computeds */

    get parsedJson() {
      return this.json ? parseJson(this.json) : {
        nodeList: [],
        pathMap: {}
      }
    },

    get nodeList() {
      return this.parsedJson.nodeList;
    },

    get pathMap() {
      return this.parsedJson.pathMap;
    },

    get visibleNodeList() {
      return this.nodeList.filter(node => (
        !!node.parent && !this.isNodeCollapsed(node.parent)
      ));
    },

    /* Helpers */

    isNodeCollapsed(node) {
      return (
        this.collapsedNodes.has(node.nodeIndex) ||
        (!node.parent ? false : this.isNodeCollapsed(node.parent))
      );
    },

    isNodeMatched(node) {
      return (
        this.matchedNodes.has(node.nodeIndex) ||
        (!node.parent ? false : this.isNodeMatched(node.parent))
      );
    },

    getNodePreview(node) {
      // 100 characters should be enough to fill in the entire
      // width of our tree container.
      return limitedStringify(node.value, 100);
    },

    /* Actions */

    setJSON(json) {
      this.json = json;
      this.invalidJson = json === null;
      this.collapsedNodes.clear();
      this.query = '';
    },

    setQuery(query) {
      this.query = query;
      this.matchedNodes.clear();

      let matchedPaths;
      try {
        matchedPaths = jsonpath.paths(this.json, query);
        this.invalidQuery = false;
      } catch(e) {
        this.invalidQuery = (query !== '');
      }

      if (matchedPaths) {
        matchedPaths.forEach(path => {
          // Find the node index mapped to the given path.
          const mappedPath = this.pathMap[path.join('>')].find(pathCandidate => {
            return pathCandidate.path.every((p, i) => p === path[i])
          });

          // Now add the found node index to the matchedNodes set.
          // We expect all paths found by jsonpath to exist in the pathMap,
          // so we don't need to check if (mappedPath !== undefined) here.
          this.matchedNodes.add(mappedPath.nodeIndex);
        })
      }
    },

    collapseNode(nodeIndex) {
      this.collapsedNodes.add(nodeIndex);
    },

    expandNode(nodeIndex) {
      this.collapsedNodes.delete(nodeIndex);
    },
  });
}
