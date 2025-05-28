import { render, screen } from '@testing-library/react';
import App from './App'; // Uncomment this line

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); // This test looks for text in your App component
  expect(linkElement).toBeInTheDocument();
});
