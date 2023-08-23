"use strict"
//SERVICE
var gImgs = [{ id: 1, url: "img/1.jpg", keywords: ["funny", "cat"] }]
var gMeme = {
	selectedImgId: 1,
	selectedLineIdx: 0,
	lines: [],
}
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
let gElCanvas
let gCtx
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"]

function drawText() {
	gMeme.lines.forEach(function (line) {
		gCtx.font = line.size + "px Arial"
		gCtx.fillStyle = line.color
		var verticalPosition = line.size + 10
		gCtx.fillText(line.txt, 10, verticalPosition)
	})
}

function drawImage(imgSrc, callback) {
	var img = new Image()
	img.src = imgSrc
	img.onload = function () {
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
		callback()
	}
}

function getMeme() {
	return gMeme
}

function getImgById(id) {
	return gImgs.find((img) => img.id === id)
}
function getCurrImg() {
	return getImgById(gMeme.selectedImgId)
}

function createText(pos, txt = "New Text") {
	const newLine = {
		txt,
		size: 20,
		color: "blue",
		x: pos.x,
		y: pos.y,
	}
	gMeme.lines.push(newLine)
	gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function updateSelectedImgId(imgSrc) {
	var selectedImg = gImgs.find((img) => img.url === imgSrc)
	if (selectedImg) {
		gMeme.selectedImgId = selectedImg.id
	}
}
function setText(value) {
	if (gMeme.selectedLineIdx !== null && gMeme.lines[gMeme.selectedLineIdx]) {
		gMeme.lines[gMeme.selectedLineIdx].txt = value
	} else {
		const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
		gMeme.lines.push({
			txt: value,
			size: 20,
			color: "blue",
			x: center.x,
			y: center.y,
		})
		gMeme.selectedLineIdx = gMeme.lines.length - 1
	}
}
function getEvPos(ev) {
	let pos = {
		x: ev.offsetX,
		y: ev.offsetY,
	}

	if (TOUCH_EVS.includes(ev.type)) {
		ev.preventDefault()
		ev = ev.changedTouches[0]
		pos = {
			x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
			y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
		}
	}
	console.log(pos)
	return pos
}
