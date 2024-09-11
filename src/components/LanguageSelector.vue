<template>
  <div>
    <button @click="changeLanguage('en')">English</button>
    <button @click="changeLanguage('es')">Español</button>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { locale } = useI18n()

    const changeLanguage = (newLocale) => {
      locale.value = newLocale
      localStorage.setItem('locale', newLocale)
    }

    return {
      changeLanguage
    }
  }
}
</script>
