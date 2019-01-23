class App extends Component {
 
  constructor(){
    super();
    this.addRenderMethodToArrays();
    this.navBar = new NavBar();
    this.pageContent = new PageContent();
    this.footer = new Footer();

    new Router(this.pageContent);
    $('body').html(this.render());

  }

  addRenderMethodToArrays(){
    // add a render method to arrays that collect
    // renders for each item
    Array.prototype.render = Array.prototype.render || function(){
      let html = '';
      for(let item of this){
        html += item.render();
      }
      return html;
    }
    Array.prototype.toString = Array.prototype.render;
  }
 
}
