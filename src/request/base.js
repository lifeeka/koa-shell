export default class Base {
  headers: any;

  body: any;

  query: any;

  method: string;

  constructor(headers: any, method: string, body: any, query: any) {
    this.headers = headers;
    this.body = body;
    this.query = query;
    this.method = method;
  }

  get(key: string, defaultValue: string | null = null): Array<any> {
    if (this.method === 'GET') {
      return this.query[key] ?? defaultValue;
    }
    return this.query[key] ?? defaultValue;
  }

  getAll(): Array<any> {
    if (this.method === 'GET') {
      return this.query;
    }
    return this.body;
  }
}
