import React from 'react';
import { observer } from 'mobx-react-lite';
import styled, { css } from 'styled-components';
import { ExpandButton } from './ExpandButton';
import { useStore } from '../store';

const NodeContainer = styled.div`
  width: fit-content!important;
  max-width: calc(100% - ${props => props.depth * 30 + 15}px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: ${props => props.depth * 30}px;

  ${props => props.isMatch && css`
    & span {
      color: #ff6b02;
    }
  `}
`;

const KeySpan = styled.span`
  color: #999;
`;

const ValueSpan = styled.span`
  color: #000;
`;

export const JSONTreeNode = observer(({
  index,
  style,
}) => {
  const store = useStore();
  const node = store.nodeList[index];
  return (
    <NodeContainer
      depth={node.depth}
      isMatch={node.isMatch}
      style={style}
    >
      {
        node.isExpandable &&
        <ExpandButton
          isExpanded={!node.isCollapsed}
          isArray={node.isArray}
          onToggle={() => {
            store.collapsedNodes[node.rowNumber] = !store.collapsedNodes[node.rowNumber];
          }}
        />
      }
      <KeySpan>
        {!node.isArrayItem && node.key + ': '}
      </KeySpan>
      <ValueSpan>
        {node.isScalar && String(node.value)}
        {!node.isScalar && node.isCollapsed && node.getPreview()}
      </ValueSpan>
    </NodeContainer>
  );
});
