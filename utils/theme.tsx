import {createTheme, lightThemePrimitives} from 'baseui';

export const lightTheme = createTheme(
    {
      ...lightThemePrimitives,
      primaryFontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    },
    {
      colors: {
        // Header Bar Background
        primary: '#303f9f',
        // Side Nav Background
        primary50: '#607d8b',
        // Side Nav List Item on hover
        primary100: '#455a64',
        // Tab on hover
        primary200: '#78909c',
        // 3 Tab dashboard background
        primary300: '#90a4ae',
        // Tab background
        primary400: '#b0bec5',
        // Root background
        primary500: '#cfd8dc',
        // main dashboard section tag
        accent: 'black',
      },
    }
  );

export const darkTheme = createTheme(
  {
    ...lightThemePrimitives,
    primaryFontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  },
  {
    colors: {
      // Header Bar Background
      primary: '#222',
      // Side Nav Background
      primary50: '#444',
      // Side Nav List Item on hover
      primary100: '#555',
      // Tab on hover
      primary200: '#888',
      // 3 Tab dashboard background
      primary300: '#aaa',
      // Tab background
      primary400: '#ccc',
      // Root background
      primary500: '#666',
      // main dashboard section tag
      accent: '#eceff1',
    },
  }
);
