import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import RouteManager from './components/RouteManager';

ReactDOM.render(
    <Provider store={store}>
        <RouteManager />
    </Provider>,
    document.getElementById('app-root')
);
