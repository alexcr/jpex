import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  margin-top: 30px;
  font-size: 12px;
  color: #333;
`;

export function AppFooter() {
  return (
    <Footer>
      © 2020 Alexandre Rondon
    </Footer>
  );
}
