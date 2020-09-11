import React from 'react';
import styled from 'styled-components';
import { useStore } from '../store';
import { useUpload } from '../upload';

const DropzoneContainer = styled.div`
  background-color: #f1ffec;
  padding-top: 15px;
  border: 1px solid #006616;
  border-top: 0px;
  font-size: 14px;
  font-family: 'Inconsolata', monospace;

  &:focus {
    outline: none;
  }

  &.dragging {
    background: url(icon.png) no-repeat center;
    background-position: calc(50% - 7px);
    background-size: 25%;
    background-color: #d8ffca;
  }
`;

export function DropzoneArea({children}) {
  const store = useStore();
  const {isDragAccept, getRootProps, getInputProps} = useUpload(store.setJSON);
  return (
    <DropzoneContainer
      className={isDragAccept ? 'dragging' : ''}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {children}
    </DropzoneContainer>
  );
}
