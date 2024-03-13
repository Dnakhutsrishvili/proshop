import React from 'react'
import {Navbar, Nav ,Container, NavbarToggle} from 'react-bootstrap'
import{LinkContainer}from 'react-router-bootstrap'
import {FaShoppingCart,FaUser}from 'react-icons/fa'

import logo from '../assets/logo.png'

function Header() {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand> 
            <img src={logo} alt='logo'></img>
                ProShop
            </Navbar.Brand>
          </LinkContainer>
        
            <NavbarToggle aria-controls='basic-navbar-nav'>

            </NavbarToggle>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                  <LinkContainer to='/cart'>
                  <Nav.Link><FaShoppingCart/></Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                  <Nav.Link><FaUser/></Nav.Link>
                  </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>

        </Navbar>
    </header>
  )
}

export default Header