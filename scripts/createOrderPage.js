import { foods } from "./foods.js"

export function createOrderPage(cart) {
  container.innerHTML = ""

  const formWrapper = document
    .querySelector("[data-order-form-template")
    .content.cloneNode(true)
  const form = formWrapper.querySelector("#order-form")
  //cantidad de comidas
  cart.forEach(foodInCart => {
    if (foodInCart.ammount < 1) return
    const input = document.createElement("input")
    input.type = "hidden"
    foods.forEach(food => {
      if (foodInCart.id !== food.id) return
      input.name = food.name
    })
    input.value = foodInCart.ammount
    form.appendChild(input)
  })
  //total
  const totalInput = document.createElement("input")
  totalInput.type = "hidden"
  totalInput.name = "total"
  totalInput.value = sessionStorage.getItem("total")
  form.appendChild(totalInput)

  container.appendChild(formWrapper)

  const paymentDiv = document.querySelector("#payment-div")
  const deliveryDiv = document.querySelector("#delivery-div")
  const paymentCheckboxes = paymentDiv.querySelectorAll(".hidden-checkbox")
  const allInputs = Array.from(
    form.querySelectorAll("input:not([type=hidden])")
  )
  const paymentLabels = paymentDiv.querySelectorAll(".h-cb-label")
  const deliveryCheckboxes = deliveryDiv.querySelectorAll(".hidden-checkbox")
  const deliveryLabels = deliveryDiv.querySelectorAll(".h-cb-label")

  selectLabel(paymentCheckboxes, paymentLabels)
  selectLabel(deliveryCheckboxes, deliveryLabels)
  allInputs.forEach(input => {
    customValidity(input)
  })

  function selectLabel(inputArray, labelArray) {
    inputArray.forEach(input => {
      input.addEventListener("change", () => {
        if (!input.checked) return
        labelArray.forEach(label => {
          if (label.htmlFor == input.id) {
            label.classList.add("selected")
          } else {
            label.classList.remove("selected")
          }
        })
      })
    })
  }
  function customValidity(input) {
    input.addEventListener("input", () => {
      input.setCustomValidity("")
    })

    input.addEventListener("invalid", () => {
      if (input.type === "tel" && input.value !== "") {
        input.setCustomValidity("Ingrese un numero de telefono valido")
      } else {
        const errorAlert = input.parentNode.querySelector(".input-error")
          ? input.parentNode.querySelector(".input-error")
          : input.parentNode.parentNode.querySelector(".input-error")
        errorAlert.style.display = "block"
      }
    })
  }
  const submitButton = form.querySelector("button")
  submitButton.addEventListener("click", () => {
    const errorMessages = form.querySelectorAll(".input-error")
    errorMessages.forEach(message => {
      message.style.display = "none"
    })
  })
}
