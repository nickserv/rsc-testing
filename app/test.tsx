import { screen } from '@testing-library/react'
import Layout from './layout'
import Page from './page'
import serverRender from './serverRender'

beforeEach(() => serverRender(<Page />, { wrapper: Layout }))

test.each(['client', 'server', 'layout'])(`%s component`, (keyword) => {
  expect(screen.getByText(keyword)).toBeInTheDocument()
})
