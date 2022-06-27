<template>
  <header class="header header--bg">
    <div class="header__shape">
      <div class="header__shape-inner"></div>
    </div>
    <div class="container">
      <div class="navbar">
        <div class="navbar__row">
          <div
            class="navbar__items"
            :class="{ 'navbar__items--is-active': showSideBar }"
          >
            <ul class="navbar__ul">
              <li class="navbar__item">
                <div class="header__logo">
                  <router-link to="/" class="header__logo-img"></router-link>
                </div>
              </li>
              <li class="navbar__item">
                <router-link to="/" class="navbar__link navbar__link--is-active"
                  >BKart</router-link
                >
              </li>
            </ul>
          </div>

          <div
            class="navbar__items"
            :class="{ 'navbar__items--is-active': showSideBar }"
          >
            <ul class="navbar__ul">
              <li class="navbar__item">
                <router-link to="/" class="navbar__link navbar__link--is-active"
                  >Home</router-link
                >
              </li>
              <li class="navbar__item navbar__item--has-sub">
                <a @click.prevent href="" class="navbar__link">Categories</a>
                <ul class="navbar__subset">
                  <li class="navbar__item navbar__item--has-sub">
                    <a href="" class="navbar__link">Electronics</a>
                    <ul class="navbar__subset">
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Mobile</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Laptop</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Speakers</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Cameras</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="navbar__item navbar__item--has-sub">
                    <a href="" class="navbar__link">Tv & Applications</a>
                    <ul class="navbar__subset">
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Television</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Washing Machine</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Air Conditioners</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="navbar__item navbar__item--has-sub">
                    <a href="" class="navbar__link">Men</a>
                    <ul class="navbar__subset">
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Clothings</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Footware</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Watches</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="navbar__item navbar__item--has-sub">
                    <router-link to="/" class="navbar__link">Women</router-link>
                    <ul class="navbar__subset">
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Clothings</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Footware</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Watches</router-link
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="navbar__item navbar__item--has-sub">
                    <a href="" class="navbar__link">Baby & Kids</a>
                    <ul class="navbar__subset">
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Kid's Clothings</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Toys</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Baby Care</router-link
                        >
                      </li>
                    </ul>
                  </li>

                  <li class="navbar__item navbar__item--has-sub">
                    <a href="" class="navbar__link">Home & Furniture</a>
                    <ul class="navbar__subset">
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Kitchen, Cookware & Serveware</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Furnishing</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Home Decore</router-link
                        >
                      </li>
                    </ul>
                  </li>

                  <li class="navbar__item navbar__item--has-sub">
                    <a href="" class="navbar__link">Sports, Books & More</a>
                    <ul class="navbar__subset">
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Sports</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Helth & Nutrition</router-link
                        >
                      </li>
                      <li class="navbar__item">
                        <router-link
                          :to="{ name: 'Category' }"
                          class="navbar__link"
                          >Stationery</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="navbar__item">
                <router-link to="/about" class="navbar__link"
                  >About us</router-link
                >
              </li>
              <li class="navbar__item">
                <router-link to="/seller/registration" class="navbar__link"
                  >Become A Seller</router-link
                >
              </li>
            </ul>
          </div>
          <div class="navbar__action">
            <div class="header__basket">
              <router-link to="/cart">
                <q-btn dense icon="shopping_cart" class="q-ml-md">
                  <div v-if="cartCount != 0">
                    <q-badge color="red" floating>{{ cartCount }}</q-badge>
                  </div>
                </q-btn>
              </router-link>
            </div>
            <div class="header__account">
              <span
                class="header__account-icon"
                @click="showDropDownAccount"
              ></span>
              <div
                class="header__dropdown header__dropdown--w200"
                :class="{ 'header__dropdown--is-active': isAccountDropDown }"
              >
                <div class="header__dropdown-content">
                  <router-link
                    v-if="!isLoggedIn"
                    :to="{ name: 'Login' }"
                    class="header__account-link"
                    >Login</router-link
                  >
                  <router-link
                    v-if="!isLoggedIn"
                    :to="{ name: 'Register' }"
                    class="header__account-link"
                    >Register</router-link
                  >
                  <router-link
                    v-if="isLoggedIn"
                    :to="{ name: 'Profile' }"
                    class="header__account-link"
                    >Profile</router-link
                  >
                  <router-link
                    v-if="isLoggedIn"
                    :to="{ name: 'PastOrders' }"
                    class="header__account-link"
                    >Past orders</router-link
                  >
                  <router-link
                    v-if="isLoggedIn"
                    :to="{ name: 'Complaint' }"
                    class="header__account-link"
                    >Complaint</router-link
                  >
                  <button
                    v-if="isLoggedIn"
                    @click="Logout"
                    class="header__account-link"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div
              class="header__menu"
              :class="{ 'header__menu--is-active': showSideBar }"
              @click="toggleSidebar"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseHeader",

  data() {
    return {
      isAccountDropDown: false,
      showSideBar: false,
      notZero: true,
      items: [
        {
          id: 1,
          name: "shirt",
          quantity: 1,
          price: 700,
        },
        {
          id: 2,
          name: "t-shirt",
          quantity: 1,
          price: 900,
        },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.token;
    },
    cartCount(){
      this.$store.dispatch('cart/fetchProducts');
      let count = this.$store.getters['cart/cartCount'];
      return count;
    },
  },
  methods: {
    Logout() {
      this.$store.dispatch("user/logout");
      this.$router.push({ name: "Home" });
    },
    showDropDownAccount() {
      this.isBasketDropDown = false;
      this.isAccountDropDown = !this.isAccountDropDown;
    },
    eventListener(event) {
      if (!event.target.closest(".header__basket,.header__account")) {
        this.isBasketDropDown = false;
        this.isAccountDropDown = false;
      }
      if (!event.target.closest(".navbar")) {
        this.showSideBar = false;

        this.$emit("show-sidebar", false);
      }
    },
    toggleSidebar() {
      this.showSideBar = !this.showSideBar;

      this.$emit("show-sidebar", this.showSideBar);
    },
    formattedPrice(price) {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
  },

  mounted() {
    document.addEventListener("click", this.eventListener);
  },

  unmounted() {
    document.removeEventListener("click", this.eventListener);
  },
};
</script>

<style></style>
