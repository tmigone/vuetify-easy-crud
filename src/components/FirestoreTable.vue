<template>
  <vuex-table
    :module="module"
    :title="title"
    :headers="headers"
    :getter="`${module}/storeRef`"
    :add="`${module}/insert`"
    :update="`${this.module}/patch`"
    :delete="`${module}/delete`"
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
  </vuex-table>
</template>

<script>
import VuexTable from '@/components/VuexTable.vue'

export default {
  name: 'firestore-table',
  components: { VuexTable },
  props: {
    module: { type: String, required: true },
    title: { type: String, required: false, default: '' },
    headers: { type: Array, required: false, default: () => [] }
  },
  computed: {
  },
  methods: {
    async dispatchModuleAction (action, data) {
      try {
        await this.$store.dispatch(action, data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  async created () {
    await this.dispatchModuleAction(`${this.module}/openDBChannel`)
  },
  async destroyed () {
    await this.dispatchModuleAction(`${this.module}/closeDBChannel`)
  }
}
</script>
