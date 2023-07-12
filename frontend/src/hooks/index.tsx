import React, { PropsWithChildren } from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { RevenueProvider } from './revenue';
import { ThemeProvider } from './theme';

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => (
    <AuthProvider>
        <ThemeProvider>
            <RevenueProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </RevenueProvider>
        </ThemeProvider>
    </AuthProvider>
);

export default AppProvider;
