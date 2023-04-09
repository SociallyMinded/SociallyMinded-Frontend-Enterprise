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
      
    return (
        <PageTemplate>
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <ProductListingPage>        
            <ProductListingImg  src={require('./donut.png')} />
    
            
            <ProductListingDescriptionSection>
                <ProductListingDescriptionContainer>
                    <ProductListingDescriptionTitleContainer>
                        <StyledID>Order ID: {state.d.orderRecordId} </StyledID>
                    </ProductListingDescriptionTitleContainer>

                    <StyledH2> Order Details: </StyledH2>
                    <ProductListingDescriptionDetailContainer>
                        <h4>Address</h4>
                        <p>{state.d.address}</p>
                    </ProductListingDescriptionDetailContainer> 

                    <ProductListingDescriptionDetailContainer>
                        <h4>Date of Order</h4>
                        <p>{state.d.dateOfOrder}</p>    
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
                        <h4>Customer username</h4>
                        <p>{state.d.customer.username}</p>    
                    </ProductListingDescriptionDetailContainer>

                    <ProductListingDescriptionDetailContainer>
                        <h4>Order Status</h4>
                        <StyledNavbar>
                            <Container>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav >
                                        <NavDropdown title="Select Order Status" id="basic-nav-dropdown" class="navbar-toggler-icon" >
                                        <NavDropdown.Item onClick={() => updateOrders(state.d, Actions.PENDING_APPROVAL)} >
                                            Pending Approval
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => updateOrders(state.d, Actions.IN_DELIVERY)}>
                                            In Delivery
                                        </NavDropdown.Item >
                                        <NavDropdown.Item onClick={() => updateOrders(state.d, Actions.ORDER_RECEIVED)}>
                                            Order Received
                                        </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    </Navbar.Collapse>
                            </Container>
                        </StyledNavbar>
                    </ProductListingDescriptionDetailContainer>

                </ProductListingDescriptionContainer>
            </ProductListingDescriptionSection>
            </ProductListingPage>
        
            
        </PageTemplate>
    )
}

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
    height:70vh;
    margin-top:5vh;
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
    height:50vh;
    position:1;
    display:absolute;
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
    color: #2d4696;
    width:50%;
    height:5vh;
    margin-top: -15px;
    margin-bottom: 15px;
    margin-left: -28px;

`

export default ViewOrderDetails;