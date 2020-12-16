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
