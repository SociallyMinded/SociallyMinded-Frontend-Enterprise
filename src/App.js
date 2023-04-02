import { Enterprise } from "./components/Enterpise/Enterprise";
import Home from "./components/Home/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Signup from "./components/Signup/Signup.jsx";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ViewOrdersPage from "./components/StoreFront/ViewOrdersPage";
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset_pw" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Enterprise />} />
            <Route path="/view_orders" element={<ViewOrdersPage />}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
