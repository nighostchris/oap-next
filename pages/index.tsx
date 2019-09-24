import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import DashboardLayout from '../components/DashboardLayout'
import HeaderBar from '../components/HeaderBar'
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
      <HeaderBar />
      <DashboardLayout />
    </Layout>
  )
}

export default IndexPage
