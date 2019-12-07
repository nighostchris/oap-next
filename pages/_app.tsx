import React from 'react';
import App from 'next/app';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron, debug } from '../styletron';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
      </StyletronProvider>
    );
  }
}
