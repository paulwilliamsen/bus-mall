'use strict';

Pictures.imageOne = document.getElementById('first');
Pictures.imageTwo = document.getElementById('second');
Pictures.imageThree = document.getElementById('third');
Pictures.chart = document.getElementById('chart');
Pictures.button = document.getElementById('instructions');
Pictures.clickCounter = 0;

Pictures.allPicturesArray = [];
Pictures.currentImageArray = [];
Pictures.previousImageArray = [];
Pictures.fullIndexArray = [];
Pictures.allVotes = [];
Pictures.allNames = [];

//constructor

function Pictures(filepath, description) {
  this.filepath = filepath;
  this.altText = description;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
  Pictures.allNames.push(this.altText);
  Pictures.allPicturesArray.push(this);
}

Pictures.bag = new Pictures('img/bag.jpg', 'The out of this world bag');
Pictures.banana = new Pictures('img/banana.jpg', 'The random banana slicer product');
Pictures.bathroom = new Pictures('img/bathroom.jpg', 'The useful bathroom product');
Pictures.boots = new Pictures('img/boots.jpg', 'The unfunctional boots product ');
Pictures.breakfast = new Pictures('img/breakfast.jpg', 'The random breakfast product');
Pictures.bubblegum = new Pictures('img/bubblegum.jpg', 'The nasty bubblegum product');
Pictures.chair = new Pictures('img/chair.jpg', 'The comfy chair');
Pictures.cthulhu = new Pictures('img/cthulhu.jpg', 'The cthulhu product');
Pictures.dogDuck = new Pictures('img/dog-duck.jpg', 'The favorite duck-dog');
Pictures.dragon = new Pictures('img/dragon.jpg', 'The fake dragon stuff');
Pictures.pen = new Pictures('img/pen.jpg', 'The delicate pen');
Pictures.petSweet = new Pictures('img/pet-sweep.jpg', 'The pet-sweep');
Pictures.scissors = new Pictures('img/scissors.jpg', 'The pizza scissors');
Pictures.shark = new Pictures('img/shark.jpg', 'The little shark');
Pictures.sweep = new Pictures('img/sweep.png', 'The baby sweep');
Pictures.tauntaun = new Pictures('img/tauntaun.jpg', 'The cozy tauntaun');
Pictures.unicorn = new Pictures('img/unicorn.jpg', 'The magic unicorn meat');
Pictures.usb = new Pictures('img/usb.gif', 'The underwater usb');
Pictures.waterCan = new Pictures('img/water-can.jpg', 'The improbable water-can');
Pictures.wineGlass = new Pictures('img/wine-glass.jpg', 'Just give me the bottle instead wine-glass');

Pictures.randomNum = function () {
  var random = Math.random() * Pictures.allPicturesArray.length;
  var randomDown = Math.floor(random);
  return randomDown;
};

Pictures.generateImageArrays = function () {
  for (var i = 0; i < 25; i++) {
    Pictures.previousImageArray = Pictures.currentImageArray;
    Pictures.currentImageArray = [];
    var randomIndexOne = Pictures.randomNum();
    while (Pictures.previousImageArray.includes(randomIndexOne)) {
      randomIndexOne = Pictures.randomNum();
    }
    var randomIndexTwo = Pictures.randomNum();
    while (Pictures.previousImageArray.includes(randomIndexTwo) || randomIndexTwo === randomIndexOne) {
      randomIndexTwo = Pictures.randomNum();

    }
    var randomIndexThree = Pictures.randomNum();
    while (Pictures.previousImageArray.includes(randomIndexThree) || randomIndexThree === randomIndexOne || randomIndexThree === randomIndexTwo) {
      randomIndexThree = Pictures.randomNum();
    }

    Pictures.currentImageArray.push(randomIndexOne);
    Pictures.currentImageArray.push(randomIndexTwo);
    Pictures.currentImageArray.push(randomIndexThree);
    Pictures.fullIndexArray.push(Pictures.currentImageArray);
  }
};

