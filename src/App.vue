<template>
  <v-app>
    <!-- vue headful stuff -->
    <vue-headful
      :title="siteTitle"
      :description="`listening to ${currentStation.name} on Livestream Radio`"
    ></vue-headful>

    <AppBars :view="view" @changeView="changeView"></AppBars>

    <!-- add station button & modal -->
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <div class="add-button">
          <v-btn fab dark color="blue" x-large v-on="on">
            <v-icon x-large>add</v-icon>
          </v-btn>
        </div>
      </template>

      <AddStationModal @addStation="addStation" @closeDialog="dialog = false"></AddStationModal>
    </v-dialog>

    <!-- set modal -->
    <v-dialog v-model="setModal" max-width="600px">
      <SetModal
        @closeDialog="setModal = false"
        @createSet="createSet"
        @addToSet="handleAddToSet"
        :sets="userData.sets"
      ></SetModal>
    </v-dialog>

    <v-content>
      <Home
        v-show="view === 'home'"
        key="home"
        :currentSet="currentSet"
        :userData="userData"
        @setPlayer="handleSetPlayer"
        @changeStation="changeStation"
        @deleteStation="deleteStation"
        @addToSet="addToSet"
      ></Home>

      <Sets v-show="view === 'sets'" key="sets" :sets="userData.sets" :currentSet="currentSet"></Sets>

      <!-- snackbar -->
      <v-snackbar v-model="snackbar" :timeout="4000" bottom right>
        {{snackbarText}}
        <v-btn color="pink" text @click="handleSnackbarMethod">{{snackbarButton}}</v-btn>
      </v-snackbar>
    </v-content>

    <Footer
      @footerClick="handleFooterClick"
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
import Set from "./classes/Set";

import AppBars from "./components/AppBars";
import AddStationModal from "./components/AddStationModal";
import SetModal from "./components/SetModal";
import Home from "./views/Home";
import Sets from "./views/Sets";
import Footer from "./components/Footer";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    vueHeadful,
    AppBars,
    AddStationModal,
    SetModal,
    Home,
    Sets,
    Footer,
    HelloWorld
  },
  data: () => ({
    //app data
    playing: false,
    volume: 100,
    currentStation: null,
    currentStationIndex: 0,
    currentSet: {},
    //modal data
    dialog: false,
    setModal: false,
    setModalStation: null,
    player: null,
    //view data
    view: "home",
    //snackbar data
    snackbar: false,
    snackbarText: "",
    snackbarButton: "",
    //undo data
    deletedStation: null,
    //user data
    userData: {
      firstVisit: false,
      stations: null,
      sets: null,
      prevVolume: 10
    }
  }),
  computed: {
    siteTitle() {
      return this.playing
        ? this.currentStation.name + " - Livestream Radio"
        : "Livestream Radio";
    }
  },
  methods: {
    //snackbar methods
    triggerSnackbar(text, button) {
      this.snackbar = true;
      this.snackbarText = text;
      this.snackbarButton = button;
    },
    handleSnackbarMethod() {
      switch (this.snackbarButton) {
        case "undo":
          this.undoDeleteStation();
          break;
        case "close":
          this.snackbar = false;
        default:
          break;
      }
    },
    undoDeleteStation() {
      this.userData.stations.splice(
        this.deletedStation.index,
        0,
        this.deletedStation.station
      );
      this.snackbar = false;
      this.updateLocalStorage();
    },
    //view methods
    changeView(view) {
      this.view = view;
    },
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
    //video methods
    handleSetPlayer(player) {
      this.player = player;
    },
    toggleVideo() {
      this.playing ? this.player.pauseVideo() : this.player.playVideo();

      this.playing = !this.playing;
    },
    //station methods
    changeStation(station, stationIndex) {
      //check if station is in current set; if not, unload current set
      if (this.currentSet.name && !this.currentSet.contains(station)) {
        this.currentSet = {};
        this.triggerSnackbar("current set unloaded", "close");
      }

      this.currentStation = station;
      this.currentStationIndex = stationIndex;
      this.playing = true;

      this.player.loadVideoById(station.id);
    },
    nextStation() {
      //if set loaded
      if (this.currentSet) {
        //
      } else {
      }
    },
    addStation(name, url) {
      this.userData.stations.push(new Station(name, url));
      this.updateLocalStorage();
    },
    deleteStation(stationIndex, snackbarText, snackbarButton) {
      this.deletedStation = {
        station: this.userData.stations[stationIndex],
        index: stationIndex
      };
      this.triggerSnackbar(snackbarText, snackbarButton);
      this.userData.stations.splice(stationIndex, 1);
      this.updateLocalStorage();
    },
    //set methods
    createSetsOnLoad() {
      for (let i = 0; i < this.userData.sets.length; i++) {
        let setData = this.userData.sets[i];
        this.userData.sets.splice(
          i,
          1,
          new Set(setData.name, setData.description, setData.initialStation)
        );
      }
    },
    addToSet(station) {
      this.setModal = true;
      this.setModalStation = station;
    },
    handleAddToSet(setIndex) {
      if(this.userData.sets[setIndex].contains(this.setModalStation)) {
        this.triggerSnackbar('station already exists in set!', 'close');
      } else {
        this.userData.sets[setIndex].add(this.setModalStation);
      }
    },
    createSet(name, description) {
      this.userData.sets.push(new Set(name, description, this.setModalStation));
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
    //listener methods
    addListeners() {
      document.addEventListener("keypress", e => {
        switch (e.code) {
          case "Space":
            if (!this.dialog && !this.setModal) {
              e.preventDefault();
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
      this.userData.prevVolume = newValue;
      this.updateLocalStorage();
    }
  },
  beforeMount() {
    //debug seed data
    let stationSeedData = [
      new Station(
        "Lofi Hip Hop",
        "https://www.youtube.com/watch?v=hHW1oY26kxQ"
      ),
      new Station(
        "Lofi Hip Hop 2",
        "https://www.youtube.com/watch?v=SGwXjk8MsWY"
      ),
      new Station(
        "Hype Radio",
        "https://www.youtube.com/watch?v=GVC5adzPpiE"
      )
    ];
    this.userData.stations = stationSeedData;
    this.userData.sets = [
      new Set("Skrubtown Radio", "this is a skrub station", stationSeedData[0])
    ];
    this.userData.prevVolume = 50;
    this.currentStation = this.userData.stations[0];
    this.currentStationIndex = 0;
    this.updateLocalStorage();

    // debug ends here

    this.loadLocalStorage();

    //localStorage stores only object data, not class data
    //on load, recreates Set classes based on localStorage 'set' data
    this.createSetsOnLoad();
    this.currentSet = this.userData.sets[0];
    this.userData.sets[0].add(stationSeedData[2]);

  },
  mounted() {
    this.player.loadVideoById(this.userData.stations[0].id).then(() => {
      this.player.stopVideo();
      this.volume = this.userData.prevVolume;
    });
    this.addListeners();
  }
};
</script>

<style lang="scss" scoped>
//add button styling
.add-button {
  position: fixed;
  right: 50px;
  top: 100px;
  width: 100px;
  height: 100px;
  z-index: 100;
}
</style>