export default async function (data = {}, method = "POST") {
  const res = await fetch(data.endpoint, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.body)
  })
  return await res.json();
}