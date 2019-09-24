import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import DashboardLayout from '../components/DashboardLayout'

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <DashboardLayout />
    </Layout>
  )
}

export default IndexPage
