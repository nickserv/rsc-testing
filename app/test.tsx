import { render, screen } from '@testing-library/react'
import Layout from './layout'
import Page from './page'

beforeEach(() => render(<Page />, { wrapper: Layout }))

test.each(['client', 'server', 'layout'])(`%s component`, (keyword) => {
  expect(screen.getByText(keyword)).toBeInTheDocument()
})
