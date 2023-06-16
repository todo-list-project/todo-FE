import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { unstable_HistoryRouter as Router } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import App from "./App";
import "./assets/style/index.scss";
import history from "./hooks/useHistory";
// import reportWebVitals from "./reportWebVitals";
import store from "./store";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <HashRouter basename={'/'}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
          </QueryClientProvider>
        </HashRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
