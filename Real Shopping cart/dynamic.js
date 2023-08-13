//Objectif 1: Quand on clique sur un des buttons remove, ca supprime l'article de la ligne cliqué
//Il faut cibler tous les buttons remove, puis faire une for loop pour passer sur chacun d'entre eux.

let removeButtons = document.getElementsByClassName('remove');

for (let i = 0; i < removeButtons.length; i++) {
  let theRemoveButton = removeButtons[i];

  theRemoveButton.addEventListener('click', removeArticle); // A chaque fois qu'on va appuyer sur n'importe quel remove button, ca va supprimer toute sa ligne d'article
}

function removeArticle(e) {
  let buttonRemoveClicked = e.target; //on cible chaque theRemoveButton clicked
  buttonRemoveClicked.parentElement.parentElement.remove(); //par le .parentElement, on remonte à l'article qui le nest et on le supprime
  updateTotal(); //On appelle la function qui updatera le total qu'on on va remove une ligne qu'on a écrit plus bas
}



//Objectif 2: 
//On va créer une unction qui multiplie le prix par quantity et Update le total
//Elle accèdes aux elements par cart-items (car on les supprimera)

function updateTotal() {

  let total = 0; //on initialise une variable total

  //Normalement, le cartItem devrait être vide et ne se remplire que quand on add des items
  //C'est pour quoi, en prévision de la suppression des modèles des articles, on accède aux articles par le cartItems.getetlements...

  //Comme on a accéder plus haut à chacun des removebutton, maintenant on va accéder à chacune des Row car elles contiennent le prix et la quantity
  let cartItems = document.querySelector('.all-cart-items');

  let cartRows = cartItems.getElementsByClassName('cart-row'); //on accède aux row par le cart item en prévision de la suppression des modèles des articles

  //Maintenant qu'on a accéde aux rows, on va cibler chaque row une par une

  for (let i = 0; i < cartRows.length; i++) {
    let theRow = cartRows[i]; //Et là on a accéder à chacune des row dans la function. on peut donc accéder à chaque price et quantity de chaque row

    let thePrice = theRow.querySelector('.cart-price');
    let theQuantity = theRow.querySelector('.quantity-input');

    //Mais le price est un text avec un symbole: on veut donc le rendre un nombre, même si décimal (on utilisera parseFloat) et enlever le symbole 
    let realPrice = parseFloat(thePrice.innerText.replace('Dhs', ''));

    //Et il faut accéder à la value de l'input
    let realQuantity = theQuantity.value;

    total += realPrice * realQuantity;

  }
  total = Math.round(total * 100) / 100; //On arrondi si c'est un décimal à 2chiffres après la virgule
  //Maintenant qu'on a le total on peut sortir de la loop et l'assigner à l'element total en entrant au contenu par .innerText
  //On va aussi ajouter le symbole Dirhams qu'on a enlever plus tôt
  let realTotal = document.getElementsByClassName('total-price')[0].innerText = total + ' Dhs';

}

//Objectif 2; fini. On peut maintenant appeler la function updateTotal() si besoin
//On va remonter et l'ajouter à la callbackfunction remove() de l'addEventListener qui remove un article
//Ainsi le total sera updaté

//Maintenant il faut call aussi l'updateTotal() quand on change l'input de la quantity, mais seulement si c'est >=0
// On va donc créer une for loop qui va passer par tous les inputs 
//et qui va call une nouvelle function qui elle meme appellera updateTotal() SEULEMENT si input.value >=0

//Comme précedemment, comme le cartitem sera vide, on va accéder à tous les inputs par le cartItem puis au row

let cartItems = document.querySelector('.all-cart-items');
let cartRows = cartItems.getElementsByClassName('cart-row');


for (let i = 0; i < cartRows.length; i++) {

  let theRow = cartRows[i];

  let theQuantity = theRow.querySelector('.quantity-input');


  theQuantity.addEventListener('change', realTotal);
  //on ne va pas appeler la function updateTotal(); car elle fonctionnera même si quantity <=0 ou
  //Or la quantity sera obligatoirement 1 minimum
  //Donc on va créer une nouvelle function qui appelera updateTotal() que sous ces condition et on l'appelera realTotal

}
function realTotal(e) {
  let inputChanged = e.target;

  if (inputChanged.value <= 0) {
    inputChanged.value = 1;
  }
  updateTotal();
}

//Objectif 3: activer le button addTocart, pour ajouter un item dans le cart

let addCartButton = document.getElementsByClassName('add-cart');

for (let i = 0; i < addCartButton.length; i++) {
  let theAddButton = addCartButton[i];

  theAddButton.addEventListener('click', addToCart);
}

function addToCart(e) {

  let addButtonClicked = e.target;

  let theArticle = addButtonClicked.parentElement.parentElement;

  let imageArticle = theArticle.querySelector('.produit1').src;
  let priceArticle = theArticle.querySelector('.price').innerText;
  let titleArticle = theArticle.querySelector('.name-article').innerText;
  //On a accédé à tous les élements qu'on veut ajouter dans le cart:

  //Maintenant, il faut les ajouter, en créant un div+ mettre le HTML+Nest dans le parent element
  //Comme le code serait trop long on va le mettre dans une nouvelle function qu'on va appelé ici

  addToCartFunction(imageArticle, priceArticle, titleArticle); //!!! les variables qui accèdent deviennet les parametres de la function, comme ça on peut y acceder dans une autre function seulement en appelant les parametres
  updateTotal(); //!! ATTENTION: Il faut placer cet appel de function après l'appel de addtocartfunction(): pour que le total se mette à jour APRES avoir ajouté un element

}

