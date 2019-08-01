<template>
  <div class="context-menu">
    <v-menu v-model="showMenu" offset-y>
      <template v-slot:activator="{ on }">
        <v-icon :color="color" v-on="on">more_vertical</v-icon>
      </template>
      <v-list>
        <v-list-item
          v-for="(option, i) in menuOptions"
          :key="i"
          @click="option.action"
        >
          <v-list-item-title>{{option.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  props: {
    color: String,
    type: String,
    station: Object,
    stationIndex: Number
  },
  data: () => ({
    showMenu: false
  }),
  methods: {
    delete() {
      let snackbarText = `Deleted ${this.station.name} from your stations.`;
      let snackbarButton = 'undo';
      this.$emit('deleteStation', this.stationIndex, snackbarText, snackbarButton);
    },
    addToSet() {
      this.$emit('addToSet', this.station);
    }
  },
  computed: {
    menuOptions() {
      return [
        {
          title: "Add to set",
          action: this.addToSet
        },
        {
          title: "Delete from your stations",
          action: this.delete
        },
      ];
    }
  }
};
</script>

<style scoped lang='scss'>
</style>