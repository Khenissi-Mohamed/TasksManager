<template>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <label for="email">Email :</label>
            <input type="email" name="email" id="email" v-model="user.email" required autocomplete="current-email">

            <label for="password">Password :</label>
            <input type="password" name="password" id="password" v-model="user.password" required
                autocomplete="current-password">

            <button type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        async handleSubmit() {
            const response = await axios.post('http://localhost:3000/user/login', {
                email: this.user.email,
                password: this.user.password,
            });
            if (response) {
                localStorage.setItem('token', response.data.token);
                // this.$emit('login-success')
                this.$router.push('/tasks/all');
            }
            console.log(response);

        }
    }
};
</script>
  
<style scoped>
.login-form {
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
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

button[type="submit"]:hover {
    background: rgb(33, 50, 68);
    background: linear-gradient(90deg, rgba(33, 50, 68, 1) 0%, rgba(5, 119, 62, 1) 25%, rgba(20, 22, 28, 1) 96%);
}
</style>
  