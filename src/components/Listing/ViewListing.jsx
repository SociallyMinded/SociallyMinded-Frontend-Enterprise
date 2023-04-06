import styled from "styled-components";
import { PageTemplate } from "../common/styles";
import { UserAuth } from "../../context/AuthContext";
import Header from "../common/Header/Header";
import Button from "react-bootstrap/Button";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import { useLocation, useNavigate } from "react-router";
import useProductReviewHooks from "./productReviewHooks";
import { Badge } from "react-bootstrap";

const ViewListing = () => {
  const { user } = UserAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const toListing = async () => {
    navigate("/listing");
  };

  console.log(location.state.product);

  const {
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
  } = useProductReviewHooks(location.state.product);

  return (
    <PageTemplate>
      {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
      <ProductHeaderContainer>
        <BackButton onClick={toListing}>Back</BackButton>
        <Subheader>View Product</Subheader>
      </ProductHeaderContainer>
      <ProductPage>
        <ProductContainer>
          <ProductImgSection>
            <ProductImg
              src={location.state.product.imageLink[0]}
              alt="product picture"
            />
          </ProductImgSection>
          <ProductDescriptionSection>
            <ProductDescriptionContainer>
              <ProductDescriptionTitleContainer>
                <StyledName>{location.state.product.name} </StyledName>
                <h5>
                  <Badge bg="secondary" text="light">
                    {" "}
                    {location.state.product.category}{" "}
                  </Badge>
                </h5>
              </ProductDescriptionTitleContainer>
              <ProductDescriptionDetailContainer>
                <h4>Price</h4>
                <p>${location.state.product.price}</p>
              </ProductDescriptionDetailContainer>
              <ProductDescriptionDetailContainer>
                <h4>Rating</h4>
                <p>
                  {location.state.product.ratingScore != null
                    ? "location.state.product.ratingScore / 5"
                    : "0 / 5"}
                </p>
              </ProductDescriptionDetailContainer>
              <ProductDescriptionDetailContainer>
                <h4>Social Enterprise</h4>
                <p>{location.state.enterprise.enterpriseName}</p>
              </ProductDescriptionDetailContainer>
              <ProductDescriptionDetailContainer>
                <h4>About This Item</h4>
                <p>{location.state.product.description}</p>
              </ProductDescriptionDetailContainer>
            </ProductDescriptionContainer>
          </ProductDescriptionSection>
        </ProductContainer>
      </ProductPage>

      <ReviewTitleContainer>
        <h4>
          <u>
            <strong>Reviews</strong>
          </u>
        </h4>
      </ReviewTitleContainer>
      <ReviewContainer>
        {data != null && data.length == 0 && (
          <h5>There are no reviews for this product yet.</h5>
        )}
        {data != null &&
          data.map((review) => (
            <EachReviewContainer>
              <AvatarImg src={require(`./avatar.png`)}></AvatarImg>
              <ReviewDescription>
                <p>
                  <strong>
                    {review.isAnonymous == true
                      ? "Anonymous"
                      : review.customer.username}
                  </strong>
                  <br />
                  <i>
                    Posted on:{" "}
                    {review.dateOfReview != null &&
                      review.dateOfReview.split("T")[0]}
                  </i>
                </p>
                <p>Rating: {review.rating}</p>
                <p>{review.reviewDescription}</p>
              </ReviewDescription>
            </EachReviewContainer>
          ))}
      </ReviewContainer>
    </PageTemplate>
  );
};

const StyledName = styled.h1`
  color: #2d4696;
`;

const ProductPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProductHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 3vh;
  width: 100%;
  border-bottom: 1px solid #7a7a7a;
  padding-bottom: 2vh;
`;

const Subheader = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin-left: 2%;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 70vh;
  padding: 3%;
`;

const ProductImgSection = styled.div`
  display: flex;
`;

const ProductImg = styled.img`
  width: 40vw;
  height: 60vh;
  border-radius: 10px;
  object-fit: cover;
`;

const ProductDescriptionSection = styled.div`
  display: flex;
  width: 40vw;
  height: 60vh;
  flex-direction: row;
  margin-left: 5vw;
`;

const ProductDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 60vh;
  max-height: 60vh;
`;
const ProductDescriptionTitleContainer = styled.div``;
const ProductDescriptionDetailContainer = styled.div``;

const BackButton = styled(Button)`
  height: 38px;
  background-color: #2d4696;
  color: #ffffff;
  border: 0px;
  border-radius: 10px;
  font-size: 15px;
  text-align: center;
`;

const ReviewTitleContainer = styled.div`
  display: flex;
  padding-left: 3%;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100vh;
  padding-top: 0%;
  padding-left: 3%;
  padding-right: 3%
  padding-bottom: 3%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const EachReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2vh;
  margin-bottom: 2vh;
  align-items: center;
  justify-content: flex-start;
`;

const AvatarImg = styled.img`
  width: 5vw;
  height: 9vh;
  margin-right: 2vw;
`;

const ReviewDescription = styled.div`
  position: relative;
  background: #fbfbfb;
  border-radius: 0.4em;
  padding: 1em;
  width: 88%;
  border: 1px solid #dbdbdb;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-right-color: #dbdbdb;
    border-left: 0;
    border-bottom: 0;
    margin-top: -4.5px;
    margin-left: -9px;
  }

  &:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -4px;
  }

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    border-radius: 32px;
    transform: scale(2);
    transform-origin: 50% 50%;
    transition: transform 0.15s ease-out;
  }

  &:hover:before {
    transform: scale(2.15);
  }
`;

export default ViewListing;
