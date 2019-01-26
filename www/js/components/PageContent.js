class PageContent extends Component {
  constructor() {
    super();
    this.addEvents({
      'click .addUser': 'addNewUser'
    });
    this.greeting = false;
  }

  async addNewUser() {
    let userData = {
      "email": $('#userEmail').val(),
      "name": $('#userName').val(),
      "password": $('#userPassword').val()
    }

    let that = this;
    let saved = await $.ajax({
      url: '/register',
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(userData),
      success: function (res) {
        if(res == "ok"){
          that.greeting = true;
          that.greetUser();
        } else{
          console.log(res);
        }
      }
    });
  }

  greetUser(){
    this.greeting = true;
    this.render();
  }

}