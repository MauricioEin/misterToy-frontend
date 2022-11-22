

<template>
    <section class="toy-filter-container m-b-s">
        <h1>Filter</h1>
        <input type="text" v-model="filterBy.name" @input="setFilterBy" />
        <select v-model="filterBy.status" @change="setFilterBy">
            <option v-for="option in options" :key="option">{{ option }}</option>
            <!-- <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Done">Done</option> -->
        </select>
        <select name="test">
            <option>123</option>
            <option>456</option>
            <option>789</option>
        </select>

        <label class="sort-btn" @click="setSortBy">Sort
            <span>{{ arrow }}</span></label>
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
        this.setSortBy()
    },
    methods: {
        setFilterBy() {
            this.$emit('setFilterBy', { ...this.filterBy })
        },
        setSortBy() {
            // this.$emit('setSortBy', this.sortBy)
            this.$emit('setSortBy', JSON.parse(JSON.stringify(this.sortBy)))
            this.sortBy.isAsc = !this.sortBy.isAsc
        },
    },
    computed: {
        arrow() {
            return this.sortBy.isAsc ? '⬇' : '⬆'
        },
    },
}
</script>