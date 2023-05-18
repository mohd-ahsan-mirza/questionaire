import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Render app test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Your first car make?/i);
  expect(linkElement).toBeChecked;
});
