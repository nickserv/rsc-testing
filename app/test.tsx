import {render, screen} from '@testing-library/react'
import {Suspense} from 'react'
import Layout from './layout'
import Page from './page'

test.each(['client', 'server', 'layout'])(`%s component`, keyword => {
  render(
    <Suspense>
      <Layout>
        <Page />
      </Layout>
    </Suspense>,
  )

  return screen.findByText(keyword)
})
