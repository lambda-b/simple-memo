import 'bulma/css/bulma.css';

import { MemoList } from '@/MemoList';
import { WebConnection } from '@/connection/WebConnection';
import '@/css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StompSessionProvider } from 'react-stomp-hooks';

library.add(fas);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StompSessionProvider url={WebConnection.websocketPath}>
      <MemoList />
    </StompSessionProvider>
  </React.StrictMode>,
);
