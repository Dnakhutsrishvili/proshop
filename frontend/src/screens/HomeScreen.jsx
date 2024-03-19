import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader';
import Messages from '../components/Messages';

function HomeScreen() {
  const {data:products,isLoading,error}=useGetProductsQuery()

  return (
    <div>
      {isLoading ? (<Loader></Loader>) : error ? (<Messages variant='danger'>{error?.data.message||error.error}</Messages>) : (<>
            <h1>Latest products</h1>
            <Row>
              {products.map((product)=>{
               return <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
               <Product product={product} ></Product> 
                </Col>
              })}
            </Row>
      </>)}

    </div>
  )
}

export default HomeScreen