// Your global variables
var gImgs = [
	{ id: 1, url: "img/1.jpg", keywords: ["funny", "cat"] },
	{ id: 2, url: "img/2.jpg", keywords: ["funny"] },
	{ id: 3, url: "img/3.jpg", keywords: ["cat"] },
	{ id: 4, url: "img/4.jpg", keywords: ["cat"] },
	{ id: 5, url: "img/5.jpg", keywords: ["cat"] },
	{ id: 6, url: "img/6.jpg", keywords: ["cat"] },
	{ id: 7, url: "img/7.jpg", keywords: ["cat"] },
	{ id: 8, url: "img/8.jpg", keywords: ["cat"] },
	{ id: 9, url: "img/9.jpg", keywords: ["cat"] },
	{ id: 10, url: "img/10.jpg", keywords: ["cat"] },
	{ id: 11, url: "img/11.jpg", keywords: ["cat"] },
]
var gMeme = {
	selectedImgId: null,
	selectedLineIdx: null,
	lines: [],
}
let isDragging = false
let dragStartX, dragStartY
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gElCanvas
var gCtx

function getMeme() {
	return gMeme
}
function getImages() {
	return gImgs
}
function setLineTxt(newText) {
	gMeme.lines[gMeme.selectedLineIdx].txt = newText
}

function addLine() {
	gMeme.lines.push({
		txt: "New line",
		size: 20,
		color: "black",
		x: 50,
		y: 150,
		width: 0,
		height: 20,
	})
}

function switchLine() {
	gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
}

function setSelectedLine(x, y) {
	for (var i = 0; i < gMeme.lines.length; i++) {
		var line = gMeme.lines[i]
		if (
			x >= line.x &&
			x <= line.x + line.width &&
			y >= line.y - line.height &&
			y <= line.y
		) {
			gMeme.selectedLineIdx = i
			return
		}
	}
}

function onDeleteLine() {
	if (gMeme.selectedLineIdx !== null) {
		gMeme.lines.splice(gMeme.selectedLineIdx, 1)
		gMeme.selectedLineIdx = null
		renderCanvas()
	}
}

function onDownloadImage() {
	const canvasData = gElCanvas.toDataURL("image/png")

	const downloadLink = document.createElement("a")
	downloadLink.href = canvasData
	downloadLink.download = "meme.png"

	document.body.appendChild(downloadLink)
	downloadLink.click()
	document.body.removeChild(downloadLink)
}

function drawText() {
	gMeme.lines.forEach((line, idx) => {
		gCtx.font = `${line.size}px ${line.bold ? "bold " : ""}Arial`
		gCtx.fillStyle = line.color
		gCtx.textAlign = line.align

		gCtx.fillText(line.txt, line.x, line.y)

		if (gMeme.selectedLineIdx === idx) {
			gCtx.lineWidth = 2 //
			gCtx.strokeStyle = "red"
			gCtx.strokeRect(
				line.x - 5,
				line.y - line.size,
				gCtx.measureText(line.txt).width + 10,
				line.size + 10
			)
		}
	})
}

function getRandomXPosition() {
	return Math.random() * gElCanvas.width
}

function getRandomYPosition() {
	return Math.random() * gElCanvas.height
}

function renderCanvas() {
	gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

	if (gMeme.selectedImgId) {
		renderSelectedImage(gMeme.selectedImgId)
	}
}
function setColor(color) {
	if (gMeme.selectedLineIdx !== null && gMeme.lines[gMeme.selectedLineIdx]) {
		gMeme.lines[gMeme.selectedLineIdx].color = color
		renderCanvas()
	}
}

function decreaseFontSize() {
	if (gMeme.selectedLineIdx !== null && gMeme.lines[gMeme.selectedLineIdx]) {
		gMeme.lines[gMeme.selectedLineIdx].size -= 5
		renderCanvas()
	}
}

function imgSelect(imgId) {
	gMeme.selectedImgId = imgId
	renderMeme()
}

function increaseFontSize() {
	if (gMeme.selectedLineIdx !== null && gMeme.lines[gMeme.selectedLineIdx]) {
		gMeme.lines[gMeme.selectedLineIdx].size += 5
		renderCanvas()
	}
}
function textAlign(align) {
	if (gMeme.selectedLineIdx !== null && gMeme.lines[gMeme.selectedLineIdx]) {
		gMeme.lines[gMeme.selectedLineIdx].align = align
		renderCanvas()
	}
}

function lineTextInput(text) {
	if (gMeme.selectedLineIdx !== null && gMeme.lines[gMeme.selectedLineIdx]) {
		gMeme.lines[gMeme.selectedLineIdx].txt = text
		renderCanvas()
	}
}

function changeFont() {
	if (gMeme.selectedLineIdx !== null && gMeme.lines[gMeme.selectedLineIdx]) {
		const fonts = [
			"Arial",
			"Verdana",
			"Times New Roman",
			"Courier New",
			"Impact",
		]
		const currentFont = gMeme.lines[gMeme.selectedLineIdx].font || "Arial"
		const currentIndex = fonts.indexOf(currentFont)
		const nextIndex = (currentIndex + 1) % fonts.length
		gMeme.lines[gMeme.selectedLineIdx].font = fonts[nextIndex]
		renderCanvas()
	}
}

