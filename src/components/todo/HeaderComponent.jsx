import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function HeaderComponent()
{
    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;

    function logout()
    {
        authContext.logout();
    }

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className='container'>
                <div className='row'>
                    <nav className='navbar navbar-expand-lg'>
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.google.com">Bharath</a>
                        <div className='collapse navbar-collapse'>
                            <ul className='navbar-nav'>
                                <li className='nav-item fs-5'>
                                    {isAuthenticated && 
                                        <Link className="nav-link" to="/welcome/bharath">Home</Link>}
                                </li>
                                <li className='nav-item fs-5'>
                                    {isAuthenticated && 
                                        <Link className="nav-link" to="/todos">ToDos</Link>}
                                </li>
                            </ul>
                        </div>
                        <div className='navbar-nav'>
                            <li className='nav-item fs-5'>
                                {!isAuthenticated &&
                                <Link className="nav-link" to="/login">Login</Link>}
                            </li>
                            <li className='nav-item fs-5'>
                                {isAuthenticated && 
                                <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}