/* jshint browser: true, jquery: true */

'use strict';

//var $form        = $('form'),
//    $tbody       = $('tbody'),
//    FIREBASE_URL = 'https://djr-address-book.firebaseio.com/',
//    fb           = new Firebase(FIREBASE_URL),
//    usersFbUrl   = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data';




var $select = $('.newContact')
$select.click(function() {
  $('.hidden').show('slow');
});

function createTR(obj) {
  var $tr = $('<tr></tr>');

  $tr.append('<td class="photo">' + obj.Name + '</td>');
  $tr.append('<td class="name">' + obj.LastPrice + '</td>');
  $tr.append('<td class="phone">' + $('#quantity').val() + '</td>');
  $tr.append('<td class="email">' + obj.Change.toFixed(4) + '</td>');
  $tr.append('<td class="twitter">' + obj.ChangePercent.toFixed(4) + '</td>');
  $tr.append('<td><button id="remove">Remove</td>');

  return $tr;
}
$removeButton = $('button#remove');
$removeButton.on('click', removeTR).on('click', updateTotal, updateValue);

function removeTR() {
  $(this).parent().parent().remove();
}

