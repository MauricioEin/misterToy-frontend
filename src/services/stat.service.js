import { httpService } from './http.service.js'
import _ from 'lodash'


export default {
    queryByLabels,
    getAvgLabelPrice,
    getInStockByLabel
}

async function queryByLabels() {

    const { toys } = await httpService.get('toy', { filterBy: null, sortBy: null })
    const labelMap = {}
    toys.forEach(toy => {
        toy.labels?.forEach(label => {
            labelMap[label] = labelMap[label] ?
                [...labelMap[label], toy] : [toy]
        })
    })
    console.log('labelMap',labelMap)
    return labelMap
}

async function getAvgLabelPrice() {

    const labelMap = await queryByLabels()
    const avgMap = {}
    for (const label in labelMap) {
        avgMap[label] = _.meanBy(labelMap[label], 'price')
    }
    console.log('avgMap',avgMap)
    return avgMap
}

async function getInStockByLabel() {
    const labelMap = await queryByLabels()
    const inStockMap = {}
    for (const label in labelMap) {
        inStockMap[label] = labelMap[label].reduce(
            (acc, toy) => acc += toy.inStock ?
                1 / labelMap[label].length * 100 : 0, 0)
    }
    return inStockMap
}


