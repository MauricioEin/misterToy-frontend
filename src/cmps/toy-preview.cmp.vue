
<template>
  <section class="toy-preview flex column">
    <h2 class="preview-name" @click="toggleToyState"
      :style="(toy.inStock)? 'text-decoration: none;' : 'text-decoration: line-through;'">
      {{ toy.name }}
    </h2>
    <h3>${{toy.price.toLocaleString()}}</h3>
    <div class="toy-preview-btns flex space-around">
      <router-link class="" :to="{ path: 'toy/edit/' + toy._id }">Edit</router-link> |
      <router-link class="" :to="{ path: 'toy/' + toy._id }">Details</router-link> |
      <button class="btn del-btn" @click="$emit('removeToy', toy._id)">X</button>
    </div>
  </section>
</template>


<script>
export default {
  props: ['toy'],
  methods: {
    toggleToyState() {
      this.$emit('toggleToyState', this.toy)
    },
  },
}

</script>