import React from 'react';
import './App.css';

import Home from './pages/Home';
import Detail from './pages/Detail';
import SearchResults from './pages/SearchResults';
import StaticContext from './context/StaticContext';
import { GifsContextProvider } from './context/GifsContext';

import { Link, Route } from 'wouter';

function App() {
  return (
    <StaticContext.Provider value={{ name: 'midudev', suscribete: true }}>
      <div className='App'>
        <section className='App-content'>
          <Link to='/'>
            <h1 className='title'>App</h1>
          </Link>

          <GifsContextProvider>
            <Route component={Home} path='/' />
            <Route component={SearchResults} path='/search/:keyword' />
            <Route component={Detail} path='/gif/:id' />
            <Route component={() => <h1>404 Error o(一︿一+)o</h1>} path='/404' />
          </GifsContextProvider>
        </section>
      </div>
    </StaticContext.Provider>
  );
}

export default App;
