<template>
  <h5 v-if="title.length > 0" class="headline">{{ title }}</h5>
</template>

<script>
export default {
  name: 'crud-title',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
