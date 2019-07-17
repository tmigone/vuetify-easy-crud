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
      this.$parent.$parent.$emit('crud-form-create-and-exit', deepClone(this.editableItem))
      this.clean()
    },
    updateAndExit () {
      this.$parent.$parent.$emit('crud-form-update-and-exit', deepClone(this.editableItem))
      this.clean()
    },
    deleteAndExit () {
      this.$parent.$parent.$emit('crud-form-delete-and-exit', deepClone(this.editableItem))
      this.clean()
    },
    exit () {
      this.$parent.$parent.$emit('crud-form-exit')
      this.clean()
    },
    clean () {
      this.editableItem = {}
    }
  }
}
