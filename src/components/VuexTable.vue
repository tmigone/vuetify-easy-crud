<template>
  <vec-table
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
  </vec-table>
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
    get: { type: String, required: false },
    add: { type: String, required: false },
    update: { type: String, required: false },
    delete: { type: String, required: false }
  },
  computed: {
    _get: function () {
      return this.capitalizedFromModule(this.getter, 'get')
    },
    _addAction: function () {
      return this.capitalizedFromModule(this.add, 'add')
    },
    _updateAction: function () {
      return this.capitalizedFromModule(this.update, 'update')
    },
    _deleteAction: function () {
      return this.capitalizedFromModule(this.delete, 'delete')
    },
    items: function () {
      return this.$store.getters[ this._get ]
    }
  },
  methods: {
    capitalizedFromModule (value, action) {
      if (value) {
        return value
      } else {
        return `${this.module}/${action}`
      }
    },
    async dispatchModuleAction (action, data) {
      try {
        await this.$store.dispatch(action, data)
      } catch (error) {
        console.log(error)
      }
    },
    async addItem (item) {
      await this.dispatchModuleAction(this._addAction, item)
    },
    async updateItem (item) {
      await this.dispatchModuleAction(this._updateAction, item)
    },
    async deleteItem (item) {
      await this.dispatchModuleAction(this._deleteAction, item)
    }
  }
}
</script>
