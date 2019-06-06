<template>
  <v-text-field
    label="Search"
    append-icon="search"
    single-line
    hide-details
    :value="keyword"
    @input="$emit('update:keyword', $event)"
  ></v-text-field>
</template>

<script>
export default {
  name: 'crud-search',
  props: {
    keyword: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
