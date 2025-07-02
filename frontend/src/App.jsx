import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";

import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import { RedirectIfAuth } from "./components/RedirectIfAuth";
import { PrivateRoute } from "./components/PrivateRoute";
import { RedirectHome } from "./components/RedirectHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectHome/>}/>
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <Signup />
            </RedirectIfAuth>
          }
        />

        <Route
          path="/signin"
          element={
            <RedirectIfAuth>
              <Signin />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
