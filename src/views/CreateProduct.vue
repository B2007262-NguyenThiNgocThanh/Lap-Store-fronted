
<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center text-danger"><font color="blue">THÊM SẢN PHẨM</font></h3>
            <form>
                <div class="form-group">
                    <label>Mã sản phẩm:</label>
                    <input type="text" class="form-control" v-model="product.id" required>
                </div>
                <div class="form-group">
                    <label>Tên sản phẩm:</label>
                    <input type="text" class="form-control" v-model="product.name" required>
                </div>
                <div class="form-group">
                    <label class="pr-3">Loại:</label>
                    <select v-model="product.category" :required="true" class="browser-default custom-select ">
                            <option>MSI</option>
                            <option>ASUS</option>
                            <option>DEL</option>
                            <option>MAC</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Giá:</label>
                    <input type="number" class="form-control" v-model="product.price" required>
                </div>
                <div class="form-group">
                    <label>Số lượng:</label>
                    <input type="number" class="form-control" v-model="product.quantity" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-danger btn-block" style="background:orange"><i class="fa-regular fa-floppy-disk"></i> THÊM MỚI</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            product: {
                id: '',
                name: '',
                category: '',
                price: '',
                quantity: '',
            },
            categories: []
        }
    },
    created() {
        let apiURL = 'http://localhost:3000/api/products';
        axios.get(apiURL).then(res => {
            this.categories = res.data.categories
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:3000/api/products/new';
            axios.post(apiURL, this.product).then(() => {
                this.$router.push('/products')
                this.product = {
                    id: '',
                    name: '',
                    category: '',
                    price: '',
                    quantity: '',
                }
                this.message = "Sản phẩm được thêm mới thành công.";
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script> 