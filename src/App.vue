<template>
  <v-app>
    <!-- vue headful stuff -->
    <vue-headful
      :title="siteTitle"
      :description="`listening to ${currentStation.name} on Livestream Radio`"
    ></vue-headful>

    <v-app-bar app clipped-left clipped-right>
      <div class="app-bar-heading">
        <span class="font-weight-medium">Livestream</span>
        <span class="blue--text">Radio</span>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      app
      color="grey lighten-5"
      floating
      clipped
      permanent
      height="200"
      width="100"
    >
      <div class="navbar-left black--text">
        <div class="navbar-left__item">
          <div class="navbar-left__icon">
            <v-icon color="blue">home</v-icon>
          </div>
          <div class="navbar-left__text blue--text">home</div>
        </div>
        <div class="navbar-left__item">
          <div class="navbar-left__icon">
            <v-icon color="black">library_music</v-icon>
          </div>
          <div class="navbar-left__text">sets</div>
        </div>
      </div>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <div class="add-button">
          <v-btn fab dark color="blue" x-large v-on="on">
            <v-icon x-large>add</v-icon>
          </v-btn>
        </div>
      </template>
      
      <AddStationModal
        @addStation="addStation"
        @closeDialog="dialog = false"></AddStationModal>
    </v-dialog>

    <v-content>
      <Home
        v-show="view === 'home'"
        :userData="userData"
        @setPlayer="handleSetPlayer"
        @changeStation="changeStation"></Home>
    </v-content>

    <Footer
      @footerClick="handleFooterClick"
      @volumeChange="handleVolumeChange"
      :playing="playing"
      :volume.sync="volume"
      :currentStation="currentStation"
    ></Footer>

    <v-navigation-drawer
      app
      color="grey lighten-5"
      floating
      clipped
      height="200"
      permanent
      right
      width="100"
    ></v-navigation-drawer>
  </v-app>
</template>

<script>
import vueHeadful from "vue-headful";

import Station from "./classes/Station";

import AddStationModal from "./components/AddStationModal";
import Home from "./views/Home";
import Footer from "./components/Footer";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    vueHeadful,
    AddStationModal,
    Home,
    Footer,
    HelloWorld
  },
  data: () => ({
    //app data
    playing: false,
    volume: 100,
    currentStation: null,
    dialog: false,
    player: null,
    view: 'home',
    //user data
    userData: {
      firstVisit: false,
      stations: null,
      sets: null,
      prevVolume: null
    }
  }),
  computed: {
    siteTitle() {
      return this.playing ? this.currentStation.name +' - Livestream Radio' : "Livestream Radio";
    }
  },
  methods: {
    //footer methods
    handleFooterClick(buttonName, event) {
      switch (buttonName) {
        case "play_arrow":
          //prevents function from being double triggered
          //if the play button has focus and user presses spacebar
          if (event.detail == 1) {
            this.toggleVideo();
          }
          break;

        default:
          break;
      }
    },
    handleVolumeChange() {},
    //video methods
    handleSetPlayer(player) {
      this.player = player;
    },
    toggleVideo() {
      this.playing ? this.player.pauseVideo() : this.player.playVideo();

      this.playing = !this.playing;
    },
    //station methods
    changeStation(station) {
      this.currentStation = station;
      this.playing = true;

      this.player.loadVideoById(station.id);
    },
    addStation(name, url) {
      this.userData.stations.push(new Station(name, url));
      this.updateLocalStorage();
    },
    //storage methods
    updateLocalStorage() {
      localStorage.setItem("userData", JSON.stringify(this.userData));
    },
    loadLocalStorage() {
      let storedData = JSON.parse(localStorage.getItem("userData"));

      if (storedData) {
        this.userData = storedData;
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
            if(!this.dialog) {
              this.toggleVideo();
            }
            break;
        }
      });
    }
  },
  watch: {
    volume(newValue, oldValue) {
      this.player.setVolume(newValue);
    }
  },
  beforeMount() {
    //debug seed data
    // let stationSeedData = [
    //   new Station(
    //     "Lofi Hip Hop",
    //     "https://www.youtube.com/watch?v=hHW1oY26kxQ"
    //   ),
    //   new Station(
    //     "Lofi Hip Hop 2",
    //     "https://www.youtube.com/watch?v=SGwXjk8MsWY"
    //   )
    // ];
    // this.userData.stations = stationSeedData;
    // this.userData.sets = "here are some sets";
    // this.userData.prevVolume = 50;
    // this.updateLocalStorage();
    // debug ends here

    this.loadLocalStorage();
    this.currentStation = this.userData.stations[0];
  },
  mounted() {
    this.addListeners();
  }
};
</script>

<style lang="scss" scoped>
.app-bar-heading {
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
}

//add button styling
.add-button {
  position: fixed;
  right: 50px;
  top: 100px;
  width: 100px;
  height: 100px;
  z-index: 100;
}

//navbar left styling
.navbar-left {
  display: flex;
  flex-wrap: wrap;

  &__item {
    flex: 0 1 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    font-size: 12px;
    color: black;

    & * {
      text-align: center;
      flex: 0 1 100%;
    }
  }
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>