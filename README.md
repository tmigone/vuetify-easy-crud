# :sparkles: Vuetify Easy Crud

Vuertify Easy Crud extends [vuetify's](https://vuetifyjs.com) `v-data-table` component to provide easier handling of CRUD operations with less boilerplate code.

What component to use?
- just vuetify: `vec-table`
- vuetify + vuex: `vex-table`
- vuetify + vuex + firestore: `vef-table`


# Requirements

### Vuetify
Vuetify is included as peer dependency. This means that you must install them yourself. NPM will warn you if they are not present in your project.

For instructions on how to install Vuetify please visit [this quick start guide](https://vuetifyjs.com/en/getting-started/quick-start).

If you are using Vuetify's a la carte system you need to import the following components:
- VDataTable
- VCard, VCardTitle, VCardText, VCardActions
- VDialog, VTextField, VBtn, VIcon
- VSpacer

### Vuex
If you want to use `vex-table` you need to install `vuex`, visit this [link](https://vuex.vuejs.org/installation.html) for instructions.

### Vuex Easy Firestore
If you want to use `vef-table` you need to install `vuex-easy-firestore` and `firebase`, visit this [link](https://mesqueeb.github.io/vuex-easy-firestore/setup.html#installation) for instructions.


# Installation
Install it with `NPM` by running: 
```bash
npm install --save @tmigone/vuetify-easy-crud
```

# Setup

### Global installation

In your `main.js` file include the following lines: 

```javascript
import VuetifyEasyCrud from '@tmigone/vuetify-easy-crud'

const options = {
  globalMixins: false
}

Vue.use(VuetifyEasyCrud, options)
```

This will register all components globaly. If `globalMixins` is set (the default is false) to true then mixins will also be globally registered (but you probably shouldnt do this).


### Single component
You can also pick and import specific components locally doing:

```javascript
import { VecTable, VecFragment, VecFormMixin } from '@tmigone/vuetify-easy-crud'
```


# Components

## Vuetify Easy CRUD Table (vec-table)
The `vec-table` component is a regular tabular data table with easy CRUD capabilities.

### Usage
```html
    <vec-table
      :title="'Table title'"
      :items="items"
      :headers="['firstname', 'lastname']"
      @add-item="addItem"
      @update-item="updateItem"
      @delete-item="deleteItem"
    >
      <template v-slot:list-view="props">
        <list-view :item="props.item"></list-view>
      </template>
      <template v-slot:create-form="props">
        <create-form></create-form>
      </template>
      <template v-slot:update-form="props">
        <update-form :item="props.item"></update-form>
      </template>
    </vec-table>
```

### Properties

```vec-table``` accepts the following properties: 

| Prop | Description |
| --- | --- |
| `title` | (optional) Display name for the table. |
| `items` | (required) Array of objects representing the table items. |
| `headers` | (optional) Array of objects representing the table headers. See below for more options. |
| `disableSearch` | (optional) Disable search functionality. Default: false. |
| `disableCreateAction` | (optional) Disable create new item functionality. Default: false. |
| `disableEditAction` | (optional) Disable edit item functionality. Default: false. |
| `disableDeleteAction` | (optional) Disable delete item functionality. Default: false. |

Headers can be provided in two formats:
- As a string array: ```[ 'header1', 'header2' ]```
- As an array of objects with the following properties:
```
{
  align: "left/center/right",
  sortable: true/false,         // Requires value to be set
  text: "column name",
  value: "value to sort by"
}
```
- If no headers are provided, the component will use the object keys from the first table item.
 
### Slots

You can customize creation, read and update operations via slots. All of the slots are optional, though you should disable the corresponding action if you plan on not using one of them.

| Slot | Description |
| --- | --- |
| `list-view` | (optional) Slot to customize each table row. `<td>` tags must be enclosed in a `<vec-fragment>`, see component below. Receives `props.item` with the given item object. If not provided, item keys will be assigned to each column based on the header `value` property. |
| `update-form` | (required) Slot to customize the item update form. Receives `props.item` with the given item object. |
| `create-form` | (required) Slot to customize the item creation form. |

When building your custom `create-form` or `update-form` you will also need to extend your component with `vec-form-mixin`. See the mixin section below to learn how to integrate with it.

### Events

Each CRUD operation performed on the data fires an event. This component does not alter the data it's given. It's up to the user to decide what to do with it:

| Event | Description |
| --- | --- |
| `add-item` | Emitted when a create-form is submitted. Payload: `item` object. |
| `update-item` | Emitted when an update-form is saved. Payload: `item` object. |
| `delete-item` | Emitted when an item is deleted. Payload: `item` object. |

## Vuetify Easy CRUD Fragment (vec-fragment)
The `vec-fragment` is an auxiliary component used to customize the `list-view` slot component. The `list-view` component needs to return multiple `<td>` elements at the root level. This functionality is currently planned to be implemented on [Vue 3.0](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf). Until then, this component uses [vue-fragments](https://www.npmjs.com/package/vue-fragments) to achieve the same result.

### Usage
```html
<template>
  <vec-fragment>
    <td>{{ item.firstname }}</td>
    <td>{{ item.lastname }}</td>
  </vec-fragment>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true, default: () => { } }
  }
}
</script>
```

## "Vuetify Easy CRUD Table" Easy Vuex (vex-table)

`vex-table` component extends the functionality of `vec-table` by adding integration with Vuex store.
The component uses a getter to obtain initial data and dispatches add/update/delete actions for CRUD operations.
Vuex setup and implementation need to be implemented separately.

### Usage
```html
    <vex-table
      module="moduleName"
      title="Table title"
      :headers="['firstname', 'lastname']"
    >
      <template v-slot:list-view="props">
        <list-view :item="props.item"></list-view>
      </template>
      <template v-slot:create-form="props">
        <create-form></create-form>
      </template>
      <template v-slot:update-form="props">
        <update-form :item="props.item"></update-form>
      </template>
    </vex-table>
```

### Properties
```vex-table``` accepts the following properties: 

| Prop | Description |
| --- | --- |
| `module` | (required) Vuex module name. |
| `title` | (optional) Display name for the table. |
| `headers` | (optional) Array of objects representing the table headers. Shared options with `vec-table`. |
| `getter` | (optional) Name of the getter to obtain initial data. Default: `<module>/get` |
| `add` | (optional) Name of the action to add an item. Default: `<module>/add` |
| `update` | (optional) Name of the action to update an item. Default: `<module>/update` |
| `delete` | (optional) Name of the action to delete an item. Default: `<module>/delete` |
| `deleteByField` | (optional) Name of field by which items are identified on a delete action. Default: `id` |

### Slots
See `vec-table` slots.

### Events
As stated, this component dispatches events to the vuex store. Again, it's up to the user to provide the proper vuex store actions, mutations, etc.

| Event type | Default event name | Description |
| --- | --- | --- |
| `get` | `get` | (getter) Used to obtain initial data. Payload: none. |
| `add` | `add` | Dispached when an item is added. Payload: `item` object. |
| `update` | `update` | Dispached when an item is updated. Payload: `item` object. |
| `delete` | `delete` | Dispached when an item is deleted. Payload: Unique identifier for the item: `item[deleteByField]`. |

## "Vuetify Easy CRUD Table" Easy Firestore (vef-table)

`vef-table` component extends the functionality of `vec-table` by adding integration with Google Firestore.
The component uses getters and actions already established by `vuex-easy-firestore` to automatically handle CRUD operations.
Both Vuex and Vuex Easy Firestore setup and implementation need to be implemented separately.

### Usage
```html
    <vef-table module="moduleName" title="Table title" :headers="['firstname', 'lastname']">
      <template v-slot:create-form="props">
        <create-form></create-form>
      </template>
      <template v-slot:update-form="props">
        <update-form :item="props.item"></update-form>
      </template>
    </vef-table>
```

### Properties
```vex-table``` accepts the following properties: 

| Prop | Description |
| --- | --- |
| `module` | (required) Firestore module name. |
| `title` | (optional) Display name for the table. |
| `headers` | (optional) Array of objects representing the table headers. Shared options with `vec-table`. |

### Slots
See `vec-table` slots.

### Events
All events are handled automatically for this component. No extra setup is required.

See `vex-table` events. Additional events:

| Event type | Default event name | Description |
| --- | --- | --- |
| `open` | `openDBChannel` | Dispatched to open a two way sync with a collection. Automatically fired on created(). |
| `close` | `closeDBChannel` | Dispatched to close a two way sync with a collection. Automatically fired on destroyed(). |


# Mixins

## Vuetify Form Mixin (vec-form-mixin)
`vec-form-mixin` is a mixin that simplifies the creation of `vec-table` forms.
The mixin provides the following functionality:

- `item` property, to receive the given object. Read only.
- `editableItem` component data. This is what your form should modify.
- `exit` method. Closes the form without saving.
- `createAndExit` method. Closes the form after saving a new item (based of `editableItem`).
- `updateAndExit` method. Closes the form after updating an existing item (based of `editableItem`).


# Example

For a complete working example check out [vuetify-easy-crud-example](https://github.com/tomasmigone/vuetify-easy-crud-example).

