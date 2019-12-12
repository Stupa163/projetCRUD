$('form').submit(function (e) {
  e.preventDefault()
  $.ajax({
    url: $(this)[0].action,
    method: 'POST',
    data: $(this).serialize()
  }).then((data) => {
    $('#container').html(data);
  })
})

function afficherInfosCommande(id) {
  $.ajax({
    url: '/commande/' + id,
    method: 'GET'
  }).then((data) => {
    $('#detailsCommandes').html(data)
  })
}