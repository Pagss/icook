export default function handler(req, res) {
  const body = req.body;
  // console.log("body: ", body);

  if (!body.modos) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: null });
  }

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.modos} ` });
}
