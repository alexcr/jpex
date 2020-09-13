import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Mock React's useLayoutEffect hook to call useEffect instead.
// This is because useLayoutEffect only works in client code.
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

expect.extend({
  // This matcher runs a given test function for all elements
  // of the received array. If the test function fails for
  // one of them, it throws a custom error message that
  // logs the index of the element that caused the failure.
  forEach(received, testFn) {
    for (let i = 0; i < received.length; i++) {
      try {
        testFn(received[i], i);
      } catch(e) {
        return {
          message: () => `${e}\nIndex: ${i}`,
          pass: false
        };
      }
    }
    return {
      message: () => 'Array should not be valid',
      pass: true
    };
  },
});
