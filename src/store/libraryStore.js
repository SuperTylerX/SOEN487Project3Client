import axios from "axios";
import {baseUrl} from '@/config/config';

export default {

    namespaced: true,
    state: {
        bookList: [],
        page: 1,
        total: 0
    },
    mutations: {
        CHANGE_BOOK_LIST(state, payloads) {
            state.bookList = payloads.bookList;
            state.total = payloads.total;
        }
    },
    actions: {
        async CHANGE_BOOK_LIST({commit}, payloads) {
            let token = sessionStorage.getItem("token");
            let bookList = await axios.get(`${baseUrl}/book/search`, {
                headers: {'Authorization': token},
                params: {
                    title: payloads.title,
                    pageNum: payloads.page
                }
            }).then(data => data.data);
            if (bookList.code === 200) {
                commit("CHANGE_BOOK_LIST", {
                    bookList: bookList.data.books,
                    total: bookList.data.total
                })
            } else {
                throw new Error(bookList.message)
            }
        },
        async LOAD_ALL_BOOKS({commit}, payloads) {
            let token = sessionStorage.getItem("token");
            let bookList = await axios.get(`${baseUrl}/book`, {
                headers: {'Authorization': token},
                params: {
                    pageNum: payloads.page
                }
            }).then(data => data.data);
            if (bookList.code === 200) {
                commit("CHANGE_BOOK_LIST", {
                    bookList: bookList.data.books,
                    total: bookList.data.total
                })
            } else {
                throw new Error(bookList.message);
            }
        },
        async DELETE_BOOK({state}, payloads) {
            let token = sessionStorage.getItem("token");
            let result = await axios.delete(`${baseUrl}/book/delete`, {
                headers: {'Authorization': token},
                params: {
                    bookId: payloads.bookId
                }
            }).then(data => data.data);
            if (result.code === 200) {
                state.bookList = state.bookList.filter(item => item.bookId !== payloads.bookId);
            } else {
                throw new Error(result.message);
            }
        },
        async UPDATE_BOOK({dispatch, state}, payloads) {
            let token = sessionStorage.getItem("token");
            let result = await axios.put(`${baseUrl}/book/update`, payloads.book, {
                headers: {
                    'Authorization': token
                }
            }).then(data => data.data);
            if (result.code === 200) {
                await dispatch("LOAD_ALL_BOOKS", {page: state.page});
            } else {
                throw new Error(result.message);
            }
        },
        async ADD_BOOK({state}, payloads) {
            let token = sessionStorage.getItem("token");
            let result = await axios.post(`${baseUrl}/book/create`, payloads.book, {
                headers: {
                    'Authorization': token
                }
            }).then(data => data.data);
            if (result.code === 200) {
                state.bookList = state.bookList.concat(payloads.book)
            } else {
                throw new Error(result.message);
            }
        },
    }
}
