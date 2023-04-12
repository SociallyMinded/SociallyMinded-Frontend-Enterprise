import styled from 'styled-components' 
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup'; 
import { DropdownButton } from "react-bootstrap"; 
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";

const exportHeaders = [
    { label: "Order Title", key: "orderTitle" },
    { label: "Address", key: "address" },
    { label: "Quantity", key: "quantity" },
    { label: "Total Price", key: "totalPrice" },
    { label: "Date of Order", key: "dateOfOrder" },
    { label: "Order Status", key: "orderStatus" }
];

export const SearchInput = ({ data }) => { 

    const [filterCriteria, setFilterCriteria] = useState("")


    const [dataExport, setDataExport] = useState([])
    const [showExportData, setShowExportData] = useState(true)
    const handleShowExportData = () => setShowExportData(true)
    const handleCloseExportDate = () => setShowExportData(false)

    const [showDownloadData, setShowDownloadData] = useState(false)
    //it save according to the filtered data.
    const prepareDataForExport = () => {
        var dataPrep = []
        if (data.displayData != null) {
            for (let i = 0; i < data.displayData.length; i++) {
                const dataModel = {
                    "orderTitle": data.displayData[i].orderTitle,
                    "address": data.displayData[i].address,
                    "quantity": data.displayData[i].quantity,
                    "totalPrice": data.displayData[i].totalPrice,
                    "dateOfOrder": data.displayData[i].dateOfOrder,
                    "orderStatus": data.displayData[i].orderStatus
                }
                dataPrep.push(dataModel)
            }
        } 
        setDataExport(dataPrep)
        setShowDownloadData(true)
        setShowExportData(false)
    }
    
    const handleDownloadData = () => {
        setShowDownloadData(false)
        setShowExportData(true)
    }
    const [orderStatus, setOrderStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    return ( 
          <StyledContainer> 
            <StyledInputGroup> 
                <StyledFormControl  
                    placeholder="Search Order ID" 
                    aria-describedby="basic-addon2" 
                    onChange={data.searchByProductName} 
                    value={data.searchQuery} 
                /> 
                <StyledButton variant="primary" onClick={data.performSearch}>Search</StyledButton>
                <>
                    {showExportData && <StyledButton onClick={prepareDataForExport}>Export Data</StyledButton>}
                    {showDownloadData && <StyledButton onClick={handleDownloadData}>
                        <StyledCSVLink 
                            data={dataExport != null && dataExport} 
                            headers={exportHeaders}
                            filename={`Order_Records_${new Date()}`}
                            extension=".csv"
                        >                
                            Download Order Records
                        </StyledCSVLink>
                    </StyledButton>}
                </>

                <StyledDropdownContainer>
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
                </StyledDropdownContainer>
            </StyledInputGroup> 
         </StyledContainer> 
 
    ) 
} 

const StyledButton = styled(Button)`
    margin-left:1vw;
    height:100%;
`
 
const StyledDropdownContainer = styled(Dropdown)`
`

const StyledDropdown = styled(Dropdown.Toggle)`
    background-color:#14A44D;
    color:white;
    margin-left:1vw;
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
    margin-bottom:3vh;
`
    
 
const StyledFormControl = styled(Form.Control)`
    margin-right: 0; 
    padding-right: 0;
    height:5vh;

`
     
const StyledFormCheck = styled(Form.Check)`
    padding-left:3vw;
`
  
const StyledCSVLink = styled(CSVLink)`
    text-decoration: none !important;
    color:white;
    &:hover {
        text-decoration: none !important;
        color:white;
    }
    &:after {
        text-decoration: none !important;
        color:white;
    }
    &:before {
        text-decoration: none !important;
        color:white;
    }
`