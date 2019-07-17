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
          <slot name="list-view" :item="props.item">
            <td v-for="(value, index) in Object.values(props.item)" :key="index">{{ value }}</td>
          </slot>
        </template>
      </crud-list>
    </v-card-text>

    <!-- DIALOG: ITEM DETAIL -->
    <v-dialog
      v-model="dialog.show"
      max-width="1200px"
      persistent
      @crud-form-exit="exit"
      @crud-form-create-and-exit="createAndExit"
      @crud-form-update-and-exit="updateAndExit"
      @crud-form-delete-and-exit="deleteAndExit"
    >
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
    headers: { type: Array, required: false, default: () => [] },
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
      // Headers priority: provided headers > first item keys
      let headers = this.headers.length > 0 ? this.headers : (this.items.length > 0 ? Object.keys(this.items[ 0 ]) : [])
      let _headers = [ ...headers, {
        text: 'Acciones',
        value: 'actions',
        align: 'center',
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
