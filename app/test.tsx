import {render, screen, waitFor} from '@testing-library/react'
import {Suspense} from 'react'
import Layout from './layout'
import Page from './page'

test.each(['client', 'server', 'layout'])(`%s component`, async keyword => {
  render(
    <Suspense>
      <Layout>
        {/* @ts-expect-error Needs https://github.com/DefinitelyTyped/DefinitelyTyped/pull/65135 */}
        <Page />
      </Layout>
    </Suspense>,
  )

  await waitFor(() => expect(screen.getByText(keyword)).toBeInTheDocument())
})
