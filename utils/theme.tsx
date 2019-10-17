import {createTheme, lightThemePrimitives} from 'baseui';

export const lightTheme = createTheme(
    {
      ...lightThemePrimitives,
    },
    {
      colors: {
        // Header Bar Background
        primary: '#303f9f',
        // Tab Layout Background
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
      }
    }
  );

export const darkTheme = createTheme(
  {
    ...lightThemePrimitives,
  },
  {
    colors: {
        primary: 'black',
    }
  }
);
