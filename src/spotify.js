// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "ee4bdd40020c4f56a73dd75a4be6ec04";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};
/* Here's a step-by-step explanation of what this function does:

1. window.location.hash: This retrieves the URL hash fragment portion of the current URL. The hash fragment is everything in the URL after the '#' symbol.

2. .substring(1): This removes the leading '#' symbol from the hash fragment, effectively extracting the string starting after the '#' symbol.

3. .split("&"): Splits the string at each '&' character, creating an array of key-value pairs representing different parameters in the URL fragment.

4. .reduce((initial, item) => { ... }, {}): This utilizes the reduce function to transform the array of key-value pairs into an object. For each key-value pair (item), it performs the following actions:

a. var parts = item.split("="): Splits each key-value pair at the '=' character, creating an array parts where parts[0] is the parameter name and parts[1] is its corresponding value.

b. initial[parts[0]] = decodeURIComponent(parts[1]): Assigns the value of the parameter to the object initial using the parameter name (parts[0]) as the key. The decodeURIComponent function is used to decode any encoded URI components in the value.

c. Returns the updated initial object, which accumulates all the key-value pairs from the URL hash.

5. Finally, the function returns an object containing all the parameters and their values extracted from the URL hash fragment.

*/

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
