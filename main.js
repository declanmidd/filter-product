const data = [
  {
    id: 1,
    name: "Fossil Gen",
    image: "./img/gen-watch.jpeg",
    price: 20,
    cate: "casual",
  },
  {
    id: 2,
    name: "shoe",
    image: "./img/shoe.jpeg",
    price: 30,
    cate: "sport",
  },
  {
    id: 3,
    name: "Apple watch limited",
    image: "./img/apple.jpg",
    price: 60,
    cate: "casual",
  },
  {
    id: 4,
    name: "gshock limited ",
    image: "./img/gshock.jpg",
    price: 100,
    cate: "sport",
  },
];

const productContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search-input");
const categoriesContainer = document.querySelector(".categories");
const price = document.querySelector(".price-range");
const priceValue = document.querySelector(".price-value");

const showProducts = (filterProducts) => {
  productContainer.innerHTML = filterProducts
    .map(
      (product) => `
  <div class="product">
      <img src=${product.image} />
      <span class="name">${product.name}</span>
      <span class="product-price">$${product.price}</span>
  </div>
`
    )
    .join("");
};

showProducts(data);

searchInput.addEventListener("keyup", (e) => {
  //   console.log(e.target.value);

  const value = e.target.value.toLowerCase();
  //   console.log(value);

  if (value) {
    showProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    showProducts(data);
  }
});

const setCategories = () => {
  const allCates = data.map((item) => item.cate);
  const categories = [
    "All",
    ...allCates.filter((item, i) => {
      return allCates.indexOf(item) === i;
    }),
  ];
  categoriesContainer.innerHTML = categories
    .map(
      (cate) => `
    <span class="cate">${cate}</span>
  `
    )
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    const selectedCategory = e.target.textContent;

    if (selectedCategory === "All") {
      showProducts(data);
    } else {
      showProducts(data.filter((item) => item.cate === selectedCategory));
    }
  });
};

const setPrice = () => {
  const priceList = data.filter((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  price.min = minPrice;
  price.max = maxPrice;
  price.value = maxPrice;

  priceValue.textContent = "$" + maxPrice;

  price.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    showProducts(data.filter((item) => item.price <= e.target.value));
  });
};

setCategories();
setPrice();
