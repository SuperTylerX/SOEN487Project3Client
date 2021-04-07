<template>
  <div>
    <Table stripe :columns="columns" :data="$store.state.myReservation.reservationList"></Table>
  </div>
</template>

<script>
export default {
  name: "Reservation",
  data() {
    return {
      columns: [
        {
          title: "Reservation Number",
          render: (h, dataset) => {
            return h('p', dataset.row.orderId.toString().padStart(8, "0"))
          },
          width: 180
        }, {
          title: "Book Title",
          key: "title",
          width: 500
        }, {
          title: "Created Date",
          render: (h, dataset) => {
            return h('p', (new Date(dataset.row.createdDate)).format("yyyy-MM-dd"))
          }
        }, {
          title: "Pickup Date",
          render: (h, dataset) => {
            return h('p', (new Date(dataset.row.pickupDate)).format("yyyy-MM-dd"))
          }
        }, {
          title: "Status",
          key: "orderStatus"
        }, {
          title: "Actions",
          render: (h, dataset) => {
            return h('span', [
              h('Button', {
                'attrs': {
                  type: "error",
                  style: "margin-left: 5px",
                  disabled: dataset.row.orderStatus !== "PROCESSING"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "Delete Confirmation",
                      content: "Do you want to cancel this reservation " + dataset.row.title + "?",
                      onOk: () => {
                        this.$store.dispatch('myReservation/CHANGE_RESERVATION_STATUS', {orderId: dataset.row.orderId});
                      }
                    });
                  }
                }
              }, "Cancel")
            ]);
          }
        }
      ]
    }
  },
  async mounted() {
    await this.$store.dispatch("myReservation/LOAD_RESERVATION");
  }
}
</script>

<style scoped>

</style>
