<template>
  <main class="main">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Confirm your order</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="cancelClicked" color="primary" v-close-popup />
          <q-btn flat label="Confirm" @click="confirmForOrder" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="container">
      <div v-if="!nextClicked" class="cart">
        <h1 class="cart__title">Cart</h1>
        <p v-if="cartLength < 1">Your cart is empty!</p>
        <div v-else>
          <div v-for="item in products" :key="item.id">
            <div class="cart__item">
              <div class="cart__row">
                <div class="cart__image">
                  <div class="cart__image-link">
                    <img
                      :src="item.Product.productImage[0]"
                      alt=""
                      class="cart__image-img"
                    />
                  </div>
                </div>
                <div class="cart__details">
                  <h5 class="cart__details-h5">
                    <div class="cart__details-link">
                      {{ item.Product.productName }}
                    </div>
                  </h5>
                  <p>price: {{ formattedPrice(item.Product.price) }}</p>
                  <div class="cart__deatils-code">
                    quantity in cart : {{ item.quantity }}
                  </div>
                </div>
                <div class="cart__amounts">
                  <div class="cart__amounts-div">
                    <input
                      type="number"
                      class="txt"
                      placeholder="quantity"
                      v-model.number="item.quantity"
                      max="1000"
                      min="1"
                    />
                    <button
                      @click="cartUpdate(item.Product.id, item.quantity)"
                      class="btn btn--brand btn--boxshadow"
                      style="margin-right: 1rem"
                      type="button"
                    >
                      set to cart
                    </button>
                    <button
                      type="button"
                      class="cart__amounts-remove"
                      style="cursor: pointer"
                      @click="deleteProductFromCart(item.Product.id)"
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div class="cart__total">
                  <div class="cart__total-div">
                    <h6 class="cart__total-title">total</h6>
                    {{ formattedPrice(item.Product.price * item.quantity) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="cartLength > 0" class="cart__info">
          <div class="cart__table">
            <table>
              <tbody>
                <tr>
                  <th>subtotal</th>
                  <td>{{ formattedPrice(cartTotal) }}</td>
                </tr>
                <tr>
                  <th>tax</th>
                  <td>{{ formattedPrice(tax) }}</td>
                </tr>
                <tr>
                  <th>discount</th>
                  <td class="text-red">0</td>
                </tr>
                <tr>
                  <th>total</th>
                  <td class="text-blue">{{ formattedPrice(cartTotal) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="cart__submit-container">
              <button @click="clickNext" class="btn btn--brand btn--boxshadow">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="cart">
        <q-option-group
          :options="addressArr"
          type="radio"
          v-model="selectedAddress"
        />
        <div class="cart__submit-container submit-container">
          <button @click="submitOrder" class="btn btn--brand btn--boxshadow">
            Submit
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { removeItemFromCart } from "../api/cart/cart.js";
import { updateCart } from "../api/cart/cart.js";
import { getAllAddress } from "../api/address/address.js";
import { addOrder } from '../api/order/order.js';

export default {
  name: "Cart",

  data() {
    return {
      products: [],
      addressArr: [],
      nextClicked: false,
      selectedAddress: null,
      subtotal: 0,
      tax: 0,
      total: 0,
      confirm: false,
    };
  },

  computed: {
    cartTotal() {
      let total = 0;
      this.products.forEach((item) => {
        total = total + item.Product.price * item.quantity;
      });
      return total;
    },
    cartLength() {
      return this.products.length;
    },
  },
  methods: {
    formattedPrice(price) {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
    cartUpdate(prodId, quantity) {
      
      let updateData = {
        productId: prodId,
        quantity,
      };



      updateCart(updateData)
        .then((res) => {
       
          this.getCartProducts();
          this.$q.notify({
            type: "positive",
            message: "Cart updated Successfully",
          });
        })
        .catch((err) => {

          this.$q.notify({
            type: "negative",
            message: "Something went wrong|Please Try Again",
          });
        });
    },
    async getCartProducts() {
      await this.$store.dispatch('cart/fetchProducts');

      this.products = this.$store.getters['cart/products'];
    },
    fetchAllAddress() {
      return new Promise((resolve, reject) => {
        getAllAddress()
          .then((response) => {
            return response.data.data.data;
          })
          .then((data) => {
         
            let formatedData = [];

            data.forEach((item) => {
              formatedData.push({
                label: `${item.houseNo}, ${item.landmark}, ${item.city}, ${item.state}, ${item.country}, ${item.pincode}`,
                value: item.id,
              });
            });

            this.addressArr = formatedData;
      
            resolve(data);
          })
          .catch((data, error) => {
            
            reject(error);
          });
      });
    },
    deleteProductFromCart(prodId) {
      
      let deleteData = {
        productId: prodId,
      };
      
      removeItemFromCart(deleteData)
        .then((res) => {
         
          this.getCartProducts();
          this.$q.notify({
            type: "positive",
            message: "Product removed Successfully",
          });
        })
        .catch((err) => {
         
          this.$q.notify({
            type: "negative",
            message: "Something went wrong|Please Try Again",
          });
        });
    },
    clickNext() {
      this.nextClicked = true;
      window.scrollTo(0, 0);
    },
    cancelClicked(){
      this.confirm = false;
    },
    confirmForOrder(){
      if(this.selectedAddress ){
        let orderConfirmData = {
          addressId: this.selectedAddress,
        };
        addOrder(orderConfirmData)
        .then((res) => {
         
          this.$q.notify({
            type: "positive",
            message: "Order submitted Successfully",
          });
          this.nextClicked = false;
          this.$router.push('/pastOrder')
        })
        .catch((err) => {
         
          this.$q.notify({
            type: "negative",
            message: "Something went wrong|Please Try Again",
          });
        });
      }
    },
    submitOrder() {
      this.confirm = true;
    },
  },

  async created() {
    await this.getCartProducts();
    await this.fetchAllAddress();
  },
};
</script>

<style>
.submit-container{
  margin-top: 30px;
}
</style>