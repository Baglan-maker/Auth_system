import ProtectedRoute from "../components/ProtectedRoute";
import React, { ReactNode } from 'react';

const Dashboard = () => {
    return (
      <ProtectedRoute>
        <h1>Добро пожаловать на дашборд</h1>
      </ProtectedRoute>
    );
  };
  
  export default Dashboard;
  