<template lang="pug">
	#auth.box
		form.form
			b-field(
				label="Имя пользователя")
				b-input(
					v-model='username')
			b-field(
				label="Пароль")
				b-input(
					type="password"
					v-model='password'
					password-reveal)
			b-field
				b-button(
					tag="button") Войти
</template>

<script>
export default {
	name: "Auth",
	data() {
		return {
			username: null,
			password: null
		}
	}
}
</script>

<style lang="scss" scoped>
#auth {
	max-width: 500px;
	width: 100%;
}
</style>