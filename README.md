# :sparkles: Vuetify Easy Crud

Vuertify Easy Crud extends [vuetify's](https://vuetifyjs.com) `v-data-table` component to provide easier handling of CRUD operations with less boilerplate code.

If you are using firebase as your database solution check out @tmigone/vec-easy-firebase package.


# Requirements

Vuetify is included as a peer dependency. 
This means that:
- You must install it yourself. 
- Vuetify Easy Crud will use an existing version if you already installed it. 
- NPM will warn you when installing this package without a vuetify installation.

For instructions on how to install Vuetify please visit [this quick start guide](https://vuetifyjs.com/en/getting-started/quick-start).

If you are using Vuetify's a la carte system you need to import the following components:
- VDataTable
- VCard, VCardTitle, VCardText, VCardActions
- VDialog, VTextField, VBtn, VIcon
- VSpacer

# Installation
Install it with `NPM` by running: 
```bash
npm install --save @tmigone/vuetify-easy-crud
```

# Setup

## Global installation
In your `main.js` file include the following lines: 

```javascript
import VuetifyEasyCrud from '@tmigone/vuetify-easy-crud'

const options = {
  globalMixins: false
}

Vue.use(VuetifyEasyCrud, options)
```

This will register `vec-table` and `vec-fragment` globaly. If `globalMixins` is set (the default is false) to true then `vec-form-mixin` will also be globally registered (but you probably shouldnt do this).


## Single component
You can also import each component locally with:

```javascript
import { VecTable, VecFragment, VecFormMixin } from '@tmigone/vuetify-easy-crud'
```


# Components

## Vuetify CRUD Table (vec-table)
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
| `headers` | (required) Array of objects representing the table headers. See below for more options. |
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
 
### Slots

You can customize creation, read and update operations via slots. All of the slots are optional, though you should disable the corresponding action if you plan on not using one of them.

| Slot | Description |
| --- | --- |
| `list-view` | Slot to customize each table row. `<td>` tags must be enclosed in a `<vec-fragment>`, see component below. Receives ```props.item``` with the given item object. |
| `update-form` | Slot to customize the item update form. Receives ```props.item``` with the given item object. |
| `create-form` | Slot to customize the item creation form. |

When building your custom `create-form` or `update-form` you will also need to extend your component with `vec-form-mixin`. See the mixin section below to learn how to integrate with it.

### Events

Each CRUD operation performed on the data fires an event. This component does not alter the data it's given. It's up to the user to decide what to do with it:

| Event | Description |
| --- | --- |
| `add-item` | Emitted when a create-form is submitted. Receives ```item``` object. |
| `update-item` | Emitted when an update-form is saved. Receives ```item``` object. |
| `delete-item` | Emitted when an item is deleted. Receives ```item``` object. |

## Vuetify Easy CRUD Fragment (vec-fragment)
The `vec-fragment` is an auxiliary component used to customize the ```list-view``` slot component. The ```list-view``` component needs to return multiple `<td>` elements at the root level. This functionality is currently planned to be implemented on [Vue 3.0](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf). Until then, this component uses [vue-fragments](https://www.npmjs.com/package/vue-fragments) to achieve the same result.

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

# Mixins

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

