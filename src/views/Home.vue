<template>
  <div class="view-home">
    <RecentStations
      @changeStation="changeStation"
      @deleteStation="handleDeleteStation"
      @addToSet="handleAddToSet"
      :stations="userData.stations"
    ></RecentStations>
    <v-container fluid>
      <v-layout>
        <v-flex offset-xs1 xs5 px-5>
          <div class="display-1">Currently Playing</div>
          <div class="title-underline blue mt-3 mb-6"></div>
          <v-responsive v-show="currentStation" :aspect-ratio="16/9">
            <youtube ref="youtube" width="100%" height="100%"></youtube>
          </v-responsive>
          <span v-show="!currentStation">Nothing is currently playing!</span>
        </v-flex>
        <v-flex d-flex xs5 px-5 wrap>
          <v-layout wrap align-content-start>
            <v-flex display-1 class="text-no-wrap">
              <span v-if="currentSet.name">Stations in "{{currentSet.name}}"</span>
              <span v-else>Stations in this Set</span>
            </v-flex>
            <v-flex mt-3 mb-6 xs12>
              <div class="title-underline blue"></div>
            </v-flex>
            <v-flex d-flex xs12 justify-start>
              <v-layout v-if="!currentSet.name">No set loaded!</v-layout>
              <v-layout v-else wrap justify-start align-content-start>
                <v-flex
                  v-for="(station, i) in currentSet.stations"
                  :key="i"
                  mb-12
                  mr-5
                  d-flex
                  shrink="0"
                >
                  <Station
                    :station="station"
                    @changeStation="$emit('changeStation', station)"
                    @removeFromSet="handleRemoveFromSet"
                  ></Station>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import RecentStations from "../components/RecentStations";
import Station from "../components/Station";

export default {
  name: "Home",
  components: {
    RecentStations,
    Station
  },
  props: {
    userData: Object,
    currentSet: Object,
    currentStation: Object
  },
  methods: {
    changeStation(station, stationIndex) {
      this.$emit("changeStation", station, stationIndex);
    },
    handleDeleteStation(stationIndex, snackbarText, snackbarButton) {
      this.$emit("deleteStation", stationIndex, snackbarText, snackbarButton);
    },
    handleAddToSet(station) {
      this.$emit("addToSet", station);
    },
    handleRemoveFromSet(station) {
      this.$emit('removeFromSet', station);
    }
  },
  mounted() {
    this.$emit("setPlayer", this.$refs.youtube.player);
  }
};
</script>

<style scoped lang='scss'>
.title-underline {
  width: 100px;
  height: 2px;
}
</style>