import React from 'react';
import App from 'next/app';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    );
  }
}

export default MyApp;
