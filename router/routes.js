let prefix = '/api/v1/'

module.exports = {
    createBudget : prefix + 'create-budget',
    editBudget : prefix + 'update-budget/:id/:payload',
    retrieveBudget: prefix + 'budget',
    registerUser: '/register-user',
    loginUser: '/login-user',
    forgetPassword:'/forget-password',
    resetPassword:'/reset-password'
}