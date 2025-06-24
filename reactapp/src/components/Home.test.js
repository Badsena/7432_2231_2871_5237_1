import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import Home from './Home';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Mocks
jest.mock('axios');
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mock-token');
    jest.useFakeTimers(); // Control countdown
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders welcome message when authorized', async () => {
    axios.get.mockResolvedValueOnce({ data: 'Welcome User!' });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Welcome User!')).toBeInTheDocument());
  });

  it('shows Unauthorized and navigates after failed fetch', async () => {
    axios.get.mockRejectedValueOnce(new Error('401'));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Unauthorized/i)).toBeInTheDocument());

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('counts down and logs out at zero', () => {
    axios.get.mockResolvedValueOnce({ data: 'Welcome Again!' });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('logout button clears token and redirects', () => {
    axios.get.mockResolvedValueOnce({ data: 'Welcome Again!' });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByText(/Logout/i);
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
