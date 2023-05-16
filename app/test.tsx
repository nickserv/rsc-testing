import { screen, render, waitFor } from '@testing-library/react'
import Layout from './layout'
import Page from './page'
import { Suspense } from 'react'

beforeEach(() =>
  render(
    <Suspense fallback={<p>Loading...</p>}>
      <Layout>
        <Page />
      </Layout>
    </Suspense>
  )
)

test.each(['client', 'server', 'layout'])(`%s component`, async (keyword) => {
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  await waitFor(() => expect(screen.getByText(keyword)).toBeInTheDocument())
})
