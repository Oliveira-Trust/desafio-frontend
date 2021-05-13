<template>
  <v-container fluid fill-height>
    <v-dialog v-model="dialogWait" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Wait a moment please...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row class="align-center justify-center">
      <v-col cols="12" sm="6" md="5" lg="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
            <button
              type="button"
              class="ml-auto"
              aria-label="Close"
              @click.stop="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </v-toolbar>
          <div class="ma-2">
            <Notification v-if="error" :message="error" class="subtitle-2" />
          </div>
          <v-card-text>
            <v-form>
              <v-text-field
                ref="email"
                v-model="email"
                name="login"
                label="E-mail"
                type="text"
                prepend-icon="mdi-email"
                :error-messages="emailErrors"
                required
                autofocus
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                @keyup.enter="setCustomFocus('password')"
              ></v-text-field>
              <v-text-field
                ref="password"
                v-model="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="off"
                :error-messages="passwordErrors"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                required
                counter
                @keyup.enter="login"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <!-- <v-card-text class="pt-0 text-right">
            Don´t have account?
            <nuxt-link to="/register">Create</nuxt-link>
          </v-card-text> -->
          <v-card-actions>
            <!-- <v-card-text class="mr-2 pt-0">
              <v-label>
                <a class="caption" @click.stop="esqueceuSenha"
                  >Forgot password?</a
                >
              </v-label>
            </v-card-text> -->
            <v-spacer></v-spacer>
            <v-btn
              :disabled="$v.$invalid"
              outlined
              depressed
              color="primary"
              @click.stop="login"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  layout: 'loginLayer',
  middleware: 'guest',
  data: () => ({
    showPassword: false,
    dialogWait: false,
    email: 'teste@gmail.com',
    password: '1234',
    error: null,
  }),

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(4) },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('E-mail must be valid')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength &&
        errors.push('Password must be more than 4 characters')
      return errors
    },
  },
  methods: {
    ...mapActions({
      setUser: 'authuser/setUser',
    }),
    close() {
      this.$router.push('/')
    },
    setCustomFocus(name) {
      this.$refs[name].focus()
    },
    async login() {
      // console.log(this.$nuxt)
      this.$v.$touch()
      if (this.$v.$error) {
        return
      }
      this.dialogWait = true
      await this.setUser({
        _uid: '1111',
        username: 'João Maria',
      })

      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.page-enter-active {
  animation: acrossIn 0.4s ease-out both;
}
.page-leave-active {
  animation: acrossOut 0.6s ease-in both;
}
@keyframes acrossIn {
  0% {
    transform: translate3d(0, -100%, 0) rotateY(45deg);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes acrossOut {
  0% {
    transform: perspective(50vw) translate3d(0, 0, 0) rotateY(45deg);
  }
  100% {
    transform: translate3d(0, 100%, 0);
  }
}
</style>
