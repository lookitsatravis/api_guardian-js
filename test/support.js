export const VALID_ACCESS_TOKEN = buildValidAccessToken();

function buildValidAccessToken() {
  let payload = JSON.stringify({
    exp: Math.round(new Date().getTime() / 1000 + 5000)
  });
  let base64Payload = Buffer(payload).toString('base64');
  let token = "test." + base64Payload;
  return token;
}
