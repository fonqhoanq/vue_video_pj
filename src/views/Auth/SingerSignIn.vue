<template>
    <v-container fluid class="fill-height">
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="5" lg="4" class="ma-auto">
          <v-card outlined :loading="loading">
            <div class="px-8 pt-6 pb-12">
              <v-card-title class="text-center">VueTube</v-card-title>
              <v-card-subtitle class="mb-5">Sign in</v-card-subtitle>
              <v-card-text>
                <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
                  <form
                    @submit.prevent="handleSubmit(signin)"
                    @reset.prevent="reset"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Email"
                      rules="required|email"
                    >
                      <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        label="Email"
                        outlined
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Password"
                      rules="required"
                    >
                      <p class="ma-0 text-right">
                        <v-btn
                          text
                          small
                          class="pl-0 text-capitalize"
                          color="primary"
                          href="true"
                          >Forget Password?</v-btn
                        >
                      </p>
                      <v-text-field
                        v-model="password"
                        type="password"
                        :error-messages="errors"
                        label="Password"
                        outlined
                      ></v-text-field>
                    </ValidationProvider>
                    <div class="mt-6 d-flex justify-space-between">
                      <v-btn
                        text
                        small
                        class="pl-0 text-capitalize"
                        color="primary"
                        router
                        to="signup"
                        >Create account</v-btn
                      >
                      <v-btn
                        type="submit"
                        class="primary"
                        :loading="loading"
                        depressed
                        >Sign in</v-btn
                      >
                    </div>
                  </form>
                </ValidationObserver>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'SingerSignIn',
    data: () => ({
      email: '',
      password: '',
      loading: false
    }),
    computed: {
      ...mapGetters(["getUserEmail", "getUserID", "isLoggedIn", "getCurrentSinger"]),
    },
    methods: {
      async signin() {
        if (this.loading) return
        this.loading = true
  
        const data = await this.$store
          .dispatch('loginSinger', { 
            singer: {
              email: this.email,
              password: this.password
            }
          })
          .catch((err) => {
            this.loading = false
            console.log("tesst")
            console.log(err.response)
            this.$refs.form.setErrors({
              Email: ["We don't reconize, this email"],
              Password: ["We don't reconize, this password"]
            })
          })
        // console.log(data.data.user)
        if (!data) return
        this.$router.push({ name: 'SingerStudio' })
        // const user = await this.$store
        //   .dispatch('getCurrentSinger', data.token)
        //   .catch((err) => console.log(err))
    
        // if (!user) return
        // console.log(data)
        // if (!this.getCurrentSinger.id) {
        //   this.$refs.form.setErrors({
        //     Password: ["We don't reconize this email and password"]
        //   })
        //   this.loading = false
        // } else {
        //   this.loading = false
        //   this.$router.push({ name: 'SingerStudio' })
        // }
      }
    }
  }
  </script>
  
  <style></style>
  