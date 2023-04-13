import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllOrdersByEnterpriseFirebaseUid, updateOrderUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { UserAuth } from "../../context/AuthContext"

const useViewOrderHooks = (user) => {
    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, toggleRefresh] = useState(false)

    useEffect(() => {
        axios.get(getAllOrdersByEnterpriseFirebaseUid + user.uid)
        .then(response => {
            setLoading(true)
            let data = response.data.filter((d) => d.product.isActive == true)
            setData(response.data)
            setDisplayData(data)
            setLoading(false)
        })
        .catch ((error) => {
            setError(error)
        })
        .finally (
        )
    }, [user, refresh]);

    // Handle search input
    const [searchQuery, setSearchQuery] = useState("") 
    const [searchPrompts, setSearchPrompts] = useState("")
    const [showSearchPrompts, setShowSearchPrompts] = useState(true)

    const searchByProductName = (e) => {
        setShowSearchPrompts(true)

        var query = e.target.value
        setSearchQuery(query)
        var queryNormalized = e.target.value
        var queryLen = queryNormalized.length

        var displaySearchData = data.filter(d => d.orderRecordId == queryNormalized)
        var displaySearchDataNames = displaySearchData.map(data => data.orderRecordId)

        if (queryNormalized != "") {
            setSearchPrompts(displaySearchDataNames)
        } else {
            setSearchQuery("");
            setSearchPrompts("");
            setSearchPrompts("");
        }
    }

    const handleSearchQuery = (e) => {
        setSearchQuery(e)
        setShowSearchPrompts(false)
    }
   
    const performSearch = () => {
        setShowSearchPrompts(false)

        if (searchQuery == "") {
            setDisplayData(data)
        } else {
            
            var displaySearchData = data.filter(data => data.orderRecordId == searchQuery)
        
            setDisplayData(displaySearchData) 
        }
    }

    const performFilter = (filterOrderStatus) => {
        if (filterOrderStatus != "All Orders") {
            var filteredData = data.filter(data => data.orderStatus == filterOrderStatus)
            setDisplayData(filteredData) 
        } else {
            setDisplayData(data)
        }
    }
    

    const [showOrderModal, setShowOrderModal] = useState(false);

    const handleClose = () => setShowOrderModal(false);
    const handleShow = () => setShowOrderModal(true);


    const updatedOrderStatus = async (d) => {
        console.log(d)
        toggleRefresh(false)
        if (user != null) {
            const updatedRecord =  {
                "productId" : d.product.productId,
                "custFirebaseUid": d.customer.firebaseUid,
                "record": {
                    "quantity": d.quantity,
                    "totalPrice": d.totalPrice,
                    "orderTitle": d.orderTitle,
                    "orderRecordId": d.orderRecordId,
                    "dateOfOrder": d.dateOfOrder,
                    "orderStatus": "In Delivery",
                    "address": d.address,
                    "orderDetails": d.orderDetails
                }
            }
        
            await axios.put(updateOrderUrl + d.orderRecordId, updatedRecord)
                .then(response => {
                    console.log(response.data)
                })
                
                .catch ((error) => {
                    console.log(error)
                    setError(error)
                })
                
                .finally (() => {
                    setLoading(false)
                    setShowOrderModal(false)
                    toggleRefresh(true)
                    
                })

        }
    }

    return { 
        searchQuery,
        data, loading,
        searchByProductName, displayData,
        searchPrompts, handleSearchQuery, showSearchPrompts, performSearch, updatedOrderStatus, showOrderModal,
        setShowOrderModal, handleClose, performFilter
    } 
}

export default useViewOrderHooks