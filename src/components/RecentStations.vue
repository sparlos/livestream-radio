<template>
  <v-container fluid mb-4>
    <v-layout wrap justify-start px-5>
      <v-flex xs12 my-4 offset-xs1 font-weight-medium class="text--underline">Your Stations</v-flex>
      <v-flex d-flex offset-xs1>
        <v-layout wrap justify-start class="stations">
          <v-flex v-for="(station, i) in stations" :key="i" shrink mr-4 mb-8>
            <v-hover v-slot:default="{ hover }">
              <div class="thumbnail" :title="station.name">
                <v-img
                  :src="station.imageUrl"
                  aspect-ratio="1"
                  height="80"
                  @click="$emit('changeStation', station)"
                ></v-img>
                <div class="thumbnail__more">
                  <ContextMenu
                    color="white"
                    type="station"
                    @deleteStation="handleDeleteStation"
                    @addToSet="handleAddToSet"
                    :station="station"
                    :stationIndex="i"
                  ></ContextMenu>
                </div>
                <div
                  class="thumbnail__play"
                  v-if="hover"
                  @click="$emit('changeStation', station, i)"
                >
                  <v-icon color="white">play_circle_filled</v-icon>
                </div>
                <div class="thumbnail__text subtitle-2" v-if="hover">{{station.name}}</div>
              </div>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContextMenu from "../components/ContextMenu";

export default {
  name: "RecentStations",
  components: {
    ContextMenu
  },
  props: {
    stations: Array
  },
  methods: {
    handleDeleteStation(stationIndex, snackbarText, snackbarButton) {
      this.$emit("deleteStation", stationIndex, snackbarText, snackbarButton);
    },
    handleAddToSet(station) {
      this.$emit("addToSet", station);
    }
  }
};
</script>

<style scoped lang='scss'>
.stations {
  max-height: 150px;
  overflow-y: hidden;;
}

.text--underline {
  text-decoration: underline;
}

.thumbnail {
  height: 100%;
  width: 8.5rem;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &__more {
    position: absolute;
    top: 5px;
    left: 107px;
  }

  &__play {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  &__text {
    position: absolute;
    bottom: -25px;
    left: 0;
    white-space: nowrap;
  }
}
</style>