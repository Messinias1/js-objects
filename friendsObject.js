//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
var person = {
  name: {
    first: ['Bob', 'Chris', 'Zach'],
    last: ['Beaven', 'Hetu', 'Poisson']
  },
  age: [24, 21, 23],
  gender: 'male',
  eyes: ['brown', 'blue', 'gray'],
  interests: [
    ['lifting weights', ' and cars'],
    ['movies', ' and music'],
    ['video games', ' and music']
  ],

  bio: function() {
    for (var i = 0; i < person.name.first.length; i++) {
              console.log(this.name.first[i] + ' ' + this.name.last[i] + ' is ' + this.age[i] + ' years old. He likes ' + this.interests[i] +  '.');
    }
  },
  greeting: function() {
    for (var i = 0; i < person.name.first.length; i++) {
    console.log('Hi! I\'m ' + this.name.first[i] + '.');
    }
  },
  farwell: function() {
    console.log("Bye everybody!");
  }
};

console.log(person.greeting());

console.log(person.bio());

console.log(person.farwell());

/*var person1 = {
  name: 'Chris',
  greeting: function() {
    return('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = {
  name: 'Brian',
  greeting: function() {
    return('Hi! I\'m ' + this.name + '.');
  }
}; */
