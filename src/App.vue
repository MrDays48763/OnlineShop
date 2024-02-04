<template>
  <!-- 導覽列 -->
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary bg-primary"
    data-bs-theme="dark"
  >
    <div class="container">
      <router-link class="navbar-brand" to="/">Online Shop</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- 後台連結 -->
            <router-link class="nav-link" to="/back" v-if="UserID == '0'">
              Back Stage
            </router-link>
          </li>
        </ul>
        <!-- 顯示用戶名稱 -->
        <span class="navbar-text me-5">{{ Username }}</span>
        <!-- class="container-fluid justify-content-end" -->
        <form class="d-flex" @submit.prevent="logout" v-if="Username">
          <button class="btn btn-outline-light me-2" type="submit">
            Logout
          </button>
        </form>
      </div>
    </div>
  </nav>
  <!-- 本網站的根目錄，會導向登入畫面 -->
  <router-view />
</template>
<script>
export default {
  // 儲存用戶名稱
  data() {
    return {
      // Username: "",
      // UserID: "",
    };
  },
  // listen mitt上的用戶資料
  // mounted() {
  //   this.eventBus.on("userdata", (data) => {
  //     this.Username = data.Username;
  //     // this.UserID = data.UserID;
  //   });
  // },
  // // 關閉mitt
  // beforeUnmount() {
  //   this.eventBus.off("userdata");
  // },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  computed: {
    UserID() {
      // return history.state.UserID;
      return this.$store.state.UserID;
    },
    Username() {
      return this.$store.state.Username;
    },
  },
};
</script>
