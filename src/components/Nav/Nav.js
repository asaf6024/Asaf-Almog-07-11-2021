import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { useHistory } from 'react-router'

//components
import Theme from './Theme/Theme'
import Degrees from './Degrees/Degrees'

//css
import './nav.css'

// Redux
import { useSelector } from 'react-redux'

const NavPage = () => {

    const [bgDark, setBgDark] = useState(`inherit`)
    const [color, setColor] = useState(`white`)
    let history = useHistory()

    //redux STATE
    let favoritesState = useSelector((state) => state.favoritesReducer.favorites)

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        document.getElementById('homeItem').classList.add('activeLink')

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    })

    //change nav style when scrolling
    const handleScroll = () => {
        if (window.scrollY > 40) {

            setBgDark('black')
            setColor('white')
            document.querySelector('.navItem').style.textShadow = 'none'

        } else {
            setBgDark(`inherit`)
            setColor('white')
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


    return (
        <Navbar variant="dark" style={{ background: bgDark }} expand="lg" className='col-sm-12' id='navBar'>

            <Navbar.Brand href="/" className='col-sm-12 col-lg-7 font-weight-bold titleOfNav'
                style={{ color }}>Weather Forecast
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbar-dark-example" />

            <Navbar.Collapse id="navbar-dark-example" className='col-sm-12 col-lg-5 text-center'>
                <Nav className='text-left row'>
                    <hr className='mobileHr' />

                    <NavItem className='navItem col-sm-12 col-lg-2 text-center'
                        style={{ color }} onClick={(e) => setActiveNav('/', 'homeItem')}>
                        <span id='homeItem'> Home</span>
                    </NavItem>
                    <hr className='mobileHr' />

                    <NavItem className='navItem col-sm-12 col-lg-3 text-center'
                        style={{ color }} onClick={(e) => setActiveNav('/favorites', 'favoriteItem')}>
                        <span id='favoriteItem' > Favorites&nbsp; </span>
                        <sup className={`badge badge-pill `} style={{ background: '#2f00ff4f' }}>
                            {favoritesState.length > 0 && favoritesState.length}
                        </sup>
                    </NavItem>
                    <hr className='mobileHr' />

                    <NavItem className='navItem col-sm-12 col-lg-3 text-center'>
                        <Theme className={`text-center`} color={color} />
                    </NavItem>
                    <hr className='mobileHr' />

                    <NavItem className='navItem col-sm-12 col-lg-2 text-center'>
                        <Degrees color={color} />
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}
export default NavPage