'use strict';


Picture.imgElement = document.getElementById('bus-mall-picture-one');
Picture.imgElement = document.getElementById('bus-mall-picture-two');
Picture.imgElement = document.getElementById('bus-mall-picture-three');

Picture.all = [];

// constructor function to make Random instances
function Picture(filepath, description) {
  this.url = filepath;
  this.altText = description;
  Picture.allGoats.push(this);
}

new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');
new Picture('', '');

Picture.randomNum = function() {
  // randomly generate a number
  var random = Math.random() * Picture.all.length;
  var roundedDown = Math.floor(random);
  return roundedDown;
};

Picture.renderGoat = function() {
  var randomIndex = Picture.randomNum();

  var randomPicture = Picture.all[randomIndex];


  Picture.imgElement.alt = randomPicture.altText;


  Picture.imgElement.src = randomPicture.url;
};


Picture.renderPicture();

// listen to the img element
Picture.imgElement.addEventListener('click', Picture.renderGoat.Picture);
