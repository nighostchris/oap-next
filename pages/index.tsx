import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
// import { styled } from 'baseui'
// import { StatefulInput } from 'baseui/input'

/*
const Centered = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});
*/

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <div>
        <p>Tetsing</p>
        <p>Hello Next</p>
      </div>
    </Layout>
  )
}

export default IndexPage
