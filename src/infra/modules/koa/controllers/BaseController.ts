export default abstract class BaseController {
  protected response(response: any, value: any): any {
    if (value?.length > 0 && value?.erros) {
      response.status = 400
      response.body = value
      return response
    }

    return value
  }
}