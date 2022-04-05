/* global data */
/* exported data */
var $photoURL = document.querySelector('.photourl');
var $preview = document.querySelector('.preview');

function updateImg(event) {
  $preview.setAttribute('src', $photoURL.value);
}

$photoURL.addEventListener('input', updateImg);

var $form = document.querySelector('form');

function updateEntry(event) {
  event.preventDefault();
  var entriesObj = {
    title: $form.elements.title.value,
    photourl: $form.elements.photourl.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entriesObj);
  $preview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', updateEntry);
