import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='navbar'>
            <NavLink to="/">
                <img src="/Logo.png" alt="Logo" />
            </NavLink>
            <ul className='desktop-menu'>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Modelos</NavLink>
                </li>
                <li>
                    <NavLink to="/modelo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Ficha de modelo</NavLink>
                </li>
            </ul>
            <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            {menuOpen && <div className='menu-overlay' onClick={() => setMenuOpen(false)}></div>}
            <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
                <button className='close-btn' onClick={() => setMenuOpen(false)}><span>Cerrar</span> ✕</button>
                <ul>
                    <li>Modelos</li>
                    <li>Servicios y accesorios</li>
                    <li>Financiación</li>
                    <li>Reviews y Comunidad</li>
                </ul>
                <hr />
                <ul>
                    <li>Toyota mobility Service</li>
                    <li>Toyota Gazoo Racing</li>
                    <li>Toyota Híbridos</li>
                </ul>
                <hr />
                <ul>
                    <li>Concesionarios</li>
                    <li>Test Drive</li>
                    <li>Contacto</li>
                </ul>
                <ul>
                    <li>Actividades</li>
                    <li>Servicios al cliente</li>
                    <li>Ventas especiales</li>
                    <li>Innovación</li>
                    <li>Prensa</li>
                    <li>Acerca de...</li>
                </ul>
            </div>
        </nav>
    );
}