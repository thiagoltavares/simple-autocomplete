import { HttpResponse } from "../model";

export async function fetcher<T>(userName: string): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(
    `https://api.github.com/search/users?q=${userName}&per_page=10`
  );

  try {
    response.data = await response.json();
  } catch (ex) {
    console.log(ex);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}
