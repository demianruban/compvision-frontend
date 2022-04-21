function sendImg() {
    /*TODO:
	- make error no link (toast message from Bootstrap)
    */
    let imgUrl = document.getElementById("basic-url").value;

    if (!imgUrl) { // if there is no link
	console.log("No URL passed");
    } else if (imgUrl.match('^(ftp|http|https):\/\/[^ "]+$')) {
	console.log("URL matched");
	const imageInfoDiv = document.getElementById("imageInfo");
	const infoHeader = imageInfoDiv.children[0];

	let imgUrl = document.getElementById("basic-url").value;
	console.log("Processed url: " + imgUrl);

	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Host': 'image-labeling1.p.rapidapi.com',
			'X-RapidAPI-Key': '' // paste here api key secretly
		},
		body: `{"url":"${imgUrl}"}`
	};

	console.log("Sending imgUrl and getting response...");
	fetch('https://image-labeling1.p.rapidapi.com/img/label', options) // getting response
	    .then(response => response.json())
	    .then(response => {
		while (imageInfoDiv.childNodes.length > 5) {
		    imageInfoDiv.removeChild(imageInfoDiv.lastChild);
		}
		console.log(response);
		infoHeader.textContent = "Info";
		for (const label in response) { //enumerating (iterating through indexes)
		    let match = response[label];
		    // take only two numbers after point into string
		    let strmatch = match.toString().slice(2, 4);
		    let labelPara = document.createElement('p')
		    labelPara.textContent = label + ": " + strmatch + "%";
		    imageInfoDiv.appendChild(labelPara);
		}
	    })
	    .catch(err => console.error(err));
    }
}
