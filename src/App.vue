<template>
  <v-app>
    <!-- vue headful stuff -->
    <vue-headful
      v-if="currentStation"
      :title="siteTitle"
      :description="`listening to ${currentStation.name} on Livestream Radio`"
    ></vue-headful>

    <AppBars :view="view" @changeView="changeView"></AppBars>

    <!-- ==== MODALS ===== -->

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

    <!-- edit set modal -->
    <v-dialog v-model="editSetModal" max-width="600px">
      <EditSetModal
        :set="viewedSet"
        :setIndex="viewedSetIndex"
        @closeDialog="editSetModal = false"
        @updateSet="updateSet"
      ></EditSetModal>
    </v-dialog>

    <v-content>
      <Home
        v-show="view === 'home'"
        key="home"
        :currentSet="currentSet"
        :currentStation="currentStation"
        :userData="userData"
        @setPlayer="handleSetPlayer"
        @changeStation="changeStation"
        @deleteStation="deleteStation"
        @addToSet="addToSet"
        @removeFromSet="removeFromSet"
      ></Home>

      <Sets
        v-show="view === 'sets'"
        key="sets"
        :sets="userData.sets"
        :currentSet="currentSet"
        @changeViewedSet="changeViewedSet"
        @loadSet="loadSet"
      ></Sets>

      <SetView
        v-show="view === 'set'"
        key="set"
        :set="viewedSet"
        :setIndex="viewedSetIndex"
        @deleteSet="deleteSet"
        @triggerModal="triggerEditSetModal"
        @changeStation="changeStation"
        @loadSet="loadSet"
        @removeFromSet="removeFromSet"
      ></SetView>

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
// modal imports
import AddStationModal from "./components/AddStationModal";
import SetModal from "./components/SetModal";
import EditSetModal from "./components/EditSetModal";

