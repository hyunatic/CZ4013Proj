import user from './user.json'

export const emailLogin = (postData) => dispatch => {
    var valid = false
    for (var i = 0; i < user.length; i++) {
        if (postData.username === user[i].username && postData.password === user[i].userpassword){
            valid = true
        }
    }
    dispatch({ type: 'EMAIL_LOGIN', payload: valid })
}

