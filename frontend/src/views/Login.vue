<template>
  <v-main class="home">
    <v-card width="400px" class="mx-auto my-auto">
      <v-card-title class="pb-0">
        <h1 class="mx-auto mb-5">Ingreso</h1>
      </v-card-title>
       <v-alert v-if="isFormValidSubmitted && !isFormValid" type="error">
          <p>{{ formStatusMessage }}</p>
        </v-alert>
      <v-form ref="form">
          <v-text-field
            v-model="email"
            label="Correo"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            validate-on-blur
            data-cy="username"
          />
          <v-text-field
            v-model="password"
            label="Contraseña"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            validate-on-blur
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            data-cy="password"
          />
        </v-form>
      <v-divider />
      <v-card-actions>
        <v-btn to="/registro" color="success"> Registro </v-btn>
        <v-spacer />
        <v-btn color="info" data-cy="login-btn" @click="login"> Ingresar </v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import { Auth } from '@/firebase';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isFormValid: false,
      isFormValidSubmitted: false,
      formStatusMessage: "",
      email: "",
      emailRules: [
        (v) => !!v || "El correo es requerido",
        (v) => /.+@.+\..+/.test(v) || "El correo debe ser válido must be valid",
      ],
      password: "",
      passwordRules: [(v) => !!v || "La contraseña es requerida"],
      showPassword: false,
    };
  },
  methods:{
    ...mapActions(['setUser']),
    validate(){
      return this.$refs.form.validate()
    },
    login(){
      if(this.validate()){
        Auth.signInWithEmailAndPassword(this.email, this.password)
        .then((response)=>{
          this.setUser(response.user);
          this.$router.push({ name: 'Products' })
        })
        .catch((response)=>{
          console.log(response.message);
        })
      }
    }
  }
};
</script>