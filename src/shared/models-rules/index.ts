import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  console.log(request.headers['authorization'].split(" "));
  return request.headers['authorization'].split(" ")[1];
  // return request.user && request.user.id;
}
