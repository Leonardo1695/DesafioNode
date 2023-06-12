// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { RouterProvider } from 'react-router-dom';
// import App from './App';
// import LoginComponent from './pages/login';
// import HomeComponent from './pages/home';
// import FinancialPostComponent from './pages/financial-post';

// jest.mock('primereact/resources/themes/lara-light-indigo/theme.css', () => ({}));
// jest.mock('primereact/resources/primereact.min.css', () => ({}));
// jest.mock('primeicons/primeicons.css', () => ({}));
// jest.mock('./App.css', () => ({}));

// jest.mock('./hooks', () => ({
//   __esModule: true,
//   default: () => <div>Mocked AppProvider</div>,
// }));

// jest.mock('react-router-dom', () => ({
//   __esModule: true,
//   createBrowserRouter: jest.fn().mockReturnValue(() => <div>Mocked Router</div>),
//   RouterProvider: jest.fn().mockReturnValue(() => <div>Mocked RouterProvider</div>),
// }));

// jest.mock('./pages/login', () => ({
//   __esModule: true,
//   default: jest.fn().mockReturnValue(<div>LoginComponent</div>),
// }));

// jest.mock('./pages/home', () => ({
//   __esModule: true,
//   default: jest.fn().mockReturnValue(<div>HomeComponent</div>),
// }));

// jest.mock('./pages/financial-post', () => ({
//   __esModule: true,
//   default: jest.fn().mockReturnValue(<div>FinancialPostComponent</div>),
// }));

// describe('App', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders LoginComponent on the root path', () => {
//     render(<App />);
//     expect(LoginComponent).toHaveBeenCalled();
//     expect(screen.getByText('LoginComponent')).toBeInTheDocument();
//   });

//   it('renders HomeComponent on the /home path', () => {
//     render(<App />);
//     expect(HomeComponent).toHaveBeenCalled();
//     expect(screen.getByText('HomeComponent')).toBeInTheDocument();
//   });

//   it('renders FinancialPostComponent on the /lancamento path', () => {
//     render(<App />);
//     expect(FinancialPostComponent).toHaveBeenCalled();
//     expect(screen.getByText('FinancialPostComponent')).toBeInTheDocument();
//   });

//   it('renders AppProvider and RouterProvider', () => {
//     render(<App />);
//     expect(screen.getByText('Mocked AppProvider')).toBeInTheDocument();
//     expect(screen.getByText('Mocked RouterProvider')).toBeInTheDocument();
//   });

//   it('renders Mocked Router', () => {
//     render(<App />);
//     expect(screen.getByText('Mocked Router')).toBeInTheDocument();
//   });
// });
