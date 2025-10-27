export const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/imagekit/auth");
    const data = await response.json();
    return data; // must return { token, expire, signature }
  } catch (err) {
    console.error("ImageKit auth failed:", err);
  }
};
