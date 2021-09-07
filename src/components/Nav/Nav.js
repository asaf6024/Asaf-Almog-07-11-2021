import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, NavItem } from 'react-bootstrap'
import { useHistory } from 'react-router'
// import { a } from "react-router-dom";
import './nav.css'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getFavorites } from '../../redux/favorites/favorites-actions'

const NavPage = (props) => {
    let history = useHistory()
    const [active, setACtive] = useState('activea')
    const [bgDark, setBgDark] = useState(`inherit`)
    const [themeIcon, setThemeIcon] = useState('fas fa-moon fa-2x')
    let favoritesState = useSelector((state) => state.favoritesReducer.favorites)

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        setACtive('home')

        // props.get_chart()
        // if (window.scrollY > 20)
        //     document.getElementById('navBar').style.background = '#212529'
    })

    const handleScroll = () => {
        if (window.scrollY > 40) {
            setBgDark('#212529')
            document.querySelector('.navItem').style.textShadow = 'none'
        } else {
            setBgDark(`inherit`)
        }
    };

    const setActiveNav = (target, nav) => {
        const el = document.querySelector('.activeLink');
        try {
            if (el.classList.contains("activeLink")) {
                el.classList.remove("activeLink");
            }
        } catch (error) {

        }


        document.getElementById(nav).classList.add('activeLink')
        history.push(target)

    }

    const setTheme = () => {
        if (themeIcon == 'fas fa-moon fa-2x') {
            document.getElementById('root').classList.add('DarkTheme')
            document.getElementById('root').classList.remove('WhiteTheme')
            setThemeIcon('far fa-lightbulb fa-2x text-white')
        }
        else {
            document.getElementById('root').classList.add('WhiteTheme')
            document.getElementById('root').classList.remove('DarkTheme')
            setThemeIcon('fas fa-moon fa-2x')
        }
    }
    return (
        <Navbar variant="dark" style={{ background: bgDark }} expand="lg" className='col-sm-12' id='navBar'>
            {/* <Container > */}
            {/* <Navbar.Brand href="/" className='col-sm-1'>My Portfolio</Navbar.Brand> */}
            <Navbar.Brand href="/" className='col-sm-12 col-lg-9 font-weight-bold titleOfNav'>Herolo Weather Task - Asaf Almog</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example" className='col-sm-12 col-lg-3 text-center'>
                <Nav className='text-left'>
                    <NavItem className='activeNav navItem' onClick={(e) => setActiveNav('/', 'landingNavItem')}>
                        <span id='landingNavItem'> Home</span>
                    </NavItem>
                    <hr className='mobileHr' />
                    <NavItem className='activeNav navItem' onClick={(e) => history.push('/food')} onClick={(e) => setActiveNav('/favorites', 'foodItem')}>
                        <span id='foodItem' > Favorites&nbsp; {favoritesState.length > 0 && favoritesState.length}</span>
                    </NavItem>
                    <i className={themeIcon} style={{ cursor: 'pointer' }}
                        onClick={() => setTheme()}
                    ></i>

                </Nav>
            </Navbar.Collapse>
            {/* </Container> */}
        </Navbar >
    )
}
export default NavPage