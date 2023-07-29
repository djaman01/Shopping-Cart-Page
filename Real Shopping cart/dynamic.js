//Objectif 1: Quand on clique sur un des buttons remove, ca supprime l'article de la ligne cliqué
//Il faut cibler tous les buttons remove, puis faire une for loop pour passer sur chacun d'entre eux.

let removeButtons = document.getElementsByClassName('remove');

for (let i = 0; i < removeButtons.length; i++) {
  let theRemoveButton = removeButtons[i];

  theRemoveButton.addEventListener('click', removeArticle); // A chaque fois qu'on va appuyer sur n'importe quel remove button, ca va supprimer toute sa ligne d'article
}

function removeArticle(e) {
  let buttonRemoveClicked= e.target; //on cible chaque theRemoveButton clicked
  buttonRemoveClicked.parentElement.parentElement.remove(); //par le .parentElement, on remonte à l'article qui le nest et on le supprime
  updateTotal(); //On appelle la function qui updatera le total qu'on on va remove une ligne qu'on a écrit plus bas
}



//Objectif 2: 
//On va créer une unction qui multiplie le prix par quantity et Update le total
//Elle accèdes aux elements par cart-items (car on les supprimera)

function updateTotal() {

  let total=0; //on initialise une variable total

  //Normalement, le cartItem devrait être vide et ne se remplire que quand on add des items
  //C'est pour quoi, en prévision de la suppression des modèles des articles, on accède aux articles par le cartItems.getetlements...
  
  //Comme on a accéder plus haut à chacun des removebutton, maintenant on va accéder à chacune des Row car elles contiennent le prix et la quantity
  let cartItems= document.querySelector('.all-cart-items');

  let cartRows= cartItems.getElementsByClassName('cart-row'); //on accède aux row par le cart item en prévision de la suppression des modèles des articles

  //Maintenant qu'on a accéde aux rows, on va cibler chaque row une par une

  for (let i=0; i < cartRows.length; i++) {
    let theRow= cartRows[i]; //Et là on a accéder à chacune des row dans la function. on peut donc accéder à chaque price et quantity de chaque row

  let thePrice= theRow.querySelector('.cart-price');
  let theQuantity= theRow.querySelector('.quantity-input');

  //Mais le price est un text avec un symbole: on veut donc le rendre un nombre, même si décimal (on utilisera parseFloat) et enlever le symbole 
  let realPrice= parseFloat(thePrice.innerText.replace('Dhs',''));

  //Et il faut accéder à la value de l'input
  let realQuantity= theQuantity.value;

  total+= realPrice*realQuantity;

  total = Math.round(total*100)/100; //On arrondi si c'est un décimal à 2chiffres après la virgule

  }
  //Maintenant qu'on a le total on peut sortir de la loop et l'assigner à l'element total en entrant au contenu par .innerText
  //On va aussi ajouter le symbole Dirhams qu'on a enlever plus tôt
  let realTotal= document.getElementsByClassName('total-price')[0].innerText= total+ ' Dhs';

}

//Objectif 2; fini. On peut maintenant appeler la function updateTotal() si besoin
//On va remonter et l'ajouter à la callbackfunction remove() de l'addEventListener qui remove un article
//Ainsi le total sera updaté

//Maintenant il faut call aussi l'updateTotal() quand on change l'input de la quantity, mais seulement si c'est >=0
// On va donc créer une for loop qui va passer par tous les inputs 
//et qui va call une nouvelle function qui elle meme appellera updateTotal() SEULEMENT si input.value >=0

//Comme précedemment, comme le cartitem sera vide, on va accéder à tous les inputs par le cartItem puis au row

let cartItems= document.querySelector('.all-cart-items');
let cartRows= cartItems.getElementsByClassName('cart-row');


for (let i=0; i<cartRows.length; i++) {
  
  let theRow= cartRows[i];

  let theQuantity= theRow.querySelector('.quantity-input');


  theQuantity.addEventListener('change', realTotal); 
  //on ne va pas appeler la function updateTotal(); car elle fonctionnera même si quantity <=0 ou
  //Or la quantity sera obligatoirement 1 minimum
  //Donc on va créer une nouvelle function qui appelera updateTotal() que sous ces condition et on l'appelera realTotal
    
  }
  function realTotal(e) {
    let inputChanged= e.target;

    if(inputChanged.value<=0) {
      inputChanged.value = 1;
    }
    updateTotal();
  }

  //Objectif 3: activer le button addTocart, pour ajouter un item dans le cart
  





