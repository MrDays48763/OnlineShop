<template>
  <div class="home container mt-5">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in product_list" :key="product.id">
        <div class="card text-center">
          <div class="row g-0 h-100">
            <div class="col-md-4">
              <img
                :src="getImage(product.image)"
                class="img-fluid rounded-start"
                :alt="product.image"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title text-center">{{ product.name }}</h5>
              </div>
              <div class="card-footer bg-transparent">
                <div class="mb-3">定價${{ product.price }}</div>
                <div class="form-floating">
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
    <BillDetail :billData="createBill" />
  </div>
</template>

<script>
// @ is an alias to /src
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
      // orderID: 0,
    };
  },
  methods: {
    initialProduct() {
      const promi = axios.get("http://localhost/productGet.php");
      promi
        .then((response) =>
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
    },
    getImage(imageURL) {
      return require("../assets/" + imageURL);
    },
    countPrice() {
      this.createBill.forEach((item) => {
        item.totalPrice = item.price * item.amount;
      });
    },
    // getOrderID() {
    //   const promi = axios.get("http://localhost/orderIdGet.php");
    //   promi
    //     .then(function (response) {
    //       this.orderID = response.data.id;
    //     })
    //     .catch(function (response) {
    //       console.log(response);
    //     });
    // },
  },
  created() {
    this.initialProduct();
  },
  computed: {
    createBill() {
      return this.product_list.filter((item) => item.amount > 0);
    },
    buttonDisable() {
      return this.createBill.length ? false : true;
    },
  },
};
</script>
