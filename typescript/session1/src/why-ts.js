function getUserLabel(user) {
  return user.fullName.toUpperCase();
}

const user = { fullName: "Alice Smith" };
console.log(getUserLabel(user));
