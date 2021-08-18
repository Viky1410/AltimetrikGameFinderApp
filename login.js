
function validateAndLogin() {
    let email = document.forms["login"]["email"].value;
    let password = document.forms["login"]["password"].value;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    if(validation(email, password)) {
        login(email, password);
    }
}

function validation(email, password) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    const isValidEmail = re.test(email);
    const isValidPassword = password != null && password !== "";

    if(!isValidEmail || !isValidPassword) {
        //mostrar error
        alert("incorrecto")
        return false;
    }
    return true;
}


function login(email, password) {
    const url = 'http://localhost:3000/login';
    const data = {
        "email": email,
        "password": password
      }
    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => { 
        console.error('Error:', error)
        //snackbar de error
    })
    .then(response => {
        window.localStorage.setItem('accessToken', response.accessToken);
        document.getElementById('success-message').style.display = "block";
        //snackbar de success
    });
}