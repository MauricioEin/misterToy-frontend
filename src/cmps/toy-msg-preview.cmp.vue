
<template>
  <section class="toy-msg">
<h4>{{msg.txt}}<span> - by {{msg.by.fullname}}</span></h4>
  </section>
</template>


<script>
export default {
  props: ['msg'],
  methods: {
    toggleToyState() {
      this.$emit('toggleToyState', this.toy)
    },
  },
}

</script>