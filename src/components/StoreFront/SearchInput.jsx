import styled from 'styled-components' 
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup'; 
import { DropdownButton } from "react-bootstrap"; 
import Button from 'react-bootstrap/Button';


export const SearchInput = ({ data }) => { 
    return ( 
          <StyledContainer> 
            <StyledInputGroup className="mb-3"> 
                <StyledFormControl  
                    placeholder="Search Order ID" 
                    aria-describedby="basic-addon2" 
                    onChange={data.searchByProductName} 
                    value={data.searchQuery} 
                /> 
                <Button variant="primary" onClick={data.performSearch}>Search</Button>
                <FilterButton variant="secondary" onClick={data.performSearch}>Filter By Order Status</FilterButton>
            </StyledInputGroup> 
         </StyledContainer> 
 
    ) 
} 
 
const FilterButton = styled(Button)`
    margin-left:1vw;

`

const StyledContainer = styled.div`
    flex-direction: row 
`
  
const StyledInputGroup = styled(InputGroup)`
    margin-top:7vh; 
    width: 100%; 
    flex-direction: row; 
    justify-content: center;        
`
    
 
const StyledFormControl = styled(Form.Control)`
    margin-right: 0; 
    padding-right: 0; 
`
     
const StyledFormCheck = styled(Form.Check)`
    padding-left:3vw;
`
  
