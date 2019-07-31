<template>
  <v-card>
    <v-card-title>
      <span class="headline blue--text">Add a new station</span>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-container gris-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="name"
                label="Station Name*"
                :rules="nameRules"
                required
                @keydown.enter="validate"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="url"
                label="YouTube URL*"
                :rules="urlRules"
                required
                @keydown.enter="validate"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue" text @click="close">Close</v-btn>
      <v-btn color="blue" text @click="validate">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddStationModal",
  data: () => ({
    valid: false,
    name: '',
    url: '',
    nameRules: [v => !!v || "Name is required"],
    urlRules: [
      v => !!v || "URL is required",
      v => /\?v=/.test(v) || "YouTube URL must be valid"
    ]
  }),
  methods: {
    close() {
      this.$emit('closeDialog');
      this.$refs.form.resetValidation();
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('closeDialog');
        this.$emit('addStation', this.name, this.url);
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>

<style scoped lang='scss'>
</style>  