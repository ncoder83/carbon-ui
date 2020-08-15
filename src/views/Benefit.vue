<template>
  <div class="benefit">
    <h1>This is the benefit page</h1>
  </div>
</template>


<script>
export default {
  data() {
    return { 
      benefits: [] 
    };
  },
  mounted() {
    fetch("https://isotopes.azurewebsites.net/api/Benefits", {
      method: "get",
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        this.benefits = jsonData.data;
        console.log(this.benefits);
      });
  },
};
</script>
