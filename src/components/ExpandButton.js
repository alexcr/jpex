import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  width: 20px;
  margin-right: 10px;
  display: inline-block;
  text-align: center;
  color: #01b227;
  cursor: pointer;

  &:hover {
    color: #006616;
  }
`;

export function ExpandButton({
  isExpanded,
  onToggle,
  isArray,
}) {
  return (
    <Button onClick={onToggle}>
      {
        isArray ?
        (isExpanded ? '[-]' : '[+]') :
        (isExpanded ? '{-}' : '{+}')
      }
    </Button>
  );
}
