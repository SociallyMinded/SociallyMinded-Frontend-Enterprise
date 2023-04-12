import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllOrdersByEnterpriseFirebaseUid, updateOrderUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { UserAuth } from "../../context/AuthContext"

const useDashboardHooks = (user) => {
    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refresh, toggleRefresh] = useState(false)

    const [dataChartOne, setDataChartOne] = useState({});
    const [dataChartTwo, setDataChartTwo] = useState([]);
    const [dataChartThree, setDataChartThree] = useState([]);
    const [dataChartFour, setDataChartFour] = useState([]);

    useEffect(() => {
        axios.get(getAllOrdersByEnterpriseFirebaseUid + user.uid)
        .then(response => {
            let records = response.data
            setData(records)

            let currentYear = new Date().getFullYear()
            let currentMonth = new Date().getMonth()+1

            /* Data for chart 1 */
            let cleaned = new Map();
            let totalNumDays = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate()
            for (let i = 1; i < totalNumDays+1; i++) {
                cleaned.set(i, 0)   
            }

            records.forEach(r => {
                let orderYear = r.dateOfOrder.split("T")[0].split("-")[0]
                let orderMonth = Math.floor(r.dateOfOrder.split("T")[0].split("-")[1])

                if (orderYear == currentYear && orderMonth == currentMonth) {

                    let currentDate = Math.floor(r.dateOfOrder.split("T")[0].split("-")[2])
                
                    if (cleaned.has(currentDate)) {
                        let total = cleaned.get(currentDate)
                        cleaned.set(currentDate, total + r.totalPrice)
                    } else {
                        cleaned.set(currentDate, r.totalPrice)
                    }
                }
            })

            let cleanedRecords = []
            Array.from(cleaned.entries()).map(([key, val]) =>{
                let recordStructure = {
                    "date": key,
                    "total sales": val
                }
                cleanedRecords.push(recordStructure)
            });
            setDataChartOne(cleanedRecords)


            let category = new Map();
            records.forEach(r => {
                let orderYear = r.dateOfOrder.split("T")[0].split("-")[0]
                let orderMonth = Math.floor(r.dateOfOrder.split("T")[0].split("-")[1])

                if (orderYear == currentYear && orderMonth == currentMonth) {
                    let productCat = r.product.category
                    if (!category.has(productCat)) {
                        category.set(productCat, r.totalPrice)
                    } else {
                        let totalPriceCat = category.get(productCat)
                        category.set(productCat, totalPriceCat + r.totalPrice)
                    }
                }
            })

            let cleanedCategories = []
            Array.from(category.entries()).map(([key, val]) =>{
                let recordStructure = {
                    "name": key,
                    "value": val
                }
                cleanedCategories.push(recordStructure)
            })

            setDataChartTwo(cleanedCategories)

            let status = new Map();
            status.set("Pending Approval", 0)
            status.set("In Delivery", 0)
            status.set("Order Received", 0)
            records.forEach(r => {
                let orderYear = r.dateOfOrder.split("T")[0].split("-")[0]
                let orderMonth = Math.floor(r.dateOfOrder.split("T")[0].split("-")[1])

                if (orderYear == currentYear && orderMonth == currentMonth) {
                    let recordStatus = r.orderStatus
                    if (!status.has(recordStatus)) {
                        status.set(recordStatus, 1)
                    } else {
                        let totalrecords = status.get(recordStatus)
                        status.set(recordStatus, totalrecords + 1)
                    }
                }
            })

            let cleanedStatuses = []
            Array.from(status.entries()).map(([key, val]) =>{
                let recordStructure = {
                    "status": key,
                    "number of records": val
                }
                cleanedStatuses.push(recordStructure)
            })

            setDataChartThree(cleanedStatuses)

            let statusSankey = new Map();
            statusSankey.set("Pending Approval", 0)
            statusSankey.set("In Delivery", 0)
            statusSankey.set("Order Received", 0)
            records.forEach(r => {
                let orderYear = r.dateOfOrder.split("T")[0].split("-")[0]
                let orderMonth = Math.floor(r.dateOfOrder.split("T")[0].split("-")[1])

                if (orderYear == currentYear && orderMonth == currentMonth) {
                    let recordStatus = r.orderStatus
                    if (!statusSankey.has(recordStatus)) {
                        statusSankey.set(recordStatus, 1)
                    } else {
                        let totalrecords = statusSankey.get(recordStatus)
                        statusSankey.set(recordStatus, totalrecords + 1)
                    }
                }
            })

            if (statusSankey.get("Pending Approval") > 0 && statusSankey.get("In Delivery")  > 0 &&  statusSankey.get("Order Received") > 0) {
                let cleanedStatusesSankey = []
                Array.from(statusSankey.entries()).map(([key, val]) =>{
                    let recordStructure = {
                        "status": key,
                        "number of records": val
                    }
                    cleanedStatusesSankey.push(recordStructure)
                })

                const linksPAToID = {
                    "source":0,
                    "target":1,
                    "value":statusSankey.get("In Delivery") != undefined && Math.abs(statusSankey.get("In Delivery"))
                }
                const linkIDToOC = {
                    "source":0,
                    "target":2,
                    "value":statusSankey.get("Order Received") != undefined && Math.abs(statusSankey.get("Order Received"))
                }
        
                setDataChartFour([linksPAToID, linkIDToOC])

            }
           

        })
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, [user, refresh]);

    return { 
        data, displayData, dataChartOne, dataChartTwo, dataChartThree, dataChartFour
    } 
}

export default useDashboardHooks;