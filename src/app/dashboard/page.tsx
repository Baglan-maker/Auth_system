import ProtectedRoute from "../components/ProtectedRoute";

const Dashboard = () => {
    return (
      <ProtectedRoute>
        <h1>Добро пожаловать на дашборд</h1>
      </ProtectedRoute>
    );
  };
  
  export default Dashboard;
  