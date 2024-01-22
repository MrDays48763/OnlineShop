<template>
  <div class="back container">
    <div class="mt-3 row">
      <h1 class="col-md-1">Users</h1>
      <div class="col-md-1 offset-md-8" style="width: 300px">
        <!-- 搜尋用的關鍵字，綁定query字串 -->
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          v-model="query"
        />
      </div>
    </div>
    <div class="accordion" id="accordionExample">
      <!-- 每個用戶的購買紀錄 -->
      <OrderDetail
        v-for="user in searchList"
        :key="user.id"
        :user-id="user.id"
        :user-name="user.name"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import OrderDetail from "../components/OrderDetail";
export default {
  name: "BackView",
  components: {
    OrderDetail,
  },
  data() {
    return {
      users_list: [],
      query: "",
    };
  },
  methods: {
    // 取得所有的使用者
    initialUser() {
      const promi = axios.get("http://localhost/userGet.php");
      promi
        .then((response) =>
          response.data.forEach((item) =>
            this.users_list.push({ id: item.id, name: item.name })
          )
        )
        .catch(function (response) {
          console.log(response);
        });
    },
  },
  computed: {
    // 搜尋符合關鍵字的用戶
    searchList() {
      return this.users_list.filter((item) => item.name.includes(this.query));
    },
  },
  created() {
    // 在vue的生命週期『created』時觸發，大約是頁面剛開始加載時
    this.initialUser();
  },
};
</script>
