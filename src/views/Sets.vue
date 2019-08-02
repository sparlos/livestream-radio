<template>
  <div class="view-sets">
    <v-container fluid mt-12>
      <v-layout wrap>
        <v-flex xs12 mb-6>
          <div class="title">Your Sets</div>
        </v-flex>
        <v-flex v-for="(set, i) in sets" :key="i" mb-10 mr-5 shrink="0">
          <v-hover v-slot:default="{ hover }">
            <v-card class="mr-3" width="200">
              <div class="set-play">
                <v-btn fab small @click="$emit('loadSet', set)" v-if="hover">
                  <v-icon>play_arrow</v-icon>
                </v-btn>
              </div>
              <div
                @click="$emit('changeViewedSet', set, i)"
                class="set-thumbnail"
                :style="{backgroundImage: 'url(' + set.stations[0].imageUrl + ')'}"
              ></div>
              <v-card-text class="black--text">
                {{set.name}}
                <br />
                <span class="grey--text">
                  {{set.stations.length}}
                  {{1 >= set.stations.length ? 'station' : 'stations'}}
                </span>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Sets",
  props: {
    sets: Array
  },
  data: () => ({
    image: "https://img.youtube.com/vi/hHW1oY26kxQ/sddefault.jpg"
  })
};
</script>

<style scoped lang='scss'>
.set-thumbnail {
  position: relative;
  width: 200px;
  height: 200px;
  background-size: 175% 140%;
  background-position: 50% 50%;

  &:hover {
    cursor: pointer;
  }
}

.set-play {
  position: absolute;
  top: 150px;
  z-index: 5;
  right: 10px;

  &:hover {
    cursor: pointer;
  }
}
</style>