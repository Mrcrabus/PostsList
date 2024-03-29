import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            {isAuth
                ? <MyButton onClick={logout}>
                    Log out
                </MyButton>
                : <MyButton style={{display: 'none'}} onClick={logout}>
                    Log out
                </MyButton>


            }

            <div className="navbar__links">
                <Link className='navbar__item' to="/about">About</Link>
                <Link className='navbar__item' to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;