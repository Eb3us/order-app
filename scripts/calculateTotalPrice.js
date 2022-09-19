export function calculateTotalPrice(ammount, food) {
  if (ammount % 2 == 0) {
    return (ammount / 2) * food.promo
  } else {
    if (ammount == 1) {
      return ammount * food.precio
    } else {
      const promoPrice = ((ammount - 1) / 2) * food.promo
      return promoPrice + food.precio
    }
  }
}
