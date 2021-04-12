<template>
  <Table stripe :columns="columns" :data="$store.state.myReservation.reservationList"></Table>
</template>

<script>
export default {
  name: "Reservation",
  data() {
    return {
      tempChange: {status: ""},
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
          width: 400
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
                  disabled: dataset.row.orderStatus === "CANCELED" || dataset.row.orderStatus === "RETURNED"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "Change Status",
                      render: (h) => {
                        return h('Select', {
                          props: {
                            value: dataset.row.orderStatus,
                            autofocus: true,
                            placeholder: 'Please select the status'
                          },
                          on: {
                            "on-change": (val) => {
                              this.tempChange.status = val;
                            }
                          }
                        }, [
                          h('Option', {props: {value: "PROCESSING"}}, "PROCESSING"),
                          h('Option', {props: {value: "CANCELED"}}, "CANCELED"),
                          h('Option', {props: {value: "READY"}}, "READY"),
                          h('Option', {props: {value: "RENT"}}, "RENT"),
                          h('Option', {props: {value: "RETURNED"}}, "RETURNED"),
                        ])
                      },
                      content: "Do you want to change the status of " + dataset.row.title + "?",
                      onOk: async () => {
                        try {
                          await this.$store.dispatch('myReservation/CHANGE_RESERVATION_STATUS', {
                            orderId: dataset.row.orderId,
                            status: this.tempChange.status
                          });
                          this.$Message.info("Change successfully!")
                        } catch (e) {
                          this.$Message.error(e)
                        }
                      }
                    });
                  }
                }
              }, "Change Status")
            ]);
          },
          width: 200
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
