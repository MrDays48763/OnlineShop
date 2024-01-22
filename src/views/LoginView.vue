<template>
  <section class="vh-100" style="background-color: #508bfc">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <!-- 如果submit被按下，則觸發loginCheck函式 -->
              <form @submit.prevent="loginCheck">
                <!-- 登入介面標題 -->
                <h3 class="mb-5">Sign in</h3>
                <div class="form-floating mb-4">
                  <!-- 用戶名的輸入欄，同步到Username -->
                  <input
                    type="text"
                    id="typeName"
                    class="form-control"
                    placeholder="Name"
                    v-model="Username"
                  />
                  <label class="form-label" for="typeName">Name</label>
                </div>
                <div class="form-floating mb-4">
                  <!-- 用戶的Roblox ID輸入欄，同步到UserID -->
                  <input
                    type="password"
                    id="typePassword"
                    class="form-control"
                    placeholder="User ID"
                    v-model="UserID"
                  />
                  <label class="form-label" for="typePassword">User ID</label>
                </div>
                <div class="d-grid gap-2">
                  <!-- Submit按鈕 -->
                  <button class="btn btn-primary btn-lg" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      UserID: "",
      Username: "",
      check: {},
    };
  },
  methods: {
    // 檢查帳號資料
    loginCheck() {
      // 用get method傳遞用戶資料到後端，確認用戶是否存在
      const promi = axios.get("http://localhost/identity.php", {
        params: { id: this.UserID, username: this.Username },
      });
      promi
        .then((response) => {
          // 如果存在會傳回用戶名稱，否則為null
          this.check = response.data;
        })
        .catch(function (response) {
          console.log(response);
        });
      // 檢查check內有沒有用戶名稱
      if (this.check !== {} && this.check !== null) {
        // 用戶名稱打上mitt
        this.eventBus.emit("userdata", this.Username);
        this.$router.push("/home");
      }
    },
  },
};
</script>
