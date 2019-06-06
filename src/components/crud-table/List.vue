<template>
  <v-data-table :headers="headers" :items="items" :search="search">
    <template v-slot:items="props">
      <slot name="row" :item="props.item"></slot>
      <td>
        <crud-action
          v-for="(action, index) in actions"
          :key="index"
          :action="action"
          @action="$emit('action', { action: $event, item: props.item })"
        ></crud-action>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import Action from '@/components/crud-table/Action.vue'
export default {
  name: 'crud-list',
  components: { 'crud-action': Action },
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => []
    },
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    search: {
      type: String,
      required: false,
      default: ''
    },
    actions: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>