function getClickedLineIdx(x, y) {
	for (let i = gMeme.lines.length - 1; i >= 0; i--) {
		const line = gMeme.lines[i]
		gCtx.font = `${line.size}px Arial`
		const textWidth = gCtx.measureText(line.txt).width

		const startX = line.x - textWidth / 2
		const endX = line.x + textWidth / 2
		const startY = line.y - line.size
		const endY = line.y

		if (x >= startX && x <= endX && y >= startY && y <= endY) {
			return i
		}
	}
	return -1
}

function editLine(lineIdx) {
	gMeme.selectedLineIdx = lineIdx
	renderCanvas()
}

function addSticker(emoji) {
	const newLine = {
		txt: emoji,
		size: 40,
		color: "#ffffff",
		x: getRandomXPosition(),
		y: getRandomYPosition(),
	}

	gMeme.lines.push(newLine)
	renderCanvas()
}

function selectImage(id) {
	gMeme.selectedImgId = gImgs.find((img) => img.id === id).id
	renderCanvas()
}

function renderSelectedImage(imgId) {
	const img = new Image()
	img.onload = function () {
		// Calculate aspect ratios
		const imgAspectRatio = img.width / img.height
		const canvasAspectRatio = gElCanvas.width / gElCanvas.height

		let drawWidth, drawHeight

		// If image's aspect ratio is less than canvas's aspect ratio
		if (imgAspectRatio < canvasAspectRatio) {
			drawWidth = gElCanvas.width
			drawHeight = gElCanvas.width / imgAspectRatio
		} else {
			drawHeight = gElCanvas.height
			drawWidth = gElCanvas.height * imgAspectRatio
		}

		// Calculate position to start drawing the image
		const x = (gElCanvas.width - drawWidth) / 2
		const y = (gElCanvas.height - drawHeight) / 2

		// Draw the image
		gCtx.drawImage(img, x, y, drawWidth, drawHeight)
		drawText() // Assuming this function draws text on the canvas
	}

	img.src = gImgs.find((img) => img.id === imgId).url

	if (img.complete || img.complete === undefined) {
		img.onload()
	}
}

function addText() {
	const textInput = document.getElementById("textToAdd")
	const colorInput = document.getElementById("textColorPicker")

	if (!textInput.value) return

	const newLine = {
		txt: textInput.value,
		size: 40,
		color: colorInput.value,
		strokeColor: "#000000",
		strokeWidth: 5,
		font: "Impact",
		x: gElCanvas.width / 2,
		y: 50 + gMeme.lines.length * 30,
	}

	gMeme.lines.push(newLine)
	renderCanvas()

	textInput.value = ""
}
function canvasClick(ev) {
	const { offsetX, offsetY } = ev
	const clickedLineIdx = getClickedLineIdx(offsetX, offsetY)
	const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
	const textInput = document.getElementById("textToAdd")
	const colorInput = document.getElementById("textColorPicker")
	if (clickedLineIdx !== -1) {
		gMeme.selectedLineIdx = clickedLineIdx
		textInput.value = selectedLine.txt
		colorInput.value = selectedLine.color
		renderCanvas()
	} else {
		textInput.value = ""
		gMeme.selectedLineIdx = null
		renderCanvas()
	}
}
function toggleBold() {
	if (gMeme.selectedLineIdx !== null && gMeme.lines[gMeme.selectedLineIdx]) {
		const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
		selectedLine.bold = !selectedLine.bold
		renderCanvas()
	}
}

function resizeCanvasContainer() {
	const canvasContainer = document.querySelector(".canvas-lane")
	const canvasWidth = gElCanvas.width
	const canvasHeight = gElCanvas.height
	const aspectRatio = canvasWidth / canvasHeight
	const containerWidth = canvasContainer.offsetWidth
	const newHeight = containerWidth / aspectRatio

	gElCanvas.width = containerWidth
	gElCanvas.height = newHeight

	renderCanvas()
	renderSelectedImage()
	canvasContainer.style.width = `${containerWidth}px`
	canvasContainer.style.height = `${newHeight}px`
}

function handleMove(ev) {

	let offsetX, offsetY
	if (ev.type === "touchmove") {
		const rect = ev.target.getBoundingClientRect()
		offsetX = ev.touches[0].clientX - rect.left
		offsetY = ev.touches[0].clientY - rect.top
	} else {
		offsetX = ev.offsetX
		offsetY = ev.offsetY
	}

	if (isDragging) {
		const dx = offsetX - dragStartX
		const dy = offsetY - dragStartY

		gMeme.lines[gMeme.selectedLineIdx].x += dx
		gMeme.lines[gMeme.selectedLineIdx].y += dy

		dragStartX = offsetX
		dragStartY = offsetY

		renderCanvas()
	}
}

function handleUp(ev) {
	ev.preventDefault()
	isDragging = false
}

function handleDown(ev) {
	ev.preventDefault()
	let offsetX, offsetY
	if (ev.type === "touchstart") {
		const rect = ev.target.getBoundingClientRect()
		offsetX = ev.touches[0].clientX - rect.left
		offsetY = ev.touches[0].clientY - rect.top
	} else {
		offsetX = ev.offsetX
		offsetY = ev.offsetY
	}

	const clickedLineIdx = getClickedLineIdx(offsetX, offsetY)

	if (clickedLineIdx !== -1) {
		isDragging = true
		dragStartX = offsetX
		dragStartY = offsetY
		gMeme.selectedLineIdx = clickedLineIdx
	}
}
