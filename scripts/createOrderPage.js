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
  totalFinal()

  // funccion que se ocupa de la selección de los botones y los eventos que disparan
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
        if (input.id == "envio") {
          document.querySelector(".costo-envio").style.display = "block"
          sessionStorage.setItem("envio", 100)
          totalFinal()
        } else if (input.id == "buscar") {
          document.querySelector(".costo-envio").style.display = "none"
          sessionStorage.removeItem("envio")
          totalFinal()
        }

        if (input.id == "efectivo") {
          totalFinal()
          document.querySelector(".pago-justo").style.display = "block"
        } else if (input.id == "transferencia") {
          document.querySelector(".pago-justo").style.display = "none"
          const money = document.querySelector("#pago-justo")
          money.value = 0
          money.min = 0
        }
      })
    })
  }
  //Funcción que se ocupa de los mensajes de error
  //en caso de no llenar algun campo del formulario

  function customValidity(input) {
    input.addEventListener("input", () => {
      input.setCustomValidity("")
    })

    input.addEventListener("invalid", () => {
      const errorAlert = input.parentNode.querySelector(".input-error")
        ? input.parentNode.querySelector(".input-error")
        : input.parentNode.parentNode.querySelector(".input-error")

      if (input.type === "tel" && input.value !== "") {
        input.setCustomValidity("Ingrese un numero de telefono valido")
      } else if (input.id === "pago-justo") {
        errorAlert.innerText = parseInt(input.value)
          ? "El pago debe ser igual o mayor al total del pedido"
          : "Debe ingresar el monto con el que va a abonar"
        errorAlert.style.display = "block"
      } else {
        if (errorAlert.style.display == "none") {
          errorAlert.style.display = "block"
        }
      }
    })
  }

  //crear el boton de submit y escuc
  const submitButton = form.querySelector("button")
  submitButton.addEventListener("click", () => {
    const errorMessages = form.querySelectorAll(".input-error")
    errorMessages.forEach(message => {
      message.style.display = "none"
    })
  })
}

//funcción que calcula el total y crea los elementos para mostrarlo
function totalFinal() {
  const money = document.querySelector("#pago-justo")
  const totalDiv = document.querySelector("#pj-total")
  const envio = document.createElement("p")
  const envioInt = sessionStorage.getItem("envio")
    ? parseInt(sessionStorage.getItem("envio"))
    : 0
  const subTotal = document.createElement("p")
  const subTotalInt = parseInt(sessionStorage.getItem("total"))
  const totalFinal = document.createElement("p")
  const totalFinalInt = envioInt + subTotalInt
  totalDiv.innerHTML = ""
  envio.innerText = `Envío: ${envioInt}`
  subTotal.innerText = `Sub-Total: ${subTotalInt}`
  totalFinal.innerText = `Total: ${totalFinalInt}`
  totalDiv.append(subTotal, envio, totalFinal)
  money.min = totalFinalInt
}
