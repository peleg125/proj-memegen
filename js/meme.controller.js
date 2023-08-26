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
	window.addEventListener("resize", handleResizeCanvasContainer)
}

function onMouseDown(ev) {
	ev.preventDefault()
	handleDown(ev)
}

function onMouseMove(ev) {
	ev.preventDefault()
	handleMove(ev)
}

function onMouseUp(ev) {
	ev.preventDefault()
	handleUp(ev)
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

function onToggleBold() {
	toggleBold()
}
function handleResizeCanvasContainer() {
	resizeCanvasContainer()
}
