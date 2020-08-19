<template>
  <div class="viewemployee">
    <div class="container mt-4">
      <div class="d-sm-flex align-items-center justify-content-between">
        <h1 class="display-4">View employee</h1>
        <router-link
          to="/"
          class="d-none d-sm-inline-block btn btn-sm btn-outline-primary shadow-sm"
        >
          <b-icon icon="arrow-left"></b-icon>Back
        </router-link>
      </div>

      <b-card
        img-src="https://picsum.photos/600/300/?image=5"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 30rem;"
        class="mb-2"
      >
        <b-card-text>
          <p class="h3">{{firstName}} {{lastName}}</p>

          <p>
            <b>Salary:</b>
            {{salary | currency}}
          </p>

          <p>
            <b>Befenit:</b>
            {{benefit}}
          </p>
          <p>
            <b>Dependants:</b>
            {{dependents}}
          </p>

          <p>
            <span class="text-small text-info">Created on {{createdDate}}</span>
          </p>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "viewemployee",
  data() {
    return {
      id: 0,
      firstName: null,
      lastName: null,
      salary: 0,
      benefit: 0,
      dependents: 0,
      createdDate: null
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    if (this.id > 0) {
      fetch("https://localhost:44349/api/Employees/" + this.id, {
        method: "get",
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          var info = jsonData.data;
          this.firstName = info.firstName;
          this.lastName = info.lastName;
          this.salary = info.yearlySalary;
          this.dependants = info.totalDependent;
          this.
          this.createdDate = info.formattedCreatedDate;
        });
    } else {
      alert("invalid benefit id provided");
    }
  },
};
</script>