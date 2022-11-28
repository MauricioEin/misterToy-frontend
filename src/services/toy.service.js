import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'



function query(filterBy, sortBy) {
    return httpService.get('toy', { filterBy, sortBy })
}

function getLabels() {
    return httpService.get('toy/label')
}

function save(toy) {
    return toy._id ? _update(toy) : _add(toy)
}

function _add(addedToy) {
    const newToy = _createToy(addedToy.name, addedToy.price, addedToy.inStock, addedToy.labels ,addedToy.imgUrl)

    return httpService.post('toy/', newToy)
    // return storageService.post(TOY_KEY, newToy)
}

function _update(updatedToy) {
    updatedToy.modifiedAt = Date.now()
    return httpService.put('toy/' + updatedToy._id, updatedToy)
    // return storageService.put(TOY_KEY, updatedToy)
}

function remove(toyId) {
    return httpService.delete('toy/' + toyId)
    // return storageService.remove(TOY_KEY, toyId)
}

function getById(toyId) {
    return httpService.get('toy/' + toyId)
    // return storageService.get(TOY_KEY, toyId).then(toy => {
    //     toy.reviews = ['It\'s Just Wonderful!', 'My doughter hated it.', 'I cannot stop playing']
    //     return toy
    // })
}

function addToyMsg(newMsg, toyId) {
    return httpService.post(`toy/${toyId}/msg`, newMsg)

}

export default {
    query,
    getById,
    save,
    remove,
    getLabels,
    addToyMsg
}


function _createToy(name, price, inStock, labels, imgUrl) {
    return {
        // _id: utilService.makeId(),
        name,
        price,
        inStock,
        // createdAt: Date.now(),
        labels,
        msgs:[],
        reviews: [],
        imgUrl
    }
}
