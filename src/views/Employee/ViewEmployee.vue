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
          <p class="h3">
            {{firstName}} {{lastName}}
            <span class="float-right">
              <b-button variant="default">
                <b-icon icon="pencil"></b-icon>
              </b-button>
            </span>
          </p>

          <p>
            <b>Start Date:</b>
            <span class="float-right">{{startDate}}</span>
          </p>
          <p>
            <b>Salary:</b>
            <span class="text-success float-right">{{salary | currency}}</span>
          </p>

          <p>
            <b>Befenits:</b>
            <span class="float-right">{{benefit | currency}}</span>
          </p>
          <p>
            <b>Dependants ({{totalDependents}})</b>
          </p>
          <ul>
            <li
              v-for="dependent in dependents"
              v-bind:key="dependent.id"
            >({{dependent.relationship}}) {{dependent.firstName}} {{dependent.middleName}} {{dependent.lastName}}</li>
          </ul>

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
      totalDependents: 0,
      dependents: [],
      createdDate: null,
      startDate: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    if (this.id > 0) {
      fetch("https://isotopes.azurewebsites.net/api/Employees/" + this.id, {
        method: "get",
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          var info = jsonData.data;
          console.log(info);
          this.firstName = info.firstName;
          this.lastName = info.lastName;
          this.salary = info.yearlySalary;
          this.totalDependents = info.totalDependents;
          this.createdDate = info.formattedCreatedDate;
          this.startDate = info.formattedStartDate;
          this.dependents = info.dependents;
        });
    } else {
      alert("invalid benefit id provided");
    }
  },
};
</script>