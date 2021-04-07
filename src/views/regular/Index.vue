<template>
  <div>
    <div class="logo">Library Logo</div>
    <div class="search-wrap">
      <div class="form">
        <label>
          <input v-model="searchText" type="text" placeholder="Please enter the book title...">
        </label>
        <button @click="search">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchText: ""
    }
  },
  methods: {
    search() {
      this.$router.push({
        path: '/library/search',
        query: {
          title: this.searchText
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

.logo {
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -200px;
  text-align: center;
  color: #0072a8;
  font-size: 40px;
  width: 400px;
}

.search-wrap {
  position: absolute;
  top: 200px;
  left: 0;
  width: 100%;

  .form {
    width: 600px;
    margin: 0 auto;

    input {
      height: 50px;
      width: 500px;
      border-radius: 0;
      padding: 10px;
      font-size: 20px;
      border: 2px solid #0072a8;
      box-sizing: border-box;
      display: block;
      float: left;
    }

    button {
      height: 50px;
      width: 100px;
      color: white;
      font-size: 20px;
      background: #0072a8;
      border: 2px solid #0072a8;
      box-sizing: border-box;
      display: block;
      float: left;
    }
  }

}
</style>
