export function getDateOfOrder(comida) {
  const diaDePedido = comida.dia
  const dayArr = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ]
  const diaDePedidoId = dayArr.indexOf(diaDePedido)
  const now = new Date()
  const day = now.getDay()
  const date = now.getDate()
  const diff = diaDePedidoId - day
  const dateOfOrder = date + diff
  return dateOfOrder
}
