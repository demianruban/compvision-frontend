function sendImg() {

    if (dropArea.getElementsByTagName("img").length == 0) { // check if user loaded image
        const main = document.querySelectorAll("main")[0];
        // Create error text
        const para = document.createElement("p");
        const node = document.createTextNode("There is no image loaded!");
        para.setAttribute("class", "text-danger bg-dark text-center");
        para.appendChild(node);
        main.appendChild(para);

    }
//    const options = {
//	    method: 'POST',
//	    headers: {
//		    'content-type': 'application/json',
//		    'X-RapidAPI-Host': 'image-labeling1.p.rapidapi.com',
//		    'X-RapidAPI-Key': ''
//	    },
//	    body: '{"url":"./download.jpeg"}'
//    };
//
//    fetch('https://image-labeling1.p.rapidapi.com/img/label', options)
//	    .then(response => response.json())
//	    .then(response => console.log(response))
//	    .catch(err => console.error(err));
}

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});

function showFile() {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
            let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}