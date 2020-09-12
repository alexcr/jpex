import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { DelayInput } from 'react-delay-input';
import { useStore } from '../store';

const StyledInput = styled(DelayInput)`
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  border: 0px;
  height: 50px;
  font-size: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: 1px solid #006616;
  font-family: 'Montserrat', sans-serif;

  &:focus {
    outline: none;
  }

  &.invalid-true {
    color: red;
  }
`;

export const QueryInput = observer(() => {
  const store = useStore();
  return (
    <StyledInput
      delayTimeout={200}
      type="text"
      className={`query invalid-${store.invalidQuery}`}
      value={store.query}
      onChange={e => store.setQuery(e.target.value)}
      placeholder="Query JSONPath..."
      disabled={store.invalidJson}
    />
  );
});
