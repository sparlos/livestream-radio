<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        <span class="headline blue--text">Edit set info</span>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container gris-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="name"
                label="Set Name*"
                :rules="nameRules"
                required
                @keydown.enter="validate"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="description"
                label="Set Description*"
                :rules="descriptionRules"
                required
                @keydown.enter="validate"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <small>*indicates required field</small>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="close">Close</v-btn>
        <v-btn color="blue" text @click="validate">Save</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "EditSetModal",
  props: {
    set: Object,
    setIndex: Number
  },
  data: () => ({
    valid: false,
    name: "",
    description: "",
    nameRules: [v => !!v || "Name is required"],
    descriptionRules: [
      v => !!v || "Description is required"
    ]
  }),
  methods: {
    close() {
      this.$emit("closeDialog");
      this.$refs.form.resetValidation();
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit("closeDialog");
        this.$emit("updateSet", this.setIndex, this.name, this.description);
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    }
  },
  beforeMount() {
    this.name = this.set.name;
    this.description = this.set.description;
  }
};
</script>

<style scoped lang='scss'>
</style>