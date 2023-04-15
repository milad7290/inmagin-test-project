/**
 * @description combine the api version and url prefix and create api path.
 * @param apiVersion
 * @param urlPrefix
 * @returns the apiPath string
 */
export const apiPath = (apiVersion: number, urlPrefix: string): string => {
  return `/api/v${apiVersion}/${urlPrefix}`;
};
