import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const Slide = (props) => {
    return (
      <>
        {props.image?.images?.slice(0, 1).map((element, index) => {
          let sliceImage = element.slice(15);
          return (
            <img
              src={sliceImage}
              alt='images'
              width='300'
              height='200'
              key={index}
            />
          );
        })}
      </>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products/topProducts');
        const sliceImages = data.slice(0, 5);
        setProducts(sliceImages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interValid = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev + 1 === products.length ? 0 : prev + 1;
      });
    }, 3000);
    return () => {
      clearInterval(interValid);
    };
  });

  return (
    <div>
      <Slide image={products[currentIndex]} />
      <div className='slideshowDots'>
        {products.map((_, index) => (
          <div
            key={index}
            className={`slideshowDot${currentIndex === index ? ' active' : ''}`}
            onClick={() => {
              setCurrentIndex(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
