$('form').submit(function (e) {
  e.preventDefault()
  $.ajax({
    url: $(this)[0].action,
    headers: {token: sessionStorage.getItem('token')},
    method: 'PUT',
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

$(document).ready(() => {
  $("#labelVille").autocomplete({
    source: (req, res) => {
      $.ajax({
        url: '/villes/' + req.term,
        headers: {token: sessionStorage.getItem('token')},
        method: 'GET'
      }).then((data) => {
        res(data)
      })
    },
    select: (e, ui) => {
      console.log(ui.item)
      $('#ville').val(ui.item.value);
      $('#labelVille').val(ui.item.label);
      return false;
    }
  });
})
