//Objectif 1: Quand on clique sur un des buttons remove, ca supprime tout l'article de la ligne
//Il faut donc tous les cibler, puis faire une for loop pour passer sur chacun d'entre eux.

let removeButtons = document.getElementsByClassName('remove');

for (let i = 0; i < removeButtons.length; i++) {
  let oneButton = removeButtons[i];

  oneButton.addEventListener("click", remove);
}

function remove(e) {
  let clicked = e.target;//représente le oneButton qui est clické
  clicked.parentElement.parentElement.remove();//on peut utilisé .parentElement pour cibler toute la carte row et la remove
  updateTotal();
}


//Objectif 2: 
//Faire en sorte que price se multiplie à la quantity choisie et mettre à jour le total

//On accède à chacun des éléments
let items= document.getElementsByClassName('all-cart-items')[0];
let rows = document.getElementsByClassName('cart-Row');

let total = 0;

function updateTotal() { //on crée une fonction car on veut que le total se mette à jour quandun input change
for (let i = 0; i < rows.length; i++) {
  let theRow = rows[i];


  let thePrice = theRow.getElementsByClassName('cart-price')[0];

  let realPrice = thePrice.replace('$', '');
  let numberPrice = parseFloat(realPrice.innerText);

  let theQuantity = document.getElementsByClassName('cart-quantity')[0];

  let realQuantity = theQuantity.value;

  total += numberPrice * realQuantity;


}
total = Math.round(total*100)/100;

document.getElementsByClassName('total-price')[0].innerText='$'+ total; //essayer par querySelector
}

//maintenant on a un appel de fonction qui multiplie price * quantity bien comme il faut et qui met a jour le total 
// on va donc utiliser cet appel quand on clicque sur remove pour le total se mette à jour


