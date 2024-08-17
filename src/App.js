import './App.css';
import './styles.css';
import {Helmet} from "react-helmet";
import Home from "./components/homePage/Home";
import Login from "./components/logginPage/Login";
import Orders from "./components/ordersPage/Orders";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Helmet><title>Leather Bags</title></Helmet>
            <Router>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/order" element={<Orders></Orders>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;