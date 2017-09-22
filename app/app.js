var address = findGetParameter('address');

if(address == undefined) {
  contract_selection = new ContractSelection();
  contract_selection.render();
} else {
  show_posts = new ShowPosts();
  show_posts.render();
}
