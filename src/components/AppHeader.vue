<!--định nghĩa thanh điều hướng toàn cục của ứng dụng-->
<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
        <a href="/" class="navbar-brand float-left">ỨNG DỤNG QUẢN LÝ CỬA HÀNG LAPTOP</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/">QUẢN LÝ NHÂN VIÊN</router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/products">QUẢN LÝ SẢN PHẨM</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/categories">DANH MỤC SẢN PHẨM</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/shifts">QUẢN LÝ CA LÀM VIỆC</router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>