import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import withApollo from '../lib/apollo';
import Head from 'next/head';

const GET_USER_SETTINGS = gql`
  query getUserSettings {
    settings(where: {user: {itsc: {_eq: "kristopher"}}}) {
      dark_mode
    }
  }
`;

const CSSLoader: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery(GET_USER_SETTINGS);
  let dark_mode = false;

  if (error) {
    console.log(error);
  }

  if (!loading) {
    console.log(data);
    dark_mode = data.settings[0].dark_mode;
  }

  return (
    <Head>
      <link rel="stylesheet" href={!dark_mode ? '/theme.css' : '/theme-dark.css'} />
    </Head>
  );
};

export default withApollo(CSSLoader);
