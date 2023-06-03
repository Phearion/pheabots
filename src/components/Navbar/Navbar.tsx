import React, { useState } from 'react';
import '../../style/Navbar.css';
import { menuItems } from './menuItems';
import img from '../../assets/img/phearion/phearion_logo.png';
import {startDiscordLogin} from "../../utils/api/api";

interface MenuItem {
    title: string;
    url: string;
    cName: string;
}


const Navbar: React.FC = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => {
        setClick(prevClick => !prevClick);
    };

    const handleLogin = () => {

        startDiscordLogin();

    };


    return (
        <div className="navbar">
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>

            <a className="navbar-logo" href="#">
                <img src={img} alt="..." height="45px" />
            </a>

            <ul className={click ? 'menus active' : 'menus'}>
                {menuItems.map((menu: MenuItem, index: number) => (
                    <li className="menu-items" key={index}>
                        <a href={menu.url}>{menu.title}</a>
                    </li>
                ))}
                <li className="menu-items" onClick={handleLogin}>
                    <a href="/#">Login</a>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
