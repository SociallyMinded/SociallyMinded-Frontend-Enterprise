import styled from 'styled-components' 
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup'; 
import { DropdownButton } from "react-bootstrap"; 
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';

export const SearchInput = ({ data }) => { 

    const [filterCriteria, setFilterCriteria] = useState("")

    return ( 
          <StyledContainer> 
            <StyledInputGroup> 
                <StyledFormControl  
                    placeholder="Search Order ID" 
                    aria-describedby="basic-addon2" 
                    onChange={data.searchByProductName} 
                    value={data.searchQuery} 
                /> 
                <Button variant="primary" onClick={data.performSearch}>Search</Button>
                    <Dropdown>
                        <StyledDropdown variant="primary" id="dropdown-basic">
                            {filterCriteria == "" && <p>Filter By Order Status</p>}
                            {filterCriteria != "" && <p>{filterCriteria}</p>}
                        </StyledDropdown>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {
                                setFilterCriteria("Pending Approval")
                                data.performFilter("Pending Approval")

                            }}>
                                Pending Approval
                            </Dropdown.Item>

                            <Dropdown.Item onClick={() => {
                                setFilterCriteria("In Delivery")
                                data.performFilter("In Delivery")
                            }}>
                                In Delivery
                            </Dropdown.Item>

                            <Dropdown.Item onClick={() => {
                                setFilterCriteria("Order Received")
                                data.performFilter("Order Received")
                            }}>
                                Order Received
                            </Dropdown.Item>

                            <Dropdown.Item onClick={() => {
                                setFilterCriteria("All Orders")
                                data.performFilter("All Orders")
                            }}>
                                All Orders
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

            </StyledInputGroup> 
         </StyledContainer> 
 
    ) 
} 
 
const StyledDropdown = styled(Dropdown.Toggle)`
    background-color:#14A44D;
    color:white;
    margin-left:1vw;
    max-height:100%;
    height:100%;

    &:hover{
        background-color:#14A44D;
        color:white;
    }

    &:after{
        background-color:#14A44D;
        color:white;
    }

`

const FilterButton = styled(Button)`
    margin-left:1vw;

`

const StyledContainer = styled.div`
    flex-direction: row 
`
  
const StyledInputGroup = styled(InputGroup)`
    margin-top:7vh; 
    width: 100%; 
    height:5vh;
    max-height:5vh;
    flex-direction: row; 
    justify-content: center;    
`
    
 
const StyledFormControl = styled(Form.Control)`
    margin-right: 0; 
    padding-right: 0; 
    height:100%;
`
     
const StyledFormCheck = styled(Form.Check)`
    padding-left:3vw;
`
  
