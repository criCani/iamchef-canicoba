import React from 'react';
import Header from './Header';
import './Layout.css';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
