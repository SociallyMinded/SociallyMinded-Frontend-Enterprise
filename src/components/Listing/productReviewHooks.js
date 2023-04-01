import { useState } from "react";
import {
  DataCreationTemplate,
  DataFetchingTemplate,
} from "../../utils/dataFetching";
import { getAllReviewsByProductIdUrl } from "../../routes/routes";
import axios from "axios";
import { useEffect } from "react";

const useProductReviewHooks = (product) => {
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enlargedImg, setEnlargedImg] = useState(-1);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [rating, setRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    axios
      .get(getAllReviewsByProductIdUrl + product.productId)
      .then((response) => {
        setData(response.data);
        setDisplayData(response.data);
        response.data.forEach((d) => {
          d["avatar"] = generateRandomNum();
        });
        const totalRating = response.data.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const averageRating = totalRating / response.data.length;
        setRating(averageRating.toFixed(2));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(setLoading(false));
  }, []);

  const generateRandomNum = () => {
    const MAX_NUM = 18;
    const MIN_NUM = 1;
    const RANDOM_NUM = Math.floor(
      Math.random() * (MAX_NUM - MIN_NUM + 1) + MIN_NUM
    );
    return RANDOM_NUM;
  };

  const handleEnlarged = (img) => {
    setEnlargedImg(img);
    setIsEnlarged(true);
  };

  const handleShrink = () => {
    setEnlargedImg(-1);
    setIsEnlarged(false);
  };

  const handleFilterButtonClick = (rating) => {
    setSelectedRating(rating);
  };

  return {
    data,
    displayData,
    loading,
    error,
    generateRandomNum,
    enlargedImg,
    handleEnlarged,
    handleShrink,
    isEnlarged,
    setIsEnlarged,
    rating,
    handleFilterButtonClick,
  };
};

export default useProductReviewHooks;
