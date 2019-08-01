<template>
  <v-container class="set-container" v-if="set.stations">
    <!-- header section -->
    <v-layout>
      <v-flex shrink="0">
        <div class="set-thumbnail" :style="{backgroundImage: displayedImage}"></div>
      </v-flex>
      <v-flex d-flex shrink="0" wrap ml-5 align-start>
        <v-layout wrap align-start>
          <v-flex d-flex xs12>
            <v-layout align-center>
              <div class="set-name display-1">{{set.name}}</div>
              <v-icon color="black" class="ml-1 set-play">play_circle_filled</v-icon>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="grey--text">{{set.description}}</v-flex>
          <v-flex xs12 class="grey--text">
            {{set.stations.length}}
            {{1 >= set.stations.length ? 'station' : 'stations'}}
            in this set
          </v-flex>
          <v-flex d-flex mt-1 shrink>
            <v-layout align-center>
              <v-flex shrink="0" mr-5>
                <v-btn text color-text="black" @click="$emit('triggerModal')">
                  <v-icon left>mdi-pencil</v-icon>Edit
                </v-btn>
              </v-flex>
              <v-flex>
                <ContextMenu
                  color="black"
                  type="set"
                  :set="set"
                  :setIndex="setIndex"
                  @deleteSet="handleDeleteSet"></ContextMenu>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- stations section -->
    <v-layout justify-center mt-6>
      <v-flex>
        <v-card max-width="100%">
          <v-card-title class="font-weight-medium">
            Stations in {{set.name}}
          </v-card-title>
          <v-card-text>
            <v-layout justify-start mt-2>
              <v-flex v-for="(station, i) in set.stations" :key="i" mb-8 shrink mx-3>
                <Station :station="station" @changeStation="$emit('changeStation', station)"></Station>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Station from "../components/Station";
import ContextMenu from "../components/ContextMenu";

export default {
  name: "SetView",
  components: {
    Station,
    ContextMenu
  },
  props: {
    set: Object,
    setIndex: Number
  },
  computed: {
    displayedImage() {
      return (
        "url(" + this.set.stations[this.set.stations.length - 1].imageUrl + ")"
      );
    }
  },
  methods: {
    handleDeleteSet(index, snackbarText, snackbarButton) {
      this.$emit("deleteSet", index, snackbarText, snackbarButton, this.set);
    }
  }
};
</script>

<style scoped lang='scss'>
.set-container {
  margin-top: 70px;
}

.set-play {
  font-size: 60px;
}

.set-thumbnail {
  width: 200px;
  height: 200px;
  background-size: 175% 140%;
  background-position: 50% 50%;
}

.set-more {

  &:hover {
    cursor: pointer;
  }
}
</style>