<template>
  <div class="view-sets">
    <v-container fluid mt-12>
      <v-layout wrap>
        <v-flex xs12 mb-6>
          <div class="title">Your Sets</div>
        </v-flex>
        <v-flex v-for="(set, i) in sets" :key="i" mb-10>
          <v-card class="mr-3" width="200">
            <div
              class="set-thumbnail"
              :style="{backgroundImage: 'url(' + set.stations[set.stations.length-1].imageUrl + ')'}"
            ></div>
            <v-card-text class="black--text">
              {{set.name}}
              <br />
              {{set.stations.length}} 
              {{set.stations.length <= 1 ? 'station' : 'stations'}}
            </v-card-text>
          </v-card>
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
  width: 200px;
  height: 200px;
  background-size: 175% 140%;
  background-position: 50% 50%;
}
</style>