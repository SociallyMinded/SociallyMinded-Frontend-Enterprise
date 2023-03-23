import { useState, useMemo } from "react";
import { DataFetchingTemplate } from "../../utils/dataFetching";
import { getAllEnterprisesUrl } from "../../routes/routes";
import axios from "axios";

const useEnterpriseHooks = () => {
  const { data, error, loading } = DataFetchingTemplate(getAllEnterprisesUrl);

  const [showEnterprises, setShowEnterprises] = useState(false);
  const toggleShowEnterprises = () => {
    setShowEnterprises(!showEnterprises);
  };

  const [input, setInput] = useState(null);
  const handleInput = (e) => {
    setInput(() => e.target.value);
  };

  const [response, setResponse] = useState(null);
  const handlers = useMemo(
    () => ({
      createEnterprise: async (e) => {
        // reset state (trigger refresh)
        // setLoading(true)
        // setSuccess(false)
        // setError(null)
        e.preventDefault();
        const newEnterpriseRecord = {
          username: input,
        };
        await axios
          .post(getAllEnterprisesUrl, newEnterpriseRecord)
          .then((response) => {
            console.log(response);
            setResponse(response);
            // setSuccess(true)
            setInput("");
          })
          .catch((error) => console.log(error));
      },
    }),
    [input]
  );

  return {
    data,
    error,
    loading,
    showEnterprises,
    toggleShowEnterprises,
    input,
    handleInput,
    response,
    handlers,
  };
};

export default useEnterpriseHooks;
