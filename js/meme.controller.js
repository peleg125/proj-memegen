"use strict"
//CONTROLLER

function onInit() {
	gElCanvas = document.querySelector("canvas")
	gCtx = gElCanvas.getContext("2d")
	window.addEventListener("resize", resizeCanvas)
	resizeCanvas()
}

function resizeCanvas() {
	const container = document.querySelector(".canvas-container")
	gElCanvas.width = container.offsetWidth
	gElCanvas.height = container.offsetHeight
}
function onDrawImage(elImage) {
	var imgSrc = elImage.src

	updateSelectedImgId(imgSrc)

	drawImage(imgSrc, function () {
		onDrawText()
	})
}
function onDrawText() {
	drawText()
}

function onGetMeme() {
	var meme = getCurrImg()
	console.log(meme)
}

function onSelectImage(elImage) {
	var imgSrc = elImage.src
	updateSelectedImgId(imgSrc)
	onDrawImage(elImage)
}
function onSetText(value) {
	setText(value)
}

function findClickedTextIndex(pos) {
	for (let i = 0; i < gMeme.lines.length; i++) {
		const line = gMeme.lines[i]
		const textWidth = gCtx.measureText(line.txt).width

		if (
			pos.x >= line.x &&
			pos.x <= line.x + textWidth &&
			pos.y >= line.y - line.size &&
			pos.y <= line.y
		) {
			return i
		}
	}
	return null
}
function onCanvasClick(ev) {
	const meme = getMeme()
	const pos = getEvPos(ev)
	if (isTextClicked(pos)) {
		meme.selectedLineIdx = findClickedTextIndex(pos)
	} else {
		meme.selectedLineIdx = null
	}
}

function isTextClicked(clickedPos) {
	const meme = getMeme()
	const line = meme.lines[meme.selectedLineIdx]
	if (!line) return false

	gCtx.font = `${line.size}px Arial`
	const textWidth = gCtx.measureText(line.txt).width

	return (
		clickedPos.x >= line.x &&
		clickedPos.x <= line.x + textWidth &&
		clickedPos.y >= line.y - line.size &&
		clickedPos.y <= line.y
	)
}
