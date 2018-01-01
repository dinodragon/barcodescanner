import { AsyncStorage } from 'react-native';

class Api {
  static instance;

  constructor(){
    if(this.instance) return this.instance;
    this.instance = this;

    return this.instance;
  }

  // -----------------------------------------------------------------
  async get(url){
    return await this.base(url, 'GET');
  }

  // -----------------------------------------------------------------
  async post(url, data){
    return await this.base(url, 'POST', data);
  }

  // -----------------------------------------------------------------
  async put(url, data = null){
    return await this.base(url, 'PUT', data);
  }

  // -----------------------------------------------------------------
  async base(url, method, data = null){
    if(!this.host){
      this.host = await AsyncStorage.getItem('host');
      this.port = await AsyncStorage.getItem('port');
    }

    let fullUrl = `${this.host}/${url}`
    let config = { method: method };
    if(data)
      Object.assign(config, { data: data })

    let response = await fetch(fullUrl, config);
    if(!response.ok) 
      alert('Something went wrong when performing the action. Please contact admin for support.');

    return response;
  }
}

export default new Api();