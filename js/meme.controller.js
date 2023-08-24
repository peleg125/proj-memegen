"use strict"

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
	gElCanvas.addEventListener("mousedown", onMouseDown)
	gElCanvas.addEventListener("mousemove", onMouseMove)
	document.addEventListener("mouseup", onMouseUp)
}

function onMouseDown(ev) {
	const meme = getMeme()
	const { offsetX, offsetY } = ev
	console.log("Mouse down event triggered.")
	const clickedLineIdx = getClickedLineIdx(offsetX, offsetY)

	if (clickedLineIdx !== -1) {
		isDragging = true
		dragStartX = offsetX
		dragStartY = offsetY
		meme.selectedLineIdx = clickedLineIdx
	}
}

function onMouseMove(ev) {
	const meme = getMeme()
	if (isDragging) {
		const { offsetX, offsetY } = ev
		const dx = offsetX - dragStartX
		const dy = offsetY - dragStartY

		meme.lines[meme.selectedLineIdx].x += dx
		meme.lines[meme.selectedLineIdx].y += dy

		dragStartX = offsetX
		dragStartY = offsetY

		renderCanvas()
	}
}

function onMouseUp() {
	isDragging = false
}

function onAddSticker(emoji) {
	addSticker(emoji)
}

function onSelectImage(id) {
	selectImage(id)
}

function onAddText(elText) {
	addText(elText)
}

function onCanvasClick(ev) {
	canvasClick(ev)
}
