import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders header', () => {
  render(<App />);
  const chirpTitle = screen.getByText(/Chirpper/i);
  expect(chirpTitle).toBeInTheDocument();
});
