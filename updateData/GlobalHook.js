import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export const useFetchData = (url) => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    countInStock: "",
    category: "",
    price: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const product = await response.json();
        setProduct(product);

        console.log("edit product page: product", product);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [url]);

  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.userInfo.token}`,
      },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        countInStock: product.countInStock,
        category: product.category,
        price: product.price,
      }),
    };

    try {
      const response = await fetch(url, config);
      if (response.status >= 400 && response.status < 600) {
        console.log(response);
        throw new Error(response.statusText);
      }
      const jsonData = await response.json();
      console.log("jsonData new product", jsonData);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    handleFormSubmit,
    error,
    handleInputChange,
    product,
  };
};
