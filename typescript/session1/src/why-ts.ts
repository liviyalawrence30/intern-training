type User = { fullName: string };

function getUserLabel(user: User): string {
  return user.fullName.toUpperCase();
}
//error:Property 'fullNme' does not exist on type 'User'. Did you mean 'fullName'?

//js identifies the typo only during runtime .
//ts identifies the typo during compile time and throws an error which is a great advantage of using ts over js.

