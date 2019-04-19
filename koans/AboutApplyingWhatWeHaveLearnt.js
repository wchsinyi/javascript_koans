var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    } // ['Pizza Primavera'] // no nuts and non muhroom

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      productsICanEat= products.filter(i=>  i.containsNuts===false  && !_(i.ingredients).any(j=>j=='mushrooms') )
      /* solve using filter() & all() / any() */
      // console.log(products.filter(i=>  i.containsNuts===false))
      // console.log(products.filter(i=> !_(i.ingredients).any(j=>j=='mushrooms')))
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    
    var sum = _.range(1, 1000, 1).reduce( (acc, current)=>  (current%3==0 || current%5==0)? acc+current: acc  , 0);    /* try chaining range() and reduce() */
    // var addUp = function(acc, current){
    //   if (current%3==0 || current%5==0){
    //     return acc+=current
    //   }else{
    //     return acc
    //   }
    // }
    expect(233168).toBe(sum);
  });


  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    // products = [
    //    { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
    //    { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
    //    { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
    //    { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
    //    { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    // ];
    products = _.flatten(products.map(i=> i.ingredients))
    products.reduce( function(prev, current){
      return ingredientCount[current] = (ingredientCount[current] || 0) + 1;
    }, ingredientCount)
    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */ 

  /* Helper Function */ 
    
    function isPrime(j){
      if (j<2){
        return false
      }else if(j==2){
        return true
      }else{
        for (let i=2;i*i<=j;i+=1){
          if (j%i==0){
            return false
          }
        }
        return true
      }
    }
    
  it("should find the largest prime factor of a composite number", function () {
    function G8tPrime(input){
      let sieve = [];
      if (input%2==0){
        sieve.push(2)
        while (input%2==0){ input=input/2}
      }
      for (let i=3; i*i<=input;i+=2){
        if (input%i==0){
          sieve.push(i)
          while (input%i==0){ input=input/i}
        }
      }
      if (input!=1){
        sieve.push(input)
      }
      return sieve.slice(-1)[0] // essentially you do not need eros sieve for this problem 
    }
    expect(G8tPrime(49)).toBe(7);
    expect(G8tPrime(17*31*47*2*4*6*17)).toBe(47);
    expect(G8tPrime(3)).toBe(3);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    //two 3 digits numbers. use a nested loop 
    // isPalindrome? Aha 
    // Any ways to speed this up 
    // start from the top down 
    function isPalindrome(num){
      var str = num.toString().split('')
      var rstr = num.toString().split('').reverse()
      return str.join('')===rstr.join('')
    }
    function largestP(){
      for (let i=999; i>=100;i--){
        for (let j=999; j>=100;i--){
          if (isPalindrome(i*j)){
            return i*j 
            // i*j
          }
        }
      }
    }
    expect(largestP()).toBe(90909);
  });

  function factoriz(input,sieveAcc){
      let sieve = new Object();
      if (input%2==0){
        while (input%2==0){ input=input/2; sieve[2]=(sieve[2]||0)+1}
        if (sieveAcc[2]==undefined|| (sieveAcc[2]<sieve[2]) ){
          sieveAcc[2]=sieve[2]
        }
      }

      for (let i=3; i*i<=input;i+=2){
        if (input%i==0){
          while (input%i==0){ input=input/i;sieve[i]=(sieve[i]||0)+1}
            if (sieveAcc[i]==undefined|| (sieveAcc[i]<sieve[i])  ){
              sieveAcc[i]=sieve[i]
            }
        }
      }
      sieveAcc[input]=1
      return sieveAcc
  }
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function divisible(a, b){
      let sieveAcc = new Object();
      for (let j=a; j<=b;j++){
        sieveAcc= factoriz(j,sieveAcc)
      }
      let result=1; 
      for (let el in sieveAcc){
        if (Number(el)>=1){ 
          result = (result)* (Number(el)** Number(sieveAcc[el]))
        }
      }
      return result
    }
    expect(divisible(1,20)).toBe(1*16*9*5*7*11*13*17*19); // actually this is basically the product of all prime^n where prime^n<20
    // expect(divisible(1,30)).toBe(1*16*27*25*7*11*13*17*19*23*29); 
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function sumNsquare(arr){
      sums = arr.map(i=> i*i).reduce((i,j)=> i+j)
      squares = (arr.reduce((i,j)=> i+j))**2
      return sums-squares
    }
    expect(sumNsquare([1,3,1])).toBe(-14); //11 versus 25
    expect(sumNsquare([2,4,0])).toBe(-16); //20 versus 36
    expect(sumNsquare([5,7])).toBe(25+49-12*12); 
  });

  it("should find the 10001st prime", function () {
    function Nthprime(n){
      if (n==2){
        return 3
      }else if (n==1){
        return 2
      }else{
        var count = 2;
        var i = 3; 
        while (count<n){
          i+=2
          if (isPrime(i)){
            count++
          }
        }
        return i 
      }
    }

    expect(Nthprime(10001)).toBe(104743);
    expect(Nthprime(2)).toBe(3);
    expect(Nthprime(1)).toBe(2);
    expect(Nthprime(5)).toBe(11);

  });
  
});
