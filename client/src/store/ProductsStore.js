import { makeAutoObservable } from 'mobx'

export default class ProductsStore {
	constructor() {
		this._data = {}
		this._dataOne = {}
		this._isSpin = false
		this._sendData = []
		this._dataBasket = []



		makeAutoObservable(this)
	}
	setDataSearchProducts(data) {
		this._data = data
	}
	setDataOneProduct(data) {
		this._dataOne = data
	}
	setIsSpin(data) {
		this._isSpin = data
	}
	setSendData(data) {
		this._sendData = data
	}
	setDataBasket(data) {
		this._dataBasket = data
	}




	get dataSearchProducts() {
		return this._data
	}
	get isSpin() {
		return this._isSpin
	}
	get dataOneProduct() {
		return this._dataOne
	}
	get sendData() {
		return this._sendData
	}
	get dataBasket() {
		return this._dataBasket
	}


}