import { httpService } from './http.service.js'
import _ from 'lodash'


export default {
    queryByLabels,
    getAvgLabelPrice,
    getInStockByLabel
}

function queryByLabels() {
    return httpService.get('toy').then(({ filteredToys: toys }) => {
        const labelMap = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                labelMap[label] = labelMap[label] ?
                    [...labelMap[label], toy] : [toy]

            })
        })
        return labelMap
    })
}

function getAvgLabelPrice() {
    return queryByLabels().then(labelMap => {
        const avgMap = {}
        for (const label in labelMap) {
            avgMap[label] = _.meanBy(labelMap[label], 'price')
        }
        console.log('avg', avgMap)
        return avgMap
    })
}

function getInStockByLabel() {
    return queryByLabels().then(labelMap => {
        const inStockMap = {}
        for (const label in labelMap) {
            const inStockCount = labelMap[label].reduce(
                (acc, t) => acc += t.inStock ? 1 : 0, 0)
            inStockMap[label] = inStockCount / labelMap[label].length
        }
        console.log('inStock', inStockMap)

        return inStockMap
    })

}


