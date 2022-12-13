const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Product.find().distinct('category');
  if (categories) {
    res.json(categories);
  } else {
    res.status(404);
    throw new Error('there is no such category found');
  }
});

// get top product categories
const getTopProducts = asyncHandler(async (req, res) => {
  const showTopProduct = await Product.find({ topProduct: { $eq: true } });
  if (showTopProduct) {
    res.json(showTopProduct);
  } else {
    res.status(404);
    throw new Error('Please select carousel item');
  }
});
