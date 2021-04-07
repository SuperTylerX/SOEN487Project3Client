<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="ISBN">
      <Input v-model="formItem.isbn" placeholder="Enter isbn..."></Input>
    </FormItem>

    <FormItem label="Google Id">
      <Input v-model="formItem.googleId" placeholder="Enter Google Id..."></Input>
    </FormItem>

    <FormItem label="Title">
      <Input v-model="formItem.title" placeholder="Enter title..."></Input>
    </FormItem>

    <FormItem label="Publisher">
      <Input v-model="formItem.publisher" placeholder="Enter publisher..."></Input>
    </FormItem>

    <FormItem label="Author">
      <Input v-model.number="formItem.author" placeholder="Enter author..."></Input>
    </FormItem>

    <FormItem label="Stock">
      <Input v-model.number="formItem.stock" placeholder="Enter stock..."></Input>
    </FormItem>

    <FormItem>
      <Button type="primary" @click="updateForm">Submit</Button>
    </FormItem>


  </Form>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      formItem: {
        isbn: "",
        title: "",
        googleId: "",
        publisher: "",
        author: "",
        stock: 0
      },
    };
  },
  methods: {
    updateForm() {
      this.$store.dispatch("libraryStore/UPDATE_BOOK", {book: this.formItem});
      this.$router.push("/admin/book-list");
    }
  },
  async mounted() {
    const bookId = Number(this.$route.query.id);
    this.formItem = this.$store.state.libraryStore.bookList.filter(row => row.bookId === bookId)[0];
  }
};
</script>

<style lang="less" scoped>

</style>
