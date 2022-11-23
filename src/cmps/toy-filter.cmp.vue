

<template>
    <section class="toy-filter-container m-b-s">
        <h1>Filter</h1>
        <input type="text" v-model="filterBy.name" @input="setFilterBy" />
        <select v-model="filterBy.status" @change="setFilterBy">
            <option v-for="option in options" :key="option">{{ option }}</option>
        </select>
        <select name="test">
            <option>123</option>
            <option>456</option>
            <option>789</option>
        </select>

        <fieldset class="sort" @input="setSortVal">
            <legend @click="setIsAsc">Sort <span> {{ arrow }}</span></legend>

            <input type="radio" id="name" name="drone" value="name" checked>
            <label for="name"> by name </label>

            <input type="radio" id="price" name="drone" value="price">
            <label for="price"> by price</label>

        </fieldset>

    </section>
</template>

<script>
import { utilService } from '../services/util.service.js'
export default {
    data() {
        return {
            filterBy: {
                name: '',
                status: 'All',
            },
            sortBy: {
                val: 'name',
                isAsc: true,
            },
            options: ['All', 'In stock', 'Out of stock'],
        }
    },
    created() {
        this.setFilterBy = utilService.debounce(this.setFilterBy)
    },
    methods: {
        setFilterBy() {
            this.$emit('setFilterBy', { ...this.filterBy })
        },
        setSortBy() {
            this.$emit('setSortBy', JSON.parse(JSON.stringify(this.sortBy)))
        },
        setSortVal({ target: { value } }) {
            this.sortBy.val = value
            this.setSortBy()
        },
        setIsAsc() {
            this.sortBy.isAsc = !this.sortBy.isAsc
            this.setSortBy()
        }
    },
    computed: {
        arrow() {
            return this.sortBy.isAsc ? '⬇' : '⬆'
        },
    },
}
</script>