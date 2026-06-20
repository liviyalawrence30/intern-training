interface Profile {
  displayName: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
};
function renderProfile(profile: Profile): string {
  let result = `Name: ${profile.displayName}\n`;
  result += `Bio: ${profile.bio ?? "No bio provided"}\n`;
  if (profile.website) {
    result += `Website: ${profile.website}\n`;
  }
  return result;
};
const fullProfile: Profile = {
  displayName: "Maria Liviya",
  bio: "AI enthusiast",
  website: "https://example.com",
  avatarUrl: "https://example.com/avatar.jpg"
};
const simpleProfile: Profile = {
  displayName: "Selena"
};
console.log(renderProfile(fullProfile));
console.log(renderProfile(simpleProfile));

/*
If I directly call profile.bio.toUpperCase() without checking, it will say that bio may be 'undefined'.
It throws an error beacuse 'bio' is an optional paramter. So,It can be a string or can be undefined.
*/




