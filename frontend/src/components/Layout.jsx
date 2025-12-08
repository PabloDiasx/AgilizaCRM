import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, fullWidth = false }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--primary-color)' }}>
            <Sidebar />
            <main style={{ 
                marginLeft: '90px', 
                padding: fullWidth ? '0' : '1rem 1.5rem',
                minHeight: '100vh',
                height: fullWidth ? '100vh' : 'auto',
                overflow: fullWidth ? 'hidden' : 'auto'
            }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
