import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RILogo from '../assets/RI Logo.svg';

const Header = () => {
    return (
        <>
            <header>
                <Link to='/'>
                    <img src={RILogo} className='header__race_logo' />
                </Link>
            </header>
        </>
    )
}

export default Header
