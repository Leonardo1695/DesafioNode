import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginComponent from './index';

const signInMock = jest.fn();
const navigateMock = jest.fn();
const addToastMock = jest.fn();

jest.mock('../../hooks/toast', () => ({
  useToast: () => ({
    addToast: addToastMock,
  }),
}));

jest.mock('../../hooks/auth', () => ({
  useAuth: () => ({
    signIn: signInMock,
    user: { name: 'John Doe' },
  }),
}));

jest.mock('../../constants', () => ({
  VITE_REACT_API_URL: 'localhost:3000',
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('LoginComponent', () => {
  test('renders without errors', () => {
    render(<LoginComponent />);
  });

  test('updates form data on input change', () => {
    const { getByPlaceholderText } = render(<LoginComponent />);
    const emailInput = getByPlaceholderText('digite seu email') as HTMLInputElement;
    const passwordInput = getByPlaceholderText('digite sua senha') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('calls signIn and navigate on successful login', async () => {
    const { getByPlaceholderText, getByLabelText } = render(<LoginComponent />);
    const emailInput = getByPlaceholderText('digite seu email');
    const passwordInput = getByPlaceholderText('digite sua senha');
    const loginButton = getByLabelText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(addToastMock).toHaveBeenCalledWith({
        severity: 'info',
        detail: 'Seja bem vindo John Doe',
      });
      expect(navigateMock).toHaveBeenCalledWith('/home');
    });
  });

  test('displays error toast on login failure', async () => {
    const { getByPlaceholderText, getByLabelText } = render(<LoginComponent />);
    const emailInput = getByPlaceholderText('digite seu email');
    const passwordInput = getByPlaceholderText('digite sua senha');
    const loginButton = getByLabelText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    signInMock.mockImplementation(() => {
      throw new Error('Login failed');
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith({
        severity: 'error',
        detail: 'Login failed',
      });
    });
  });
});
