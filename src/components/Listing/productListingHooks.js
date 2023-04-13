import { useState, useEffect } from "react";
import {
  getAllProductsByEnterpriseIdUrl,
  createNewProductUrl,
  updateProductUrl,
  deleteProductUrl,
  getEnterpriseByFirebaseUid,
  deactivateProductUrl
} from "../../routes/routes";
import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export const Actions = {
  VIEW: "View",
  UPDATE: "Update",
  DELETE: "Delete",
};

const useProductListingHooks = () => {
  const { user } = UserAuth();
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productSelected, setCurrentProductSelected] = useState(null);
  const [refreshPage, setRefreshPage] = useState(false);
  const [currentEnterprise, setCurrentEnterprise] = useState(null);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);

  const handleShowAddProductModal = () => setShowAddProductModal(true);
  const handleShowEditProductModal = () => setShowEditProductModal(true);
  const handleCloseAddProductModal = () => setShowAddProductModal(false);
  const handleCloseEditProductModal = () => setShowEditProductModal(false);

  const [editProductName, setEditProductName] = useState("");
  const handleEditProductName = (name) => setEditProductName(name);
  const [editProductPrice, setEditProductPrice] = useState("");
  const handleEditProductPrice = (price) => setEditProductPrice(price);
  const [editProductDescription, setEditProductDescription] = useState("");
  const handleEditProductDescription = (desc) =>
    setEditProductDescription(desc);
  const [editFile, setEditFile] = useState([]);
  const [editProductCategory, setEditProductCategory] = useState("");
  const handleEditProductCategory = (category) =>
    setEditProductCategory(category);

  const [productPrice, setProductPrice] = useState("");
  const handleProductPrice = (e) => setProductPrice(e.target.value);
  const [productName, setProductName] = useState("");
  const handleProductName = (e) => setProductName(e.target.value);
  const [productDescription, setProductDescription] = useState("");
  const handleProductDescription = (e) => setProductDescription(e.target.value);
  const [productCategory, setProductCategory] = useState("CRAFTS");
  const handleProductCategory = (e) => setProductCategory(e.target.value);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files);
    let urls = [];
    let images = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
      setEditFile((prevFileName) => [...prevFileName, file.name]);
      urls.push(URL.createObjectURL(file));
      setShowImageUploadError(false);
    }
    console.log(selectedFiles);
  };

  const [showConfirmEditModal, setShowConfirmEditModal] = useState(false);
  const handleShowConfirmEditModal = () => {
    setShowConfirmEditModal(true);
    setShowEditProductModal(false);
  };
  const handleCloseConfirmEditModal = () => setShowConfirmEditModal(false);
  const returnToEditModal = () => {
    setShowConfirmEditModal(false);
    setShowEditProductModal(true);
  };

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const handleCloseConfirmDeleteModal = () => setShowConfirmDeleteModal(false);

  const navigate = useNavigate();
  const handleProductSelected = (product, action) => {
    setCurrentProductSelected(product);
    console.log(product);
    if (action == Actions.UPDATE) {
      setEditProductName(product.name);
      setEditProductPrice(product.price);
      setEditProductDescription(product.description);
      setEditProductCategory(product.category);
      //console.log(product.imageLink);
      setShowEditProductModal(true);
    } else if (action == Actions.DELETE) {
      setShowConfirmDeleteModal(true);
    } else {
      navigate("/view_listing", {
        state: {
          product: product,
          enterprise: currentEnterprise,
        },
      });
    }
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    createNewProduct(event);
  };

  useEffect(() => {
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setSelectedFiles([]);
    setEditFile("");
    setProductCategory("CRAFTS");
    setValidated(false);
    setShowImageUploadError(false);
    if (user != null) {
      axios
        .get(getEnterpriseByFirebaseUid + user.uid)
        .then((response) => {
          setCurrentEnterprise(response.data);
          return axios.get(
            getAllProductsByEnterpriseIdUrl + response.data.socialEnterpriseId
          );
        })
        .then((response) => {
          let data = response.data.filter((d) => d.isActive == true)
          setData(data);
          setDisplayData(data);
          console.log(response.data.socialEnterpriseId);
          console.log(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [refreshPage, loading, user]);

  const [showImageUploadError, setShowImageUploadError] = useState(false);

  const createNewProduct = async (e) => {
    if (user != null) {
      console.log(selectedFiles);
      console.log(currentEnterprise.socialEnterpriseId);
      e.preventDefault();
      const imagePromises = selectedFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
      });
      Promise.all(imagePromises).then((imageBase64s) => {
        const newProduct = {
          socialEnterpriseId: currentEnterprise.socialEnterpriseId,
          product: {
            name: productName,
            price: productPrice,
            description: productDescription,
            imageLink: imageBase64s,
            category: productCategory == "" ? "CRAFTS" : productCategory,
            numRatings:0,
            ratingScore:0,
            isActive:true
          },
        };

        if (selectedFiles.length == 0) {
          setShowImageUploadError(true);
          setShowAddProductModal(true);
        } else {
          axios
            .post(createNewProductUrl, newProduct)
            .then((response) => {
              setShowAddProductModal(false);
              console.log(response);
            })
            .catch((error) => console.log(error))
            .finally((res) => {
              setRefreshPage(!refreshPage);
            });
        }
      });
    } else {
      setShowAddProductModal(false);
    }
  };

  const updateProduct = async (e) => {
    if (user != null) {
      console.log(selectedFiles);
      console.log(productSelected.productId);
      e.preventDefault();
      const imagePromises = selectedFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
      });
      Promise.all(imagePromises).then((imageBase64s) => {
        const updatedProduct = {
          socialEnterpriseId: currentEnterprise.socialEnterpriseId,
          //socialEnterpriseFirebaseUid: socialEnterpriseFirebaseUid,
          product: {
            name: editProductName,
            price: editProductPrice,
            description: editProductDescription,
            imageLink: imageBase64s,
            category: editProductCategory,
            productId: productSelected.productId,
            isActive:true
          },
        };
        axios
          .put(updateProductUrl + productSelected.productId, updatedProduct)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => setError(error.response.data))
          .finally((res) => {
            setShowConfirmEditModal(false);
            setRefreshPage(!refreshPage);
          });
      });
      setEditProductName("");
      setEditProductPrice("");
      setEditProductDescription("");
      setSelectedFiles([]);
      setEditFile("");
      setEditProductCategory("");
    } else {
      setShowConfirmEditModal(false);
    }
  };

  /*const updateProduct = async () => {
    if (user != null) {
      //const socialEnterpriseId = 3;
      console.log(productSelected.productId);
      const updatedProduct = {
        socialEnterpriseId: currentEnterprise.socialEnterpriseId,
        //socialEnterpriseFirebaseUid: socialEnterpriseFirebaseUid,
        product: {
          name: editProductName,
          price: editProductPrice,
          description: editProductDescription,
          imageLink: editImageLink,
          productId: productSelected.productId,
        },
      };

      await axios
        .put(updateProductUrl + productSelected.productId, updatedProduct)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => setError(error.response.data))
        .finally((res) => {
          setShowConfirmEditModal(false);
          setRefreshPage(!refreshPage);
        });
    } else {
      //setShowEditProductModal(false);
      setShowConfirmEditModal(false);
    }
  };*/

  const [showErrorToast, setShowErrorToast] = useState(false)

  const deleteProduct = async () => {
    if (user != null) {
      const updatedProduct = {
        socialEnterpriseId: currentEnterprise.socialEnterpriseId,
      }

      axios
        .put(deactivateProductUrl + productSelected.productId, updatedProduct)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          setError(error.response.data)
          setShowErrorToast(true)
        })
        .finally((res) => {
          setShowConfirmDeleteModal(false);
          setRefreshPage(!refreshPage);
        });
    }
  };

  return {
    data,
    displayData,
    loading,
    error,
    productSelected,
    handleProductSelected,
    updateProduct,
    createNewProduct,
    deleteProduct,
    handleShowAddProductModal,
    handleShowEditProductModal,
    handleCloseAddProductModal,
    handleCloseEditProductModal,
    showAddProductModal,
    showEditProductModal,
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
    selectedFiles,
    editFile,
    validated,
    handleSubmit,
    selectedFiles,
    showImageUploadError,
    showErrorToast,
    setShowErrorToast
  };
};

export default useProductListingHooks;
