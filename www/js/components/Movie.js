class Movie extends Component {
  constructor(props) {
    super(props);
    this.addEvents({
      'click .actors-toggle': 'toggleActors',
      'click .description-toggle': 'toggleDescription',
      'mouseover': 'mouseOver',
      'mouseleave': 'mouseLeave',
    });
    this.showActors = false;
    this.showDescription = false;

  }

  unmount() {
    this.showActors = false;
    this.showDescription = false;
  }

  mouseOver() {
    $(".description-toggle").mouseover(function () {
      $(".description-toggle").css("color", "red");
    })
    $(".actors-toggle").mouseover(function () {
      $(".actors-toggle").css("color", "red");
    })
  };

  mouseLeave() {
    $(".description-toggle").mouseleave(function () {
      $(".description-toggle").css("color", "black");
    })
    $(".actors-toggle").mouseleave(function () {
      $(".actors-toggle").css("color", "black");
    })
  };

  toggleDescription() {
    this.showDescription = !this.showDescription;
    this.render();
  }

  toggleActors() {
    this.showActors = !this.showActors;
    this.render();
  }

  getActors() {
    let html = '<ul>'
    for (let actor of this.actors) {
      html += `<li>${actor}</li>`;
    }
    html += '</ul>';
    return html;
  }


  getActors() {
    let html = '<ul>';
    for (let actor of this.actors) {
      html += `<li>${actor}</li>`;
    }
    html += '</ul>';
    return html;
  }

}