Pictures.renderPictures = function () {

  var first = Pictures.fullIndexArray[Pictures.clickCounter][0];

  Pictures.imageOne.alt = Pictures.allPicturesArray[first].altText;
  Pictures.imageOne.src = Pictures.allPicturesArray[first].filepath;
  Pictures.allPicturesArray[first].timesDisplayed++;

  var second = Pictures.fullIndexArray[Pictures.clickCounter][1];

  Pictures.imageTwo.alt = Pictures.allPicturesArray[second].altText;
  Pictures.imageTwo.src = Pictures.allPicturesArray[second].filepath;
  Pictures.allPicturesArray[second].timesDisplayed++;

  var third = Pictures.fullIndexArray[Pictures.clickCounter][2];

  Pictures.imageThree.alt = Pictures.allPicturesArray[third].altText;
  Pictures.imageThree.src = Pictures.allPicturesArray[third].filepath;
  Pictures.allPicturesArray[third].timesDisplayed++;

  Pictures.clickCounter++;

  if (Pictures.clickCounter > 1) {
    Pictures.handleClick();
  }

  if (Pictures.clickCounter === 2) {
    Pictures.imageOne.removeEventListener('click', Pictures.renderPictures);
    Pictures.imageTwo.removeEventListener('click', Pictures.renderPictures);
    Pictures.imageThree.removeEventListener('click', Pictures.renderPictures);

    Pictures.updateVotes();
    Pictures.renderResults();
    Pictures.displayChart();

  }
};

Pictures.updateVotes = function () {
  for (var i = 0; i < Pictures.allPicturesArray.length; i++) {
    Pictures.allVotes[i] = Pictures.allPicturesArray[i].timesClicked;
  }
};

Pictures.handleClick = function () {
  for (var i = 0; i < Pictures.allPicturesArray.length; i++) {
    if (event.target.alt === Pictures.allPicturesArray[i].altText) {
      Pictures.allPicturesArray[i].timesClicked++;
    }
  }
};

Pictures.imageOne.addEventListener('click', Pictures.renderPictures);
Pictures.imageTwo.addEventListener('click', Pictures.renderPictures);
Pictures.imageThree.addEventListener('click', Pictures.renderPictures);




Pictures.renderResults = function () {
  var header = document.getElementById('results-header');
  var ulEl = document.getElementById('results');
  header.textContent = 'Results';

  for (var i = 0; i < Pictures.allPicturesArray.length; i++) {
    var thisImage = Pictures.allPicturesArray[i];
    var liEl = document.createElement('li');
    liEl.textContent = `${thisImage.altText} was clicked ${thisImage.timesClicked} out of ${thisImage.timesDisplayed} times displayed.`;
    ulEl.appendChild(liEl);
    Pictures.allVotes.push(this.allPicturesArray.timesClicked);
  }


};

Pictures.displayChart = function () {
  new Chart(Pictures.chart, {
    type: 'horizontalBar',
    data: {
      labels: Pictures.allNames,
      datasets: [{
        label: 'Votes Per Image',
        data: Pictures.allVotes,
        backgroundColor: ['#126fe7', '#2470dd', '#3771d2', '#4973c7', '#5b74bd', '#6d75b3', '#8077a8', '#92789e', '#a47993', '#b67a88', '#c87b7e', '#db7d74', '#ed7e69', '#db7d74', '#c87b7e', '#b67a88', '#a47993', '#92789e', '#8077a8', '#6d75b3',]
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: .5,
          }
        }],
        xAxes: [{
          ticks: {
            stepSize: 1,
            autoSkip: false,
            display: false,
          }
        }]
      }
    }
  });
};



Pictures.generateImageArrays();
Pictures.renderPictures();

alert ('These are the instructions for the research. Please click the product you would buy out of the group of three, 25 times. Click ok to begin.');

function myFunction() {
  alert ('Instructions: Click the product you would buy out of the group of three, 25 times. Click ok to continue.');
}

Pictures.button.addEventListener('click',myFunction);
