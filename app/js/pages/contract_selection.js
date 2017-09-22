class ContractSelection {
  render() {
    hideLoadingAlert();
    showContractSelector();

    var goToContract = document.querySelector('#goToContract')

    goToContract.addEventListener('click', function() {
      var contract = document.querySelector("#contractInput").value;
      window.location = '/?address=' + contract
    });
  }
}
