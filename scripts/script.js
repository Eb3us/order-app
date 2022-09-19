import { foods } from "./foods.js"
import { createMainMenu } from "./createMainMenu.js"
import { crearPaginaDeProducto } from "./crearPaginaDeProducto.js"
import { loadCart } from "./cart.js"
import { createCartPage } from "./createCartPage.js"

const container = document.querySelector("#container")

function main() {
  loadCart()
  const barMenuBtn = document.querySelector("#menu-btn")
  const barCartBtn = document.querySelector("#cart-btn")
  createMainMenu(foods, crearPaginaDeProducto)
  barMenuBtn.addEventListener("click", () => {
    createMainMenu(foods, crearPaginaDeProducto)
  })
  barCartBtn.addEventListener("click", () => {
    createCartPage()
  })
  if (sessionStorage.getItem("totalAmmount")) {
    document.querySelector("#cart-counter").innerText =
      sessionStorage.getItem("totalAmmount")
  } else {
    document.querySelector("#cart-counter").style.display = "none"
  }
}

main()
