import React from 'react';
import styled from 'styled-components';
import { JSONTreeViewer } from './components/JSONTreeViewer';
import { QueryInput } from './components/QueryInput';
import { AppIntro } from './components/AppIntro';
import { AppFooter } from './components/AppFooter';
import { DropzoneArea } from './components/DropzoneArea';
import { StoreProvider } from './store';
import logo from './logo.png';

const AppLayout = styled.div`
  text-align: center;
  background: linear-gradient(#fff 20%, #d0d0d0);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-family: 'Montserrat', sans-serif;
`;

const AppContainer = styled.div`
  width: 80%;
  max-width: 800px;
`;

const Logo = styled.img`
  width: 250px;
  margin-top: 20px;
`;

export default function App() {
  return (
    <AppLayout>
      <AppContainer>
        <Logo src={logo} alt="JSONPath Explorer logo" />
        <StoreProvider>
          <AppIntro />
          <QueryInput />
          <DropzoneArea>
            <JSONTreeViewer />
          </DropzoneArea>
          <AppFooter />
        </StoreProvider>
      </AppContainer>
    </AppLayout>
  );
}
