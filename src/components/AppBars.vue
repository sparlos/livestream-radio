<template>
  <div class="app-bars">
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
      <div class="navbar-left">
        <div
          class="navbar-left__item"
          v-for="(item, i) in views"
          :key="i"
          @click="$emit('changeView', item.name)"
        >
          <div class="navbar-left__icon">
            <v-icon :color="item.name === view ? 'blue' : 'black'">{{item.icon}}</v-icon>
          </div>
          <div
            class="navbar-left__text"
            :class="item.name === view ? 'blue--text' : 'black--text'"
          >{{item.name}}</div>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBars",
  props: {
    view: String
  },
  data: () => ({
    views: [
      {
        name: "home",
        icon: "home"
      },
      {
        name: "sets",
        icon: "library_music"
      }
    ]
  })
};
</script>

<style scoped lang='scss'>
.app-bar-heading {
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
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

    &:hover {
      cursor: pointer;
    }

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