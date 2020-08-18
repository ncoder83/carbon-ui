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
          <p class="h3">John Doe</p>

          <p>
            <b>Salary:</b> 50,000/year
          </p>

          <p>
            <b>Befenit:</b> 1,530/year
          </p>
          <p>
            <b>Dependants:</b>
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
    return {};
  },
};
</script>