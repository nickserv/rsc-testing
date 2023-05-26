import { render, screen, waitFor } from '@testing-library/react'
import { Suspense } from 'react'
import Layout from './layout'
import Page from './page'

beforeEach(() => {
  render(
    <Suspense>
      <Layout>
        <Page />
      </Layout>
    </Suspense>
  )
})

test.each(['client', 'server', 'layout'])(`%s component`, async (keyword) => {
  await waitFor(() => expect(screen.getByText(keyword)).toBeInTheDocument())
})
