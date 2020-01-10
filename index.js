/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react'
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import store from "./src/Redux/store";

const AppContainer = () => {
    return(
    <Provider store={store}>
        <App />
    </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppContainer);