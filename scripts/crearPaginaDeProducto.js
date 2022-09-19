import { foods } from "./foods.js"
import {
  getDescription,
  getImage,
  getOrderButton,
  getOrderDay,
  getPrice,
  getPromo,
  getSubTitles,
  getTotalYContador,
} from "./foodElements.js"

export function crearPaginaDeProducto(foodId, menuKey) {
  //Agregar Titulo
  container.innerHTML = `<h1 class="menu-food">${menuKey}</h1>`

  foods.forEach(food => {
    if (foodId !== food.id) return
    //imagen
    const image = getImage(food)
    const subtitles = getSubTitles(food)
    const description = getDescription(food)
    const price = getPrice(food)
    const promo = getPromo(food)
    const counter = getTotalYContador(food)
    const btn = getOrderButton(food)
    const orderDay = getOrderDay(food)

    container.append(
      image,
      subtitles,
      description,
      price,
      promo,
      counter,
      btn,
      orderDay
    )
  })
}
