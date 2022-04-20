// Here we will delete our image
function deleteImg(){
    window.location.reload();
}

function cutURL() { // this function should cut http:// part of url
    console.log("cutURL function");
}

function sendImg() {
    /*TODO:
	- make normal percents from float
	- make error no link (toast message from Bootstrap)
    */

    if (document.getElementById("basic-url").value) { // if there is a link
	const imageInfoDiv = document.getElementById("imageInfo");
	const infoHeader = imageInfoDiv.children[0];

	let imgUrl = document.getElementById("basic-url").value;
	console.log("Processed url: " + imgUrl);

	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Host': 'image-labeling1.p.rapidapi.com',
			'X-RapidAPI-Key': '1a8dcf20a0mshc5346be1d4720c5p1fb685jsnb29c9f6774e6' // paste here api key secretly
		},
		body: `{"url":"${imgUrl}"}`
	};

	/* currently there is an error here: POST 400 bad request
	 * when getting response the api server returns text with
	 * a message that states: Request image failed to download: failed to parse
	 * maybe it's that the server adds http:// string at the beginning
	 * that maybe is the cause
	 * Because server response with a text, there is complains with JSON
	 * syntax.
	 */
	console.log("Sending imgUrl and getting response...");
	fetch('https://image-labeling1.p.rapidapi.com/img/label', options) // getting response
	    .then(response => response.json()) // it must be response.json()
	    .then(response => {
		console.log(response);
		infoHeader.textContent = "Info";
		for (const label in response) { //enumerating (iterating through indexes)
		    let match = response[label];
		    let labelPara = document.createElement('p')
		    labelPara.textContent = label + " " + match;
		    imageInfoDiv.appendChild(labelPara);
		}
	    })
	    .catch(err => console.error(err));
    }
}
