import { makeAutoObservable } from 'mobx'
import { titles } from '../content/Content'

export default class DataStore {
	constructor() {
		this._data = titles
		this._vesylength = 0
		this._vesyarr = []
		this._dataMenu = []
		this._likedlength = 0
		this._likedarr = []
		this._basketlength = 0
		this._basketArr = []
		this._isBtnFormOtzyvy = false
		this._isBtnFormQuestion = false
		this._isBuyProd = false
		this._infoPages = []
		this._isInfoTitle = false


		makeAutoObservable(this)
	}
	setData(data) {
		this._data = data
	}
	setIsInfoTitle(data) {
		this._isInfoTitle = data
	}
	setDataMenu(data) {
		this._dataMenu = data
	}
	setVesyLength(data) {
		this._vesylength = data
	}
	setVesyArr(data) {
		this._vesyarr = data
	}
	setLikedLength(data) {
		this._likedlength = data
	}
	setLikedArr(data) {
		this._likedarr = data
	}
	setBasketLength(data) {
		this._basketlength = data
	}
	setBasketArr(data) {
		this._basketArr = data
	}
	setIsBtnFormOtzyvy(data) {
		this._isBtnFormOtzyvy = data
	}
	setIsBtnFormQuestion(data) {
		this._isBtnFormQuestion = data
	}
	setIsBuyProd(data) {
		this._isBuyProd = data
	}
	setInfoPages(data) {
		this._infoPages = data
	}


	get data() {
		return this._data
	}
	get isInfoTitle() {
		return this._isInfoTitle
	}
	get dataMenu() {
		return this._dataMenu
	}
	get vesyLength() {
		return this._vesylength
	}
	get vesyArr() {
		return this._vesyarr
	}
	get likedLength() {
		return this._likedlength
	}
	get likedArr() {
		return this._likedarr
	}
	get basketLength() {
		return this._basketlength
	}
	get basketArr() {
		return this._basketArr
	}
	get isBtnFormOtzyvy() {
		return this._isBtnFormOtzyvy
	}
	get isBtnFormQuestion() {
		return this._isBtnFormQuestion
	}
	get isBuyProd() {
		return this._isBuyProd
	}
	get infoPages() {
		return this._infoPages
	}

}