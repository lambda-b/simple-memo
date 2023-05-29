import 'bulma/css/bulma.css';

import { MemoList } from '@/MemoList';
import '@/css/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom/client';

library.add(fas);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MemoList />
  </React.StrictMode>,
);
