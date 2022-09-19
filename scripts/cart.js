import { calculateTotalPrice } from "./calculateTotalPrice.js"
import { getDateOfOrder } from "./getDateOfOrder.js"
import { createCartBox } from "./createCartBox.js"

let cart = [
  {
    "id": 1,
    "ammount": 0,
    "total": 0,
    "date": "",
  },
  {
    "id": 2,
    "ammount": 0,
    "total": 0,
    "date": "",
  },
  {
    "id": 3,
    "ammount": 0,
    "total": 0,
    "date": "",
  },
  {
    "id": 4,
    "ammount": 0,
    "total": 0,
    "date": "",
  },
]

let total = 0

export function addToCart(food, ammount, totalPrice) {
  cart.forEach(foodInCart => {
    if (food.id !== foodInCart.id) return
    foodInCart.ammount += ammount
    foodInCart.total = calculateTotalPrice(foodInCart.ammount, food)
    foodInCart.date = getDateOfOrder(food)
  })
  total = addTotal()
  saveCart()
  createCartBox(
    "item-add-alert",
    closeButtonFunction,
    food,
    ammount,
    totalPrice
  )
  const boxes = document.querySelectorAll(".item-add-alert")

  boxes.forEach(box => {
    box.addEventListener("click", () => {
      box.style.display = "none"
    })
    setTimeout(() => {
      box.style.display = "none"
    }, 5000)
  })

  saveTotalAmmount()
  document.querySelector("#cart-counter").innerText =
    sessionStorage.getItem("totalAmmount")
  document.querySelector("#cart-counter").style.display = "flex"
}

function addTotal() {
  let subTotal = 0
  cart.forEach(foodInCart => {
    subTotal += foodInCart.total
  })
  return subTotal
}

function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart))
  sessionStorage.setItem("total", total)
}

export function loadCart() {
  if (sessionStorage.getItem("cart")) {
    const tempCart = sessionStorage.getItem("cart")
    cart = JSON.parse(tempCart)
  }
  if (sessionStorage.getItem("total")) {
    total = sessionStorage.getItem("total")
  }
}

export function exportCart() {
  return cart
}

export function removeFromCart(foodId) {
  cart.forEach(foodInCart => {
    if (foodId !== foodInCart.id) return
    foodInCart.ammount = 0
    foodInCart.total = 0
    total = addTotal()
    saveCart()
    saveTotalAmmount()
    document.querySelector("#cart-counter").innerText =
      sessionStorage.getItem("totalAmmount")
    if (sessionStorage.getItem("totalAmmount") < 1) {
      document.querySelector("#cart-counter").style.display = "none"
    }
  })
}

function closeButtonFunction(param1, parma2) {}

function saveTotalAmmount() {
  function getQuantity() {
    let totalQuantity = 0
    cart.forEach(foodInCart => {
      totalQuantity += foodInCart.ammount
    })
    return totalQuantity
  }
  const quantity = getQuantity()
  sessionStorage.setItem("totalAmmount", `${quantity}`)
}
