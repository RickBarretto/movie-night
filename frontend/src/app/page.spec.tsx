import Home from '@/pages'
import { render } from '@testing-library/react'

describe('<Home />', () => {
  it('renders a "Hello World" heading', () => {
    const screen = render(<Home />)

    expect(
      screen.getByRole('heading', {
        name: 'Hello World',
        level: 1,
      })
    ).toBeInTheDocument()
  })
})
