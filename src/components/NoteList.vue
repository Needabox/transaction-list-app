<template>
    <button @click="showModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-wrap content-start ml-4">Add Transaction</button>
    
    <div v-if="transactions">
        <div class="flex items-center px-4">
            <div class="w-full mt-3">
                <table class="min-w-full shadow-lg bg-white">
                    <tr >
                        <th class="bg-blue-100 border px-8 py-4">Title</th>
                        <th class="bg-blue-100 border px-8 py-4">Amount</th>
                        <th class="bg-blue-100 border px-8 py-4">Actions</th>
                    </tr>
                    <tr v-for="(transaction, index) in transactions" :key="transaction.id">
                        <td class="border px-8 py-4">{{ transaction.title }}</td>
                        <td class="border px-8 py-4">Rp. {{ transaction.amount }}</td>
                        <td class="border px-8 py-4">
                            <div class="flex justify-center">
                                <button class="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 md:py-2 px-2 md:px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded" @click="editTransaction(transaction)">Edit</button>
                                <button class="ml-1 md:ml-2 bg-red-500 hover:bg-red-400 text-white font-bold py-1 md:py-2 px-2 md:px-4 border-b-4 border-red-700 hover:border-red-500 rounded" @click="deleteTransaction(transaction, index)">Delete</button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div v-else>
        <Pulse />
    </div>

    <!--Transaction Modal -->
    <div>
        <div v-if="toggleModal" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 min-w-full bg-black bg-opacity-80">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div class="text-right">
                <span @click="toggleModal = false" class="text-4xl">&times;</span>
            </div>
            <div class="text-center">
                <h1 v-if="edit" class="text-3xl font-semibold text-gray-700 dark:text-gray-200">Edit Transaction</h1>
                <h1 v-else class="text-3xl font-semibold text-gray-700 dark:text-gray-200">Add Transaction</h1>
            </div>
            <div class="m-7">
                <div class="mb-6">
                    <label for="name" class="block mb-2 text-sm text-gray-600 dark:text-gray-400 text-left">Title</label>
                    <input v-if="edit" type="text" placeholder="Edit The Title" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" v-model="transaction.title">
                    <input v-else type="text" placeholder="Insert Title" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" v-model="transactionstore.title">
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400 text-left">Amount</label>
                    <input v-if="edit" type="number" placeholder="Edit the Amount" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" v-model="transaction.amount">
                    <input v-else type="number" placeholder="Insert Amount" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" v-model="transactionstore.amount">
                </div>
                <div>
                    <button v-if="edit" type="button" class="w-full px-3 py-4 text-white bg-green-500 rounded-md focus:bg-green-600 focus:outline-none mt-5" @click="updateTransaction">Edit Transaction</button>
                    <button v-else type="button" class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none mt-5" @click="createTransaction">Save Transaction</button>
                    <button type="reset" class="w-full px-3 py-4 text-white bg-red-500 rounded-md focus:bg-red-600 focus:outline-none mt-5">Reset Transaction</button>
                </div>
            </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'
import Pulse from './Pulse.vue'

export default {
    name: "Note-List",
    components : {
        Pulse
    },
    data() {
        return {
            transaction: {
                id: '',
                title: '',
                amount: '',
            },
            transactionstore: {
                title: '',
                amount: '',
            },
            transactions: {},
            toggleModal: false,
            edit: false
        }
    },
    methods : {
        showModal() {
            this.toggleModal = true
            this.edit = false
        },
        createTransaction()
        {
            axios.post('https://transactionlist.herokuapp.com/api/transaction/store',this.transactionstore).then(response => {
                this.transactions.unshift(response.data.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Create Transaction is successfully'
                })
                    this.transaction = {
                        id: '',
                        title: '',
                        amount: '',
                    }
                })
                this.toggleModal = !this.toggleModal
                this.transactionstore = {
                title: null,
                amount: null
            }
        },

        editTransaction(transaction){
            this.edit = true
            this.toggleModal = true
            this.transaction = transaction
        },
        
        updateTransaction()
        {
            axios.put('https://transactionlist.herokuapp.com/api/transaction/update/'+this.transaction.id ,this.transaction).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Update Transaction is successfully'
                })
                    this.transaction = {
                        id: '',
                        title: '',
                        amount: '',
                    }
                    this.toggleModal = false
            })
        },

        deleteTransaction(transaction, index)
        {
            this.t = transaction
            axios.delete('https://transactionlist.herokuapp.com/api/transaction/delete/'+this.t.id ,this.transaction).then(response => {
                this.transactions.splice(index, 1)
                Swal.fire({
                    icon: 'success',
                    title: 'Delete Transaction is successfully'
                })
                this.transaction = {
                    id: '',
                    title: '',
                    amount: '',
                }
            })
        },

        getTransaction() {
            axios.get('https://transactionlist.herokuapp.com/api/transaction').then(response => {
                this.transactions = response.data.data
            })
        },
    },
    created () {
        this.getTransaction();
    }
}
</script>

<style>

</style>