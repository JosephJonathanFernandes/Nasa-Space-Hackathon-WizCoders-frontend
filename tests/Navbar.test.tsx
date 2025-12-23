import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../src/components/layout/Navbar';

describe('Navbar', () => {
  it('renders the navigation bar', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
