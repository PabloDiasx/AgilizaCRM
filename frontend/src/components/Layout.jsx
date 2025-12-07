import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--primary-color)' }}>
            <Sidebar />
            <Header />
            <main style={{ marginLeft: '260px', padding: '2rem' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
