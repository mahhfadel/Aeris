import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza título', () => {
  render(<App />);
  const titulo = screen.getByText(/Vite \+ React/i);
  expect(titulo).toBeInTheDocument();
});
