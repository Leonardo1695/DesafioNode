import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FinancialPostComponent from './index';
import { useNavigate } from 'react-router-dom';
import { useRevenue } from '../../hooks/revenue';
import { useToast } from '../../hooks/toast';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/revenue', () => ({
  useRevenue: jest.fn(),
}));

jest.mock('../../hooks/toast', () => ({
  useToast: jest.fn(),
}));

const createFinancialPostMock = jest.fn(() => {
    throw new Error('Test error');
  });
  (useRevenue as jest.Mock).mockReturnValue({ createFinancialPost: createFinancialPostMock });

  const addToastMock = jest.fn();
  (useToast as jest.Mock).mockReturnValue({ addToast: addToastMock });

  const navigateMock = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigateMock);

describe('FinancialPostComponent', () => {
  test('renders component properly', () => {
   

    const { getByText, getByPlaceholderText } = render(<FinancialPostComponent />);

    expect(getByText('Cadastro de Lançamento')).toBeInTheDocument();
    expect(getByPlaceholderText('descrição')).toBeInTheDocument();
    expect(getByPlaceholderText('valor')).toBeInTheDocument();
    expect(getByText('Cadastrar')).toBeInTheDocument();
    expect(getByText('Voltar')).toBeInTheDocument();
  });

  test('calls createFinancialPost and navigates to "/home" on successful create', async () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const createFinancialPostMock = jest.fn();
    (useRevenue as jest.Mock).mockReturnValue({ createFinancialPost: createFinancialPostMock });

    const addToastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ addToast: addToastMock });

    const { getByText, getByPlaceholderText } = render(<FinancialPostComponent />);

    const descriptionInput = getByPlaceholderText('descrição');
    const amountInput = getByPlaceholderText('valor');
    const cadastrarButton = getByText('Cadastrar');

    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(cadastrarButton);

    expect(createFinancialPostMock).toHaveBeenCalledWith({ description: 'Test description', amount: 100, type: 'income' });
    expect(addToastMock).toHaveBeenCalledWith({ severity: 'info', detail: 'lançamento criado com sucesso' });
    expect(navigateMock).toHaveBeenCalledWith('/home');
  });

  test('displays error toast when createFinancialPost throws an error', async () => {
    const { getByText, getByPlaceholderText } = render(<FinancialPostComponent />);

    const descriptionInput = getByPlaceholderText('descrição');
    const amountInput = getByPlaceholderText('valor');
    const cadastrarButton = getByText('Cadastrar');

    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(cadastrarButton);

    expect(createFinancialPostMock).toHaveBeenCalledWith({ description: 'Test description', amount: 100, type: 'income' });
    expect(addToastMock).toHaveBeenCalledWith({ severity: 'error', detail: 'Test error' });
  });
});
