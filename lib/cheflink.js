export async function cheflink(session) {
  const userEm = session.user.email;

  const res = await fetch("http://localhost:3000/api/chefapi");

  const chefsData = await res.json();

  const chefArr = chefsData.map((chef) => {
    if (chef.email === userEm) {
      return chef._id;
    }
  });
  const chefId = chefArr[0];

  return chefId;
}
