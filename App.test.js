// @vitest-environment happy-dom
import React from 'react';
import { test, expect, render } from 'vitest';
import App from './src/App';

test('should work as expected', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Última búsqueda/i);
  // expect(Math.sqrt(5)).toBe(2);
  expect(title).toBeInTheDocument();
});
