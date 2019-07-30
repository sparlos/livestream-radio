<template>
  <v-footer app elevation="8" color="white" height="90">
    <div class="footer-image">
      <v-img src="https://img.youtube.com/vi/hHW1oY26kxQ/sddefault.jpg" aspect-ratio=".8"></v-img>
    </div>
    <div class="footer-text">Station Name</div>
    <v-layout align-center justify-center>
      <v-btn v-for="icon in icons" :key="icon.name" v-bind="icon.attributes" @click="$emit('footerClick', icon.name, $event)">
        <v-icon dark v-if="icon.name !== 'play_arrow'">{{icon.name}}</v-icon>
        <v-icon v-else dark large>{{toggleIcon}}</v-icon>
      </v-btn>

      <div class="mx-8 volume-slider">
        <v-icon color="black">volume_up</v-icon>
        <div class="volume-slider__bar">
          <v-slider
            @input="volumeChange"
            :value="volume"
          ></v-slider>
        </div>
      </div>
    </v-layout>
  </v-footer>
</template>

<script>
class Icon {
  constructor(name, options) {
    this.name = name;
    this.attributes = {
      tile: true,
      large: true,
      icon: true,
      color: "black"
    };
    for (let attr in options) {
      let value = options[attr];
      this.attributes[attr] = value;
    }
  }
}

export default {
  name: "Footer",
  props: {
    playing: Boolean,
    volume: Number
  },
  data: () => ({
    icons: [
      new Icon("more_vert"),
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
    }
  },
  methods: {
    volumeChange(payload) {
      this.$emit('update:volume', payload);
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
  background-color: red;
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
