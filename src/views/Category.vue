<template>
  <div>
    <div>
      <router-view :key="$route.path"></router-view>
    </div>
    <main class="main">
      <div class="container">
        <div>
          <ul class="breadcrumb">
            <li class="breadcrumb__item breadcrumb__item--hide">
              <router-link to="/" class="breadcrumb__link"
                ><span class="breadcrumb__span">home</span></router-link
              >
            </li>
            <li class="breadcrumb__item">
              <router-link to="/" class="breadcrumb__link"
                ><span class="breadcrumb__span">products</span></router-link
              >
            </li>
          </ul>
        </div>
        <div class="page">
          <div class="page__sidebar">
            <div class="box" v-show="selectedFilters.length > 0">
              <div class="box-filters">
                <div class="box-filters__header">
                  <span class="box-filters__title">filters</span>
                  <a class="box-filters__clear" @click.prevent="removeAll"
                    >remove all</a
                  >
                </div>
                <ul class="box-filters__ul">
                  <li
                    class="box-filters__li"
                    v-for="filter in selectedFilters"
                    :key="filter"
                  >
                    <button
                      class="box-filters__button"
                      @click="removeFilter(filter)"
                    ></button>
                    <span class="box-filters__name">{{ filter }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="box">
              <div class="box__row">
                <div
                  class="box__header"
                  :class="{ 'box--togglable': !isBrandOpen }"
                  @click="isBrandOpen = !isBrandOpen"
                >
                  Brands
                </div>
                <div class="box__filter" v-show="isBrandOpen">
                  <div class="box__content-container">
                    <div class="box__content">
                      <ul class="box__ul">
                        <li
                          class="box__li"
                          v-for="item in brands"
                          :key="item.id"
                        >
                          <label
                            class="ui-checkbox"
                            :data-fa="item.id"
                            :data-en="item.id"
                            :data-serach="item.id"
                          >
                            <input
                              type="checkbox"
                              class="ui-checkbox__input"
                              :value="item"
                              v-model="searchWordArr"
                            />
                            <span class="ui-checkbox__mark"></span>
                            {{ item }}
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div :style="{ display: display ? 'inline' : 'none' }">
              <div class="box">
                <div class="box__row">
                  <div
                    class="box__header"
                    :class="{ 'box--togglable': !isColorOpen }"
                    @click="isColorOpen = !isColorOpen"
                  >
                    SortOrder
                  </div>
                  <div class="box__filter" v-show="isColorOpen">
                    <div class="box__content-container">
                      <div class="box__content">
                        <ul class="box__ul">
                          <li class="box__li">
                            <label
                              class="ui-checkbox"
                              data-fa="Ascending"
                              data-serach="ASC"
                            >
                              <input
                                type="checkbox"
                                class="ui-checkbox__input"
                                value="ASC"
                                id="asc"
                                v-model="sortOrder"
                              />
                              <span class="ui-checkbox__mark"></span>
                              Ascending
                            </label>
                          </li>
                          <li class="box__li">
                            <label
                              class="ui-checkbox"
                              data-fa="Descending"
                              data-serach="DESC"
                            >
                              <input
                                type="checkbox"
                                class="ui-checkbox__input"
                                value="DESC"
                                id="desc"
                                v-model="sortOrder"
                              />
                              <span class="ui-checkbox__mark"></span>
                              Descending
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="page__content">
            <div class="products">
              <router-link
                :to="'/category/' + item.id"
                v-for="item in products"
                :key="item.id"
                class="products__item"
              >
                <div class="card">
                  <div class="card__image">
                    <img :src="item.productImage[0]" alt="" class="card__img" />
                  </div>
                  <div class="card__title">
                    {{ item.productName }}
                  </div>
                  <div class="card__price">
                    <span class="card__total-price">{{
                      formattedPrice(item.price)
                    }}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {
  getAllProductsByQuery,
  filterProducts
} from "../api/product/product.js";

export default {
  name: "Category",
  data: () => ({
    isBrandOpen: true,
    isColorOpen: true,
    selectedFilters: [],
    page: 2,
    count: null,
    sortBy: "price",
    sortOrder: [],
    searchWordArr: [],
    queryWord: null,
    searchword: null,
    products: [],
    brands: [],
    display: null,
    tempArr: [],
  }),
  computed: {
    searchTxt() {
      this.searchword = this.$route.query.q;
      return this.searchword;
    },
    numberOne() {
      return 1;
    },
  },
  watch: {
    sortOrder() {
      this.sortOrder.forEach((element) => {
        const temp = this.selectedFilters.findIndex((element2) => {
          return element2 === element;
        });
        if (temp === -1) {
          this.selectedFilters = this.selectedFilters.concat(element);
        }
      });
      this.updatedFilters();
    },
    searchWordArr() {
      this.searchWordArr.forEach((element) => {
        const temp = this.selectedFilters.findIndex((element2) => {
          return element2 === element;
        });
        if (temp === -1) {
          this.selectedFilters = this.selectedFilters.concat(element);
        }
      });
      this.updatedFilters();
    },
    selectedFilters() {
      if (this.searchWordArr.length === 0) {
        this.display = false;
      } else {
        this.display = true;
      }
    },
    products() {
      this.tempArr = this.products;
      this.products.forEach((element) => {
        this.brands.push(element.brand.brandName);
      });
      this.brands = [...new Set(Object.values(this.brands))];
    },
  },
  methods: {
    removeAll() {
      this.selectedFilters = [];
      this.searchWordArr = [];
      this.sortOrder = [];
      this.tempArr = [];
      this.$router.push("/category");
    },
    removeFilter(filter) {
      this.selectedFilters = this.selectedFilters.filter(
        (item) => item !== filter
      );
      this.searchWordArr = this.searchWordArr.filter((item) => item !== filter);
      this.sortOrder = this.sortOrder.filter((item) => item !== filter);
    },
    formattedPrice(price) {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
    apiProducts(page, count, sortBy, sortOrder, searchWord) {
      products(page, count, sortBy, sortOrder, searchWord);
    },
    getProductsByQuery(searchword) {
      getAllProductsByQuery(searchword)
        .then((res) => {
          this.products = res.data.data.data;
          this.queryWord = searchword;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updatedFilters() {
      this.page = 1;

      if (this.queryWord) {
        if (this.searchWordArr.length === 0) {
          this.sortOrder.forEach((element) => {
            if (element === "ASC") {
              this.products = this.tempArr.sort((a, b) =>
                a.price > b.price ? 1 : -1
              );
            } else if (element === "DESC") {
              this.products = this.tempArr.sort((a, b) =>
                a.price > b.price ? -1 : 1
              );
            }
          });
        }
        else if (this.searchWordArr.length > 0 || this.sortOrder.length > 0) {
          if (this.searchWordArr) {
            this.filterProduct(
              this.page,
              this.count,
              this.sortBy,
              this.sortOrder,
              this.searchWordArr
            );
          } else if (this.queryWord) {
            this.filterProduct(
              this.page,
              this.count,
              this.sortBy,
              this.sortOrder,
              this.queryWord
            );
          }
        }
      } else {
        if (this.searchWordArr) {
          this.filterProduct(
            this.page,
            this.count,
            this.sortBy,
            this.sortOrder,
            this.searchWordArr
          );
        } else if (this.queryWord) {
          this.filterProduct(
            this.page,
            this.count,
            this.sortBy,
            this.sortOrder,
            this.queryWord
          );
        }
      }
    },
    filterProduct(page, count, sortBy, sortOrder, searchWord) {
      filterProducts(page, count, sortBy, sortOrder, searchWord)
        .then((response) => {
          this.products = response.data.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async routeUpdated() {
      window.scrollTo(0, 0);
      this.searchword = this.$route.query.q;
      console.log(this.searchword);
      if (!this.searchword) {
        await this.$store.dispatch("products/fetchProducts");
        this.products = this.$store.getters["products/products"];
      } else {
        this.getProductsByQuery(this.searchword);
      }
      this.disable = true;
      this.display = false;
    },
    async getNextProducts() {
      window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          if (!this.queryWord) {
            console.log("on scroll all product api call");

            if (this.selectedFilters.length > 0) {
              if (this.searchWordArr) {
                this.page++;
                filterProducts(this.page, "", "", "", this.searchWordArr)
                  .then((response) => {
                    return response.data.data.data;
                  })
                  .then((data) => {
                    this.products = this.products.concat(data);
                    this.page++;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            } else {
              filterProducts(this.page, "", "", "", "")
                .then((response) => {
                  return response.data.data.data;
                })
                .then((data) => {
                  this.products = this.products.concat(data);
                  this.page++;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            if (
              this.queryWord &&
              this.selectedFilters.length === 0 &&
              this.sortOrder.length === 0
            ) {
              filterProducts(this.page, "", "", "", this.queryWord)
                .then((response) => {
                  return response.data.data.data;
                })
                .then((data) => {
                  this.products = this.products.concat(data);
                  this.page++;
                })
                .catch((err) => {
                  console.log(err);
                });
            } else if (
              this.queryWord &&
              this.selectedFilters.length > 0 &&
              this.sortOrder.length === 0
            ) {
              if (this.searchWordArr) {
                filterProducts(this.page, "", "", "", this.searchWordArr)
                  .then((response) => {
                    return response.data.data.data;
                  })
                  .then((data) => {
                    this.products = this.products.concat(data);
                    this.page++;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            } else if (
              this.queryWord &&
              this.selectedFilters.length === 0 &&
              this.sortOrder.length > 0
            ) {
              this.tempArr = [];
              filterProducts(this.page, "", "", this.sortOrder, this.queryWord)
                .then((response) => {
                  return response.data.data.data;
                })
                .then((data) => {
                  this.products = this.products.concat(data);
                  this.page++;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        }
      };
    },
  },
  async created() {
    await this.routeUpdated();
  },
  async mounted() {
    await this.getNextProducts();
  },
};
</script>

<style scoped>
#sortorder {
  display: hide;
}
</style>
