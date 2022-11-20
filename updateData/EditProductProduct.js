import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import BackButton from "../components/BackButton";
import { useFetchData } from "../components/HandleGlobalForm";

const EditProductPage = () => {
  const { id } = useParams();
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  const { handleFormSubmit, error, handleInputChange, product } = useFetchData(
    `/api/products/${id}`
  );

  // console.log("product name", product);

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [countInStock, setCountInStock] = useState(0);
  // const [category, setCategory] = useState("");
  // const [price, setPrice] = useState(0);

  // const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchData = async (id) => {
  //     try {
  //       const response = await fetch(`/api/products/${id}`);
  //       const product = await response.json();
  //       setName(product.name);
  //       setDescription(product.description);
  //       setCountInStock(product.countInStock);
  //       setCategory(product.category);
  //       setPrice(product.setPrice);
  //       console.log("edit product page: product", product);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   fetchData(params.id);
  // }, [params]);

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   const config = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${state.userInfo.token}`,
  //     },
  //     body: JSON.stringify({
  //       name,
  //       description,
  //       countInStock,
  //       category,
  //       price,
  //     }),
  //   };

  //   try {
  //     const response = await fetch(`/api/products/${params.id}`, config);
  //     if (response.status >= 400 && response.status < 600) {
  //       console.log(response);
  //       throw new Error(response.statusText);
  //     }
  //     const jsonData = await response.json();
  //     console.log("jsonData new product", jsonData);
  //     navigate("/profile");
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div className="EditProductPage">
      <BackButton />
      <h1>Edit Product Page</h1>
      <form onSubmit={handleFormSubmit}>
        {error && <h2>{error}</h2>}
        <div className="input-container">
          <label htmlFor="name">name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={product.name}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={product.description}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </div>
        <div className="input-container">
          <label htmlFor="countInStock">countInStock</label>
          <input
            id="countInStock"
            name="countInStock"
            type="number"
            value={product.countInStock}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </div>
        <div className="input-container">
          <label htmlFor="category">category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={product.category}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </div>
        <div className="input-container">
          <label htmlFor="price">price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={product.price}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </div>
        <button type="Submit">Edit</button>
      </form>
    </div>
  );
};

export default EditProductPage;
