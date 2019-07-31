<template>
  <v-card>
    <v-card-text>
      <!-- Add to existing set -->
      <v-card-title>
        <span class="headline blue--text">Add to set</span>
      </v-card-title>
      <v-form ref="existingSet">
        <v-container>
          <v-layout wrap>
            <v-flex xs12>
              <v-select 
                :items="setsWithIndex" 
                v-model="existingSet"
                label="choose a set"
                item-text="name"
                item-value="index"
                :rules="existingSetRules"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="addToSet">add to set</v-btn>
        </v-card-actions>
      </v-form>
      <!-- Create new set & add -->
      <v-card-title class="headline blue--text">Or create a new set & add</v-card-title>
      <v-form v-model="newSetValid" ref="newSet">
        <v-container>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="setName"
                label="Set Name*"
                :rules="setNameRules"
                required
                @keydown.enter="validate"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="setDescription"
                label="Set Description*"
                :rules="setDescriptionRules"
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
        <v-btn color="blue" text @click="validate">Create & add</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SetModal",
  props: {
    sets: Array
  },
  data: () => ({
    newSetValid: false,
    existingSet: "",
    existingSetRules: [v => !!v || "You must select an option"],
    setName: "",
    setNameRules: [v => !!v || "Name is required"],
    setDescription: "",
    setDescriptionRules: [
      v => !!v || "Description is required"
    ]
  }),
  computed: {
    setsWithIndex() {
      let returnArr = [];
      for(let i=0; i<this.sets.length; i++) {
        let returnObj = this.sets[i];
        returnObj.index = i;
        returnArr.push(returnObj);
      }
      return returnArr;
    }
  },
  methods: {
    close() {
      this.$emit("closeDialog");
      this.$refs.newSet.resetValidation();
      this.$refs.existingSet.resetValidation();
    },
    addToSet() {
      if (this.$refs.existingSet.validate()) {
        this.$emit("closeDialog");
        this.$emit("addToSet", this.existingSet);
        this.$refs.exisitingSet.reset();
        this.$refs.existingSet.resetValidation();
      }
    },
    validate() {
      if (this.$refs.newSet.validate()) {
        this.$emit("closeDialog");
        this.$emit("createSet", this.setName, this.setDescription);
        this.$refs.newSet.reset();
        this.$refs.newSet.resetValidation();
      }
    }
  }
};
</script>

<style scoped lang='scss'>
</style>