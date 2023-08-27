"use strict"

"use strict"

function saveToStorage(key, val) {
	const json = JSON.stringify(val)
	localStorage.setItem(key, json)
}

function loadFromStorage(key) {
	const json = localStorage.getItem(key)
	return JSON.parse(json)
}

function getSavedMemes(key) {
	const savedMemesInLocalStorage = JSON.parse(localStorage.getItem(key)) || []

	const savedMemes = savedMemesInLocalStorage.map((item) => ({
		memeName: item.name,
		dataURL: item.dataURL,
	}))

	return savedMemes || []
}
function getSavedMemes(key) {
	const savedMemesInLocalStorage = getLocalStorgeDB(key)

	const savedMemes = savedMemesInLocalStorage.map((item) => ({
		memeName: item.name,
		dataURL: item.dataURL,
	}))

	return savedMemes || []
}
function getLocalStorgeDB(key) {
	return JSON.parse(localStorage.getItem(key)) || []
}
function removeSavedMemeByName(key, nameToRemove) {
	const savedMemesInLocalStorage = getLocalStorgeDB(key)

	const updatedMemes = savedMemesInLocalStorage.filter(
		(item) => item.name !== nameToRemove
	)

	localStorage.setItem(key, JSON.stringify(updatedMemes))
}
