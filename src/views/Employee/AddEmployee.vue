<template>
  <div class="addemployee">
    <div class="container mt-4">
      <div class="d-sm-flex align-items-center justify-content-between">
        <h1 class="display-4">Add Employee</h1>
        <router-link
          to="/"
          class="d-none d-sm-inline-block btn btn-sm btn-outline-primary shadow-sm"
        >
          <b-icon icon="arrow-left"></b-icon>Back
        </router-link>
      </div>
      <b-alert v-model="showErrorMessage" variant="danger" dismissible>
        Benefit is too
        <b>expensive</b>. Pick another benefit.
      </b-alert>
      <p class="h3">Yearly Salary: {{accountAmount | currency}}</p>
      <p class="h3">
        Benefit Cost:
        <span class="text-danger">{{totalbenefit | currency}}</span>
      </p>
      <p class="h3">
        Total Salary:
        <span class="text-success">{{totalcost | currency}}</span>
      </p>

      <b-form>
        <b-form-select
          id="benefitInfo"
          v-model="selectedBenefit"
          v-bind:options="benefits"
          class="col-md-8"
        ></b-form-select>
        <br />
        <label for="firstName">First Name</label>
        <b-input id="firstName" class="col-md-4" v-model="firstname" required placeholder="John"></b-input>

        <label for="middleName">Middle Name</label>
        <b-input id="middleName" class="col-md-2" v-model="middlename"></b-input>

        <label for="lastName">Last Name</label>
        <b-input id="lastName" class="col-md-4" v-model="lastname" required placeholder="Doe"></b-input>

        <label for>Date of Birth</label>
        <!-- <b-input id="dateOfBirth" class="col-md-2" v-model="dateOfBirth" required></b-input> -->
        <b-form-datepicker
          id="dateOfBirth"
          v-bind:show-decade-nav="true"
          class="col-md-4"
          v-model="dateOfBirth"
        ></b-form-datepicker>
      </b-form>

      <h2 class="h3">Dependents ({{dependents.length}})</h2>
      <b-form inline class="mt-2 mb-2">
        <b-input class="col-md-3" placeholder="First Name" v-model="dependent.firstname" />
        <b-input class="col-md-3 ml-2" placeholder="Last Name" v-model="dependent.lastname" />
        <b-form-select
          id="relationship"
          v-model="selectedRelationship"
          v-bind:options="relationships"
          class="col-md-2 ml-2"
        ></b-form-select>
        <b-button variant="outline-success" class="ml-2" v-on:click="addDependent">
          <b-icon icon="plus"></b-icon>Add Dependent
        </b-button>
      </b-form>
      <div v-if="dependents.length > 0">
        <table class="table table-sm table-striped table-bordered table-borderless table-hover">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Relationship</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dependent, index) in dependents" v-bind:key="dependent.id">
              <td>{{dependent.firstName}}</td>
              <td>{{dependent.lastName}}</td>
              <td>{{dependent.relationship.name}}</td>
              <th>
                <b-button variant="danger" class="btn-sm" v-on:click="removeDependent(index)">
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="dependents.length == 0">
        <div class="alert alert-secondary">No dependents available</div>
      </div>

      <b-button variant="primary" v-on:click="addEmployee">
        <b-icon icon="plus"></b-icon>Add Employee
      </b-button>
      <router-link to="/" class="btn btn-outline-secondary ml-2">Cancel</router-link>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      benefits: [],
      accountAmount: null,
      formattedAmount: null,
      selectedBenefit: null,
      selectedRelationship: null,
      benefitdata: [],
      firstname: null,
      middlename: null,
      lastname: null,
      dateOfBirth: null,
      dependents: [],
      relationships: [],
      dependent: {
        firstname: null,
        lastname: null,
      },
    };
  },
  mounted() {
    this.relationships = [
      { value: null, text: "Select a relationship" },
      { value: { id: 1, name: "Spouse" }, text: "Spouse" },
      { value: { id: 2, name: "Son" }, text: "Son" },
      { value: { id: 3, name: "Daughter" }, text: "Daughter" },
      { value: { id: 4, name: "Nephew" }, text: "Nephew" },
      { value: { id: 5, name: "Niece" }, text: "Niece" },
    ];

    this.$http
      .get("https://localhost:44349/api/Account")
      .then((response) => response.data)
      .then((dataresponse) => dataresponse.data)
      .then((data) => {
        this.accountAmount = data.amount;
        this.formattedAmount = data.formattedAmount;
      });

    //get all the benefits and populate the dropdown
    this.$http
      .get("https://localhost:44349/api/Benefits")
      .then((response) => response.data)
      .then((dataresponse) => dataresponse.data)
      .then((data) => {
        this.benefitdata = data;

        this.benefits.push({
          value: null,
          text: "Please select a benefit",
        });

        for (let i = 0; i < this.benefitdata.length; i++) {
          var current = this.benefitdata[i];
          this.benefits.push({
            value: {
              id: current.id,
              cpy: current.costPerYear,
              cpd: current.costPerDependent,
            },
            text: `${current.title} - ${current.costPerYear}/${current.costPerDependent}`,
          });
        }
      });
  },
  computed: {
    totalcost: function () {
      var total = this.accountAmount;

      if (this.selectedBenefit) {
        total =
          total -
          this.selectedBenefit.cpy -
          this.selectedBenefit.cpd * this.dependents.length;
      }
      return total;
    },
    totalbenefit: function () {
      var total = 0;
      if (this.selectedBenefit) {
        total =
          this.selectedBenefit.cpy +
          this.selectedBenefit.cpd * this.dependents.length;
      }
      return total;
    },
    showErrorMessage: function () {
      return this.totalbenefit > this.accountAmount;
    },
  },
  methods: {
    addEmployee() {
      if (this.selectedBenefit == null) {
        alert("please select a benefit");
        return;
      }

      if (this.totalbenefit > this.accountAmount) {
        alert("Please revise your benefit seletion");
        return;
      }

      if (this.empty(this.firstname)) {
        alert("Please enter employee First Name");
        return;
      }

      if (this.empty(this.lastname)) {
        alert("Please enter employee Last Name");
        return;
      }

      if (this.dateOfBirth == null) {
        alert("Please enter your date of birth");
        return;
      }

      //submit via api
      var newEmployee = {
        firstName: this.firstname,
        middleName: this.middlename,
        lastName: this.lastname,
        username: "test",
        password: "test",
        dateOfBirth: this.dateOfBirth,
        benefitId: this.selectedBenefit,
        dependents: this.dependents,
      };

      var dataToSend = JSON.stringify(newEmployee);

      //   fetch("https://localhost:44349/api/Employees", {
      //     method: "post",
      //     mode: "cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: dataToSend,
      //   }).then((response) => {
      //     console.log(response);
      //   });

      this.$http
        .post("https://localhost:44349/api/Employees", dataToSend, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => console.log(response));
    },
    addDependent() {
      if (this.empty(this.dependent.firstname)) {
        alert("Please enter dependent First Name");
        return;
      }

      if (this.empty(this.dependent.lastname)) {
        alert("Please enter dependent Last Name");
        return;
      }

      if (this.selectedRelationship == null) {
        alert("Please select a relationsihp");
        return;
      }

      this.dependents.push({
        firstName: this.dependent.firstname,
        middleName: "",
        lastName: this.dependent.lastname,
        relationship: this.selectedRelationship,
      });
    },
    removeDependent(index) {
      this.dependents.splice(index, 1);
    },
    empty(text) {
      return text == undefined || text.length == 0;
    },
  },
};
</script>