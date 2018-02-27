<template>
	<div>
		<main-layout>
			<div class="auth center card m-2 p-3">
				<header class="enroll-header m-tb-1">
					<h4 class="color-blue">Welcome</h4>
					<p>
						<small>
							Please Login or Register to continue
						</small>
					</p>
				</header>

				<form @submit.prevent="submitForm">
					<div class="p-3">
						<div class="row">
							<fieldset class="col-lg-6 col-sm-12 m-b-2">
								<div class="form-group reg-fields" :class="{shrink: showLogin || showReset}">
									<label for="name_apply">Name</label>
									<input type="text" class="form-control" id="name_apply" name="name_apply" v-model="contact.displayName">
								</div>


								<div class="form-group">
									<label for="email_apply">Email</label>
									<input type="email" id="email_apply" name="email_apply" class="form-control" v-model="contact.email">
								</div>


								<div class="form-group reg-fields" :class="{shrink: showReset}">
									<label for="pass_apply">Password </label>
									<input type="password" id="pass_apply" name="pass_apply" class="form-control" v-model="contact.password">
								</div>

								<div class="form-group">
									<button class="hoverable col s12 btn btn-large waves-effect btn-theme" type="submit" name="btn_login">{{showReset ? 'Reset' : showLogin ? 'Login' : 'Register'}}</button>
								</div>

								<div class="form-actions flex space-around">
									<div class="action muted light-blue-text m-t-1" @click="toggleFormAction">{{showLogin ? 'Create account' : 'Show Login'}}</div>
									<div class="action muted text-theme-red m-t-1" @click="resetForm">Forgot Password?</div>
								</div>
							</fieldset>
							<fieldset class="col-lg-6 col-sm-12">
								<div class="right">
									<div class="connect">Login With</div>
									<hr>
									<div class="social-buttons flex space-around align-items-center">

										<div>
											<a href="" class="facebook">
												<i class="fa fa-fw fa-facebook" aria-hidden="true"></i>
											</a>
										</div>
										<div>
											<a href="" class="twitter">
												<i class="fa fa-fw fa-twitter" aria-hidden="true"></i>
											</a>
										</div>
										<div>
											<a href="" class="google-plus">
												<i class="fa fa-fw fa-google-plus" aria-hidden="true"></i>
											</a>
										</div>
									</div>
								</div>
							</fieldset>
						</div>
					</div>
				</form>
			</div>
		</main-layout>
	</div>
</template>


<script>
	import mainLayout from './shared/app.vue'
	export default {
		name: 'application',
		data() {
			return {
				contact: {},
				showLogin: false,
				formAction: {},
				showReset: false,
				user: {}
			}
		},
		mounted() {
			this.formAction = this.register
			if(this.user && this.user._id){
				window.location = '/'
			}
		},
		methods: {
			submitForm() {
				this.formAction()
			},
			register() {
				$store.dispatch('register', this.contact)
				this.contact = {}
			},
			login() {
				$store.dispatch('login', this.contact)
			},
			toggleFormAction(e, reset) {
				this.showReset = false
				this.contact = {}
				this.showLogin = !this.showLogin
				this.formAction = this.showLogin ? this.login : this.register
			},
			resetForm() {
				this.showReset = true
				this.showLogin = false
				this.formAction = this.requestReset
			},
			requestReset() {
				// this.$store.dispatch('requestReset', this.contact)
				this.contact = {}
				this.showReset = false
				this.showLogin = true
				this.formAction = this.login
			}
		},
		components: { mainLayout }
	}
</script>


<style scoped>
	input {
		color: #000
	}

	.reg-fields {
		transition: all .3s linear;
		opacity: 1;
		height: 70px;
	}

	.reg-fields.shrink {
		opacity: 0;
		height: 0px;
	}

	div.right div.connect {
		color: gray;
		text-align: center;
	}

	div.right a {
		display: inline-flex;
		text-decoration: none;
		color: white;
		padding: 1rem;
		text-align: center;
		transition: all 0.15s ease-in-out;
	}

	div.social-buttons {
		margin-top: 1rem;
	}

	div.right a.facebook {
		background: #3a589a;
	}

	div.right a.facebook:hover {
		background: rgba(58, 88, 154, 0.8);
	}

	div.right a.twitter {
		background: #4099ff;
	}

	div.right a.twitter:hover {
		background: rgba(64, 153, 255, 0.8);
	}

	div.right a.google-plus {
		background: #e9544f;
	}

	div.right a.google-plus:hover {
		background: rgba(233, 84, 79, 0.8);
	}
</style>