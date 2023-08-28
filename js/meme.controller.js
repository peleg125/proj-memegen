"use strict"
let gElCanvas
let gCtx
function onInit() {
	gElCanvas = document.querySelector("canvas")
	gCtx = gElCanvas.getContext("2d")
	addEventListeners()
}

function onSetColor(color) {
	setColor(color)
}
function onDecreaseFontSize() {
	decreaseFontSize()
}

function onImgSelect(imgId) {
	imgSelect(imgId)
}

function onIncreaseFontSize() {
	increaseFontSize()
}

function onTextAlign(align) {
	textAlign(align)
}

function onLineTextInput(text) {
	lineTextInput(text)
}

function onChangeFont() {
	changeFont()
}

function onEditLine(lineIdx) {
	editLine(lineIdx)
}

function addEventListeners() {
	gElCanvas.addEventListener("mousedown", onHandleDown)
	gElCanvas.addEventListener("mousemove", onHandleMove)
	document.addEventListener("mouseup", onHandleUp)
	gElCanvas.addEventListener("touchstart", onHandleDown)
	gElCanvas.addEventListener("touchmove", onHandleMove)
	gElCanvas.addEventListener("touchend", onHandleUp)
}

function onHandleDown(ev) {
	handleDown(ev)
}

function onHandleMove(ev) {
	ev.preventDefault()
	handleMove(ev)
}

function onHandleUp(ev) {
	handleUp(ev)
}

function onAddSticker(emoji) {
	addSticker(emoji)
}

function onSelectImage(id) {
	selectImage(id)
}

function onAddText(elText, ev) {
	addText(elText)
}

function onCanvasClick(ev) {
	canvasClick(ev)
}

function onToggleBold() {
	toggleBold()
}
function handleResizeCanvasContainer() {
	resizeCanvasContainer()
}
function onUploadImg() {
	const imgDataUrl = gElCanvas.toDataURL("image/jpeg")

	function onSuccess(uploadedImgUrl) {
		const url = encodeURIComponent(uploadedImgUrl)
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
	}

	doUploadImg(imgDataUrl, onSuccess)
}
function onSaveImage() {
	saveImage()
}

function onLoadImage() {
	loadImage()
}
function onDeleteImage() {
	deleteImage()
}

function onDeleteLine() {
	deleteLine()
}
function canvasClick(ev) {
	const meme = getMeme()
	const { offsetX, offsetY } = ev
	const clickedLineIdx = getClickedLineIdx(offsetX, offsetY)
	const selectedLine = meme.lines[meme.selectedLineIdx]
	const textInput = document.getElementById("textToAdd")
	const colorInput = document.getElementById("textColorPicker")
	if (clickedLineIdx !== -1) {
		meme.selectedLineIdx = clickedLineIdx
		textInput.value = selectedLine.txt
		colorInput.value = selectedLine.color
		renderCanvas()
	} else {
		textInput.value = ""
		meme.selectedLineIdx = null
		renderCanvas()
	}
}
