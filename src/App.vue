<template>
  <v-app>
    <v-app-bar app>
      <div class="app-bar-heading">
        <span class="font-weight-medium">Livestream </span>
        <span class="blue--text">Radio</span>
      </div>
    </v-app-bar>

    <v-content>
      
    </v-content>

    <v-footer app elevation="8" color="white" height="90">
      <div class="footer-image">
        <v-img
          src="https://img.youtube.com/vi/hHW1oY26kxQ/sddefault.jpg"
          aspect-ratio=".8"
        ></v-img>
      </div>
      <div class="footer-text">
        Station Name
      </div>
      <v-layout align-center justify-center>
        <v-btn class="mx-2" tile large icon color="black">
          <v-icon dark>more_vert</v-icon>
        </v-btn>
        <v-btn class="mx-2" tile large icon color="black">
          <v-icon dark>skip_previous</v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark color="blue">
          <v-icon dark large>play_arrow</v-icon>
        </v-btn>
        <v-btn class="mx-2" tile large icon color="black">
          <v-icon dark>skip_next</v-icon>
        </v-btn>
        <v-icon class="mx-8" color="black">volume_up</v-icon>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.app-bar-heading {
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
}

.footer-image {
  position: absolute;
  height: 100%;
  width: 6.5rem;
  margin-left: -1rem;
  background-color: red;
}

.footer-text {
  position: absolute;
  left: 7.5rem;
}
</style>

<style lang="scss">
.footer-image {
  .v-image__image--cover {
    margin-top: -18px;
  }
}
</style>
