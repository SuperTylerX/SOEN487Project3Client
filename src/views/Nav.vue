<template>
  <div>This is Nav page</div>
</template>

<script>
export default {
  name: "Nav",
  mounted() {
    this.$router.push({
      path:"/login"
    })
  }
}
</script>

<style scoped>

</style>
