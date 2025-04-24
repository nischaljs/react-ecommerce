import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/landingPage/Header';
import Footer from '../components/landingPage/Footer';

const OutletLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default OutletLayout;