<template>
  <v-card>
    <!-- HEADER -->
    <v-card-title>
      <crud-title :title="title"></crud-title>
      <v-spacer></v-spacer>
      <crud-search v-if="!disableSearch" :keyword.sync="search"></crud-search>
      <v-spacer></v-spacer>
      <crud-action
        v-for="action in _groupActions"
        :key="action.name"
        :action="action"
        @action="action => action.callback()"
      ></crud-action>
    </v-card-title>

    <!-- TABLE: LIST ITEMS -->
    <v-card-text>
      <crud-list
        :items="items"
        :search="search"
        :headers="_headers"
        :actions="_listActions"
        @action="event => event.action.callback(event.item)"
      >
        <template v-slot:row="props">
          <slot name="list-view" :item="props.item"></slot>
        </template>
      </crud-list>
    </v-card-text>

    <!-- DIALOG: ITEM DETAIL -->
    <v-dialog v-model="dialog.show" max-width="1200px" persistent>
      <slot v-if="dialog.type === 'create'" name="create-form"></slot>
      <slot v-if="dialog.type === 'update'" name="update-form" :item="selectedItem"></slot>
      <slot v-if="dialog.type === 'delete'" name="delete-form" :item="selectedItem">
        <crud-form-delete :item="selectedItem"></crud-form-delete>
      </slot>
    </v-dialog>
  </v-card>
</template>

<script>
import FormDelete from '@/components/crud-table/FormDelete.vue'
import CrudTitle from '@/components/crud-table/Title.vue'
import Search from '@/components/crud-table/Search.vue'
import List from '@/components/crud-table/List.vue'
import Action from '@/components/crud-table/Action.vue'
import { EventBus } from '@/EventBus.js'

export default {
  name: 'crud-table',
  components: {
    'crud-form-delete': FormDelete,
    'crud-title': CrudTitle,
    'crud-search': Search,
    'crud-list': List,
    'crud-action': Action
  },
  props: {
    title: { type: String, required: false, default: '' },
    headers: { type: Array, required: true, default: () => [] },
    items: { type: Array, required: true, default: () => [] },
    groupActions: { type: Array, required: false, default: () => [] },
    listActions: { type: Array, required: false, default: () => [] },
    disableSearch: { type: Boolean, required: false, default: false },
    disableCreateAction: { type: Boolean, required: false, default: false },
    disableEditAction: { type: Boolean, required: false, default: false },
    disableDeleteAction: { type: Boolean, required: false, default: false }
  },
  data () {
    return {
      search: '',
      dialog: {
        show: false,
        type: ''
      },
      selectedItem: {}
    }
  },
  computed: {
    _headers: function () {
      let _headers = [ ...this.headers, {
        text: 'Acciones',
        value: 'actions',
        align: 'left',
        sortable: false
      } ]
      return _headers.map(h => {
        return {
          text: h.text || h,
          value: h.value || h.text || h || '',
          align: h.align || 'center',
          sortable: h.sortable || false
        }
      })
    },

    _groupActions: function () {
      // Get custom actions: Skip if name is 'create'
      let actions = this.groupActions.filter(a => ![ 'create' ].includes(a.name)).map(a => ({
        name: a.name || a,
        icon: a.icon || a.name || a,
        callback: a.callback
      }))

      // Add create action
      if (!this.disableCreateAction) {
        actions.push({
          name: 'create',
          icon: 'note_add',
          color: 'indigo',
          callback: () => {
            this.dialog.show = true
            this.dialog.type = 'create'
          }
        })
      }
      return actions
    },

    _listActions: function () {
      // Get custom actions. Skip if name is 'edit' or 'delete'
      let actions = this.listActions.filter(a => ![ 'edit', 'delete' ].includes(a.name)).map(a => ({
        name: a.name || a,
        icon: a.icon || a.name || a,
        callback: a.callback
      }))

      // Add edit action
      if (!this.disableEditAction) {
        actions.push({
          name: 'edit',
          icon: 'edit',
          color: 'blue',
          callback: (item) => {
            this.selectedItem = item
            this.dialog.show = true
            this.dialog.type = 'update'
          }
        })
      }

      // Add delete action
      if (!this.disableDeleteAction) {
        actions.push({
          name: 'delete',
          icon: 'delete',
          color: 'red',
          callback: (item) => {
            this.selectedItem = item
            this.dialog.show = true
            this.dialog.type = 'delete'
          }
        })
      }
      return actions
    }
  },
  created () {
    EventBus.$on('crud-form-exit', this.exit)
    EventBus.$on('crud-form-create-and-exit', this.createAndExit)
    EventBus.$on('crud-form-update-and-exit', this.updateAndExit)
    EventBus.$on('crud-form-delete-and-exit', this.deleteAndExit)
  },
  beforeDestroy () {
    EventBus.$off('crud-form-exit', this.exit)
    EventBus.$off('crud-form-create-and-exit', this.createAndExit)
    EventBus.$off('crud-form-update-and-exit', this.updateAndExit)
    EventBus.$off('crud-form-delete-and-exit', this.deleteAndExit)
  },
  methods: {
    createAndExit (item) {
      this.$emit('add-item', item)
      this.exit()
    },
    updateAndExit (item) {
      this.$emit('update-item', item)
      this.exit()
    },
    deleteAndExit (item) {
      this.$emit('delete-item', item)
      this.exit()
    },
    exit () {
      this.dialog.show = false
      this.dialog.type = ''
    }
  }
}
</script>

<style>
</style>
