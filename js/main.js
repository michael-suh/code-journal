/* global data */
/* exported data */
var $photoURL = document.querySelector('.photourl');
var $preview = document.querySelector('.preview');

function updateImg(event) {
  $preview.src = $photoURL.value;
}

$photoURL.addEventListener('input', updateImg);
