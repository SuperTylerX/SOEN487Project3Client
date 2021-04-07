import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import Nav from "@/views/Nav";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Nav',
        component: Nav
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/library',
        name: 'Library',
        // lazy-loaded when the route is visited.
        component: () => import('../views/regular/FrameworkPage.vue'),
        children: [
            {
                path: '/library/index',
                name: 'Index',
                // lazy-loaded when the route is visited.
                component: () => import('../views/regular/Index.vue'),
            },
            {
                path: '/library/search',
                name: 'Search',
                // lazy-loaded when the route is visited.
                component: () => import( '../views/regular/Search.vue'),
            },
            {
                path: '/library/reservation',
                name: 'Reservation',
                // lazy-loaded when the route is visited.
                component: () => import('../views/regular/Reservation.vue'),
            },
            {
                path: '/library/detail',
                name: 'Detail',
                // lazy-loaded when the route is visited.
                component: () => import('../views/regular/Detail.vue')
            }]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/admin/FrameworkPage.vue'),
        children: [
            {
                path: '/admin/reservation-list',
                name: 'Reservation List',
                // lazy-loaded when the route is visited.
                component: () => import('../views/admin/Reservation.vue')
            },
            {
                path: '/admin/book-list',
                name: 'Book List',
                // lazy-loaded when the route is visited.
                component: () => import( '../views/admin/BookList.vue'),
            },
            {
                path: '/admin/modify-book',
                name: 'Modify Book',
                // lazy-loaded when the route is visited.
                component: () => import( '../views/admin/ModifyBook.vue'),
            },
            {
                path: '/admin/add-book',
                name: 'Add Book',
                // lazy-loaded when the route is visited.
                component: () => import( '../views/admin/AddBook.vue'),
            }
        ]
    },
    {
        path: "*",
        redirect: "/"
    }
]

const router = new VueRouter({
    routes,
})

export default router
