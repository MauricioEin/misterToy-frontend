

<template>
    <section class="toy-filter-container m-b-s">
        <!-- <h1>Filter</h1>
        <input type="text" v-model="filterBy.name" @input="setFilterBy" />
        <select v-model="filterBy.status" @change="setFilterBy">
            <option v-for="option in options" :key="option">{{ option }}</option>
        </select> -->



        <section class="toy-filter-container m-b-s">
            <h1>Filter toys:</h1>
            <el-form :inline="true" :model="filterBy" class="toy-filter-form">
                <el-form-item>
                    <el-input @input="setFilterBy" v-model="filterBy.name" placeholder="Toy name" />
                    <el-select @change="setFilterBy" v-model="filterBy.status" placeholder="Stock status">
                        <el-option v-for="opt in stockOpts" :label="opt" :value="opt" />
                    </el-select>
                    <div style="display: inline-block">
                        <el-select @change="setFilterBy" v-model="filterBy.labels" multiple collapse-tags
                            collapse-tags-tooltip placeholder="Labels" style="width: 240px">
                            <el-option v-for="item in labels" :key="item" :label="item"
                                :value="item" />
                        </el-select>
                    </div>
                    <el-select @change="setFilterBy" v-model="filterBy.pageSize" placeholder="Toys per page" style="width: 130px">
                        <el-option v-for="num in [2,3,4,5,6,7,8,9,10]" :label="num" :value="num" />
                    </el-select>
                </el-form-item>
            </el-form>
        </section>




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
                status: '',
                labels: [],
                pageSize: null,
            },
            sortBy: {
                val: 'name',
                isAsc: true,
            },
            stockOpts: ['All', 'In stock', 'Out of stock'],
            labels: [ 'On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery powered' ]
        }
    },
    computed: {
    },
    created() {
        this.setFilterBy = utilService.debounce(this.setFilterBy)
    },
    methods: {
        setFilterBy() {
            this.$emit('setFilterBy', JSON.parse(JSON.stringify(this.filterBy )))
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
        },
    },
    computed: {
        arrow() {
            return this.sortBy.isAsc ? '⬇' : '⬆'
        },
    },
}
</script>