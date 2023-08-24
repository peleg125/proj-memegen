"use strict"

function renderGallery() {
	var gallery = document.getElementById("gallery")
	// const imgStr
	// const images = getImages()
	// images.map((image, index) => )

	gallery.innerHTML =
		'<img src="img/1.jpg" class="gallery-image" onclick="onImgSelect(1)"><img src="img/2.jpg"  class="gallery-image" onclick="onImgSelect(2)">'
}
