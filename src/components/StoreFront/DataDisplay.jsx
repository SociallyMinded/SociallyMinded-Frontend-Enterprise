import styled from 'styled-components'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

export const DataDisplay = ({data}) => {
    console.log(data)
    return (
        <StyledRow lg={5} md={4}>
            {data.displayData != null && data.displayData.map((d) => (
                <StyledCol md={3}>
                    
                <StyledLink id="styled-card-link" to="/order_details" state={{ d }}>
                    
                    <StyledCard>
                    <StyledImg variant="top" src={require('./donut.png')} />
                    <StyledCardHeader>
                        Order ID: {d.orderRecordId}
                    </StyledCardHeader>
                    <StyledCardSubtitle className="mb-2 text-muted">
                        {d.dateOfOrder}
                    </StyledCardSubtitle>                   
                        <StyledCardBody>
                            <Card.Title>{d.orderTitle}</Card.Title>
                            <Card.Title>${d.totalPrice}</Card.Title>
                        </StyledCardBody>
                    </StyledCard>
                </StyledLink>
                </StyledCol>
            ))}
            {data.displayData != null && data.displayData.length == 0 && <StyledText>There are no orders to display</StyledText>}
        </StyledRow>
    )
}

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
    max-height:80vh;
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
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
`

const StyledText = styled.p`
    width:100%;
    font-size:1.5em;
    margin-top:2%;
`

const StyledImg = styled(Card.Img)`
  border-width:0px;
  width: 180px;
  height: 160px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  
`