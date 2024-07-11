import logo from './logo.svg';
import './App.css';
import {Helmet} from "react-helmet";
import Home from "./components/homePage/Home";
import Login from "./components/logginPage/Login";
import Order from "./components/orderPage/Order";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Helmet><title>Leather Bags</title></Helmet>
        <Router>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/order" element={<Order></Order>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
