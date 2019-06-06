<template>
  <v-icon @click.stop="$emit('action', action)" :color="action.color">{{ action.icon }}</v-icon>
</template>

<script>
export default {
  name: 'crud-action',
  props: {
    action: {
      type: Object,
      required: true,
      default: () => ({ name: '', icon: '' })
    }
  }
}
</script>

<style scoped>
i {
  padding: 0 3px;
}
</style>
