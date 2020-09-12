import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import { JSONTreeNode } from './JSONTreeNode';
import { useStore } from '../store';

const StyledList = styled(List)`
  text-align: left;
  margin-left: 15px;
  overflow-x: hidden!important;

  &.error {
    background: url(icon-invalid.png) no-repeat center;
    background-position: calc(50% - 7px);
    background-size: 25%;
  }

  .dragging &.error {
    background: none;
  }
`;

export const JSONTreeViewer = observer(() => {
  const store = useStore();
  const nodeList = store.visibleNodeList;
  return (
    <>
      {store.invalidJson && 'Invalid JSON file'}
      <StyledList
        height={store.invalidJson ? 366 : 380}
        itemCount={nodeList.length}
        itemSize={25}
        className={store.invalidJson ? 'error' : ''}
        itemKey={index => nodeList[index].nodeId}
      >
        {
          ({index, style}) => (
            <JSONTreeNode
              index={index}
              style={style}
            />
          )
        }
      </StyledList>
    </>
  );
});
