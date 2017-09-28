var address = findGetParameter('address');
var converter = new showdown.Converter();

if(address == undefined) {
  contract_selection = new ContractSelection();
  contract_selection.render();
} else {
  show_posts = new ShowPosts();
  show_posts.render();
}
