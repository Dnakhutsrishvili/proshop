import React  from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button,Row,Col}from 'react-bootstrap';
import {FaEdit,FaTrash}from 'react-icons/fa';
import Messages from '../components/Messages';
import Loader from '../components/Loader';
import {toast} from 'react-toastify';
import { useGetProductsQuery,useCreateProductMutation ,useDeleteProductMutation} from '../slices/productsApiSlice';
function ProductListScreen() {
    const {data:products,isLoading,error,refetch}=useGetProductsQuery();

    const [createProduct,{isLoading:loadingCreate}]=useCreateProductMutation();
    const [deleteProduct,{isLoading:loadingDelete}]=useDeleteProductMutation();

    const createProductHandler=async()=>{
        if(window.confirm('Are you sure you want to create a new product?')){
            try{
            await createProduct();
            refetch()
            }catch(error){
                toast.error(error?.data?.message||error.error)
            }
        }
    }
    const deleteHandler= async(id)=>{
        console.log(id)
        if(window.confirm('Are you sure?')){
            try{
                await deleteProduct(id);
                toast.success('Product deleted')
                refetch()
            }catch(err){
                toast.error(err?.data?.message||err.message)
            }
        }
    }
  return (
    <>
    <Row className='align-tems-center'>
        <Col>
        <h1>Products</h1>
        </Col>
        <Col className='text-end'>
            <Button className='btn-sm m-3' onClick={()=>{createProductHandler()}}>
                <FaEdit/>Create Product
            </Button>
        </Col>
    </Row>
    {loadingCreate&&<Loader></Loader>}
    {loadingDelete&&<Loader></Loader>}
    {isLoading?<Loader/>:error?<Messages variant='danger'>{error}</Messages>:(
        <>
        <Table striped hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>(
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm mx-2'>
                                    <FaEdit/>
                                </Button>
                            </LinkContainer>
                            <Button variant ='danger' className='btn-sm' onClick={()=>{deleteHandler(product._id)}}>
                                <FaTrash style={{color:'white'}}>

                                </FaTrash>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )}
    </>
  )
}

export default ProductListScreen