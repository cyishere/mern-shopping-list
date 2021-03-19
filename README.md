This shopping list project is made of React, Redux, Express & MongoDB.

The project I made by follow along the [Learn the MERN Stack](https://www.youtube.com/playlist?list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE) tutorial on [Traversy Media Youtube channel](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA), but with the **latest versions** of the stack.

That means my approach is almost different from Traversy's. I learned this tutorial because I wanted to make a solid sense of authentication on both the frontend and backend sides. 💪🏻

## Usage

After clone this repository, run these command to install all the dependencies:

```bash
# 1️⃣ Install the backend dependencies
yarn install

# 2️⃣ Install the frontend dependencies
yarn client-install
```

Create and set the sensitive infomartions in `.env` file:

```
MONGO_URI=
APP_SECRET=
```

And rocket it: 🚀

```bash
# Run frontend & backend concurrently
yarn dev
```

For more command information, please check out the `package.json` file.

---

## Some TODOs During Development

Just some references for myself. 😄

### 8-backend-jwt-auth

- add user model
- make register work
- add authentication & secure routes
- get userinfo with token

### 9-auth-state

- initialize auth: check if token in localStorage, if there is then get the user info from server and save it in the state;
- add Register component;
- make register action work;
- add Login component;
- login in backend;
- make login action work;
- access control;
- logout;
