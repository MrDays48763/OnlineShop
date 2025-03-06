<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <!-- accrodion的開頭 -->
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="tagUserId"
        aria-expanded="false"
        :aria-controls="stringUserId"
      >
        {{ this.userName }}
      </button>
    </h2>
    <div
      :id="stringUserId"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        <!-- 每筆交易紀錄都用卡片包起來 -->
        <div
          class="card"
          v-for="(order, order_id) in order_list"
          :key="order_id"
        >
          <!-- 交易紀錄的開頭 -->
          <div class="card-header">OrderID {{ order_id }}</div>
          <!-- 用table呈現明細內容 -->
          <table class="table card-body">
            <thead>
              <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in order" :key="product.product_id">
                <th scope="row">{{ product.product_id }}</th>
                <td>{{ product.name }}</td>
                <td>{{ product.amount }}</td>
                <td>{{ product.price }}</td>
              </tr>
              <tr>
                <th scope="row" colspan="3">Total</th>
                <td>{{ totalCompute(order_id, order[0].coupon_id) }}</td>
              </tr>
              <tr>
                <th scope="row" colspan="3">CouponID</th>
                <td>{{ order[0].coupon_id ? order[0].coupon_id : "Null" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const api = "http://localhost/";
export default {
  name: "OrderDetail",
  props: ["userId", "userName"],
  data() {
    return {
      order_list: [],
      total: {},
    };
  },
  methods: {
    // get method抓取每個用戶的交易紀錄
    initialOrder() {
      const promi = axios.get(`${api}orderGet.php`, {
        params: { id: this.userId },
      });
      promi
        .then((response) => {
          if (response.data) {
            var obj = {};
            response.data.forEach((item) => {
              var order = {
                id: item.id,
                product_id: item.product_id,
                amount: item.amount,
                name: item.pname,
                price: item.amount * item.price,
                coupon_id: item.coupon_id,
              };
              var num = item.id;
              var text = num.toString();
              if (!this.order_list[text]) {
                obj[text] = [order];
                this.order_list = obj;
                this.total[text] = item.amount * item.price;
              } else {
                obj = this.order_list;
                obj[text].push(order);
                this.order_list = obj;
                this.total[text] += item.amount * item.price;
              }
            });
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    // 計算總價
    totalCompute(order_id, coupon) {
      if (coupon) {
        return this.total[order_id] * 0.8;
      } else {
        return this.total[order_id];
      }
    },
  },
  created() {
    // 在vue的生命週期『created』時觸發，大約是頁面剛開始加載時
    this.initialOrder();
  },
  computed: {
    // 把id轉成字串，用來分辨每一個accordion元素
    stringUserId() {
      return "id" + this.userId.toString();
    },
    // 把id轉成字串，用來分辨每一個accordion元素
    tagUserId() {
      return "#id" + this.userId.toString();
    },
  },
};
</script>
