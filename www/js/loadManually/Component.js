class Component extends REST {
 
  constructor(props){
    super(props); // send props to REST constructor
    this.addUniqueId();
    this._orgRender = this.render;
    this.render = this._render;
    this.toString = this.render;
    // Remember the original page title from HTML
    Component.orgPageTitle = Component.orgPageTitle || document.title;
  }
 
  addUniqueId(){
    Component.co = Component.co || 0;
    this._componentId = Component.co;
    Component.co++;
  }
 
  _errorWrap(x){
    return `<pre class="alert alert-danger">${x}</pre>`;
  }
 
  _render(){
    // convert html string to jQuery elements
    let elements = [];
    try {
      elements = $(this._orgRender());
    }
    catch(e){ 
      elements = $(this._errorWrap(e.stack)); 
    }
    // check that there is exactly 1 root element
    if(elements.length !== 1){
      elements = $(this._errorWrap('Error: Provide exactly 1 root element for ' 
        + this.constructor.name)); 
    }
    // if already in DOM then replace it
    let inDOM = $(`[data-instance-id=${this._componentId}]`);
    if(inDOM.length > 0){
      inDOM.replaceWith(elements);
      // call update hook
      this.componentDidUpdate && setTimeout(() => this.componentDidUpdate(), 0);

    }
    // If I have a route and it is not the current one - render nothing
    if(this.route && this.route !== Router.path) {
      inDOM.remove();
      // Call unmount if it exists
      this.unmount && this.unmount();
      return '';
    }
    // Call mount if it exist
    if(inDOM.length === 0){
      this.mount && setTimeout(() => this.mount(), 0);
    }
    // Change the title if we match a route with a title
    if(this.route === Router.path && this.title){
      document.title =  Component.orgPageTitle + ': ' + this.title;
    }
    // add the instance id
    elements.attr('data-instance-id', this._componentId);
    // return as a string
    return elements[0].outerHTML;
  }
 
  addEvents(eventMap){
    // eventMap should be an object on the form
    // {
    //   'eventType selector': 'nameOfMethod',
    //   etc... 
    // }
    for(let event in eventMap){
      let methodName = eventMap[event];
      let type = event.split(' ').shift();
      let selector = event.includes(' ') ? event.substr(event.indexOf(' ') + 1) : '';
      $(document).on(type,`[data-instance-id=${this._componentId}] ${selector}`, (e) => {
        return this[methodName](e);
      });
    }
  }
 
  addRoute(route, title){
    this.route = route;
    this.title = title;
    Router.registerRoute(route);
  }
 
  get baseEl(){
    return $(`[data-instance-id=${this._componentId}]`);
  }
 
}