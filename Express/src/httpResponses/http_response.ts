export class HttpResponse {
    static success(data?: any, message: string = 'Success') {
      return {
        message,
        data,
      };
    }
  
    static error(message: string = 'Error') {
      return {
        message,
      };
    }
  }