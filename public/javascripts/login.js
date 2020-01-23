$('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: $(this)[0].action,
        method: 'POST',
        data: $(this).serialize()
    }).then((data) => {
        sessionStorage.setItem('token', data.token);
        window.location.replace('http://127.0.0.1:3000')
    })
        .catch((error) => {
            alert('Wrong password');
        })
})