import Home from "./views/Home";
import Sets from "./views/Sets";
import SetView from "./views/SetView";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    vueHeadful,
    AppBars,
    AddStationModal,
    EditSetModal,
    SetModal,
    Home,
    Sets,
    SetView,
    Footer
  },
  data: () => ({
    //app data
    playing: false,
    volume: 100,
    currentStation: null,
    currentStationIndex: 0,
    currentSet: {},
    currentSetIndex: 0,
    stationInSetIndex: 0,
    viewedSet: {},
    viewedSetIndex: null,
    //modal data
    dialog: false,
    setModal: false,
    setModalStation: null,
    editSetModal: false,
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
      stations: [],
      sets: [],
      prevVolume: 10
    }
  }),
  computed: {
    siteTitle() {
      return this.playing
        ? this.currentStation.name + " - Livestream Radio"
        : "Livestream Radio";
    },
    modalOpen() {
      if (this.dialog || this.setModal || this.editSetModal) return true;
      return false;
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
          if (event.detail == 1 && this.currentStation) {
            this.toggleVideo();
          }
          break;

        case "skip_previous":
          this.previousStation();
          break;

        case "skip_next":
          this.nextStation();
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
      this.currentStation = station;
      this.currentStationIndex = stationIndex;

      this.playing = true;
      this.player.loadVideoById(station.id);
    },
    addStation(name, url) {
      let newStation = new Station(name, url);
      this.userData.stations.push(newStation);
      this.updateLocalStorage();
      if (!this.currentStation) {
        this.changeStation(newStation, 0);
      }
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
          new Set(
            setData.name,
            setData.description,
            setData.initialStation,
            setData.stations
          )
        );
      }
    },
    loadSet(set) {
      this.currentSet = set;
      for (let i = 0; i < this.userData.sets.length; i++) {
        if (this.userData.sets[i] === set) {
          console.log("match found!");
          this.currentSetIndex = i;
          break;
        }
      }
      this.changeStation(set.stations[0], 0);
      this.stationInSetIndex = 0;
    },
    changeViewedSet(set, index) {
      this.viewedSet = set;
      this.viewedSetIndex = index;
      this.changeView("set");
    },
    addToSet(station) {
      this.setModal = true;
      this.setModalStation = station;
    },
    handleAddToSet(setIndex) {
      if (this.userData.sets[setIndex].contains(this.setModalStation)) {
        this.triggerSnackbar("station already exists in set!", "close");
      } else {
        this.userData.sets[setIndex].add(this.setModalStation);
        this.triggerSnackbar(
          `${this.setModalStation.name} added to ${this.userData.sets[setIndex].name}!`,
          "close"
        );
      }
      this.updateLocalStorage();
    },
    createSet(name, description) {
      this.userData.sets.push(new Set(name, description, this.setModalStation));
      this.triggerSnackbar(`created ${name}!`, "close");
      this.updateLocalStorage();
    },
    deleteSet(index, snackbarText, snackbarButton, set) {
      if (this.view === "set" && this.viewedSet === set) {
        this.changeView("home");
      }
      if (set === this.currentSet) {
        this.currentSet = {};
      }

      this.userData.sets.splice(index, 1);
      this.triggerSnackbar(snackbarText, snackbarButton);
    },
    triggerEditSetModal() {
      this.editSetModal = true;
    },
    updateSet(index, name, description) {
      this.$set(this.userData.sets[index], "name", name);
      this.$set(this.userData.sets[index], "description", description);
    },
    removeFromSet(station) {
      let setIndex = 0;
      if (this.view === "set") {
        setIndex = this.viewedSetIndex;
      } else if (this.view === "home") {
        removeIndex = this.currentSetIndex;
      }

      //edge case of last station in set
      if (this.userData.sets[setIndex].stations.length <= 1) {
        console.log("last one in set!");
        this.deleteSet(
          setIndex,
          `${station.name} removed and ${this.userData.sets[setIndex].name} deleted`,
          "close",
          this.userData.sets[setIndex]
        );
        console.log("last one in set!");
        this.updateLocalStorage();
        return;
      }

      let removeIndex = 0;

      for (let i = 0; i < this.userData.sets[setIndex].stations.length; i++) {
        if (station === this.userData.sets[setIndex].stations[i]) {
          removeIndex = i;
          break;
        }
      }

      this.userData.sets[setIndex].stations.splice(removeIndex, 1);

      this.triggerSnackbar(`${station.name} removed from ${this.userData.sets[setIndex].name}`, "close");

      this.updateLocalStorage();
    },
    //station switch methods
    nextStation() {
      if (this.currentSet.name) {
        if (this.stationInSetIndex >= this.currentSet.stations.length - 1) {
          this.stationInSetIndex = 0;
        } else {
          this.stationInSetIndex++;
        }
        this.changeStation(
          this.currentSet.stations[this.stationInSetIndex],
          this.stationInSetIndex
        );
      }
    },
    previousStation() {
      if (this.currentSet.name) {
        if (this.stationInSetIndex <= 0) {
          this.stationInSetIndex = this.currentSet.stations.length - 1;
        } else {
          this.stationInSetIndex--;
        }
        this.changeStation(
          this.currentSet.stations[this.stationInSetIndex],
          this.stationInSetIndex
        );
      }
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
        this.updateLocalStorage();
      }
    },
    //listener methods
    addListeners() {
      document.addEventListener("keypress", e => {
        switch (e.code) {
          case "Space":
            if (!this.modalOpen) {
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
    // let stationSeedData = [
    //   new Station(
    //     "Lofi Hip Hop",
    //     "https://www.youtube.com/watch?v=hHW1oY26kxQ"
    //   ),
    //   new Station(
    //     "Lofi Hip Hop 2",
    //     "https://www.youtube.com/watch?v=SGwXjk8MsWY"
    //   ),
    //   new Station("Hype Radio", "https://www.youtube.com/watch?v=GVC5adzPpiE")
    // ];
    // this.userData.stations = stationSeedData;
    // this.userData.sets = [
    //   new Set("Skrubtown Radio", "this is a skrub station", stationSeedData[0])
    // ];
    // this.userData.prevVolume = 50;
    // this.currentStation = this.userData.stations[0];
    // this.currentStationIndex = 0;
    // this.updateLocalStorage();

    // debug ends here

    this.loadLocalStorage();

    //localStorage stores only object data, not class data
    //on load, recreates Set classes based on localStorage 'set' data
    if (this.userData.sets) {
      this.createSetsOnLoad();
    }
    // this.currentSet = this.userData.sets[0];
    // this.userData.sets[0].add(stationSeedData[2]);
  },
  mounted() {
    // this.player.loadVideoById(this.userData.stations[0].id).then(() => {
    //   this.player.stopVideo();
    //   this.volume = this.userData.prevVolume;
    // });

    if (!this.currentStation && this.userData.stations[0]) {
      this.changeStation(this.userData.stations[0], 0);
      this.playing = false;
      this.player.stopVideo();
    }
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