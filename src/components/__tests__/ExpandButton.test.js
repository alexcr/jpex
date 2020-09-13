import React from 'react';
import { shallow } from 'enzyme';
import { ExpandButton } from '../ExpandButton';

const clickFn = jest.fn();

describe('ExpandButton', () => {
  it('should render the expand array button correctly', () => {
    expect(
      shallow(<ExpandButton isExpanded={false} isArray={true} />)
    ).toMatchSnapshot();
  });

  it('should render the expand object button correctly', () => {
    expect(
      shallow(<ExpandButton isExpanded={false} isArray={false} />)
    ).toMatchSnapshot();
  });

  it('should render the collapse array button correctly', () => {
    expect(
      shallow(<ExpandButton isExpanded={true} isArray={true} />)
    ).toMatchSnapshot();
  });

  it('should render the collapse object button correctly', () => {
    expect(
      shallow(<ExpandButton isExpanded={true} isArray={false} />)
    ).toMatchSnapshot();
  });

  it('should call the onToggle callback when clicked', () => {
    shallow(<ExpandButton onToggle={clickFn} />).simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
