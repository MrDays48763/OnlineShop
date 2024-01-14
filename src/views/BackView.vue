<template>
  <div class="back container">
    <!-- <nav class="navbar mb-5" style="background-color: #e3f2fd">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Order Database</a>
        <div> -->
    <!-- </div>
      </div>
    </nav> -->
    <div class="mt-3 row">
      <h1 class="col-md-1">Users</h1>
      <div class="col-md-1 offset-md-8" style="width: 300px">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          v-model="query"
        />
      </div>
    </div>
    <div class="accordion" id="accordionExample">
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
    searchList() {
      return this.users_list.filter((item) => item.name.includes(this.query));
    },
  },
  created() {
    this.initialUser();
  },
};
</script>
