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
                    required
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
                    required
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
      check: null,
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
          // 如果存在會傳回true，否則為null
          this.check = response.data;
        })
        .then(() => {
          // 確認check的資料為true
          if (this.check) {
            // 用戶名稱打上mitt
            this.eventBus.emit("userdata", {
              Username: this.Username,
              UserID: this.UserID,
            });
            this.$router.push({
              name: "home",
              state: {
                UserID: this.UserID,
              },
            });
          } else {
            alert("帳號或密碼錯誤");
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    },
  },
};
</script>
