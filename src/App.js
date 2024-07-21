import {Route,Routes, BrowserRouter,} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App(){
    const currentUser = useContext(AuthContext)
    console.log(currentUser)
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login">
                        <Route index element={<Home/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;