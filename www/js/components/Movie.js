class Movie extends Component {

  constructor(props) {
    super(props);
  }
  setStars(){
  let starsCount = this.reviews[0].stars;
  let htmlStars = this.baseEl.find('.fa.fa-star');
  for(let i = 0; i < starsCount; i++){
    $(htmlStars[i]).addClass('checked');
    }
  }
  mount(){
    this.setStars();
  }
}
