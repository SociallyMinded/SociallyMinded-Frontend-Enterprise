import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { PageTemplate } from "../common/styles";
import { UserAuth } from "../../context/AuthContext";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";
import { useLocation, Link } from "react-router-dom";
import Header from "../common/Header/Header";
import useProductListingHooks from "./productListingHooks";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import { DropdownButton, ModalBody } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Actions } from "./productListingHooks.js";
import "./productListing.css";

const Listing = () => {
  const { state } = useLocation();
  const { user } = UserAuth();
  const {
    data,
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
    imageLink,
    handleImageLink,
    handleFileChange,
    editProductName,
    handleEditProductName,
    editProductPrice,
    handleEditProductPrice,
    editProductDescription,
    handleEditProductDescription,
    editImageLink,
    handleEditImageLink,
    showConfirmEditModal,
    handleCloseConfirmEditModal,
    handleShowConfirmEditModal,
    returnToEditModal,
    showConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
    editFile,
  } = useProductListingHooks(user);

  return (
    <PageTemplate>
      {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
      <ProductListingHeaderContainer>
        <Subheader>Products</Subheader>
        <SearchBox>
          <FaSearch />
          <input type="text" class="form-control ml-2" placeholder="Search" />
        </SearchBox>
        <AddButton onClick={handleShowAddProductModal}>Add</AddButton>
      </ProductListingHeaderContainer>
      <ProductListingPage>
        <ProductListingContainer>
          {data != null &&
            data.map((data) => (
              <ProductListingImgContainer>
                <ProductListingImgHeaderContainer>
                  <strong>{data.name}</strong>
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
                  src={data.imageLink[0]}
                  alt="product picture"
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
              class="close"
              onClick={handleCloseAddProductModal}
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
                <Form.Control
                  type="text"
                  autoFocus
                  value={productName}
                  onChange={handleProductName}
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
                  value={productPrice}
                  onChange={handleProductPrice}
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
                  value={productDescription}
                  onChange={handleProductDescription}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image</Form.Label>
                <input
                  className="ml-3"
                  id="uploadImage"
                  type="file"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={createNewProduct}>
              Add
            </Button>
          </Modal.Footer>
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
              class="close"
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
                  autoFocus
                  placeholder={productSelected != null && productSelected.name}
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
                  placeholder={productSelected != null && productSelected.price}
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
                  placeholder={
                    productSelected != null && productSelected.description
                  }
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
                <Form.Label>Image</Form.Label>
                <input
                  className="ml-3"
                  id="uploadImage"
                  type="file"
                  onChange={handleFileChange}
                />
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
                class="close"
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
                  <Form.Control type="text" value={editFile} disabled />
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

const ProductListingImgContainer = styled.div`
  flex-direction: column;
  margin-bottom: 3vh;
  margin-left: 1.4vw;
  margin-right: 1.4vw;
  justify-content: ;
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
  border-bottom: 1px solid #7a7a7a;
  padding-bottom: 2vh;
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
