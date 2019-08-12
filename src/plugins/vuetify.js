import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        backgroundColor: "#FAFAFA",

      },
      dark: {
        backgroundColor: "#303030",
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
