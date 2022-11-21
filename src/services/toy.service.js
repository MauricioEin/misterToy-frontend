import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toy-list'

function query() {
    return storageService.queryWithDelay(TOY_KEY).then((toys) => {
        // console.log('toys:', toys)
        if (!toys || !toys.length) {
            toys = _createToys()
            storageService.postMany(TOY_KEY, toys)
        }
        return toys
    })
}

function save(toy) {
    return toy._id ? _update(toy) : _add(toy)
}

function _add(addedToy) {
    const newToy = _createToy(addedToy.name)
    return storageService.post(TOY_KEY, newToy)
}

function _update(updatedToy) {
    updatedToy.modifiedAt = Date.now()
    return storageService.put(TOY_KEY, updatedToy)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId).then(toy => {
        toy.reviews = ['It\'s Just Wonderful!', 'My daoughter hated it.', 'I cannot stop playing']
        return toy
    })
}

export default {
    query,
    getById,
    save,
    remove,
}

function _createToys() {
    return [_createToy('Talking Doll'), _createToy('Mr. Potato'), _createToy('Mrs. Potato'), _createToy('Beach Ball'), _createToy('Furby'), _createToy('Gameboy Color')]
}

function _createToy(name,) {
    return {
        _id: utilService.makeId(),
        name,
        price: 140,
        inStock: true,
        createdAt: Date.now(),
        labels: ['Doll', 'Battery Powered', 'Baby']
    }
}