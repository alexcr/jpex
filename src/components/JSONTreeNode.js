import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { ExpandButton } from './ExpandButton';
import { useStore } from '../store';

const NodeContainer = styled.div`
  width: fit-content!important;
  max-width: calc(100% - ${props => props.depth * 30 + 15}px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: ${props => props.depth * 30}px;
`;

const KeySpan = styled.span`
  color: ${props => props.isMatched ? '#ffa96c' : '#999'};
`;

const ValueSpan = styled.span`
  color: ${props => props.isMatched ? '#ff6b02' : '#000'};
`;

export const JSONTreeNode = observer(({
  index,
  style,
}) => {
  const store = useStore();
  const node = store.visibleNodeList[index];
  const isCollapsed = store.isNodeCollapsed(node);
  const isMatched = store.isNodeMatched(node);
  return (
    <NodeContainer depth={node.depth} style={style}>
      {
        !node.isScalar &&
        <ExpandButton
          isExpanded={!isCollapsed}
          isArray={node.isArray}
          onToggle={() => (
            isCollapsed ? store.expandNode(node.nodeIndex) : store.collapseNode(node.nodeIndex)
          )}
        />
      }
      <KeySpan isMatched={isMatched}>
        {!node.isArrayItem && node.key + ': '}
      </KeySpan>
      <ValueSpan isMatched={isMatched}>
        {node.isScalar && String(node.value)}
        {!node.isScalar && isCollapsed && store.getNodePreview(node)}
      </ValueSpan>
    </NodeContainer>
  );
});
