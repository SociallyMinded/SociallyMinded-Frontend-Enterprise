import styled from "styled-components";
import { PageTemplate } from "../common/styles";
import { UserAuth } from "../../context/AuthContext";
import { SearchInput } from "./SearchInput";
import { PromptResults } from "./PromptResults";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import Header from "../common/Header/Header";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
import { useLocation } from "react-router-dom";
import useProductListingHooks from "./productListingHooks";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import { ModalBody } from "react-bootstrap";
import { Actions } from "./productListingHooks.js";
import "./productListing.css";
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

const Listing = () => {
  const { state } = useLocation();
  const { user } = UserAuth();
  const {
    data,
    loading,
    productSelected,
    updateProduct,
    createNewProduct,
    deleteProduct,
    showAddProductModal,
    showEditProductModal,
    handleShowAddProductModal,
    handleCloseAddProductModal,
    handleCloseEditProductModal,
    handleProductSelected,
    productName,
    handleProductName,
    productPrice,
    handleProductPrice,
    productDescription,
    handleProductDescription,
    productCategory,
    handleProductCategory,
    handleFileChange,
    editProductName,
    handleEditProductName,
    editProductPrice,
    handleEditProductPrice,
    editProductDescription,
    handleEditProductDescription,
    editProductCategory,
    handleEditProductCategory,
    showConfirmEditModal,
    handleCloseConfirmEditModal,
    handleShowConfirmEditModal,
    returnToEditModal,
    showConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
    editFile,
    validated,
    handleSubmit,
    selectedFiles,
    showImageUploadError,
    serverError,
    showErrorWarning,
    handleShowErrorWarning,
    showErrorToast,
    setShowErrorToast,
    setShowErrorWarning,
    searchQuery,
    searchByProductName,
    searchPrompts,
    showSearchPrompts,
    handleSearchQuery,
    performSearch,
  } = useProductListingHooks();

  const [show, setShow] = useState(false)

  return (
    <PageTemplate>
      {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}

      <ProductListingHeaderContainer>
        <Subheader>Products</Subheader>
        <SearchInput
          data={{
            searchByProductName: searchByProductName,
            searchQuery: searchQuery,
            performSearch: performSearch,
          }}
        />
        <PromptResults
          data={{
            showSearchPrompts: showSearchPrompts,
            searchPrompts: searchPrompts,
            handleSearchQuery: handleSearchQuery,
          }}
        />
        <AddButton onClick={handleShowAddProductModal}>Add</AddButton>
      </ProductListingHeaderContainer>
      {showErrorWarning && (
        <Alert
          variant={"danger"}
          style={{ width: "30rem", marginTop: "10px", marginBottom: 0 }}
        >
          <button class="toast-button" onClick={() => setShowErrorWarning(false)}>X</button>
          {serverError}
        </Alert>
      )}
      <ProductListingPage>
        <ProductListingContainer>

        {loading && <SpinnerContainer>
            <h5>Fetching Listings</h5>
            <Spinner animation="grow" />
        </SpinnerContainer>}

          {data != null && data.length == 0 && <h5>No products yet.</h5>}
          {data != null &&
            data.map((data) => (
              <ProductListingImgContainer>
                <ProductListingImgHeaderContainer>
                  <ProductListingImgHeaderText>
                    <strong>{data.name}</strong>
                  </ProductListingImgHeaderText>
                  <Dropdown>
                    <Dropdown.Toggle>
                      <FaEllipsisV />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        as="button"
                        onClick={() =>
                          handleProductSelected(data, Actions.VIEW)
                        }
                      >
                        View
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() =>
                          handleProductSelected(data, Actions.UPDATE)
                        }
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() =>
                          handleProductSelected(data, Actions.DELETE)
                        }
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ProductListingImgHeaderContainer>
                <ProductListingImg
                  src={data != null  && data.imageLink != null && data.imageLink[0]}
                  alt="Product Picture"
                />
              </ProductListingImgContainer>
            ))}
        </ProductListingContainer>
        <Modal
          show={showAddProductModal}
          onHide={handleCloseAddProductModal}
          centered
        >
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
            <button
              type="button"
              className="close"
              onClick={handleCloseAddProductModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>

          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationCustom03">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  autoFocus
                  maxLength="25"
                  value={productName}
                  onChange={handleProductName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a product name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={productPrice}
                  onChange={handleProductPrice}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a price
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  required
                  value={productDescription}
                  onChange={handleProductDescription}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a product description
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image (Max 5)</Form.Label>
                {selectedFiles.length < 5 ? (
                  <input
                    className="ml-3"
                    id="uploadImage"
                    type="file"
                    required
                    onChange={handleFileChange}
                  />
                ) : (
                  <input
                    className="ml-3"
                    id="uploadImage"
                    type="file"
                    disabled
                  />
                )}
                {showImageUploadError && (
                  <ImageUploadErrorText>
                    Please upload at least 1 image
                  </ImageUploadErrorText>
                )}
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Category</Form.Label>
                <Form.Select className="ml-3" onChange={handleProductCategory}>
                  <option value="CRAFTS">Crafts</option>
                  <option value="CLOTHING">Clothing</option>
                  <option value="FOOD">Food</option>
                  <option value="OTHERS">Others</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit" variant="primary" className="float-right">
                Add
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          show={showEditProductModal}
          onHide={handleCloseEditProductModal}
          centered
        >
          <Modal.Header>
            <Modal.Title>Edit Product</Modal.Title>
            <button
              type="button"
              className="close"
              onClick={handleCloseEditProductModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>
          <ModalBody>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="25"
                  autoFocus
                  value={editProductName}
                  onChange={(e) => handleEditProductName(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editProductPrice}
                  onChange={(e) => handleEditProductPrice(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={editProductDescription}
                  onChange={(e) => handleEditProductDescription(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image (Max 5)</Form.Label>
                {selectedFiles.length < 5 ? (
                  <input
                    className="ml-3"
                    id="uploadImage"
                    type="file"
                    onChange={handleFileChange}
                  />
                ) : (
                  <input
                    className="ml-3"
                    disabled
                    id="uploadImage"
                    type="file"
                  />
                )}
              </Form.Group>
            </Form>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Category</Form.Label>
                <Form.Select
                  className="ml-3"
                  onChange={(e) => handleEditProductCategory(e.target.value)}
                  defaultValue={editProductCategory}
                >
                  <option value="CRAFTS">Crafts</option>
                  <option value="CLOTHING">Clothing</option>
                  <option value="FOOD">Food</option>
                  <option value="OTHERS">Others</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </ModalBody>
          <Modal.Footer>
            <Button variant="primary" onClick={handleShowConfirmEditModal}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {productSelected != null && (
          <Modal
            show={showConfirmEditModal}
            onHide={handleCloseConfirmEditModal}
            centered
          >
            <Modal.Header>
              <Modal.Title>Confirm Edit</Modal.Title>
              <button
                type="button"
                className="close"
                onClick={handleCloseConfirmEditModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={editProductName} disabled />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={editProductPrice}
                    disabled
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="textarea"
                    rows={4}
                    value={editProductDescription}
                    disabled
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    value={editFile.toString()}
                    disabled
                  />
                </Form.Group>
              </Form>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Select className="ml-3" disabled>
                    <option>{editProductCategory}</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={returnToEditModal}>
                Back
              </Button>
              <Button variant="primary" onClick={updateProduct}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {productSelected != null && (
          <Modal
            show={showConfirmDeleteModal}
            onHide={handleCloseConfirmDeleteModal}
            centered
          >
            <Modal.Header>
              <Modal.Title>Confirm Delete</Modal.Title>
              <button
                type="button"
                class="close"
                onClick={handleCloseConfirmDeleteModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseConfirmDeleteModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={deleteProduct}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </ProductListingPage>
    </PageTemplate>
  );
};

const SpinnerContainer = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  margin-top:5vh;
`

const ImageUploadErrorText = styled.p`
  font-size: 80%;
  color: #dc3545;
`;

const AddButton = styled(Button)`
  height: 38px;
  background-color: #2d4696;
  color: #ffffff;
  border: 0px;
  border-radius: 10px;
  font-size: 15px;
  text-align: center;
  margin-left: 55%;
`;

const ProductListingPage = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductListingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 3vh;
  width: 100vw;
`;

const ProductListingImgHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5%;
  margin-bottom: 2%;
  justify-content: space-between;
`;

const ProductListingImgHeaderText = styled.div`
  width: 11vw;
  height: 3vh;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductListingImgContainer = styled.div`
  flex-direction: column;
  margin-bottom: 3vh;
  margin-left: 1.4vw;
  margin-right: 1.4vw;
  align-items: center;

  display: block;
  top: 0px;
  position: relative;
  border-radius: 4px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;

  &:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    border-radius: 10px;
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

const ProductListingImg = styled.img`
  width: 15vw;
  height: 25vh;
  border-radius: 10px;
  object-fit: cover;
`;

const ProductListingHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 3vh;
  width: 100%;
  max-height: 30vh;
  border-bottom: 1px solid #7a7a7a;
  padding-bottom: 2vh;
  position:relative;
`;

const SearchBox = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 2%;
  padding-right: 2;
`;

const Subheader = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export default Listing;
