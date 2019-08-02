<template>
  <v-hover v-slot:default="{ hover }">
    <div class="station elevation-5" :style="{backgroundImage: 'url(' + station.imageUrl + ')'}">
      <div class="station__icon" v-if="hover">
        <v-btn fab color="white" @click="$emit('changeStation', station)">
          <v-icon class="station__icon" dark large>play_arrow</v-icon>
        </v-btn>
      </div>
      <div class="station__name caption black--text">
        {{station.name}}
      </div>
      <div class="station__menu">
        <ContextMenu
          color="black"
          type="stationInSet"
          :station="station"
          @removeFromSet="handleRemoveFromSet"
        ></ContextMenu>
      </div>
    </div>
  </v-hover>
</template>

<script>
import ContextMenu from "../components/ContextMenu";

export default {
  name: 'Station',
  props: {
    station: Object
  },
  components: {
    ContextMenu
  },
  methods: {
    handleRemoveFromSet(station) {
      this.$emit('removeFromSet', station);
    }
  }
}

</script>

<style scoped lang='scss'>
.station {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-size: 250px 210px;
  background-position: 50% 50%;
  border: 3px solid white;
  position: relative;

  &__name {
    position: absolute;
    bottom: -28px;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
  }

  &__icon {
    position: absolute;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:hover {
      cursor: pointer;
    }
  }

  &__menu {
    position: absolute;
    bottom: -30px;
    left: 85%;
  }
}
</style>