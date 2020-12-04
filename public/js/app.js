var check = function () {
    if (document.getElementById('password').value == '') {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = "Password Field cannot be empty"
    } else if (document.getElementById('password').value ==
        document.getElementById('confirm_password').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Password matched';
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Password not matched';
    }
}