import React from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PageTemplate } from "../common/styles";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Toast from 'react-bootstrap/Toast';
import { useLocation } from 'react-router-dom';
import { UserAuth } from "../../context/AuthContext";
import useLoginHooks from "../Login/loginHooks";
import Header from "../common/Header/Header";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import { Actions } from "./viewOrderDetailsHooks";
import useViewOrderDetailsHooks from "./viewOrderDetailsHooks";
import { Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from "react";

const ViewOrderDetails = () => {
    const { state } = useLocation();
    const { user } = UserAuth();

    const {
        updateOrdersHelper,
        updateOrders, 
        handleEditOrderQty, 
        orderSelected, 
        editOrderStatus,
        error
    } = useViewOrderDetailsHooks();


    const [orderStatus, setOrderStatus] = useState("")
      
    return (
        <PageTemplate>
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <ProductListingPage>        
            <ProductListingImg  src={state.d != null && state.d.product.imageLink[0]} />
            
            <ProductListingDescriptionSection>
                <ProductListingDescriptionContainer>
                    <ProductListingDescriptionTitleContainer>
                        <StyledID>Order ID: {state.d.orderRecordId} </StyledID>
                    </ProductListingDescriptionTitleContainer>

                    <StyledH2> Order Details: </StyledH2>

                    <ProductListingDescriptionDetailContainer>
                        <h4>Customer username</h4>
                        <p>{state.d.customer.username}</p>    
                    </ProductListingDescriptionDetailContainer>

                    <ProductListingDescriptionDetailContainer>
                        <h4>Customer email</h4>
                        <p>{state.d.customer.email}</p>    
                    </ProductListingDescriptionDetailContainer>

                    <ProductListingDescriptionDetailContainer>
                        <h4>Customer Address</h4>
                        <p>{state.d.address}</p>
                    </ProductListingDescriptionDetailContainer> 

                    <ProductListingDescriptionDetailContainer>
                        <h4>Date of Order</h4>
                        <p>{state.d.dateOfOrder.split("T")[0]}</p>    
                    </ProductListingDescriptionDetailContainer>

                    <ProductListingDescriptionDetailContainer>
                        <h4>Quantity</h4>
                        <p>{state.d.quantity}</p>    
                    </ProductListingDescriptionDetailContainer>

                    <ProductListingDescriptionDetailContainer>
                        <h4>Total Price</h4>
                        <p>${state.d.totalPrice}</p>    
                    </ProductListingDescriptionDetailContainer>

                    <ProductListingDescriptionDetailContainer>
                        <h4>Note from Customer</h4>
                        <p>{state.d.orderDetails}</p>    
                    </ProductListingDescriptionDetailContainer>

                    <ProductListingDescriptionDetailContainer>
                        <h4>Order Status</h4>
                            <Dropdown>
                                <StyledDropdown variant="primary" id="dropdown-basic">
                                    {orderStatus == "" && state.d.orderStatus}
                                    {orderStatus != "" && orderStatus}
                                </StyledDropdown>

                                <Dropdown.Menu>
                                    {state.d.orderStatus != "Order Received" &&
                                    <>
                                        <Dropdown.Item onClick={() => {
                                            updateOrders(state.d, "Pending Approval")
                                            setOrderStatus("Pending Approval")
                                        }}>Pending Approval</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            updateOrders(state.d, "In Delivery")
                                            setOrderStatus("In Delivery")
                                        }}>In Delivery</Dropdown.Item>
                                        <Dropdown.Item disabled>Order Received</Dropdown.Item>
                                    </>
                                    }
                                    {state.d.orderStatus == "Order Received" &&
                                        <>
                                            <Dropdown.Item disabled>Pending Approval</Dropdown.Item>
                                            <Dropdown.Item disabled>In Delivery</Dropdown.Item>
                                            <Dropdown.Item disabled>Order Received</Dropdown.Item>
                                        </>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
        
                    </ProductListingDescriptionDetailContainer>

                </ProductListingDescriptionContainer>
            </ProductListingDescriptionSection>
            </ProductListingPage>
        
            
        </PageTemplate>
    )
}

const StyledDropdown = styled(Dropdown.Toggle)`
    background-color:#3B71CA;
    color:white;

`

const StyledID = styled.h1`
  color: #2d4696;
  margin-top: -10px;
  font-weight: bold;
`

const StyledH2 = styled.h2`
  color: #2d4696;
  margin-top: 40px;
`

const ProductListingPage = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    width:90vw;
    height:100%;
    margin-top:5vh;
    margin-bottom:3vh;
    padding-top:8vh;
    padding-left:5vw;
`

const ProductListingImg = styled.img`
    width:30%;
    height:80%;
    border-radius:10px;
    margin-right:5vw;
`

const ProductListingDescriptionSection = styled.div`
    display:flex;
    flex-direction:column;
    width:50vw;
    height:100vh;
    margin-bottom:10vh;
`

const ProductListingDescriptionContainer = styled.div`
    height:70vh;
    max-height:70vh;
`

const ProductListingDescriptionTitleContainer = styled.div`
    margin-bottom:3vh;
`
const ProductListingDescriptionDetailContainer = styled.div`
    margin-top:3vh;
`

const ProductListingToastSection = styled.div`
    position:absolute;
    z-index:1;
    width:53%;
    padding-left:38%;
    top:17%;
`

const StyledNavbar = styled(Navbar)`
    height:5vh;
`

export default ViewOrderDetails;