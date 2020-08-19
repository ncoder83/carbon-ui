<template>
  <div class="benefit">
    <div class="container mt-4">
      <div class="d-sm-flex align-items-center justify-content-between">
        <h1 class="display-4">List of benefits</h1>
        <router-link
          to="/benefit/add"
          class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
        >
          <b-icon icon="plus"></b-icon>Add Benefit
        </router-link>
      </div>

      <table class="table table-sm table-striped table-bordered table-borderless table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Cost per year</th>
            <th>Cost per dependent</th>
            <th>Created date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="benefit in benefits" v-bind:key="benefit.id">
            <td>{{benefit.id}}</td>
            <td>{{benefit.title}}</td>
            <td align="left">{{benefit.formattedCostPerYear}}</td>
            <td align="left">{{benefit.formattedCostPerDependent}}</td>
            <td>{{benefit.formattedCreatedDate}}</td>
            <td>
              <button class="btn btn-sm btn-primary" v-on:click="show(benefit.id)">
                <b-icon icon="eye"></b-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      benefits: [],
    };
  },
  methods: {
    show(id) {
      this.$router.push({ path: "/benefit/" + id });
    },
  },
  mounted() {
    this.$http
      .get("https://localhost:44349/api/Benefits")
      .then((response) => response.data)
      .then((dataresponse) => dataresponse.data)
      .then((data) => (this.benefits = data));
  },
};
</script>
