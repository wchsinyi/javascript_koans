  function factoriz(input,sieveAcc){
      let sieve = new Object();
      if (input%2==0){
        sieve[2]=1
        while (input%2==0){ input=input/2; sieve[2]=sieve[2]+1}
      }
      
      for (let i=3; i*i<=input;i+=2){
        if (input%i==0){
          sieve[i]=1
          while (input%i==0){ input=input/i;sieve[i]=sieve[i]+1}
        }
      }
      let factArr=[];
      for (let s in sieve){
        factArr.push([s, sieve[s]])
      }
      return factArr
  }

  function Nthprime(n){
      let primeArr = [2,3]; // 5th prime
      let l= primeArr.length
      while (l<=n){
        let start = primeArr.slice(-1)
        primeArr=primeArr.concat(nextPrime(start))
      }
      return primeArr.slice(-1)
    }

      function nextPrime(j){
      let start; 
      if (j%2==0){
        start = j+1 
      }else{
        start = j+2
      }
      while (!isPrime(j)){
        j+=2
      }
      return j
    }
