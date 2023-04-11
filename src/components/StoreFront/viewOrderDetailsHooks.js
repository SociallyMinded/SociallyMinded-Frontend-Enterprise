import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { getAllOrdersByEnterpriseFirebaseUid, updateOrderUrl } from "../../routes/routes"

export const Actions = {
    PENDING_APPROVAL: 'Pending Approval',
    IN_DELIVERY: 'In Delivery',
    ORDER_RECEIVED: 'Order Received'
}

const useViewOrderDetailsHooks = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const { user } = UserAuth();
    const [orderSelected, setCurrentOrderSelected] = useState(null);
    const [editOrderError, setEditOrderError] = useState(null)

    const [editOrderStatus, setEditOrderStatus] = useState("");
    //const handleEditOrderStatus = (status) => setEditOrderStatus(status);


    const updateOrders = async (d, orderStatus) => {
        // toggleRefresh(false)
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
                    "orderStatus": orderStatus,
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
                    // setLoading(false)
                    // setShowOrderModal(false)
                    // toggleRefresh(true)
                })

    }

    // const updateOrders = (order, action) => {
    //     console.log(order)
    //     setCurrentOrderSelected(order)
    //     console.log(orderSelected)
    //     setEditOrderStatus(action)

    //     updateOrdersHelper();
    // }

    // const updateOrdersHelper = async() => {
    //     if (user != null) {
    //         //const enterpriseFirebaseUid = user.uid
    //         console.log(orderSelected)
    //         const newOrder = {
    //             "productId" : orderSelected.product.productId,
    //             "custFirebaseUid": orderSelected.customer.customerId,
    //             "record": {
    //                 "quantity": orderSelected.quantity ,
    //                 "totalPrice": orderSelected.totalPrice,
    //                 "orderTitle": orderSelected.orderTitle,
    //                 "orderRecordId": orderSelected.orderRecordId,
    //                 "dateOfOrder": orderSelected.dateOfOrder,
    //                 "orderStatus": editOrderStatus,
    //                 "address": orderSelected.address
    //             }
    //         }
           
    //         await axios.put(updateOrderUrl + orderSelected.orderRecordId, newOrder)
    //             .then(response => {
    //                 console.log(response)
    //             })
    //             .catch(error => setEditOrderError(error.response.data)) 
    //             .finally(res => {
    //                 //setRefreshTable(true)
    
    //             })
    //     } else {
    //         // setShowPurchaseModal(false)
    //         // setShowLoginPromptToast(true)
    //     }

    }

    return { 
        // updateOrdersHelper,
        updateOrders, 
        orderSelected, 
        editOrderStatus,
        error
    } 
}


export default useViewOrderDetailsHooks;