function addToCartFunction(imageArticle, priceArticle, titleArticle) {

  let createCartRow = document.createElement('div');

  //Avant toute chose, car l'ordre compte: on va créer une instruction qui va empêcher l'utilsateur d'ajouter le même article 2 fois et qui va pop une alert pour lui dire
  //on va dire que si le title d'un article ajouté = le ${titleArticle} alors: on pop l'alert et on sort de la fucntion avec return pour pas que ça add un article
  //Si on écrit cette instruction à la fin de la function: ca va pop l'alert, mais ca va quand même ajouter l'article

  let cartItems= document.querySelector('.all-cart-items');

  let titleItem = cartItems.getElementsByClassName('cart-name-article'); // on accède au nom des article par le cart-item, pour cibler les articles ajoutés au cart et les différencier des articles dans le body; sinon dès qu'on cliquera sur un itm pour l'add, ca va refuser
  
  for (let i=0; i<titleItem.length; i++) {
    if (titleItem[i].innerText==titleArticle) {
      alert("You've already selected this article");
      return;
    }
  }

//On ajoute le content au <div> crée et ça sera toute une structure HTML
//!!!!Dans le <h3> du nom de l'article: IL FAUT QUE LA CLASS SOIT LA MÊME QUE CELLE QU'ON CIBLE PLUS HAUT, POUR EMPECHER UN 2EME AJOUT !!!
  let cartRowContent = ` 
  <div class="image-and-title">
      <img src="${imageArticle}" width="70px">
      <h3 class="cart-name-article">${titleArticle}</h3> 
  </div>

  <div class= "div-cart-price">
    <span class="cart-price">${priceArticle}</span>
  </div>

  <div class="cart-quantity">
    <input class="quantity-input" type="number" value="1">
    <button class="remove" type="button">Remove</button>
  </div>   
    
    `
  
  createCartRow.innerHTML=cartRowContent; //on ajoute .innerHTML au lieu de .innerText car on ajoute des balises HTML <div> / <img> / <h3>...etc

  

  cartItems.append(createCartRow); // On nest le <div> crée avec son content dans le cart Items: !! Chaque row ajouté apparaitra à la fin du cart item

  createCartRow.classList.add('cart-row'); // On rajoute au cart Row ajouté au cart le même style que celui utilisé pour les modèles (d'ou une autre de leur utilité)

  //Maintenant, je vais créer une condition pour que l'utilisateur ne puisse rajouter 1 objet qu'une fois.
  //Mias pour que ça marche, il faut l'écrire en haut, pour que le return sorte de la function et n'ajoute rien avant

  //Ensuite, il faut activer chaque boutton remove de chaque element ajouté

  let newRemoveButton = document.getElementsByClassName('remove'); //ou on peut y accéder sans for loop juste en ciblant la nouvelle cart Row crée:c'est ce que je vais faire pour le quantoty-input

  for(let i=0; i<newRemoveButton.length; i++) {
    let theNewRemove = newRemoveButton [i];

    theNewRemove.addEventListener('click', removeArticle);
  }

  //Maintenant il faut activer les quantity pour chaque nouvel element crée

  let newQuantity = createCartRow.querySelector('.quantity-input'); //On accède par create cart Rox, car quand on va supprimer les modèles, c'est là ou va y avoir le row avec les nouvelles quantity
  let changeQuantity = newQuantity.addEventListener('change', realTotal);

}

//Maintenant qu'on a crée les nouvelles row avec leur contenu en s'aidant des modèles crée dans le html
//On peut supprimer les 2 cartRow préalableme,nt crée dans le HTML pour que le cart item soit vide
//Et on écrit 0 Dhs dans le Total

//Maintenant il faut faire en sorte que le purchase button vide notre cart et pop une alert: thank you for purchas

let finalPurchase =document.querySelector('.final-purchase');

finalPurchase.addEventListener('click', finalPurchaseClicked);//on crée une nouvelle call back function qui va supprimer tous les items

function finalPurchaseClicked () {// Pas de loop car 1 seul bouton purchase
  alert('Thank you for your purchase')
  let cartItems = document.querySelector('.all-cart-items');
  //Maintenant, étant donné que les modèles de cart-row ont été supprimés, il faut accéder au nouveau cart-row added, par el cart items et en loopant sur eu
  while(cartItems.hasChildNodes()) { //On utilise une while loop, car pas besoin de counter variable pour conditionner l'arret. Ici la loop va continuer tant que la condition est vraie
    cartItems.removeChild(cartItems.firstChild); //on remove tous les 1er child à l'interieur du cartItem jusqu'à ce que ce soit vide
  }
  updateTotal(); //on appelle la function update total pour le remettre à 0 une fois tout supprimé
}

//Et voilà: Notre JS pour shopping cart est terminé !
