import React from 'react';
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting Component', () => {
  it('renders with a given name', () => {
    render(<Greeting name="Alice" />);
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hello, Alice!');
  });

  it('renders default greeting if no name is given', () => {
    render(<Greeting />);
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hello, Guest!');
  });
});
