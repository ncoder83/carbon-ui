<template>
  <div class="home">
    <div class="container mt-4">
      <div class="d-sm-flex align-items-center justify-content-between">
        <h1 class="display-4">List of employees</h1>
        <router-link
          to="/employee/add"
          class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
        >
          <b-icon icon="person-plus"></b-icon>Add Employee
        </router-link>
      </div>
      <table class="table table-striped table-hover table-bordered table-borderless">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Number Dependent</th>
            <th>Total Benefits</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="employee in employees" v-bind:key="employee.id">
            <td>{{employee.id}}</td>
            <td>{{employee.firstName}}</td>
            <td>{{employee.lastName}}</td>
            <td>{{employee.formattedStartDate}}</td>
            <td align="center">{{employee.totalDependents}}</td>
            <td align="right">$0</td>
            <td align="center">
              <b-button
                variant="primary"
                class="btn-sm mr-1"
                v-on:click="viewEmployee(employee.id)"
              >
                <b-icon icon="eye"></b-icon>
              </b-button>
              <b-button
                variant="warning"
                class="btn-sm mr-1"
                v-on:click="editEmployee(employee.id)"
              >
                <b-icon icon="pencil"></b-icon>
              </b-button>
              <b-button variant="danger" class="btn-sm" v-on:click="deleteEmployee(employee.id)">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      employees: [],
      api_url: process.env,
    };
  },
  methods: {
    viewEmployee(id) {
      this.$router.push({ path: "/employee/" + id });
    },
    editEmployee(id) {
      console.log("editing", id);
    },
    deleteEmployee(id) {
      console.log("delete", id);
    },
  },
  mounted() {
    this.$http
      .get("https://localhost:44349/api/Employees")
      .then((response) => response.data)
      .then((dataresponse) => dataresponse.data)
      .then((data) => (this.employees = data));
  },
};
</script>
