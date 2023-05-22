import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './assets/style/index.scss';
import history from './hooks/useHistory';

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
                <App />
            </QueryClientProvider>
        </HashRouter>
    </Provider>
);
