import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';
import withApollo from '../lib/apollo';

class MyApp extends App<any> {
  componentDidMount() {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === null) {
      localStorage.setItem('dark-mode', 'light');
      this.setState({ darkMode: 'light' });
    }
    this.setState({ darkMode: localStorage.getItem('dark-mode') });
  }

  darkModeCheck = () => {
    const darkMode = this.state;
    if (Object(darkMode) !== null) {
      if (Object(darkMode).darkMode === 'dark') {
        return '/theme-dark.css';
      }
    }
    return '/theme.css';
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <DndProvider backend={HTML5Backend}>
          <link rel="stylesheet" href={this.darkModeCheck()} />
          <Component {...pageProps} />
        </DndProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
