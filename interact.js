let plusSign=document.querySelector('.fa-plus');

let minusSign=document.querySelector('.fa-minus');

let quantity=document.querySelector('.quantity');

let button=document.querySelector('.plus');

let priceElement= document.querySelector('.price')

//objectif quand on clique sur + ça augmente de 1 et - diminue de 1


//On stock le contenu de quantity (le nombre d'items) dans une variable
let number= quantity.innerHTML;

//Puis on transforme le string en number pour pouvoir l'incrementer
number= Number(number);

//puis on crée un event handler  pour augmenter de 1
let  addOne = () => {
  //On fait DABORD number+=1; puis on le stock dans quantity.innerHTML
  //Si on fait l'inverse, va se stockera dans la valeur de quantity et
  //Quand on fera un autre evenement, meme si différent, il refera +1 puis le nouvel appel
  number+=1;
  //on assigne number au content de quantity
  quantity.innerHTML= number;

  return number;
}

let minusOne = () => {
  number-=1;
  quantity.innerHTML= number;

  return number;
}

plusSign.addEventListener("click", addOne);

minusSign.addEventListener("click", minusOne);
