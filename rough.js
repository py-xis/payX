const zod = require("zod");

const user = zod.object({
    firstName : zod.string(),
    lastName  : zod.string(),
    email     : zod.string().email(),
    password  : zod.string()
});


const userr = {
    firstName : "Pranav",
    lastName  : "zod.string()",
    email     : "abc@gmail.com",
    password  : "password"
}

const userrr = {
    firstName : "Pranav",
    lastName  : "zod.string()",
    email     : "abgmail.com",
    password  : "password"
}


console.log(user.safeParse(userr));
console.log(user.safeParse(userrr));
