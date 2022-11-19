import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";

const EditProduct = () => {
  const { state } = useContext(UserContext);
  const params = useParams();

  const [editProduct, setEditProduct] = useState({
    name: "",
    description: "",
    category: "",
    countInStock: "",
    price: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const requestDb = await fetch(`/api/products/${params.id}`);
      const responseDb = await requestDb.json();
      console.log("Data Response", responseDb);
      setEditProduct(responseDb);
    };
    fetchData();
  }, [params]);

  const handleEditProduct = (e) => {
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.userInfo.token}`,
      },
      body: JSON.stringify({
        name: editProduct.name,
        description: editProduct.description,
        countInStock: editProduct.countInStock,
        category: editProduct.category,
        price: editProduct.price,
      }),
    };
    console.log("config", config);
    try {
      console.log("try block");
      const res = await fetch(`/api/products/${params.id}`, config);
      const response = await res.json();
      console.log("resp data", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Edit Product</h1>

      <form onSubmit={handleProductUpdate}>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={editProduct.category}
          onChange={(e) => handleEditProduct(e)}
        />
        <br />
        <label>Count:</label>
        <input
          type="number"
          name="number"
          value={editProduct.countInStock}
          onChange={(e) => handleEditProduct(e)}
        />
        <br />
        <label>description:</label>
        <input
          type="text"
          name="description"
          value={editProduct.description}
          onChange={(e) => handleEditProduct(e)}
        />
        <br />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={editProduct.name}
          onChange={(e) => handleEditProduct(e)}
        />
        <br />
        <label>price:</label>
        <input
          type="number"
          name="price"
          value={editProduct.price}
          onChange={(e) => handleEditProduct(e)}
        />
        <br />
        <img
          src={editProduct.image}
          alt=""
          style={{ width: "100px", height: "80px" }}
        />
        <br />
        <button type="Submit">Summit</button>
      </form>
    </>
  );
};

export default EditProduct;
