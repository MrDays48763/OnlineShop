<template>
  <div class="home container mt-5">
    <!-- 商品區塊 -->
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in product_list" :key="product.id">
        <div class="card text-center">
          <div class="row g-0 h-100">
            <div class="col-md-4">
              <!-- 取得商品圖片 -->
              <img
                :src="getImage(product.image)"
                class="img-fluid rounded-start"
                :alt="product.image"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <!-- 商品名稱 -->
                <h5 class="card-title text-center">{{ product.name }}</h5>
              </div>
              <div class="card-footer bg-transparent">
                <!-- 價格 -->
                <div class="mb-3">定價${{ product.price }}</div>
                <div class="form-floating">
                  <!-- 購買數量 -->
                  <input
                    type="number"
                    class="form-control"
                    :id="product.id"
                    name="amount"
                    placeholder="0"
                    min="0"
                    max="10"
                    v-model="product.amount"
                  />
                  <label :for="product.id">數量</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 text-center">
      <!-- 按下按鈕開啟帳單 -->
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="countPrice"
        :disabled="buttonDisable"
      >
        我要結帳
      </button>
    </div>
    <!-- 帳單 -->
    <BillDetail :billData="createBill" :useriddata="UserID" />
  </div>
</template>

<script>
import BillDetail from "../components/BillDetail";
import axios from "axios";
export default {
  name: "HomeView",
  components: {
    BillDetail,
  },
  data() {
    return {
      product_list: [],
      UserID: "",
    };
  },
  methods: {
    // 用get method取得商品資料
    initialProduct() {
      const promi = axios.get("http://localhost/productGet.php");
      promi
        .then((response) =>
          // 把每一筆回傳的資料存進product_list物件裡
          response.data.forEach((item) => {
            this.product_list.push({
              id: item.id,
              name: item.pname,
              image: item.image,
              price: item.price,
              amount: 0,
              totalPrice: 0,
            });
          })
        )
        .catch(function (response) {
          console.log(response);
        });
      this.UserID = history.state.UserID;
    },
    getImage(imageURL) {
      return require("../assets/" + imageURL);
    },
    // 計算價錢
    countPrice() {
      this.createBill.forEach((item) => {
        item.totalPrice = item.price * item.amount;
      });
    },
  },
  created() {
    // 在vue的生命週期『created』時觸發，大約是頁面剛開始加載時
    this.initialProduct();
  },
  computed: {
    // 只保留用戶要買的商品
    createBill() {
      return this.product_list.filter((item) => item.amount > 0);
    },
    // 如果商品數量皆為零，disable這顆按鈕
    buttonDisable() {
      return this.createBill.length ? false : true;
    },
  },
};
</script>
