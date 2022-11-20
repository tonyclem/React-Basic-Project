import React from "react";
import BackButton from "../components/BackButton";
import useFetch from "../customHooks/useFetch";

const Carousel = () => {
  const { product, setProduct, loading, error, fetchData } = useFetch(
    "/api/products",
    "POST"
  );
  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="NewProductPage">
      <BackButton />
      <h1>Add New Carousel To Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      >
        {loading && <h2>Processing...</h2>}
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
        <div className="input-container">
          <label htmlFor="carousel">carousel</label>
          <select name="carousel" onChange={handleInputChange}>
            <option value={product.carousel}>null</option>
            <option value={product.carousel}>true</option>
            <option value={product.carousel}>false</option>
          </select>
        </div>
        <button type="Submit">Create</button>
      </form>
    </div>
  );
};

export default Carousel;
