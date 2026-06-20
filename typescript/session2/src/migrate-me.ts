

const cache: Record<string, User> = {};

interface User {
  id: string;
  name: string;
}

function fetchUserFromCache(id:string):User|null {
  return cache[id] || null;
}

function saveUserToCache(user:User):void {
  cache[user.id] = user;
}

function processUsers<T,U>(users:T[], filterFn:(user: T) => boolean, transformFn:(user: T) => U):U[] {
  return users.filter(filterFn).map(transformFn);
}

function buildQueryString(params: Record<string, string>): string {
return Object.keys(params)
.map(function (key) {
const value = params[key];
return key + "=" + encodeURIComponent(value ?? "");
})
.join("&");
}

function retry<T>(fn:() => Promise<T>, maxAttempts:number, delay:number): Promise<T> {
  return new Promise(function(resolve, reject) {
    var attempt = 0;
    function run() {
      attempt++;
      fn()
        .then(resolve)
        .catch(function(err) {
          if (attempt >= maxAttempts) {
            reject(err);
          } else {
            setTimeout(run, delay);
          }
        });
    }
    run();
  });
}

export  {
  fetchUserFromCache,
  saveUserToCache,
  processUsers,
  buildQueryString,
  retry
};
