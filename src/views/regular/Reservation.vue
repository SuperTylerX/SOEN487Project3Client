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
                  type: "warning",
                  disabled: dataset.row.orderStatus !== "PROCESSING"
                },
                on: {
                  click: () => {
                    this.tempChange.pickupDate = dataset.row.pickupDate;
                    this.$Modal.confirm({
                      title: "Change Status",
                      render: (h) => {
                        return h('DatePicker', {
                          props: {
                            type: "date",
                            value: new Date(dataset.row.pickupDate),
                            options: {
                              disabledDate: function (date) {
                                return date < new Date() || date.getTime() > new Date().getTime() + 1000 * 60 * 60 * 24 * 7
                              }
                            },
                            autofocus: true,
                            placeholder: 'Please select the pickup date'
                          },
                          on: {
                            "on-change": (val) => {
                              console.log(val)
                              this.tempChange.pickupDate = val;
                            }
                          }
                        })
                      },
                      content: "Do you want to cancel this reservation " + dataset.row.title + "?",
                      onOk: async () => {
                        await this.$store.dispatch('myReservation/CHANGE_RESERVATION_DATE', {
                          orderId: dataset.row.orderId,
                          pickupDate: +new Date(this.tempChange.pickupDate)
                        });
                      }
                    });
                  }
                }
              }, "Change Pickup Date"),
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
          },
          width: 280
        }
      ],
      tempChange: {
        pickupDate: 0
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("myReservation/LOAD_RESERVATION");
  }
}
</script>

<style scoped>

</style>
