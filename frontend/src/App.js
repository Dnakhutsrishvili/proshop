import React from 'react'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <Header></Header>
    <main className='py-3'>
<Container>
<Outlet></Outlet>
</Container>
    </main>
    <Footer></Footer>
    </>
  )
}

export default App