function afficherInfos (id) {
  $.ajax({
    url: '/users/' + id,
    method: 'GET'
  }).then((data) => {
    $('#detailsClient').html(data)
  })
}