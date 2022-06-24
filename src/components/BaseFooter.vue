<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container">
        <div class="footer__row">
          <div class="footer__getcall">
            <img src="img/tamasbama.png" alt="" />
            <div class="footer__getcall-info">
              <h3 class="footer__getcall-h3">contact us</h3>
              <span class="gooter__getcall-span">any questions? ask us !</span>
            </div>
          </div>
          <div class="footer__info">
            <span class="footer__info-span">Email : info@domian.com</span>
            <span class="footer__info-span margin--right-10">
              Tel : 1023233030</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="footer__main">
      <div class="container">
        <div class="footer__links">
          <router-link :to="{ name: 'Category' }" class="footer__link">
            <div class="example-cell col-6" tabindex="0">
              <q-avatar size="70px">
                <img
                  src="https://www.gizbot.com/images/2019-08/vivo-s1_156594826370.jpg"
                />
              </q-avatar>
              <br />
              Mobile
            </div>
          </router-link>
          <router-link :to="{ name: 'Category' }" class="footer__link">
             <div class="example-cell col-6" tabindex="0">
              <q-avatar size="70px">
                <img
                  src="https://cdn.quasar.dev/img/avatar.png"
                />
              </q-avatar>
              <br />
              Women
            </div>
          </router-link>
          <router-link :to="{ name: 'Category' }" class="footer__link">
             <div class="example-cell col-6" tabindex="0">
              <q-avatar size="70px">
                <img
                  src="https://st.depositphotos.com/3029723/4759/i/950/depositphotos_47595341-stock-photo-fashion-kids-resting-on-the.jpg"
                />
              </q-avatar>
              <br />              
              Kid's
            </div>
          </router-link>
          <router-link :to="{ name: 'Category' }" class="footer__link">
             <div class="example-cell col-6" tabindex="0">
              <q-avatar size="70px">
                <img
                  src="https://images.unsplash.com/photo-1626895872564-b691b6877b83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG1ha2UlMjB1cHxlbnwwfHwwfHw%3D&w=1000&q=80"
                />
              </q-avatar>
              <br />
              Beauty
            </div>
          </router-link>
          <router-link :to="{ name: 'Category' }" class="footer__link">
             <div class="example-cell col-6" tabindex="0">
              <q-avatar size="70px">
                <img
                  src="https://media.istockphoto.com/photos/living-room-interior-mockup-with-red-sofa-wooden-table-and-rattan-picture-id1303111889?b=1&k=20&m=1303111889&s=170667a&w=0&h=JtyUOe_LuFzclBrin8uxU4vzndAyO7JNw9ERQbae0Fo="
                />
              </q-avatar>
              <br />
              Home & Furniture
            </div>
          </router-link>
          <router-link :to="{ name: 'Category' }" class="footer__link">
             <div class="example-cell col-6" tabindex="0">
              <q-avatar size="70px">
                <img
                  src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/11/771253-The-Best-Baby-Soaps-on-the-Market-Today-According-to-Dermatologists-1296x728-Header-81b9bf-1.jpg?w=1155&h=1528"
                />
              </q-avatar>
              <br />
              Baby care & foods
            </div>
          </router-link>
        </div>
        <div class="footer__hr"></div>
        <div class="footer__about">
          <p class="footer__txt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            esse ipsa sed illum, distinctio voluptatem illo accusantium,
            mollitia voluptatibus tempora magni provident aut corporis? Est
            molestias adipisci labore nihil consequatur.
          </p>
        </div>
      </div>
      <div class="footer__team">
        design with &#x02665; by
        <a class="footer__copy">Bacancy Vue team</a>
        © 2022
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "BaseFooter",

  data() {
    return {};
  },

  methods: {},
};
</script>

<style></style>
