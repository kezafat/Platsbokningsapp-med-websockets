class Movie extends Component {
  constructor(props) {
    super(props);
    
  }

  getActors() {
    let html = '<ul>'
    for (let actor of this.actors) {
      html += `<li>${actor}</li>`;
    }
    html += '</ul>';
    return html;
  }

}