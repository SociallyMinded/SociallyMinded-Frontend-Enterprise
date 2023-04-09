import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getEnterpriseByFirebaseUid, getAllOrdersByEnterpriseIdUrl } from "../../routes/routes"
import { UserAuth } from "../../context/AuthContext";
import axios from 'axios'
import { useEffect } from "react"


const useViewOrderHooks = () => {
    const { user } = UserAuth();
    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentEnterprise, setCurrentEnterprise] = useState(null);
    
    /* useEffect(() => {
        axios.get(getAllOrdersByEnterpriseIdUrl )
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
    }, []); */

    console.log(user);
    const fetchOrders = async () => {
        try {
          await axios
            .get(getEnterpriseByFirebaseUid + user.uid)
            .then((response) => {
              setCurrentEnterprise(response.data);
              return axios.get(
                getAllOrdersByEnterpriseIdUrl +
                  response.data.socialEnterpriseId
              );
            })
            .then((response) => {
              setData(response.data);
              setDisplayData(response.data);
              console.log(currentEnterprise.socialEnterpriseId);
              console.log(response.data);
            });
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchOrders();
      }, [user]);

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

        var queryNormalized = searchQuery
        var queryLen = queryNormalized.length
        
        var displaySearchData = data.filter(data => data.orderRecordId == queryNormalized)
    
        /*// Get all categories of interest
        var filteredCategories = []
        for (const [key, value] of categories.entries()) {
            if (value % 2 == 0 && key != undefined) {
                filteredCategories.push(key)
            }
        }

        // Filter data by search input string -> category 
        var filteredDisplayData = []
        for (const d of displaySearchData) {
            if (filteredCategories.includes(d.category)) {
                filteredDisplayData.push(d)
            }
        }*/

        setDisplayData(displaySearchData) 
    }

    return { 
        searchQuery,
        data, loading,
        searchByProductName, displayData,
        searchPrompts, handleSearchQuery, showSearchPrompts, performSearch
    } 
}

export default useViewOrderHooks