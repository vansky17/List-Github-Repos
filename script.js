'use strict';
function getUserRepos(input) {
  fetch(`https://api.github.com/users/${input}/repos`)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
      console.log(responseJson);
      displayResult(responseJson);
  })
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}
// Remove previously displayed list
function emptyDipslay(){
    $('#results-list').empty();

}
//Display the results
function displayResult(responseJson) {
    emptyDipslay();
    for (let i=0; i<responseJson.length; i++){
        console.log(responseJson[i].html_url);
        $('#results-list').append(
            `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
            </li>`
          )};
    } 

 //Event handler on submit 
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let input = $('#search-repos').val();
    getUserRepos(input);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});