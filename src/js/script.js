import * as bootstrap from 'bootstrap'

const button = document.getElementById('submit-button')
button.onclick = sendImg

function sendImg () {
  /* TODO:
  - make error no link (toast message from Bootstrap)
  */
  const imgUrl = document.getElementById('image-url').value
  console.log('imgUrl: ' + Boolean(imgUrl))

  if (!imgUrl) { // if there is no link
    throw new Error('No URL passed')
  } else if (imgUrl.match('^(ftp|http|https)://[^ "]+$')) {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'image-labeling1.p.rapidapi.com',
        'X-RapidAPI-Key': '' // paste here api key secretly
      },
      body: `{'url':'${imgUrl}'}`
    }

    fetch('https://image-labeling1.p.rapidapi.com/img/label', options) // getting response
      .then(response => response.json())
      .then(processResponse)
      .catch(err => console.error(err))
  }
}

function processResponse (response) {
  const imageInfoDiv = document.getElementById('image-info')
  const infoHeader = imageInfoDiv.children[0]

  console.log(response)

  while (imageInfoDiv.childNodes.length > 5) { // counted nodes by myself NOT SCALABLE!!!
    imageInfoDiv.removeChild(imageInfoDiv.lastChild)
  }
  infoHeader.textContent = 'Info'
  for (const label in response) { // enumerating (iterating through indexes)
    // take only two numbers after point into string
    const strmatch = response[label].toString().slice(2, 4)
    const labelPara = document.createElement('p')
    labelPara.textContent = label + ': ' + strmatch + '%'
    imageInfoDiv.appendChild(labelPara)
  }
}
