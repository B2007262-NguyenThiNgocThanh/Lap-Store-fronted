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
                        <th @click="sort('shiftName')">Ca làm</th>
                        <th @click="sort('datework')">Ngày làm</th>
                        <th @click="sort('staffName')">Tên nhân viên</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="shift in filteredShifts" :key="shift._id">
                        <td>{{ shift.shiftName }}</td>
                        <td>{{ formatDateEN(shift.datework)}}</td>
                        <td>{{ shift.staffName }}</td>
                        <td>
                            <router-link :to="{ name: 'editshift', params: { id: shift._id } }" class="btn btn-success">
                                <i class="fa-regular fa-pen-to-square"></i></router-link>
                            <button @click.prevent="deleteShift(shift._id)" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="float-left col-md-2">
            <button class="btn btn-primary ">
                <router-link class="text-white" to="/shift/new"><i class="fa-solid fa-plus"></i> THÊM MỚI</router-link>
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
            shifts: [],
            currentSort: 'staffName',
            currentSortDir: 'asc',
            pageSize: 20,
            currentPage: 1
        }
    },
    methods: {
        deleteShift(id) {
            let apiURL = `http://localhost:3000/api/shift/${id}`;   
            let indexOfArrayItem = this.shifts.findIndex(i => i._id === id);
            if (window.confirm("Bạn muốn xóa ca làm này?")) {
                axios.delete(apiURL).then(() => {
                    this.shifts.splice(indexOfArrayItem, 1);
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
        // date work
        formatDateEN(date) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
            return new Date(date).toLocaleDateString('en-GB', options)
        },
    },
    computed: {
        shiftStrings() {
            return this.shifts.map((shift) => {
                const { staffName, shiftName, datework } = shift;
                return [staffName, shiftName, datework].join("");
            });
        },
        filteredShifts: function () {
            if (this.input) {
                return this.shifts.filter((shift, index) =>
                    this.shiftStrings[index].toLowerCase().includes(this.input)
                );
            }
            return this.shifts.sort((a, b) => {
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
        let apiURL = 'http://localhost:3000/api/shifts';
        axios.get(apiURL).then(res => {
            this.shifts = res.data.shifts
        }).catch(error => {
            console.log(error)
        });
    },
}
</script>