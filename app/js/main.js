/* jshint browser: true, jquery: true, jshint node: true */

'use strict';

//var _ = require('lodash'),
//    $ = require('jquery'),
//    Firebase = require('firebase');

var $form        = $('form'),
    $tbody       = $('tbody'),
    FIREBASE_URL = 'https://djr-address-book.firebaseio.com/',
//    fb           = new Firebase(FIREBASE_URL)
    usersFbUrl;

$.get(FIREBASE_URL + '/users.json', function (res) {
  Object.keys(res).forEach(function (uuid) {
    addRowToTable(uuid, res[uuid]);
  });
});

function addRowToTable(uuid, data){
  var $tr = $('<tr><td><img src="' + data.photo + '"class=pic></td>\
              <td>' + data.name + '</td>\
              <td>' + data.phone + '</td>\
              <td>' + data.email + '</td>\
              <td>' + data.twitter + '</td>\
              <td><input type="button" id="boot" name="filter" value="Boot" /></tr>');

  $tr.attr('data-uuid', uuid);
  $tbody.append($tr);
}

var $select = $('.newContact')
$select.click(function() {
  $('.hidden').show('slow');
});

$form.submit(function(evt){
  var $photo   = $('input[name="photo"]').val(),
      $name    = $('input[name="name"]').val(),
      $phone   = $('input[name="phone"]').val(),
      $email   = $('input[name="email"]').val(),
      $twitter = $('input[name="twitter"]').val(),
      $tbody   = $('tbody'),
      $tr      = $('<tr><td><img src="' + $photo + '"class=pic></td>\
                   <td>' + $name + '</td>\
                   <td>' + $phone + '</td>\
                   <td>' + $email + '</td>\
                   <td>' + $twitter + '</td></tr>');

  var group = { photo: $photo, name: $name, phone: $phone, email: $email, twitter: $twitter };
  var url  = 'https://djr-address-book.firebaseio.com/users.json';
  var data = JSON.stringify(group);
  $.post(url, data, function(res){
    $tr.attr('data-uuid', res.name);
    $tbody.append($tr);
  });

  clearForm();

  evt.preventDefault();
});

function clearForm(){
  var $photo = $('input[name="photo"]'),
      $name = $('input[name="name"]'),
      $phone = $('input[name="phone"]'),
      $email = $('input[name="email"]'),
      $twitter = $('input[name="twitter"]');
  $photo.val('')
  $name.val('')
  $phone.val('')
  $email.val('')
  $twitter.val('')
  $('.hidden').hide('slow');

};

var $boot = $('#boot');
$tbody.click(function (evt) {
  var $tr  = $(evt.target).closest('tr'),
      uuid = $tr.data('uuid'),
      friendName = $tr.find('td').text();

  if (confirmFriendRemoval(friendName)) {
    $tr.remove();
    deleteFriendFromDb(uuid);
  }
});

function deleteFriendFromDb(uuid) {
  var url = FIREBASE_URL + '/users/' + uuid + '.json';

  $.ajax(url, {type: 'DELETE'});
}

function confirmFriendRemoval(friendName) {
  var confirmationText = 'Vanquish ' + friendName + ' from the group?',
      isConfirmed      = window.confirm(confirmationText);

  return isConfirmed;
}



