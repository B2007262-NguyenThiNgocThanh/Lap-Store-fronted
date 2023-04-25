<template>
    <div class="page-row">
        <div class="input-group search-wrapper panel-heading float-right ">
            <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm" :value="modelValue"
                @input="updateModelValue" @keyup.enter="submit" />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="submit">
                    <i class="fas fa-search"></i> Tìm kiếm
                </button>
            </div>
        </div>

        <br><br><br>
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th @click="sort('Id')">Mã nhân viên</th>
                        <th @click="sort('name')">Tên</th>
                        <th @click="sort('role')">Chức vụ</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                        <th>SĐT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="staff in filteredStaffs" :key="staff._id">
                        <td>{{ staff.Id }}</td>
                        <td>{{ staff.name }}</td>
                        <td>{{ staff.role}}</td>
                        <td>{{ staff.sex }}</td>
                        <td>{{ staff.email }}</td>
                        <td>{{ staff.phone }}</td>
                        <td>
                            <router-link :to="{ name: 'editStaff', params: { id: staff._id }}" class="btn btn-success"><i class="fa-regular fa-pen-to-square"></i></router-link> 
                            <button @click.prevent="deleteStaff(staff._id)" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
        <div class="float-left col-md-2">
            <button class="btn btn-primary ">
                <router-link class="text-white" to="/staff/new"><i class="fa-solid fa-plus"></i> THÊM MỚI</router-link>
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
    
    data() {
        return {
            input: "",
            staffs: [],
            currentSort: 'name',
            currentSortDir: 'asc',
            pageSize: 7,
            currentPage: 1
        }
    },
    methods: {
        deleteStaff(id) {
            let apiURL = `http://localhost:3000/api/staff/${id}`;
            // staffs = JSON.parse(this.staffs);
            let indexOfArrayItem = this.staffs.findIndex(i => i._id === id);
            if (window.confirm("Bạn muốn xóa nhân viên này?")) {
                axios.delete(apiURL).then(() => {
                    this.staffs.splice(indexOfArrayItem, 1);
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        sort: function (s) {
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },
    },
    computed: {
        //chuyển staff => chuỗi => tìm kiếm
        staffStrings() {
            return this.staffs.map((staff) => {
                const { staffId, name, role } = staff;
                return [staffId, name, role].join("");
            });
        },
        //trả về staff cần tìm
        filteredStaffs: function() {
            if (this.input) {
                return this.staffs.filter((staff, index) =>
                    this.staffStrings[index].toLowerCase().includes(this.input)
                );
            }
            return this.staffs.sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDir === 'desc') modifier = -1;
                if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            });
        },
    },
    created() {
        let apiURL = 'http://localhost:3000/api/staff';
        axios.get(apiURL).then(res => {
            this.staffs = res.data.staffs
        }).catch(error => {
            console.log(error)
        });
    },
}
</script>