/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photourl');
var $image = document.querySelector('img');
var $entryForm = document.querySelector('#entry-form');
var $noEntry = document.querySelector('.no-entries-text');
var $h1 = document.querySelector('h1');
var $entryView = document.querySelector('#entry-view');
var $view = document.querySelectorAll('.view');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $ul = document.querySelector('ul');
var $newButton = document.querySelector('.new-button');
var $entriesAnchor = document.querySelector('.entry-tab');

$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

// submit
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (data.editing === null) {
    var newEntry = {
      photoUrl: $photoUrl.value,
      title: $title.value,
      notes: $notes.value,
      entryId: data.nextEntryId
    };
    data.entries.unshift(newEntry);
    data.nextEntryId++;
    $ul.prepend(createEntryListItem(newEntry));

  } else {
    var editEntryValues = {
      entryId: data.editing,
      photoUrl: $photoUrl.value,
      title: $title.value,
      notes: $notes.value
    };
    for (var i = 0; i < data.entries.length; i++) {
      if (editEntryValues.entryId === data.entries[i].entryId) {
        data.entries[i] = editEntryValues;
      }
    }
    var $entryList = document.querySelectorAll('li');
    for (var j = 0; j < $entryList.length; j++) {
      if (editEntryValues.entryId === parseInt($entryList[j].getAttribute('data-entry-id'))) {
        $entryList[j].replaceWith(createEntryListItem(editEntryValues));
      }
    }
    data.editing = null;
  }

  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  swapViews('entries');
});

// view entries
function createEntryListItem(newEntry) {
  var entryList = document.createElement('li');
  entryList.setAttribute('data-entry-id', newEntry.entryId);
  $ul.appendChild(entryList);

  var row = document.createElement('div');
  row.className = 'row';
  entryList.appendChild(row);

  var columnHalf = document.createElement('div');
  columnHalf.className = 'column-half';
  row.appendChild(columnHalf);

  var img = document.createElement('img');
  img.setAttribute('src', newEntry.photoUrl);
  img.className = 'img-entries';
  columnHalf.appendChild(img);

  var entriesText = document.createElement('div');
  entriesText.className = 'column-half entries-text';
  row.appendChild(entriesText);

  var titles = document.createElement('h2');
  titles.className = 'entries-title row space-between';
  titles.textContent = newEntry.title;
  entriesText.appendChild(titles);

  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fas fa-pen pen edit-icon align-items');
  editIcon.setAttribute('data-entry-id', data.entryId);
  editIcon.setAttribute('data-view', 'entry-form');
  titles.appendChild(editIcon);

  var entriesNotes = document.createElement('p');
  entriesNotes.textContent = newEntry.notes;
  entriesText.appendChild(entriesNotes);

  return entryList;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entriesData = createEntryListItem(data.entries[i]);
    $ul.appendChild(entriesData);
  }
  swapViews(data.view);
});

// view swap
function swapViews(string) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === string) {
      $view[i].className = 'view';
      data.view = $view[i].getAttribute('data-view');
    } else {
      $view[i].className = 'view hidden';
    }
  }

  if (data.entries.length === 0) {
    $noEntry.className = 'no-entries-text';
  } else {
    $noEntry.className = 'hidden';
  }
}

// edit entries
$entryView.addEventListener('click', function (event) {
  if (!(event.target.className === 'fas fa-pen pen edit-icon align-items')) {
    return;
  }
  var editEntryId = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
  data.editing = editEntryId;
  for (var i = 0; i < data.entries.length; i++) {
    if (editEntryId === data.entries[i].entryId) {
      $h1.textContent = 'Edit Entry';
      $title.value = data.entries[i].title;
      $photoUrl.value = data.entries[i].photoUrl;
      $notes.value = data.entries[i].notes;
      $image.setAttribute('src', $photoUrl.value);
    }
    swapViews('entry-form');
  }
});

$newButton.addEventListener('click', function (event) {
  swapViews('entry-form');
  $h1.textContent = 'New Entry';
  $entryForm.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
});

$entriesAnchor.addEventListener('click', function (event) {
  swapViews('entries');
});
