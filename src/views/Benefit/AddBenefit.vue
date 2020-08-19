<template>
  <div class="container mt-4">
    <div class="d-sm-flex align-items-center justify-content-between">
      <h1 class="display-4">Add Benefit</h1>
      <router-link
        to="/benefit"
        class="d-none d-sm-inline-block btn btn-sm btn-outline-primary shadow-sm"
      >
        <b-icon icon="arrow-left"></b-icon>Back
      </router-link>
    </div>

    <b-form>
      <label for="costperdependent">Title</label>
      <b-input id="name" class="col-md-6" required v-model="title" placeholder="A simple title"></b-input>
      <label class="mt-3" for="costperdependent">Cost per year</label>
      <b-input
        id="costperyear"
        class="col-md-1"
        required
        v-model="costPerYear"
        placeholder="1000.00"
      ></b-input>
      <label class="mt-3" for="costperdependent">Cost per dependent</label>
      <b-input
        id="costperdependent"
        class="col-md-1"
        required
        v-model="costPerDependent"
        placeholder="250.00"
      ></b-input>
      <b-button variant="primary" class="mt-2" v-on:click="addBenefit">
        <b-icon icon="plus"></b-icon>Add Benefit
      </b-button>
      <router-link to="/benefit" class="btn btn-outline-secondary mt-2 ml-2">Cancel</router-link>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "addbenefit",
  data() {
    return {
      title: null,
      costPerYear: null,
      costPerDependent: null,
    };
  },
  methods: {
    addBenefit() {
      if (this.title == "" || this.title == null) {
        alert("A title must be provided");
        return;
      }

      if (
        isNaN(this.costPerYear) ||
        this.costPerYear == "" ||
        this.costPerYear == null
      ) {
        alert("Cost per year must be a number");
        return;
      }

      if (
        isNaN(this.costPerDependent) ||
        this.costPerDependent == "" ||
        this.costPerDependent == null
      ) {
        alert("Cost per dependant must be a number");
        return;
      }

      var newBenefit = {
        title: this.title,
        costPerYear: this.costPerYear,
        costPerDependent: this.costPerDependent,
        createdDate: new Date(),
      };

      var dataToSend = JSON.stringify(newBenefit);

      this.$http
        .post("https://isotopes.azurewebsites.net/api/Benefits", dataToSend, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          var responseInfo = response.data;
          if (responseInfo.success) {
            alert("Benefit added successfully");
            this.$router.push({ name: "benefit" });
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>