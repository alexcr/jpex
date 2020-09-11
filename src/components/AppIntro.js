import React from 'react';
import styled from 'styled-components';
import { useStore } from '../store';
import { useUpload } from '../upload';

const Button = styled.span`
  border: none;
  cursor: pointer;
  padding: 0px;
  color: #006616;

  &:hover {
    color: #01b227;
  }
`;

export function AppIntro() {
  const store = useStore();
  const {open, getInputProps} = useUpload(store.setJSON);
  return (
    <>
      <input {...getInputProps()} />
      <p>
        Drag a JSON file to the area below or <Button onClick={open}>{'{ click here }'}</Button> to select one.
      </p>
    </>
  );
}
