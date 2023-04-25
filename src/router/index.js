import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/products",
        name: "products",
        component: () => import("@/views/ListProduct.vue"),
    },
    {
        path: "/product/new",
        name: "createProduct",
        component: () => import("@/views/CreateProduct.vue"),
    },
    {
        path: "/product/:id",
        name: "editProduct",
        component: () => import("@/views/EditProduct.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/",
        name: "liststaff",
        component: () => import("@/views/ListStaff.vue"),
    },
    {
        path: "/staff/new",
        name: "createStaff",
        component: () => import("@/views/CreateStaff.vue"),
    },
    {
        path: "/staff/:id",
        name: "editStaff",
        component: () => import("@/views/EditStaff.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    
    {
        path: "/categories",
        name: "categories",
        component: () => import("@/views/ListCategory.vue"),
    },
    {
        path: "/category/new",
        name: "createCategory",
        component: () => import("@/views/CreateCategory.vue"),
    },

    {
        path: "/shifts",
        name: "shifts",
        component: () => import("@/views/ListShift.vue"),
    },
    {
        path: "/shift/new",
        name: "createShift",
        component: () => import("@/views/CreateShift.vue"),
    },
    {
        path: "/shift/:id",
        name: "editShift",
        component: () => import("@/views/EditShift.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;