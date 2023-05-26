import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './assets/style/index.scss';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import store from './store';
const queryClient = new QueryClient({
    onError: (error, query) => {
        console.log('onError', error);
    },
    onSuccess: (data) => {
        console.log('data:', data);
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HashRouter basename={'/'}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <App />
            </QueryClientProvider>
        </HashRouter>
    </Provider>,
);
