<template>
  <div class="container mt-4">
    <div class="d-sm-flex align-items-center justify-content-between">
      <h1 class="display-4">View Benefit Details</h1>
      <router-link
        to="/benefit"
        class="d-none d-sm-inline-block btn btn-sm btn-outline-primary shadow-sm"
      >
        <b-icon icon="arrow-left"></b-icon>Back
      </router-link>
    </div>
    <b-card
      img-src="https://picsum.photos/600/300/?image=431"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        <p class="h3">{{title}}</p>

        <p>
          <b>Cost Per Year:</b>
          <span class="float-right">{{costPerYear}}</span>
        </p>

        <p>
          <b>Cost Per Dependant:</b>
          <span class="float-right">{{costPerDependant}}</span>
        </p>

        <p>
          <span class="text-small text-info">Created on {{createdDate}}</span>
        </p>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "viewbenefit",
  data() {
    return {
      id: 0,
      title: null,
      costPerYear: null,
      costPerDependant: null,
      createdDate: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    if (this.id > 0) {
      fetch("https://isotopes.azurewebsites.net/api/Benefits/" + this.id, {
        method: "get",
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          var info = jsonData.data;
          this.title = info.title;
          this.costPerYear = info.formattedCostPerYear;
          this.costPerDependant = info.formattedCostPerDependent;
          this.createdDate = info.formattedCreatedDate;
        });
    } else {
      alert("invalid benefit id provided");
    }
  },
};
</script>