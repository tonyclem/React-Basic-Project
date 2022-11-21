<div className="input-container">
  <label htmlFor="carousel">categories</label>
  <select
    name="categories"
    value={product.categories}
    onChange={handleInputChange}
  >
    <option disabled selected>
      choose
    </option>
    <option>true</option>
    <option>false</option>
  </select>
</div>;

<div className="input-container">
  <label htmlFor="carousel">carousel</label>
  <select name="carousel" value={product.carousel} onChange={handleInputChange}>
    <option disabled selected>
      choose
    </option>
    <option>true</option>
    <option>false</option>
  </select>
</div>;
