<template>
  <div>
    <div class="section1">

      <Spin fix v-if="isLoading">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>

      <img
          :src="book.imageLink"
          alt="">
      <div class="meta">
        <ul>
          <li class="title">{{ book.title }}</li>
          <li>{{ book.author }} / {{ book.publisher }} / {{ book.publishedDate }}</li>
          <li>ISBN: {{ book.isbn }}</li>
          <li>{{ book.stock }} on available</li>
        </ul>
        <Button type="primary" @click="isShowModal = true" v-if="!isDone">Request it</Button>
        <Button type="primary" @click="isShowModal = true" disabled v-else>Reserved</Button>
      </div>

      <Modal
          v-model="isShowModal"
          title="Reserve this book"
          @on-ok="confirmReserve">
        <p>Please select your pick up date:</p>
        <p>
          <DatePicker type="date" placeholder="Select date" :options="datePickerOptions"
                      v-model="pickupDate"></DatePicker>
        </p>
      </Modal>

    </div>
    <div class="section2">
      <div>
        <h3>Description</h3>
        <p v-html="book.description"></p>
      </div>
      <div>
        <h3>Total Page Number:</h3>
        {{ book.pageCount }}
      </div>
      <div><h3>categories: </h3>
        {{ JSON.parse(book.categories).join(", ") }}
      </div>
      <div><h3>language:</h3>
        {{ book.language }}
      </div>
    </div>
  </div>


</template>

<script>
import axios from "axios";
import qs from "querystring"

export default {
  name: "Detail",
  data() {
    return {
      isShowModal: false,
      pickupDate: null,
      datePickerOptions: {
        disabledDate: function (date) {
          return date < new Date() || date.getTime() > new Date().getTime() + 1000 * 60 * 60 * 24 * 7
        }
      },
      book: {
        author: "",
        bookId: undefined,
        categories: "[]",
        description: "",
        googleId: "",
        imageLink: "",
        isbn: "",
        language: "",
        pageCount: "",
        publisher: "",
        stock: 0,
        title: "",
        publishedDate: null
      },
      isLoading: true,
      isDone: false
    }
  },
  methods: {
    async confirmReserve() {
      let pickupDate = this.pickupDate.getTime();
      let createObj = {
        pickupDate: pickupDate,
        bookId: this.book.bookId
      }
      let token = sessionStorage.getItem("token");
      let result = await axios.post("http://localhost:8080/library/order/create", qs.stringify(createObj), {
        headers: {
          'Authorization': token,
          'Content-Type': "application/x-www-form-urlencoded"
        }
      }).then(data => data.data)
      if (result.code === 200) {
        this.$Message.info("reservation created successfully.")
        this.isDone = true;
      } else {
        this.$Message.error(result.message)
      }
    }
  },
  async mounted() {
    let token = sessionStorage.getItem("token");
    let bookId = this.$route.query.id
    this.book = await axios.get("http://localhost:8080/library/book/detail", {
      headers: {'Authorization': token},
      params: {
        bookId
      }
    }).then(data => data.data);
    this.isLoading = false;
  }
}
</script>

<style scoped lang="less">
.section1 {
  display: flex;
  padding: 20px;

  img {
    flex: 1;
    max-width: 180px;
  }

  .meta {
    flex: 11;
    padding-left: 80px;

    ul {
      list-style-type: none;
      padding-bottom: 20px;

      li {
        font-size: 15px;
        line-height: 40px;

        &.title {
          font-weight: 600;
          font-size: 20px;
        }
      }
    }

  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

}

.section2 {
  padding: 20px;
  line-height: 30px;

  div {
    padding-bottom: 20px;
  }
}
</style>
