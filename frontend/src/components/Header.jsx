import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <Link to='/'>
                    <img src='./RI Logo.svg' className='header__race_logo' />
                </Link>
            </header>
        </>
    )
}

export default Header
