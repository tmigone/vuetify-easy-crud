import { EventBus } from '@/EventBus.js'
import deepClone from 'lodash.clonedeep'

export default {
  props: {
    item: { type: Object, required: false, default: function () { return {} } }
  },
  data: function () {
    return {
      editableItem: deepClone(this.item)
    }
  },
  watch: {
    item: function () {
      this.editableItem = deepClone(this.item)
    }
  },
  methods: {
    createAndExit () {
      EventBus.$emit('crud-form-create-and-exit', deepClone(this.editableItem))
      this.clean()
    },
    updateAndExit () {
      EventBus.$emit('crud-form-update-and-exit', deepClone(this.editableItem))
      this.clean()
    },
    deleteAndExit () {
      EventBus.$emit('crud-form-delete-and-exit', deepClone(this.editableItem))
      this.clean()
    },
    exit () {
      EventBus.$emit('crud-form-exit')
      this.clean()
    },
    clean () {
      this.editableItem = {}
    }
  }
}
