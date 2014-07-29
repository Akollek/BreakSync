function reveal(form) {
  form.style.display = "block";
}

function hide(form) {
  form.style.display = "none";
  document.getElementById('breaksyncForm').style.display= "block";
  document.getElementById('mcgillForm').style.display = "none";
}

function next (current, next) {
	document.getElementById(current).style.display= "none";
	document.getElementById(next).style.display = "block";
}