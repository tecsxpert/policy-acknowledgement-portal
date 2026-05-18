import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

import PolicyList from "./pages/PolicyList";
import Login from "./pages/Login";
import PolicyForm from "./components/PolicyForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import PolicyDetail from "./pages/PolicyDetail";
import AIPanel from "./components/AIPanel";
import Analytics from "./pages/Analytics";

function AppContent() {
  const location = useLocation();

  const [editPolicy, setEditPolicy] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const refreshPolicies = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <PolicyForm
                  editPolicy={editPolicy}
                  clearEdit={() => setEditPolicy(null)}
                  fetchPolicies={refreshPolicies}
                />

                <PolicyList
                  setEditPolicy={setEditPolicy}
                  refresh={refresh}
                />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/policy/:id"
          element={
            <ProtectedRoute>
              <PolicyDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AIPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;