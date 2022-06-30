<template>
  <div>
    <div id="modal__gallery" class="modal" v-show="isShowingModal">
      <div class="modal__content">
        <span class="modal__close" @click="closeModal">&times;</span>
        <div class="modal__body" tabindex="0" @focusout="closeModal">
          <img :src="modalImage" class="show__gallery" />
        </div>
      </div>
    </div>
    <main class="main">
      <div class="container">
        <div class="product">
          <div class="product__header">
            <div class="product__row">
              <div class="prodcut__gallery">
                <div class="gallery">
                  <div class="gallery__slideshow">
                    <div class="gallery__slides">
                      <div class="gallery__slide">
                        <img
                          class="gallery__img"
                          :src="product.productImage"
                          alt=""
                          @click="showModal(product.productImage)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="product__left">
                <div class="product__category">
                  {{ product.subcategory.subCategoryName }}
                </div>
                <div class="product__info">
                  <div class="product__details">
                    <div v-if="product">
                      <h1 class="product__title">{{ product.productName }}</h1>
                      <p class="margin-top__30">$ {{ product.price }}</p>
                    </div>
                    <div v-else>Could not find any product</div>
                  </div>
                </div>
                <div>
                  <button
                    v-if="product.quantity >= 1 && !alreadyInCart"
                    class="btn btn--boxshadow btn--brand"
                    @click="addItem(product.id)"
                  >
                    add to cart
                  </button>
                  <div v-if="product.quantity < 1">
                    <p class="out-of-stock-txt">Out of stock</p>
                  </div>
                  <button
                    v-if="alreadyInCart"
                    class="btn btn--boxshadow btn--brand"
                    @click="goToCart"
                  >
                    Go to cart
                  </button>
                </div>
                <div class="description-container">
                  <p>{{ product.description }}</p>
                </div>
                <div class="controls"></div>
              </div>
            </div>
          </div>
          <div class="seller-container">
            <p class="seller-header">Seller info:</p>
            <div>
              <p>
                Name:
                {{ product.seller.firstName + " " + product.seller.lastName }}
              </p>
            </div>
            <div>
              <p>Email: {{ product.seller.email }}</p>
            </div>
          </div>
        </div>
        <div v-if="feedbackLength > 0" class="product-details">
          <div class="tab">
            <div class="tab__items">
              <span class="tab__item tab__item--compare">Review</span>
            </div>
            <div class="tab review-container">
              <section class="container">
                <div v-for="feedback in feedbackData" :key="feedback.id">
                  <div class="feedback-card">
                    <p>{{ feedback.feedbackDesc }}</p>
                    <div>
                      <q-rating
                        v-model="feedback.rating"
                        max="5"
                        size="2em"
                        color="yellow"
                        icon="star_border"
                        icon-selected="star"
                        icon-half="star_half"
                        no-dimming
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
    <main class="main secondMain">
      <div class="container">
        <div class="product">
          <p class="reletedProductsTxt">Releted Products</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { addToCart } from "../api/cart/cart.js";
import { getFeedback } from "../api/feedback/feedback.js";

export default {
  props: ["productId"],
  data() {
    return {
      rateWidth: 0,
      showRate: true,
      isShowingModal: false,
      modalImage: null,
      product: {},
      ratings: [
        { width: 100, title: "awesome" },
        { width: 80, title: "good" },
        { width: 60, title: "normal" },
        { width: 40, title: "weak" },
        { width: 20, title: "bad" },
      ],
      feedbackData: [],
      alreadyInCart: false,
    };
  },
  computed: {
    feedbackLength() {
      return this.feedbackData.length;
    },
  },
  methods: {
    goToCart() {
      this.$router.push("/cart");
    },
    addItem(prodId) {
      if (this.$store.getters["user/user"].id) {
        let productId = prodId;
        let userId = this.$store.getters["user/user"].id;

        let reqData = {
          userId,
          productId,
          quantity: 1,
        };

        addToCart(reqData)
          .then(async (res) => {
            this.$q.notify({
              type: "positive",
              message: "Product Added Successfully",
            });
           
            await this.$store.dispatch('cart/fetchProducts')
            
          })
          .catch((err) => {
            this.$q.notify({
              type: "negative",
              message: "Something went wrong|Please Try Again",
            });
          });
      }
      else{
        this.$router.push({ name :'Login', query :{ redirect: this.$route.fullPath }});
      }
    },
    showModal(image) {
      this.isShowingModal = true;
      this.modalImage = image;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.isShowingModal = false;
      document.body.style.overflow = "unset";
    },
    handleMouseover() {
      this.showRate = false;
    },
    handleMouseleave() {
      this.showRate = true;
    },
    formattedPrice(price) {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
    fetchFeedback() {
      let feedbackData = {
        productId: this.productId,
      };
      return new Promise((resolve, reject) => {
        getFeedback(feedbackData)
          .then((res) => {
            resolve(res);

            this.feedbackData = res.data.data;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  async created() {
    window.scrollTo(0, 0);
    let arr = this.$store.getters["products/products"];
    let prodObj = arr.find((item) => {
      return item.id == this.productId;
    });
    this.product = prodObj;

    let products = [];

    await this.$store.dispatch("cart/fetchProducts");

    products = this.$store.getters["cart/products"];

    products.forEach((data) => {
      if (data.Product.id == this.productId) {
        this.alreadyInCart = true;
      }
    });

    await this.fetchFeedback();
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
  padding-top: 50px;
  overflow: hidden;
  z-index: 1033;
}

.modal__content {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 60%;
  max-width: 100%;
  margin: auto;
  padding: 20px;
  color: #3a3f43;
  overflow: hidden;
  position: relative;
  text-align: center;
}

.modal__header,
.modal__body,
.modal__footer {
  padding: 20px 0;
}

.modal__close {
  position: absolute;
  font-size: 28px;
  font-weight: bold;
  color: #8f8f8f;
  left: 0;
  top: 0;
  padding: 0 20px;
}

.modal__close:hover,
.modal__close:focus {
  color: #000 !important;
  cursor: pointer;
}

.reletedProductsTxt {
  font-size: 25px;
  margin: auto 0;
  font-weight: bold;
}

.secondMain {
  margin: 50px 0;
}
.description-container {
  margin-top: 30px;
}
.seller-container {
  margin-top: 30px;
}
.seller-header {
  font-weight: bold;
  font-size: 18px;
}
.out-of-stock-txt {
  color: #ff0000;
  font-size: 20px;
  font-weight: bold;
}
.review-container {
  background-color: #ffffff;
  padding: 50px 0;
}
.feedback-card {
  background-color: #e2e1e1;
  padding: 20px;
  margin: 10px 0;
  font-size: 17px;
}
</style>