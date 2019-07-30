<template>
  <v-app>
    <v-app-bar app>
      <div class="app-bar-heading">
        <span class="font-weight-medium">Livestream</span>
        <span class="blue--text">Radio</span>
      </div>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex xs6>
            <v-responsive :aspect-ratio="16/9">
              <youtube video-id="hHW1oY26kxQ" ref="youtube" width="100%" height="100%"></youtube>
            </v-responsive>
          </v-flex>
          <v-flex>hello</v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <Footer 
      @footerClick="handleFooterClick"
      @volumeChange="handleVolumeChange"
      :playing="playing"
      :volume.sync="volume"></Footer>
  </v-app>
</template>

<script>
import vueHeadful from "vue-headful";
import Footer from "./components/Footer";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    Footer,
    HelloWorld
  },
  data: () => ({
    //app data
    playing: false,
    volume: 100,
    //user data
    userData: {
      firstVisit: false,
      stations: null,
      sets: null,
      prevVolume: null
    }
  }),
  methods: {
    //footer methods
    handleFooterClick(buttonName, event) {
      console.log(event);
      let player = this.$refs.youtube.player;
      switch (buttonName) {
        case "play_arrow":
          //prevents function from being double triggered 
          //if the play button has focus and user presses spacebar
          if(event.detail == 1) {
            this.toggleVideo();
          }
          break;

        default:
          break;
      }
    },
    handleVolumeChange() {
      
    },
    //video methods
    toggleVideo() {
      let player = this.$refs.youtube.player;
      this.playing ? player.pauseVideo() : player.playVideo();

      this.playing = !this.playing;
    },
    //storage methods
    updateLocalStorage() {
      localStorage.setItem("userData", JSON.stringify(this.userData));
    },
    loadLocalStorage() {
      let storedData = JSON.parse(localStorage.getItem("userData"));

      if (storedData) {
        for (let key in storedData) {
          let value = storedData[key];
          this.userData[key] = value;
        }
      } else {
        console.log("looks like this is your first visit!");
        this.userData.firstVisit = true;
      }
    },
    //listener functions
    addListeners() {
      document.addEventListener("keypress", e => {
        switch (e.code) {
          case "Space":
            this.toggleVideo();
            break;
        }
      });
    }
  },
  watch: {    
    volume(newValue, oldValue) {
      let player = this.$refs.youtube.player;
      player.setVolume(newValue);    
    }
  },
  mounted() {
    //debug seed data
    this.userData.stations = "here are some stations";
    this.userData.sets = "here are some sets";
    this.userData.prevVolume = 50;
    this.updateLocalStorage();
    // debug ends here

    this.addListeners();
    this.loadLocalStorage();
  }
};
</script>

<style lang="scss" scoped>
.app-bar-heading {
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
}
</style>