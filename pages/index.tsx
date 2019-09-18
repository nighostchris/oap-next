import * as React from 'react'
import { NextPage } from 'next'
import { styletron, debug } from '../styletron'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider, LightTheme, styled } from 'baseui'
import { StatefulInput } from 'baseui/input'

const Centered = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});

const IndexPage: NextPage = () => {
  return (
    <StyletronProvider value={ styletron } debug={ debug } debugAfterHydration>
        <BaseProvider theme={ LightTheme }>
            <Centered>
                <StatefulInput />
            </Centered>
        </BaseProvider>
    </StyletronProvider>
  )
}

export default IndexPage
