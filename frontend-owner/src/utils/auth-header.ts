export default function authHeader() {
  const token = localStorage.getItem("token");

  if (token) {
    return { Authorization: "Bearer " + token }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return { Authorization: "" }; // for Spring Boot back-end
    // return { 'x-access-token': null }; // for Node Express back-end
  }
}
