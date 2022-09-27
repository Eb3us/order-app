import { exportCart } from "./cart.js"
import { removeFromCart } from "./cart.js"
import { createCartBox } from "./createCartBox.js"
import { createOrderPage } from "./createOrderPage.js"

export function createCartPage() {
  container.innerHTML = ""
  const cart = exportCart()
  const cartTitle = document.createElement("h1")
  cartTitle.classList.add("cart-title")
  cartTitle.innerText = "Mi Pedido"
  container.appendChild(cartTitle)
  cart.forEach(foodInCart => {
    if (foodInCart.ammount < 1) return
    createCartBox(
      "cart-food-wrapper",
      closeButtonRebuildCart,
      foodInCart,
      foodInCart.ammount,
      foodInCart.total
    )
  })
  const totalPriceDiv = document.createElement("div")
  const totalPrice = sessionStorage.getItem("total")
  const orderBtn = document.createElement("button")

  totalPriceDiv.classList.add("cart-total-price")
  orderBtn.classList.add("cart-order-btn")

  totalPriceDiv.innerText = totalPrice ? `TOTAL: $${totalPrice}` : "TOTAL: $0"
  orderBtn.innerText = "Confirmar pedido"
  orderBtn.addEventListener("click", () => {
    if (sessionStorage.getItem("totalAmmount") < 1) {
      console.log("no items")
    } else {
      createOrderPage(cart)
    }
  })

  container.appendChild(totalPriceDiv)
  container.appendChild(orderBtn)
}

function closeButtonRebuildCart(closeBtn, food) {
  closeBtn.addEventListener("click", () => {
    removeFromCart(food.id)
    createCartPage()
  })
}

function crearAlertaNoHayProductos() {
  const box = document.createElement("div")
  box.innerHTML = "<p>No ha selecciondo ningun producto</p>"
}
crearAlertaNoHayProductos()
