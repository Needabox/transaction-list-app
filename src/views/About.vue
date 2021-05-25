<template>
  <div class="about">
    <h1>This is an about page</h1>

            <div class="flex items-center px-4">
            <div class="w-full mt-3">
                <table class="min-w-full shadow-lg bg-white">
                    <tr clas>
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
</template>
