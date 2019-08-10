<template>
  <div>
    <v-footer app elevation="8"  height="90">
      <div class="footer-image">
        <v-img v-if="currentStation" :src="currentStation.imageUrl" aspect-ratio=".8"></v-img>
      </div>
      <div class="footer-text" v-if="currentStation">{{currentStation.name}}</div>
      <v-layout align-center justify-center>
        <v-btn v-for="icon in icons" :key="icon.name" v-bind="icon.attributes"  @click.stop="footerClick(icon.name, $event)">
          <v-icon dark v-if="icon.name !== 'play_arrow'">{{icon.name}}</v-icon>
          <v-icon v-else dark large>{{toggleIcon}}</v-icon>
        </v-btn>

        <div class="mx-8 volume-slider">
          <v-icon :color="whiteOrBlack">volume_up</v-icon>
          <div class="volume-slider__bar">
            <v-slider
              @input="volumeChange"
              :value="volume"
            ></v-slider>
          </div>
        </div>
      </v-layout>
    </v-footer>
    <ShortcutModal :modal.sync="shortcutModal"></ShortcutModal>
  </div>
</template>

<script>
import ShortcutModal from './ShortcutModal';

class Icon {
  constructor(name, options) {
    this.name = name;
    this.attributes = {
      tile: true,
      large: true,
      icon: true,
      color: 'black'
    };
    for (let attr in options) {
      let value = options[attr];
      this.attributes[attr] = value;
    }
  }
}

export default {
  name: "Footer",
  components: {
    ShortcutModal
  },
  props: {
    playing: Boolean,
    volume: Number,
    currentStation: Object,
    darkMode: Boolean,
    backgroundColor: String
  },
  data: () => ({
    shortcutModal: false,
    icons: [
      new Icon("keyboard"),
      new Icon("skip_previous"),
      new Icon("play_arrow", {
        tile: false,
        large: false,
        icon: false,
        fab: true,
        dark: true,
        color: "blue"
      }),
      new Icon("skip_next")
    ]
  }),
  computed: {
    toggleIcon() {
      return this.playing ? 'pause' : 'play_arrow';
    },
    whiteOrBlack(){
      return this.darkMode ? 'white' : 'black';
    }
  },
  methods: {
    footerClick(iconName, event) {
      if(iconName === 'keyboard') {
        this.shortcutModal = true;
      } else {
        this.$emit('footerClick', iconName, event);
      }
    },
    volumeChange(payload) {
      this.$emit('update:volume', payload);
    },
    changeIconColor(){
      this.icons.map(icon =>{      
      if(icon.name !== 'play_arrow'){
          icon.attributes.color = this.whiteOrBlack;
        };
      });
    }
  },
  beforeMount(){
      this.changeIconColor();
  },
  watch: {
    darkMode(){
      this.changeIconColor();
    }
  }
};
</script>

<style scoped lang='scss'>
.footer-image {
  position: absolute;
  height: 100%;
  width: 6.5rem;
  margin-left: -1rem;
}

.footer-text {
  position: absolute;
  left: 7.5rem;
}

.volume-slider {
  position: relative;
  &__bar {
    width: 150px;
    position: absolute;
    top: -5px;
    left: 34px;
  }
}
</style>

<style lang='scss'>
.footer-image {
  .v-image__image--cover {
    margin-top: -18px;
  }
}
</style>
