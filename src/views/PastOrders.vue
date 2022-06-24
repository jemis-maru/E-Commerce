<template>
  <main class="main">
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div>
            <p>Rate your order:</p>
            <q-rating
              v-model="rateValue"
              max="5"
              size="3em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
            <div class="dialog-textarea">
              <q-input
                dense
                v-model="reviewDescription"
                class="q-ma-sm"
                outlined
                type="textarea"
                label="Description"
                style="width: 400px"
              />
            </div>
            <q-btn
              color="primary"
              @click="submitReview"
              class="q-ma-sm"
              label="Give feedback"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="container">
      <div class="cart">
        <h1 class="cart__title">Your Past orders</h1>
        <div>
          <p v-if="items.length < 1">You haven't order yet.</p>
          <div v-for="item in items" :key="item.id">
            <div class="cart__item">
              <div class="cart__row">
                <div class="cart__image">
                  <div class="cart__image-link">
                    <img :src="item.image" alt="" class="cart__image-img" />
                  </div>
                </div>
                <div class="cart__details">
                  <h5 class="cart__details-h5">
                    <div class="cart__details-link">
                      {{ item.name }}
                    </div>
                  </h5>
                  <p>Amount: {{ formattedPrice(item.price) }}</p>
                  <div class="cart__deatils-code">
                    quantity in cart : {{ item.quantity }}
                  </div>
                </div>
                <div class="cart__amounts">
                  <div v-if="item.isReturn">You returned this item.</div>
                  <div v-else>
                    <p>Order status: {{ item.orderStatus }}</p>
                    <p
                      v-if="item.orderStatus == 'Delivered'"
                      @click="rateDialog(item.orderId)"
                      class="rate-link"
                    >
                      Rate your order
                    </p>
                    <div v-if="item.orderStatus == 'Delivered'">
                      <q-btn
                        @click="orderReturn(item.orderId)"
                        color="red"
                        label="Return order"
                      />
                    </div>
                    <div
                      v-if="
                        item.orderStatus != 'Delivered' &&
                        item.orderStatus != 'OutForDelivery' &&
                        item.orderStatus != 'Cancel'
                      "
                    >
                      <q-btn
                        @click="orderCanceled(item.orderId, item.productId)"
                        color="red"
                        label="Cancel order"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getOrders } from "../api/order/order.js";
import { returnOrder } from "../api/order/order.js";
import { cancelOrder } from "../api/order/order.js";
import { addFeedback } from "../api/feedback/feedback.js";

export default {
  name: "PastOrders.vue",

  data() {
    return {
      items: [],
      rateValue: 1,
      reviewDescription: "",
      showDialog: false,
      rateWidth: 0,
      orderId: '',
    };
  },

  methods: {
    formattedPrice(price) {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
    rateDialog(orderId) {
      this.reviewDescription = "";
      this.rateValue = 1;
      this.orderId = orderId;
      this.showDialog = !this.showDialog;
    },
    submitReview() {

      let feedbackData = {
        orderProductId: this.orderId,
        feedbackDesc: this.reviewDescription,
        rating: this.rateValue,
      };

      

      addFeedback(feedbackData)
        .then((res) => {
        
          this.$q.notify({
            type: "positive",
            message: "Order cancelled Successfully",
          });
        })
        .catch((err) => {
          
          this.$q.notify({
            type: "negative",
            message: "Something went wrong|Please Try Again",
          });
        });
    },
    orderCanceled(orderId, productId) {
      let cancelData = {
        trackingStatus: "Cancel",
        productId,
        orderId,
      };

     

      cancelOrder(cancelData)
        .then((res) => {
         
          this.items = [];
          this.fetchOrders();
          this.$q.notify({
            type: "positive",
            message: "Order cancelled Successfully",
          });
        })
        .catch((err) => {
         
          this.$q.notify({
            type: "negative",
            message: "Something went wrong|Please Try Again",
          });
        });
    },
    orderReturn(orderId) {
      let returnData = {
        id: orderId,
      };

    

      returnOrder(returnData)
        .then((res) => {
          
          this.items = [];
          this.fetchOrders();
          this.$q.notify({
            type: "positive",
            message: "Order returned Successfully",
          });
        })
        .catch((err) => {
        
          this.$q.notify({
            type: "negative",
            message: "Something went wrong|Please Try Again",
          });
        });
    },
    fetchOrders() {
      return new Promise((resolve, reject) => {
        getOrders()
          .then((response) => {
         
            return response.data.data;
          })
          .then((data) => {
        
            data.forEach((order) => {
              this.items.push({
                isReturn: order.is_returned,
                productId: order.Products.id,
                orderId: order.id,
                name: order.Products.productName,
                quantity: order.quantity,
                price: order.price,
                orderStatus: order.trackingStatus,
                image: order.Products.productImage[0],
              });
            });
            resolve(data);
          })
          .catch((data, error) => {
          
            reject(error);
          });
      });
    },
  },

  computed: {},

  async created() {
    await this.fetchOrders();
  },
};
</script>

<style scoped>
.q-ma-sm {
  margin: 8px 0;
}
.dialog-textarea {
  margin-top: 20px;
}
.rate-link {
  font-weight: bold;
  cursor: pointer;
  color: #4141e6;
}
</style>