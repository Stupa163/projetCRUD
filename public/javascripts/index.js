function afficherInfos (id) {
  $.ajax({
    url: '/users/' + id,
    headers: {token: sessionStorage.getItem('token')},
    method: 'GET'
  }).then((data) => {
    $('#detailsClient').html(data)
  })
}
