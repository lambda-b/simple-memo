import 'bulma/css/bulma.css';

import { NavigationHeader } from '@/components/NavigationHeader';
import { WebConnection } from '@/connection/WebConnection';
import '@/css/style.scss';
import PageContent from '@/router/PageContent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StompSessionProvider } from 'react-stomp-hooks';

library.add(fas);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StompSessionProvider url={WebConnection.websocketPath}>
      <BrowserRouter>
        <NavigationHeader />
        <PageContent />
      </BrowserRouter>
    </StompSessionProvider>
  </React.StrictMode>,
);
