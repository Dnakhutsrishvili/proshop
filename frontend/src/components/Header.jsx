import React from 'react'
import {Navbar, Nav ,Container, NavbarToggle, Badge} from 'react-bootstrap'
import{LinkContainer}from 'react-router-bootstrap'
import {FaShoppingCart,FaUser}from 'react-icons/fa'
import { UseSelector, useSelector } from 'react-redux';
import logo from '../assets/logo.png'

function Header() {
  const {cartItems} =useSelector((state)=>state.cart)

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
                  <Nav.Link><FaShoppingCart/>Cart
                  {
                    cartItems.length>0&&(
                      <Badge pill bg='success' style={{marginLeft:'5px'}}>
                        {cartItems.reduce((a,c)=>a+c.qty,0)}
                      </Badge>
                    )
                  }
                  </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                  <Nav.Link><FaUser/> Sign in</Nav.Link>
                  </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>

        </Navbar>
    </header>
  )
}

export default Header