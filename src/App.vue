<template>
  <!-- 導覽列 -->
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary bg-primary"
    data-bs-theme="dark"
  >
    <div class="container">
      <router-link
        class="navbar-brand"
        :to="{ name: 'home', state: { UserID: UserID } }"
        >Online Shop</router-link
      >
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
        <span class="navbar-text">{{ Username }}</span>
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
      Username: "",
      // UserID: "",
    };
  },
  // listen mitt上的用戶資料
  mounted() {
    this.eventBus.on("userdata", (data) => {
      this.Username = data.Username;
      // this.UserID = data.UserID;
    });
  },
  // 關閉mitt
  beforeUnmount() {
    this.eventBus.off("userdata");
  },
  computed: {
    UserID() {
      return history.state.UserID;
    },
  },
};
</script>
