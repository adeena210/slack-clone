import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import AvatarCreation from './components/AvatarCreation';
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
import Fonts from './fonts/fonts';
import theme from './theme';
export const { store, persistor } = getstore();

/**
 * TO DO:
 * 1. add loading everywhere
 * 2. styling 
 * 3. clean up code omg
 */

class App extends React.Component {
  render() {
   
    return(
    <div>
     <React.StrictMode>
    <ChakraProvider theme={theme}>
    <Fonts />
    
      <Router>
					<Routes>
            <Route path= '/' element = {<Landing />} />
            <Route path= '/login' element = {<Login />} />
						<Route path= '/register' element={<Register/>}/>
            <Route path= '/dashboard' element={<Dashboard/>}/>
            <Route path= '/avatar' element={<AvatarCreation/>}/>
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



