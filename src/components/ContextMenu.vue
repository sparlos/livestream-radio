<template>
  <div class="context-menu">
    <v-menu v-model="showMenu" offset-y>
      <template v-slot:activator="{ on }">
        <v-icon :color="color" v-on="on">more_vertical</v-icon>
      </template>
      <v-list>
        <v-list-item v-for="(option, i) in menuOptions" :key="i" @click="option.action">
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
    stationIndex: Number,
    set: Object,
    setIndex: Number
  },
  data: () => ({
    showMenu: false
  }),
  methods: {
    deleteStation() {
      let snackbarText = `Deleted ${this.station.name} from your stations.`;
      let snackbarButton = "undo";
      this.$emit(
        "deleteStation",
        this.stationIndex,
        snackbarText,
        snackbarButton
      );
    },
    deleteSet() {
      let snackbarText = `Deleted ${this.set.name} from your sets.`;
      let snackbarButton = "close";
      this.$emit(
        "deleteSet",
        this.setIndex,
        snackbarText,
        snackbarButton
      )
    },
    addToSet() {
      this.$emit("addToSet", this.station);
    }
  },
  computed: {
    menuOptions() {
      switch (this.type) {
        case "station":
          return [
            {
              title: "Add to set",
              action: this.addToSet
            },
            {
              title: "Delete from your stations",
              action: this.deleteStation
            }
          ];
          break;
        
        case "set":
          return [
            {
              title: "Delete set",
              action: this.deleteSet
            }
          ]
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
</style>