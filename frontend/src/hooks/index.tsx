import React, { PropsWithChildren } from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { RevenueProvider } from './revenue';

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => (
    <AuthProvider>
        <RevenueProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </RevenueProvider>
    </AuthProvider>
);

export default AppProvider;
