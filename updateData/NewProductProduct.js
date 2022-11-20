import React from "react";
import BackButton from "../components/BackButton";
import { useFetchData } from "../components/HandleGlobalForm";

const NewProductPage = () => {
  const { handleFormSubmit, handleInputChange, product, error } =
    useFetchData("/api/products");

  return (
    <div className="NewProductPage">
      <BackButton />
      <h1>New Product Page</h1>
      <form onSubmit={handleFormSubmit}>
        {error && <h2>{error}</h2>}
        <div className="input-container">
          <label htmlFor="name">name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="countInStock">countInStock</label>
          <input
            id="countInStock"
            name="countInStock"
            type="number"
            value={product.countInStock}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="category">category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={product.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="price">price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="Submit">Create</button>
      </form>
    </div>
  );
};

export default NewProductPage;
