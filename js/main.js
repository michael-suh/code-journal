/* global data */
/* exported data */
var $image = document.querySelector('#image');
var $photoUrl = document.querySelector('#photourl');
function updateImagePreview(event) {
  $image.setAttribute('src', $photoUrl.value);
}
$photoUrl.addEventListener('input', updateImagePreview);
var $form = document.querySelector('form');
function updateEntry(event) {
  event.preventDefault();
  var entryObj = {
    title: $form.elements.title.value,
    photourl: $form.elements.photourl.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $entries.className = 'view entries';
  $entryForm.className = 'view entry-form hidden';
  data.view = 'entries';
  var $ulELement = document.querySelector('ul');
  var newEntry = createEntryListItem(entryObj);
  $ulELement.prepend(newEntry);
}

$form.addEventListener('submit', updateEntry);

function createEntryListItem(entryObj) {

  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'row');
  liElement.setAttribute('data-entry-id', entryObj.entryId);

  var imageElement = document.createElement('img');
  imageElement.setAttribute('class', 'column-half');
  imageElement.setAttribute('src', entryObj.photourl);
  liElement.appendChild(imageElement);

  var divElement = document.createElement('div');
  divElement.setAttribute('class', 'column-half');
  liElement.appendChild(divElement);

  var h1Element = document.createElement('h1');
  h1Element.textContent = entryObj.title;

  var pElement = document.createElement('p');
  pElement.textContent = entryObj.notes;

  divElement.appendChild(h1Element);
  divElement.appendChild(pElement);

  return liElement;
}

document.addEventListener('DOMContentLoaded', function (event) {
  var ulElement = document.querySelector('ul');

  for (var i = 0; i < data.entries.length; i++) {
    var result = createEntryListItem(data.entries[i]);
    ulElement.appendChild(result);
  }
});

var $newbutton = document.querySelector('.new-button');
var $entryTab = document.querySelector('.entry-tab');
var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');
var $formTab = document.querySelector('.form-tab');

$newbutton.addEventListener('click', function (event) {
  $entries.className = 'entries hidden';
  $entryForm.className = 'entry-form';
  data.view = 'entry-form';
});

$entryTab.addEventListener('click', function (event) {
  $entryForm.className = 'entry-form hidden';
  $entries.className = 'entries';
  data.view = 'entries';
});

$formTab.addEventListener('click', function (event) {
  $entries.className = 'entries hidden';
  $entryForm.className = 'entry-form';
  data.view = 'entry-form';
});

// refresh page

if (data.view === 'entry-form') {
  $entries.className = 'view entries hidden';
  $entryForm.className = 'view entry-form';
  data.view = 'entry-form';
} else {
  $entryForm.className = 'view entry-form hidden';
  $entries.className = 'view entries';
  data.view = 'entries';
}
