<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">帳單</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 明細內容 -->
          <table class="table">
            <thead>
              <tr>
                <th scope="col">名稱</th>
                <th scope="col">數量</th>
                <th scope="col">價格</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in billData" :key="product.id">
                <td scope="row">{{ product.name }}</td>
                <td>{{ product.amount }}</td>
                <td>{{ product.totalPrice }}</td>
              </tr>
              <tr>
                <th scope="row">共</th>
                <td :class="totalDisplay">{{ Total }}元</td>
                <td>{{ newPrice }}</td>
              </tr>
            </tbody>
          </table>
          <div class="form-check form-check-reverse">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              v-model="checked"
              :disabled="coupon"
              @click="changeDisplay"
            />
            <!-- 確認有無使用折價券 -->
            <label class="form-check-label" for="flexCheckDefault">
              使用折價券
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <!-- 關閉購買界面 -->
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <!-- 購買按鈕 -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="sendBill"
          >
            確認購買
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    billData: Object,
    useriddata: String,
  },
  data() {
    return {
      checked: false,
      coupon: false,
      totalDisplay: "",
      orderID: 0,
    };
  },
  methods: {
    // 傳送帳單資料到後端
    sendBill() {
      if (this.billData) {
        this.billData.forEach((item) => {
          var params = new URLSearchParams();
          params.append("id", this.orderID);
          params.append("product_id", item.id);
          params.append("user_id", this.useriddata);
          params.append("amount", item.amount);
          axios
            .post("http://localhost/orderInsert.php", params)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (response) {
              console.log(response);
            });
        });
      }
    },
    // 取得資料庫內最新的orderID
    getOrderID() {
      const promi = axios.get("http://localhost/orderIdGet.php");
      promi
        .then((response) => {
          this.orderID =
            response.data == null ? 0 : Number(response.data.id) + 1;
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    // 改變折價券確認點擊後的外觀
    changeDisplay() {
      if (this.checked) {
        this.totalDisplay = "";
      } else {
        this.totalDisplay = "text-decoration-line-through";
      }
    },
  },
  computed: {
    // 計算Total
    Total() {
      var total = 0;
      if (this.billData) {
        this.billData.forEach((item) => {
          total += item.price;
        });
      }
      return total;
    },
    // 價錢＋量詞
    newPrice() {
      if (this.checked) {
        return this.Total * 0.8 + "元";
      } else return "";
    },
  },
  created() {
    // 在vue的生命週期『created』時觸發，大約是頁面剛開始加載時
    this.getOrderID();
  },
};
</script>
