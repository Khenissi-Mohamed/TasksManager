<template>
    <div class="register-form">
        <h2>Inscription</h2>
    </div>
    <div class="welcome-message" v-if="successMessage">
        {{ successMessage }}
    </div>
    <div class="form-wrapper">
        <form @submit.prevent="submitForm">
            <label for="firstname">First Name:</label>
            <input type="text" name="firstname" id="firstname" v-model="user.firstname" required>

            <label for="lastname">Last Name:</label>
            <input type="text" name="lastname" id="lastname" v-model="user.lastname" required>

            <label for="email">Email:</label>
            <input type="email" name="email" id="email" v-model="user.email" required autocomplete="current-email">

            <label for="password">Password:</label>
            <input type="password" name="password" id="password" v-model="user.password" required autocomplete="current-password">

          <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      showWelcome: false,
        successMessage: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/user/register', this.user);
        if (response) {
          localStorage.setItem('token', response.data.token);
          this.successMessage = `Bienvenue ${this.user.firstname} ${this.user.lastname} !`;
          this.showWelcome = true;
          setTimeout(() => {
            this.showWelcome = false;
          }, 5000);
        }
        this.user = {
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.register-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

button[type="submit"] {
  background: radial-gradient(103.18% 236.51% at 96.82% 50%, #D13650 0%, #D33B64 32.29%, #9C3D80 54.17%, #3565A5 100%), #1D1D1B;
  color: white;
  padding: 10px 20px;
  border-radius
    : 5px;
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    }

    .welcome-message {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.welcome-message h2 {
    margin-bottom: 20px;
}

.welcome-message p {
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 1.5;
}

</style>
  