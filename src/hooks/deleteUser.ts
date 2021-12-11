import { parseCookies } from "nookies";
import { API_URL } from "src/constants/API_URL";
import fetch from "unfetch";

export const deleteUser = (url: string) => {
  // Cookieを読み込む
  const cookies = parseCookies();
  return fetch(`${API_URL}${url}`, {
    method: "DELETE",
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${cookies.token}`,
    },
  }).then((res) => res.status);
};
