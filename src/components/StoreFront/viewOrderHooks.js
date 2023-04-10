import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllOrders } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"


const useViewOrderHooks = () => {
    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get(getAllOrders)
        .then(response => {
            setData(response.data)
            setDisplayData(response.data)
        })
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, []);

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

    return { 
        searchQuery,
        data, loading,
        searchByProductName, displayData,
        searchPrompts, handleSearchQuery, showSearchPrompts, performSearch
    } 
}

export default useViewOrderHooks