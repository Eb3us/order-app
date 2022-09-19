import { calculateTotalPrice } from "./calculateTotalPrice.js"
import { getDateOfOrder } from "./getDateOfOrder.js"
import { addToCart } from "./cart.js"

export const getImage = food => {
  const img = document.createElement("img")
  img.src = food.img
  img.classList.add("food-image")
  return img
}

export const getSubTitles = food => {
  const foodKeys = Object.keys(food)
  const subTitlesDiv = document.createElement("div")
  subTitlesDiv.classList.add("subtitles-div")
  foodKeys.forEach(key => {
    if (key.includes("sub-titulo")) {
      const sub = document.createElement("h2")
      sub.innerHTML = food[key]
      sub.classList.add("sub-titulo")
      subTitlesDiv.appendChild(sub)
    }
  })
  return subTitlesDiv
}

export const getDescription = food => {
  const descriptionDiv = document.createElement("div")
  descriptionDiv.classList.add("description-div")
  food.desc.forEach(p => {
    const paragraph = document.createElement("p")
    paragraph.innerHTML = p
    paragraph.classList.add("description")
    descriptionDiv.appendChild(paragraph)
  })
  return descriptionDiv
}

export const getPrice = food => {
  const precio = document.createElement("p")
  precio.innerHTML = `$${food.precio}`
  precio.classList.add("precio")
  return precio
}
export const getPromo = food => {
  const promo = document.createElement("p")
  promo.innerHTML = `2 x ${food.promo}`
  promo.classList.add("promo")
  return promo
}
export const getTotalYContador = food => {
  // create elements
  const quantityMotherDiv = document.createElement("div")
  const totalPriceContainer = document.createElement("div")
  const totalTitle = document.createElement("p")
  const totalPrice = document.createElement("div")
  const plusMinusDiv = document.createElement("div")
  const minus = document.createElement("div")
  const ammount = document.createElement("input")
  const plus = document.createElement("div")
  // add classes
  quantityMotherDiv.classList.add("quantity-mother-div")
  totalPriceContainer.classList.add("total-price-container")
  totalTitle.classList.add("total-title")
  totalPrice.classList.add("total-price")
  plusMinusDiv.classList.add("plus-minus")
  minus.classList.add("minus")
  ammount.classList.add("ammount")
  plus.classList.add("plus")
  // add text and attributes
  totalTitle.innerHTML = "TOTAL"
  totalPrice.innerHTML = "$ 0"
  minus.innerHTML = "-"
  ammount.readOnly = true
  ammount.value = 0
  plus.innerHTML = "+"
  // append childs to containers
  totalPriceContainer.append(totalTitle, totalPrice)
  plusMinusDiv.append(minus, ammount, plus)
  quantityMotherDiv.append(totalPriceContainer, plusMinusDiv)
  // eventos
  plus.addEventListener("click", () => {
    if (ammount.value > 89) return
    ammount.value++
    totalPrice.innerHTML = `$ ${calculateTotalPrice(ammount.value, food)}`
  })
  minus.addEventListener("click", () => {
    if (ammount.value < 1) return
    ammount.value--
    totalPrice.innerHTML = `$ ${calculateTotalPrice(ammount.value, food)}`
  })
  // return
  return quantityMotherDiv
}

export const getOrderButton = food => {
  const cartBtn = document.createElement("button")
  cartBtn.innerHTML = "Agregar al pedido"
  cartBtn.classList.add("cart-btn")
  cartBtn.addEventListener("click", () => {
    addToCart(
      food,
      +document.querySelector(".ammount").value,
      +document.querySelector(".total-price").innerText.replace(/\D/g, "")
    )
  })
  return cartBtn
}

export const getOrderDay = food => {
  const diaDePedidoTexto = document.createElement("p")
  diaDePedidoTexto.classList.add("dia-de-pedido")
  if (food.dia != "viernes" && food.dia != "sabado") {
    diaDePedidoTexto.innerText = `Se anotará su pedido para el proximo ${food.dia}`
  } else {
    const fechaDePedido = getDateOfOrder(food)
    diaDePedidoTexto.innerText = `Se tomará su pedido para el ${food.dia} ${fechaDePedido}`
  }
  return diaDePedidoTexto
}
