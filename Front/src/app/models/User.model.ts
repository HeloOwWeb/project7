/*export class User {
  constructor(
    private _token: string
  ) { }

*//*  //Méthode qui permet de récupérer le token
  get token() {
    return this._token;
  }*//*

  private _userCurrent!: string;
  private random1!: string;
  private random2!: string;
  private base: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  private Token() {
    for (let i = 0; i < 75; i++) {
      this.random1 += this.base.charAt(Math.floor(Math.random() / this.base.length));
    }
    for (let i = 0; i < 186; i++) {
      this.random2 += this.base.charAt(Math.floor(Math.random() / this.base.length));
    }

    this._userCurrent = this.random1 + this._token + this.random2;
  }

  get token() {
    return this._userCurrent;
  }
}
*/

export class User {
  constructor(
    public lastname: string,
    public firstname: string,
    public email: string,
    public password: string,
    public accordTermsOfUse: boolean
  ) { }
}

export class Admin {
  constructor(
    public lastname: string,
    public firstname: string,
    public email: string,
    public password: string,
    public accordTermsOfUse: boolean,
    public passwordAdmin: string
  ) { }
}

export class Log {
  constructor(
    public email: string,
    public password: string
  ) { }
}
