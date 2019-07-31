<template>
  <div class="view-home">
    <RecentStations @changeStation="changeStation" :stations="userData.stations"></RecentStations>
      <v-container fluid>
        <v-layout>
          <v-flex offset-xs1 xs5 px-5>
            <div class="display-1">Currently Playing</div>
            <div class="title-underline blue mt-3 mb-6"></div>
            <v-responsive :aspect-ratio="16/9">
              <youtube ref="youtube" width="100%" height="100%"></youtube>
            </v-responsive>
          </v-flex>
          <v-flex d-flex xs5 px-5 wrap>
            <v-layout wrap align-content-start>
              <v-flex display-1>Stations in this Set</v-flex>
              <v-flex mt-3 mb-6 xs12>
                <div class="title-underline blue"></div>
              </v-flex>
              <v-flex d-flex xs12>
                <v-layout wrap justify-space-around align-content-start>
                  <v-flex v-for="i in 8" :key="i" mb-12 d-flex>
                    <Station></Station>
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
  name: 'Home',
  components: {
    RecentStations,
    Station
  },
  props: {
    userData: Object
  },
  methods: {
    changeStation(station) {
      this.$emit('changeStation', station);
    }
  },
  mounted() {
    this.$emit('setPlayer', this.$refs.youtube.player);
  }
}

</script>

<style scoped lang='scss'>
.title-underline {
  width: 100px;
  height: 2px;
}
</style>