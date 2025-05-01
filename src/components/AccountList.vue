<template>
  <div>
    <AccountItem v-for="acc in store.accounts" :key="acc.id" :account="acc" />
  </div>
</template>

<script lang="ts" setup>
import { useAccountsStore } from '../stores/accounts'
import AccountItem from './AccountItem.vue'

const store = useAccountsStore()
</script>
