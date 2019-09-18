import * as React from 'react'
// import Link from 'next/link'
// import Head from 'next/head'
import { useStyletron } from 'baseui'
import {Navigation} from 'baseui/side-navigation'

const nav = [
  {
    title: 'Colors',
    itemId: '#level1.1',
    subNav: [
      {
        title: 'Primary',
        itemId: '#level1.1.1',
      },
      {
        title: 'Shades',
        itemId: '#level1.1.2',
        subNav: [
          {
            title: 'Dark',
            itemId: '#level1.1.2.1',
          },
          {
            title: 'Light',
            itemId: '#level1.1.2.2',
          },
        ],
      },
    ],
  },
  {
    title: 'Sizing',
    itemId: '#level1.2',
  },
  {
    title: 'Typography',
    itemId: '#level1.3',
  },
];

const Layout: React.FunctionComponent = ({children}) => {
  const [useCss] = useStyletron();
  const [location, setLocation] = React.useState('#level1.1.1');
  
  return (
    <div className={useCss({
      height: "100%",
      display: "flex",
      flexDirection: "row",
    })}>
      <div className={useCss({width: "20%"})}>
        <Navigation
          items={nav}
          activeItemId={location}
          onChange={({item}) => setLocation(item.itemId)}
        />
      </div>
      <div className={useCss({width: "80%"})}>
        {children}
      </div>
    </div>
  )
}

export default Layout
