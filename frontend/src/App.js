import './App.scss';
// react router dom
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// pages
import { Home, MealDetails, Error, Category } from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import RegistrationForm from './pages/authpages/RegistrationForm';
import LoginForm from './pages/authpages/LoginForm';
import ForgotPasswordForm from './pages/authpages/ForgotPasswordForm';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/meal/:id" element = {<MealDetails />} />
        <Route path = "/meal/category/:name" element = {<Category />} />
        <Route path  = "/register" element = {<RegistrationForm />} />
        <Route path  = "/login" element = {<LoginForm />} />
        <Route path  = "/forgot-password" element = {<ForgotPasswordForm />} />


        <Route path  = "*" element = {<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
