export default function handler(req, res) {
  const body = req.body;
  console.log("body: ", body);

  if (!body.ing) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "Nhum" });
  }

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.ing}` });
}
