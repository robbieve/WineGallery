import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';

import Routes from './routes';
import { Header } from './components';
import { client, persistent } from './graphql/client';

import './styles/App.scss';

// TODO DEV-203 replace this with apollo-link-state
window.store = {};

/**
 * Renders our app entry point
 * */
class App extends Component {
  state = {
    loaded: false,
  };

  async componentDidMount() {

    // Loads application only once the persisted cache is loaded
    try {
      if (localStorage.getItem(process.env.REACT_APP_STORE_LOCAL_STORAGE)) {

        await persistent.restore();
      } else {

        await persistent.persist();
      }
    } catch (error) {
      console.error('Error restoring Apollo cache', error);
    }

    // Sets 'loaded' to true, so application can be loaded
    this.setState({
      loaded: true,
    });
  }

  render() {
    const { loaded } = this.state;

    if (!loaded) return <div>Loading...</div>;

    persistent.getLogs(process.env.NODE_ENV === 'development');

    return (

      // Provides apollo client across the application
      <ApolloProvider client={client}>

        <div className="App">

          {/* Renders header in application */}
          <header className="App-header">
            <Header persistentCache={persistent} />
          </header>

          {/* Renders main area of the application */}
          <main className="App-body">

            {/* Provides a fallback when rendering lazily loaded components */}
            <React.Suspense fallback={<div>Loading...</div>}>

              {/* Renders the pages components using router */}
              <Routes />
            </React.Suspense>
          </main>

          <footer className="App-footer">
            This is a footer with no content yet.
          </footer>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
