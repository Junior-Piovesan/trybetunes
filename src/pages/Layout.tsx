import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

export default function layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
