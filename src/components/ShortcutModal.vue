<template>
  <v-dialog v-model="modalStatus" max-width="350">
    <v-card>
      <v-card-title>Keyboard Shortcuts</v-card-title>
      <v-card-text>
        <v-layout wrap>
          <v-flex class="shortcut" xs12 d-flex v-for="(shortcut, i) in shortcuts" :key="i">
            <v-layout align-center>
              <v-flex xs5>
                <v-btn>
                  <v-icon v-if="shortcut.icon">{{shortcut.key}}</v-icon>
                  <span v-else>{{shortcut.key}}</span>
                </v-btn>
              </v-flex>
              <v-flex xs7 class="shortcut__text" :class="darkMode ? 'white--text' : 'black--text'">
                {{shortcut.text}}
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ShortcutModal',
  props: {
    modal: Boolean,
    darkMode: Boolean
  },
  data: () => ({
    shortcuts: [
      {
        key: 'spacebar',
        icon: false,
        text: 'Play/Pause'
      },
      {
        key: 'a',
        icon: false,
        text: 'Add a Station'
      },
      {
        key: 'arrow_forward',
        icon: true,
        text: 'Go Forward in Set'
      },
      {
        key: 'arrow_back',
        icon: true,
        text: 'Go Back in Set'
      },
    ]
  }),
  computed: {
    modalStatus: {
      get() {
        return this.modal;
      },
      set(newValue) {
        this.$emit('update:modal', newValue);
        return newValue;
      }
    }
  }
}

</script>

<style scoped lang='scss'>
.shortcut {
  margin-top: 10px;
  &__text {
    margin-left: 10px;
  }
}
</style>