<template>
  <div class="account-item">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="Метка">
          <el-input
            v-model="labelsInput"
            maxlength="50"
            placeholder="Введите метки через ;"
            @blur="saveLabels"
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="Тип записи">
          <el-select v-model="accountType" placeholder="Выберите тип" @change="onTypeChange">
            <el-option label="LDAP" value="LDAP" />
            <el-option label="Локальная" value="Local" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Логин" :class="{ error: loginError }">
          <el-input v-model="login" maxlength="100" @blur="validateLogin" />
        </el-form-item>
      </el-col>
      <el-col :span="6" v-if="accountType === 'Local'">
        <el-form-item label="Пароль" :class="{ error: passwordError }">
          <el-input v-model="password" maxlength="100" @blur="validatePassword" />
        </el-form-item>
      </el-col>
      <el-col :span="2" class="delete-col">
        <el-button type="danger" @click="onDelete">Удалить</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue'
import { useAccountsStore } from '../stores/accounts'
import type { Account } from '@/types'

const props = defineProps<{ account: Account }>()
const store = useAccountsStore()
const labelsInput = ref(props.account.labels.map((l) => l.text).join(';'))

function saveLabels() {
  props.account.labels = labelsInput.value
    ? labelsInput.value.split(';').map((text) => ({ text: text.trim().slice(0, 50) }))
    : []
  store.save()
}

const accountType = computed({
  get: () => props.account.type,
  set: (val: string) => {
    props.account.type = val
    if (val !== 'Local') {
      props.account.password = ''
    }
    store.save()
  },
})

const login = computed({
  get: () => props.account.login,
  set: (val: string) => {
    props.account.login = val
    store.save()
  },
})

const password = computed({
  get: () => props.account.password,
  set: (val: string) => {
    props.account.password = val
    store.save()
  },
})

const loginError = ref(false)
function validateLogin() {
  loginError.value = !login.value
}

const passwordError = ref(false)
function validatePassword() {
  passwordError.value = !password.value
}

function onTypeChange(val: string) {
  accountType.value = val
}

function onDelete() {
  store.deleteAccount(props.account.id)
}
</script>

<style scoped>
.error .el-input__inner {
  border-color: red;
}
.account-item {
  margin-bottom: 20px;
}
.delete-col {
  display: flex;
  align-items: center;
}
</style>
