import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllOrdersByEnterpriseFirebaseUid, updateOrderUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { UserAuth } from "../../context/AuthContext"

function productPopularityComparator(a, b) {
    if (a["number of records"] < b["number of records"]) {
      return 1;
    }
    if (a["number of records"] > b["number of records"]) {
      return -1;
    }
    return 0;
}

function productRatingComparator(a, b) {
    if (Math.floor(a["average rating score"]) < Math.floor(b["average rating score"])) {
      return 1;
    }
    if (Math.floor(a["average rating score"]) > Math.floor(b["average rating score"])) {
      return -1;
    }
    return 0;
}


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
    const [dataChartFive, setDataChartFive] = useState([]);
    const [dataChartSix, setDataChartSix] = useState([]);

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

            let products = new Map();
            records.forEach(r => {
                let orderYear = r.dateOfOrder.split("T")[0].split("-")[0]
                let orderMonth = Math.floor(r.dateOfOrder.split("T")[0].split("-")[1])

                if (orderYear == currentYear && orderMonth == currentMonth) {
                    let productId = r.product.productId
                    let productName = r.product.name
                    if (!products.has(productId)) {
                        products.set(productId, [productName, 1])
                    } else {
                        let totalproducts = products.get(productId)
                        totalproducts[1] += 1
                        products.set(productId, totalproducts)
                    }
                }
            })

            let cleanedProducts = []
            Array.from(products.entries()).map(([key, val]) =>{
                let productStructure = {
                    "id": key,
                    "number of records": val[1],
                    "name": val[0]
                }
                cleanedProducts.push(productStructure)
            })
            cleanedProducts.sort(productPopularityComparator)
            setDataChartFive(cleanedProducts.slice(0,5))
            


            let productRatings = new Map();
            records.forEach(r => {
                let orderYear = r.dateOfOrder.split("T")[0].split("-")[0]
                let orderMonth = Math.floor(r.dateOfOrder.split("T")[0].split("-")[1])

                if (orderYear == currentYear && orderMonth == currentMonth) {
                    let productId = r.product.productId
                    let productName = r.product.name
                    if (!productRatings.has(productId)) {
                        productRatings.set(productId, [productName, r.product.ratingScore])
                    } 
                }
            })


            let cleanedProductRatings = []
            Array.from(productRatings.entries()).map(([key, val]) =>{
                let productRatingStructure = {
                    "id": key,
                    "average rating score": val[1],
                    "name": val[0]
                }
                cleanedProductRatings.push(productRatingStructure)
            })
            cleanedProductRatings.sort(productRatingComparator)
            setDataChartSix(cleanedProductRatings.slice(0,5))
            




            




        })
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, [user, refresh]);

    return { 
        data, displayData, dataChartOne, dataChartTwo, dataChartThree, dataChartFour,
        dataChartFive, dataChartSix
    } 
}

export default useDashboardHooks;