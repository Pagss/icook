export default function handler(req, res) {
  const body = req.body;
  console.log("body: ", body);

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({
    data: `${body.listinha}  `,
  });
}
