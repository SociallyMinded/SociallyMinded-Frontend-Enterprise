import styled from 'styled-components'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react"
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';

export const DataDisplay = ({data}) => {


    const [selectedOrder, setSelectedOrder] = useState("");

    return (
        <StyledRow lg={5} md={4}>

            {data.loading && 
                <LoadingContainer>
                    <h5>Fetching Records</h5>
                    <Spinner animation="grow" />
                </LoadingContainer>
            }
            {!data.loading &&
            <>
             {data.displayData != null && data.displayData.map((d) => (
                <StyledCol md={3}>
                <StyledLink id="styled-card-link"  to={'/order_details/'+ d.orderRecordId } state={{ d }}>

                <StyledCard onClick={() => {
                    data.setShowOrderModal(true)
                    setSelectedOrder(d)
                
                }}>
                    <StyledCardTitleHeader>Order {d.orderRecordId}</StyledCardTitleHeader>
                    <StyledImg variant="top" src={d.product.imageLink[0]} />
                    <StyledCardBody>
                            <StyledCardTitle>{d.orderTitle}</StyledCardTitle>
                            <StyledCardTitle>{d.dateOfOrder.split("T")[0]}</StyledCardTitle>
                            <StyledCardSubTitle>
                                {d.orderStatus == "Pending Approval" && <PAHighlightedText>{d.orderStatus}</PAHighlightedText>}
                                {d.orderStatus == "In Delivery" && <IDHighlightedText>{d.orderStatus}</IDHighlightedText>}
                                {d.orderStatus == "Order Received" && <ORHighlightedText>{d.orderStatus}</ORHighlightedText>}
                            </StyledCardSubTitle>
                    </StyledCardBody>
                </StyledCard>
                </StyledLink>
                </StyledCol>
            ))}
            {data.displayData != null && data.displayData.length == 0 && <StyledText>There are no orders to display</StyledText>}
            </>
           
            }
        </StyledRow>
    )
}

const LoadingContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    margin-top:5vh;
`

const PAHighlightedText = styled.p`
    background-color:#ffd9de;
    border-radius:5px;
    padding-left:0.5em;
    padding-right:0.5em;
    padding-top:0.25em;
    padding-bottom:0.25em;
`
const IDHighlightedText = styled.p`
    background-color:#ffedc7;
    border-radius:5px;
    padding-left:0.5em;
    padding-right:0.5em;
    padding-top:0.25em;
    padding-bottom:0.25em;
`

const ORHighlightedText = styled.p`
    background-color:#cbf5d8;
    border-radius:5px;
    padding-left:0.5em;
    padding-right:0.5em;
    padding-top:0.25em;
    padding-bottom:0.25em;
`

const StyledButton = styled(Button)`
    width:100%;
`

const StyledCardTitleHeader = styled.div`
    font-weight:bold;
    font-size:1.2em;
    margin-top:0.5vw;
    margin-bottom:0.5vw;
    margin-left:1vw;
`

const StyledCardSubTitle = styled.p`
    display:flex;
    flex-direction:row;
    margin-top:2vh;
`

const StyledCardTitle = styled.div`
    font-weight:bold;
`

const StyledCardHeader = styled(Card.Header)`
    background-color:white;
    border-width:0px;
    font-size: 15px

`
const StyledCardSubtitle = styled(Card.Subtitle)`
    background-color:white;
    border-width:0px;
`

const StyledRow = styled(Row)`
    max-height:70vh;
    overflow-y: scroll;
    z-index:1;
`

const StyledCol = styled(Col)`
    margin-top:2%;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;

    &:hover {
        text-decoration: none;
        color: black;
    }
`

const StyledCard = styled(Card)`
    display: block;
    top: 0px;
    position: relative;
    border-radius: 10px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    border: 2px solid rgba(121, 173, 209, 0.4);
    align: center;
    
    &:hover {
        transition: all 0.2s ease-out;
        box-shadow: 0px 4px 8px rgba(121, 173, 209, 0.4);
        top: -5px;
    }
  
    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 32px;
        transform: scale(2);
        transform-origin: 50% 50%;
        transition: transform 0.15s ease-out;
    }
  
    &:hover:before {
        transform: scale(2.15);
    }
  }
`

const StyledCardBody = styled(Card.Body)`
    display: flex;
    flex-direction: column;
    max-width:100%;
    text-overflow:ellipsis;
    height:20vh;
`

const StyledText = styled.p`
    width:100%;
    font-size:1.5em;
    margin-top:2%;
    margin-left:1.5vw;
`

const StyledImg = styled(Card.Img)`
  border-width:0px;
  width: 100%;
  height: 25vh;
`