import { useState, useMemo } from "react";
import { DataFetchingTemplate } from "../../utils/dataFetching";
import { getAllEnterprisesUrl } from "../../routes/routes";
import axios from "axios";

const useDashboardHooks = () => {
  const { user } = UserAuth();
  const [data, setData] = useState(null);

  return {
    data,
    user,
    setData,
  };
};

export default useDashboardHooks;
