# :sparkles: Vuetify Easy Crud

Vuertify Easy Crud extends [vuetify's](https://vuetifyjs.com) v-data-table component to provide easier handling of CRUD operations with less boilerplate code.


## Requirements

Vuetify is included as a peer dependency. This means that:
- You must install it yourself. 
- Vuetify Easy Crud will use an existing version if you already installed it. 
- NPM will warn you when installing this package without a vuetify installation.

For instructions on how to install Vuetify please visit [this quick start guide](https://vuetifyjs.com/en/getting-started/quick-start).

If you are using Vuetify's a la carte system you need to import the following components:
- VDataTable
- VCard, VCardTitle, VCardText, VCardActions
- VDialog, VTextField, VBtn, VIcon
- VSpacer

## Installation

```bash
npm install --save @tmigone/vuetify-easy-crud
```

## Setup
In your ```main.js``` file include the following lines: 

```javascript
import VuetifyEasyCrud from '@tmigone/vuetify-easy-crud'

Vue.use(VuetifyEasyCrud.plugin)
```

## Usage

## Options