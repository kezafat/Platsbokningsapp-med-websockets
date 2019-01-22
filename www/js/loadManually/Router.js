class Router {

  constructor(mainInstance){
    // The mainInstance is the object that should
    // be rerendered on route changes
    this.mainInstance = mainInstance;
    this.listenToATagClicks();
    this.listenToBackForward();
    this.setPath(location.pathname);
  }

  listenToATagClicks(){
    let that = this;
    $(document).on('click', 'a', function(e){
      // assume all links starting with '/' are internal
      let link = $(this).attr('href');
      if(link.indexOf('/') === 0){
        e.preventDefault(); // no hard reload of page
        history.pushState(null, null, link); // change url (no reload)
        that.setPath(link);
        that.mainInstance.render();
      }
    });
  }

  listenToBackForward(){
    window.addEventListener("popstate", () => {
      this.setPath(location.pathname);
      this.mainInstance.render();
    });
  }

  setPath(path){
    Router.path = Router.routes.includes(path) ? path : '404';
    setTimeout(() => this.setActiveLink(), 0);
  }

  setActiveLink(){
    $('a').removeClass('active');
    $(`a[href="${Router.path}"]`).addClass('active');
  }

  static registerRoute(route){
    Router.routes.push(route);
  }
  
}

// static property
Router.routes = [];