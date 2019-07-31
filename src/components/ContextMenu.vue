<template>
  <v-menu 
    v-model="showMenu"
    offset-y>
    <template v-slot:activator="{ on }">
      <v-icon :color="color" v-on="on">more_vertical</v-icon>
    </template>
    <v-list>
      <v-list-item v-for="(option, i) in menuOptions" :key="i"  @click="option.action('lofi hip hop')">
        <v-list-item-title>
          {{option.title}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    color: String,
    type: String
  },
  data: () => ({
    showMenu: false
  }),
  methods: {
    delete(station) {
      console.log('you are about to delete ' + station);
    }
  },
  computed: {
    menuOptions() {
      return [
        {
          title: 'Delete from your stations',
          action: this.delete
        }
      ]
    }
  }
}

</script>

<style scoped lang='scss'>

</style>