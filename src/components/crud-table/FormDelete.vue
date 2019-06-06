<template>
  <v-card>
    <!-- TITLE -->
    <v-card-title>
      <span class="headline">Delete item</span>
    </v-card-title>

    <!-- FORM -->
    <v-card-text>Are you sure you want to delete this item?</v-card-text>

    <!-- FORM ACTIONS -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat @click="exit">No</v-btn>
      <v-btn color="red darken-1" flat @click="deleteAndExit">Yes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CrudFormMixin from '@/mixins/CrudForm.js'

export default {
  mixins: [ CrudFormMixin ]
}
</script>
