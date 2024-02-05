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
  methods: {
    // 登初時刪除token並導向至登入介面
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  computed: {
    // 從store拿userID
    UserID() {
      return this.$store.state.UserID;
    },
    // 從store拿username
    Username() {
      return this.$store.state.Username;
    },
  },
};
</script>
