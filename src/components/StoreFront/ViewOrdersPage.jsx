import { PageTemplate } from "../common/styles";
import LoggedInHeader from "../common/Header/LoggedInHeader"
import useViewOrderHooks from "./viewOrderHooks";
import { SearchInput } from "./SearchInput";
import { DataDisplay } from "./DataDisplay";
import { PromptResults } from "./PromptResults";
import useLoginHooks from "../Login/loginHooks";
import Header from "../common/Header/Header"; 
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";
import { updateOrderUrl } from "../../routes/routes";

const ViewOrdersPage = () => {
    const { user } = UserAuth()

    const {         
        searchQuery, data, loading,
        searchByProductName, searchPrompts, handleSearchQuery, 
        displayData, showSearchPrompts, performSearch, updatedOrderStatus, showOrderModal,
        setShowOrderModal, handleClose        
    } = useViewOrderHooks(user);

    return (
        <PageTemplate>   
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <div>
                <SearchInput 
                    data={{
                        searchByProductName: searchByProductName,
                        searchQuery: searchQuery,
                        performSearch: performSearch
                    }}
                />

                <PromptResults
                    data={{
                        showSearchPrompts: showSearchPrompts,
                        searchPrompts: searchPrompts,
                        handleSearchQuery: handleSearchQuery
                    }}
                />

                <DataDisplay 
                    data={{ 
                        displayData: displayData,
                        updatedOrderStatus: updatedOrderStatus,
                        showOrderModal: showOrderModal,
                        setShowOrderModal: setShowOrderModal
                    }}
                />

            </div>
        </PageTemplate>
    )
}

export default ViewOrdersPage;