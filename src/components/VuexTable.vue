<template>
  <crud-table
    :title="title"
    :items="items"
    :headers="headers"
    @add-item="addItem"
    @update-item="updateItem"
    @delete-item="deleteItem"
  >
    <template v-slot:list-view="props">
      <slot name="list-view" :item="props.item"></slot>
    </template>
    <template v-slot:create-form="props">
      <slot name="create-form" :item="props.item"></slot>
    </template>
    <template v-slot:update-form="props">
      <slot name="update-form" :item="props.item"></slot>
    </template>
  </crud-table>
</template>

<script>
import CrudTable from '@/components/CrudTable.vue'

export default {
  name: 'vuex-table',
  components: { CrudTable },
  props: {
    module: { type: String, required: true },
    title: { type: String, required: false, default: '' },
    headers: { type: Array, required: false, default: () => [] },
    getter: { type: String, required: false },
    add: { type: String, required: false },
    update: { type: String, required: false },
    delete: { type: String, required: false },
    deleteByField: { type: String, required: false, default: 'id' }
  },
  computed: {
    items: function () {
      let data = this.$store.getters[ this.actionName(this.getter, 'get') ]
      return typeof data === 'object' ? Object.values(data) : data
    }
  },
  methods: {
    actionName (value, action) {
      return value || `${this.module}/${action}`
    },
    async dispatchModuleAction (action, data) {
      try {
        await this.$store.dispatch(action, data)
      } catch (error) {
        console.log(error)
      }
    },
    async addItem (item) {
      await this.dispatchModuleAction(this.actionName(this.add, 'add'), item)
    },
    async updateItem (item) {
      await this.dispatchModuleAction(this.actionName(this.update, 'update'), item)
    },
    async deleteItem (item) {
      await this.dispatchModuleAction(this.actionName(this.delete, 'delete'), item[this.deleteByField])
    }
  }
}
</script>
