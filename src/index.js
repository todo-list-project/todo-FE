import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { unstable_HistoryRouter as Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/style/index.scss";
// import reportWebVitals from "./reportWebVitals";
import store from "./store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isDev } from "util/Util";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter basename={isDev ? "/" : "/todo-FE"}>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
