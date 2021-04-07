<template>
  <div>
    <Form style="overflow: hidden">
      <FormItem style="width: 92%; float: left">
        <Input type="text" v-model="searchText" placeholder="Search book title...">
          <Icon type="ios-search" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem style="width: 8%; float: left; padding-left:10px">
        <Button style="width: 100%" type="primary" @click="searchBtnHandler()">Search</Button>
      </FormItem>
    </Form>
    <Table stripe :columns="columns" :data="$store.state.libraryStore.bookList"></Table>
    <Page class="page-bar" :total="$store.state.libraryStore.total" :current="$store.state.libraryStore.page"
          :page-size="10" @on-change="search"/>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchText: "",
      columns: [
        {
          title: "ISBN",
          key: "isbn",
          width: 140
        },
        {
          title: "Title",
          key: "title",
          width: 450
        },
        {
          title: "Author",
          key: "author"
        },
        {
          title: "Publisher",
          key: "publisher"
        },
        {
          title: "Action",
          render: (h, dataset) => {
            return h('span', [
              h('Button', {
                'attrs': {
                  type: "success",
                  to: {'path': '/library/detail', query: {id: dataset.row.bookId}}
                }
              }, "View")
            ]);
          },
          width: 100
        }
      ]
    }
  },
  methods: {
    searchBtnHandler() {
      this.$router.push({
        path: '/library/search',
        query: {
          title: this.searchText
        }
      })
      this.search();
    },
    async search(pageNum) {
      let page = pageNum ? pageNum : this.$store.state.libraryStore.page;
      try {
        await this.$store.dispatch("libraryStore/CHANGE_BOOK_LIST", {title: this.searchText, page: page})
      } catch (err) {
        this.$Message.error("Network Connection Error!")
      }
    }
  },
  mounted() {
    this.searchText = this.$route.query.title
    if (this.searchText) {
      this.search();
    }
  }
}
</script>

<style lang="less">
.page-bar {
  padding-top: 30px;
  margin: 0 auto;
  width: 431px;
}
</style>
