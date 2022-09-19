const container = document.querySelector("#container")

export function createMainMenu(foods, productFunc) {
  container.innerHTML = ""
  const mainTitle = document.createElement("h1")
  mainTitle.classList.add("menu-title")
  mainTitle.innerText = "MENU"
  container.appendChild(mainTitle)
  foods.forEach(food => {
    const div = document.createElement("div")
    div.classList.add("btn")
    div.style.backgroundImage = `url(${food.img})`

    const title = document.createElement("p")
    title.classList.add("btnTitle")
    title.innerHTML = food.name
    div.appendChild(title)
    container.appendChild(div)
    div.addEventListener("click", () => {
      productFunc(food.id, food.name)
    })
  })
}
