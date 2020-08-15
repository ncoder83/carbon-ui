<template>
  <div class="home">
    <div class="container">
      <h1 class="display-4">List of employees</h1>

      <table class="table table-striped">
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
            <td>
              
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
    };
  },
  mounted() {
    fetch("https://isotopes.azurewebsites.net/api/Employees", {
      method: "get",
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        this.employees = jsonData.data;
        console.log(this.employees);
      });
  },
};
</script>
