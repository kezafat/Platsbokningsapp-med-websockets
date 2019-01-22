// Base class for other classes
// that are front end representations
// of Mongoose models

class REST {

  static get baseRoute() {
    return this.name.toLowerCase() + 's/';
  }

  constructor(settings){
    Object.assign(this, settings);
  }

  async save(){
    let saved = await $.ajax({
      url: '/json/' + this.constructor.baseRoute + (this._id ? this._id : ''),
      // if _id exists update/put otherwise create/post
      method: this._id ? 'PUT' : 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(this)
    }).catch(err => console.error(err));
    Object.assign(this, saved);
    return this;
  }

  async delete(){
    if(!this._id){
      throw(new Error('Can not delete because no _id!'));
    }
    return await $.ajax({
      url: '/json/' + this.constructor.baseRoute + this._id,
      method: 'DELETE',
      contentType: 'application/json'
    });

  }

  static async find(query = ''){
    let found = await $.ajax({
      url: '/json/' + this.baseRoute + query,
      method: 'GET',
      contentType: 'application/json'
    });
    let wrapped = false;
    if(!found){
      return found; // probably null
    }
    if(found.constructor !== Array){
      // found is not an array so wrap it in array
      found = [found];
      wrapped = true;
    }
    // convert from raw generic object to instance of current class
    let result = found.map(item => new this(item));
    if(wrapped){
      // unwrap things that weren't arrays from the beginning
      result = result[0];
    }
    return result;
  }

}