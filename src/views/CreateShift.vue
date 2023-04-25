<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center text-danger"><font color="blue">THÊM CA LÀM</font></h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Tên nhân viên:</label>
                    <input type="text" class="form-control" v-model="shift.staffName" required>
                </div>
                <div class="form-group">
                    <label class="pr-3">Ca làm: </label>
                    <select v-model="shift.shiftName" :required="true" class="browser-default custom-select">
                        <option>một</option>
                        <option>hai</option>
                        <option>ba</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Ngày:</label>
                    <input type="date" class="form-control" v-model="shift.date" required>
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
            shift: {
                name: '',
                shift: '',
                date: '',
            },
            shifts: []
        }
    },
    created() {
        let apiURL = 'http://localhost:3000/api/shift';
        axios.get(apiURL).then(res => {
            this.shifts = res.data.shifts
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:3000/api/shift/new';
            axios.post(apiURL, this.shift).then(() => {
                this.$router.push('/shifts')
                this.shift = {
                    name: '',
                    shift: '',
                    date: '',
                }
                this.message = "Ca làm được thêm mới thành công.";
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>