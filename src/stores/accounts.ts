import type { Account } from '@/types'
import { defineStore } from 'pinia'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    load() {
      const data = localStorage.getItem('accounts')
      if (data) this.accounts = JSON.parse(data)
    },
    save() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
    addAccount() {
      this.accounts.push({
        id: Date.now().toString(),
        labels: [],
        type: 'LDAP',
        login: '',
        password: '',
      })
      this.save()
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((acc) => acc.id !== id)
      this.save()
    },
  },
})
