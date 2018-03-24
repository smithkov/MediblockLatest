App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    // $.getJSON('../pets.json', function(data) {
    //   var petsRow = $('#petsRow');
    //   var petTemplate = $('#petTemplate');
    //
    //   for (i = 0; i < data.length; i ++) {
    //     petTemplate.find('.panel-title').text(data[i].name);
    //     petTemplate.find('img').attr('src', data[i].picture);
    //     petTemplate.find('.pet-breed').text(data[i].breed);
    //     petTemplate.find('.pet-age').text(data[i].age);
    //     petTemplate.find('.pet-location').text(data[i].location);
    //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
    //
    //     petsRow.append(petTemplate.html());
    //   }
    // });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Mediblock.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
    var MediblockArtifact = data;
    App.contracts.Mediblock = TruffleContract(MediblockArtifact);

    // Set the provider for our contract
    App.contracts.Mediblock.setProvider(App.web3Provider);

    // Use our contract to retrieve and mark the adopted pets
  //  return App.markAdopted();
  });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-register', App.handleRegister);
    $(document).on('click', '.btn-patient', App.getPatient);
    $(document).on('click', '.btn-patient-login', App.getLogin);
  },

  // markAdopted: function(adopters, account) {
  //   var adoptionInstance;
  //
  //   App.contracts.Adoption.deployed().then(function(instance) {
  //     adoptionInstance = instance;
  //
  //     return adoptionInstance.getAdopters.call();
  //   }).then(function(adopters) {
  //     for (i = 0; i < adopters.length; i++) {
  //       if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //         $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //       }
  //     }
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });
  // },

  getPatient: function(result, account) {
    var patientInstance;
    web3.eth.getAccounts(function(error, accounts) {
        var key = accounts[0];

      App.contracts.Mediblock.deployed().then(function(instance) {
        patientInstance = instance;
       console.log(key);
        return patientInstance.getPatient.call(key);
      }).then(function(data) {
        console.log(data);
        // for (i = 0; i < adopters.length; i++) {
        //   if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
        //     $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        //   }
        // }
      }).catch(function(err) {
        console.log(err.message);
      });
    })
  },
  getLogin: function(result, account) {
    var patientInstance;

      var key = $("#login-account").val();

      App.contracts.Mediblock.deployed().then(function(instance) {
        patientInstance = instance;
        return patientInstance.getPatient.call(key);
      }).then(function(data) {

        if(data.length>0){
          localStorage.setItem("patientInfo", JSON.stringify(data));
          window.location.href = "patientPersonalInfo.html";
        }
        else{
          alert("Key does not exist in the block!");
        }

      }).catch(function(err) {
        console.log(err.message);
      });

  },

  handleRegister: function(event) {
    event.preventDefault();

  //  var petId = parseInt($(event.target).data('id'));

    var patientInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.Mediblock.deployed().then(function(instance) {
        patientInstance = instance;
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var gender = $("#gender").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
        var address = $("#address").val();
        var dob = $("#dob").val();
        var eth_address = $("#eth_address").val();

        // Execute adopt as a transaction by sending account
      //  return patientInstance.adopt(petId, {from: account});
        // return patientInstance.setPatient(account,fname,lname,gender,phone,email,address,dob);
        return patientInstance.setPatient(eth_address,fname,lname,gender,phone,email,address,dob);
      }).then(function(result) {
        //return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
