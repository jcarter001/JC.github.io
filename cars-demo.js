* Toggle the visibility of the formset with id="get-favcar".
*/
function toggleSwallow(buttonElt) {
   let hideText = "Suppress the favcar!"
   let showText = "Release the favcar!"

   // The initial state of the get-favcar is shown, so I want to be more
   // lenient about the text for hiding because the HTML might not match
   // quite exactly.
   let swallowElt = document.getElementById('get-favcar');
   if (buttonElt.value === showText) {
       //get-favcar is hidden, show it
       buttonElt.value = hideText; // Only needed for the toggling
       get-favcarElt.style.removeProperty('visibility'); // Can set *any* CSS property
   }
   else {
       // get-favcar is showing, hide it
       buttonElt.value = showText;
       //console.log(get-favcarElt.style.getPropertyValue('visibility'));
       get-favcarElt.style.setProperty('visibility', 'hidden');
   }
}

function dropfavcar(evt) {
   let dropButton = evt.target;
   let createButton = dropButton.previousElementSibling;
   createButton.disabled = false; // Re-enable create button

   dropButton.remove();

   let favcarElt = document.getElementById('get-favcar');
   let nutElt = document.getElementById('get-favcar').nextElementSibling;
   nutElt.remove();

}

function createfavcar(buttonElt) {
   let divElt = document.createElement('div');
   let imageElt = document.createElement('img');
   imageElt.alt = 'Picture of a favcar';
   imageElt.src = 'https://live.staticflickr.com/7203/6976961877_a347584ae3_4k.jpg';
   divElt.append(imageElt);

   // Add the div to the <body> after the element with id get-favcar""
   let favcarElt = document.getElementById('get-favcar');
   favcarElt.insertAdjacentElement('afterend', divElt);

   let dropButton = document.createElement('button');
   dropButton.innerHTML = 'Drop favcar';
   dropButton.addEventListener('click', dropfavcar);
   buttonElt.insertAdjacentElement('afterend', dropButton);

   buttonElt.disabled = true;
}