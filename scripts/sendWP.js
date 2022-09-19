export async function sendWP() {
  const url = "https://graph.facebook.com/v14.0/107221875447240/messages"
  const MESSAGE_CONTENT = "este mensaje lo escribi yo para probar esto"
  let data = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "543512866770",
    "type": "text",
    "text": {
      // the text object
      "preview_url": false,
      "body": MESSAGE_CONTENT,
    },
  }
  fetch(url, {
    body: JSON.stringify(data),
    headers: {
      "Authorization":
        "Bearer EAAFbgHSfe5oBADPhZC1ZBTOb8cVjRcqpw48bHWHqMSKMCF2gf4rZBiPhkC2GAZCJeH0dZA490TZBPzLqEZAzzlitJWYyd7triwJ9RIL7Tm7308TfPZBqFxGs1ZBhjuOFawPZA6ZA0ZCIvMXu1JZBqHsVEO1p7qw8THfT40F3OyNFzpVCLtJJaAJVyehYysRZA6GNJRSKmCZAUQv92cvmgZDZD",
      "content-type": "application/json",
    },
    method: "POST",
    redirect: "follow",
  })
    .then(response => {
      if (response.status === 200) {
        console.log(response.text())
      } else {
        throw new Error("Something went wrong on api server!")
      }
    })
    .catch(error => {
      console.error(error)
    })
}
