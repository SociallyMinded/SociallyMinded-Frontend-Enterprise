import styled from 'styled-components' 
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup'; 
import { DropdownButton } from "react-bootstrap"; 
 
 
/*const SearchInputCategory = ({data}) => { 
    return ( 
        <Form> 
            <StyledFormCheck  
                type={'checkbox'} 
                label={ProductCategoryLabels.CRAFTS} 
                value={ProductCategories.CRAFTS} 
                onClick={data.filterProductByCategory} 
                defaultChecked={data.craftFilterClicked} 
            /> 
            <StyledFormCheck 
                type={'checkbox'} 
                label={ProductCategoryLabels.CLOTHING} 
                value={ProductCategories.CLOTHING} 
                onClick={data.filterProductByCategory} 
                defaultChecked={data.clothingFilterClicked} 
             
            /> 
            <StyledFormCheck 
                type={'checkbox'} 
                label={ProductCategoryLabels.FOOD} 
                value={ProductCategories.FOOD} 
                onClick={data.filterProductByCategory} 
                defaultChecked={data.foodFilterClicked} 
         
            /> 
            <StyledFormCheck 
                type={'checkbox'} 
                label={ProductCategoryLabels.OTHERS} 
                value={ProductCategories.OTHERS} 
                onClick={data.filterProductByCategory} 
                defaultChecked={data.othersFilterClicked} 
            /> 
        </Form> 
    ) 
} */ 
 
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
                <Button style={{ position: "absolute" }} class="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3" onClick={data.performSearch}> 
                    <span class="glyphicon glyphicon-search"></span> 
                </Button> 
            </StyledInputGroup> 
         </StyledContainer> 
 
    ) 
} 
 
const StyledContainer = styled.div`
    flex-direction: row 
`
  
 
 
const StyledInputGroup = styled(InputGroup)`
    margin-top:7vh; 
    width: 80%; 
    flex-direction: row; 
    justify-content: center;        
`
    
 
const StyledFormControl = styled(Form.Control)`
    width: 80%; 
    margin-right: 0; 
    padding-right: 0; 
`
    
   
     
 
const StyledFormCheck = styled(Form.Check)`
    padding-left:3vw;
`
  
