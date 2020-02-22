# Relint
Main Repository

## Must be done
```
npm install -g firebase-tools (only once per device)
install "_config_.exe"
npm install (root, client, and functions directory)
```

## server
### Compiles and hot-reloads for development
```
firebase emulators:start (if using database-functions in functions)
firebase serve (no database-functions in functions)
***database-functions is firebase's feature's name not normal functions calls from firebase that we uses***
```
### editing
```
cd functions
-> README.md in functions directory
```

## client
```
cd client
-> README.md in client directory
```

## deployment
```
change baseURL of axios in 'main.ts'  to the one *not* 'localhost'
(look for "//############################################################# change here before build")
npm run build    : in client directory (then)
firebase deploy  : in main directory (then)
relint-kmitl.firebaseapp.com : in brower (recommended) (or)
relint-kmitl.web.app
```
## notes
```
2-3 cmd needed for development
```
