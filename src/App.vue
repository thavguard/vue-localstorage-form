<template>
  <div>
    <h2>Управление учетными записями</h2>
    <el-button type="primary" @click="addAccount" style="margin-bottom: 20px"
      >Добавить запись</el-button
    >
    <AccountList />
  </div>
</template>

<script lang="ts" setup>
import AccountList from './components/AccountList.vue'
import { useAccountsStore } from './stores/accounts'

const store = useAccountsStore()
store.load()

function addAccount() {
  store.addAccount()
}
</script>
