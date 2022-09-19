import { foods } from "./foods.js"

export function createCartBox(
  wrapperClass,
  closeButtonFunction,
  foodInCart,
  quantity,
  price
) {
  const foodWrapper = document.createElement("div")
  const imgWrapper = document.createElement("div")
  const textWrapper = document.createElement("div")
  const quantityPriceWrapper = document.createElement("div")
  const nameCloseWrapper = document.createElement("div")
  const nameWrapper = document.createElement("div")
  const closeWrapper = document.createElement("div")
  const quantityWrapper = document.createElement("div")
  const priceWrapper = document.createElement("div")
  const closeBtn = document.createElement("p")

  foodWrapper.classList.add(wrapperClass)
  imgWrapper.classList.add("cart-img-wrapper")
  textWrapper.classList.add("cart-text-wrapper")
  quantityPriceWrapper.classList.add("cart-quantity-price-wrapper")
  nameCloseWrapper.classList.add("cart-name-close-wrapper")
  nameWrapper.classList.add("cart-name-wrapper")
  closeWrapper.classList.add("cart-close-wrapper")
  quantityWrapper.classList.add("cart-quantity-wrapper")
  priceWrapper.classList.add("cart-price-wrapper")
  closeBtn.classList.add("cart-close-btn")

  closeWrapper.appendChild(closeBtn)
  nameCloseWrapper.append(nameWrapper, closeWrapper)
  quantityPriceWrapper.append(quantityWrapper, priceWrapper)
  textWrapper.append(nameCloseWrapper, quantityPriceWrapper)
  foodWrapper.append(imgWrapper, textWrapper)
  container.appendChild(foodWrapper)

  let imgUrl

  foods.forEach(food => {
    if (foodInCart.id !== food.id) return
    imgUrl = food.img
    // nameWrapper.innerHTML = `<p class="cart-food-name">${food.name}</p>`
    nameWrapper.innerText = food.name
  })

  imgWrapper.style.backgroundImage = `url(${imgUrl})`
  imgWrapper.style.backgroundSize = "cover"
  imgWrapper.style.backgroundPosition = "center"

  closeBtn.innerText = `x`
  quantityWrapper.innerText = `Cantidad: ${quantity}`
  priceWrapper.innerText = `$ ${price}`
  closeButtonFunction(closeBtn, foodInCart)
}
