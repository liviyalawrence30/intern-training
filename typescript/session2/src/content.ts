import { slugify, truncate } from "./helpers.js";

const slug = slugify("Hello World");
const short = truncate("This is a long text", 10);


//Typescript can import functions from a .js file when allowjs is enabled.

//Before migration:
//for the type,it shows as 'any' which is weaker.

//after migration:
/*the type of the parameters and the return type are correctly shown.
It is showing as "string","number" etc instead of "any" */


/* .d.ts gives the type information of the js file.
It is useful when we dont want to change the js file to ts file but need  information about the js file.*/
