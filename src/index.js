import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import GlobalStyle from './style';
import GlobalFonts from './fonts/fonts';
import getstore from './store';
import { Provider } from 'react-redux';
import {
	BrowserRouter as 
	Router,
	Route,
	Routes
} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider } from '@chakra-ui/react';

export const { store, persistor } = getstore();



class App extends React.Component {
  render() {
   
    return(
    <div>
     <React.StrictMode>
    <ChakraProvider>
    <GlobalFonts />
    <GlobalStyle />
    
      <Router>
					<Routes>
            <Route path= '/' element = {<Landing />} />
            <Route path= '/login' element = {<Login />} />
						<Route path= '/register' element={<Register/>}/>
            <Route path= '/dashboard' element={<Dashboard/>}/>
					</Routes>
				</Router>
        </ChakraProvider>
        </React.StrictMode>
    </div>
    );
}
}

ReactDOM.render(
  <Provider store={store}>
  <PersistGate persistor={persistor}>
  <App/>
  </PersistGate>
  </Provider>,
  document.getElementById('root')
);



