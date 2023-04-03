import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const content = screen.getByText(/Adminsidan/i);
  expect(content).toBeInTheDocument();
});
