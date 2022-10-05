Routing is essential in every web framework.
There are different routing method which can be very useful according to our needs

Some of the routing method that we are can are

1. Single Callback,
2. Morethanone Callback
3. Regular Expression
4. String Pattern
5. Array of Callback
6. Array of Independent Function and Array of Function
7. all -method

## The method we are going to discuss are

### express app can be initilized like this

```js
import express from "express";
const app = express();
const port = process.env.PORT || "3000";

// method like app.get,post...

// app listen below http method

app.listen(port, () => {
  console.log(`server running at http:://localhost:${port}`);
});
```

1. one callback

```js
app.get("/", (req, res) => {
  res.send("one callback");
  console.log("This is one callback method");
});
```

---

2. more than one callback

```js app.get("/about",(req,res)=>{
 res.send("More than one callback");
//  this should be called once res.send
// if we comment out res.send method then
 },(req,res)=>{
 res.send("More than one callback");
 });
//  in browser we will not get any output browser will be loading infinite
// but why this is happening because we are passing another callback so there require a middleware
```

```js
app.get(
  "/about",
  (req, res, next) => {
    console.log("First callback");
    next();
    // need to call next function
  },
  (req, res) => {
    console.log("Second callback");
    res.send("This is about page");
  }
);
// Now our response will come as
// This is about page -in browser
// First callback -in console
//Second callback -in console
```

---

3. Array of callback

```js
const callback1 = (req, res, next) => {
  console.log("First callback");
  // remember one thing for serial wise execution we need middleware
  next(); //calling middleware function
};

const callback2 = (req, res, next) => {
  console.log("Second callback");
  next();
};
const callback3 = (req, res) => {
  console.log("Third callback");
  // no more next why? -we don't need extra callback now
  res.send("Array of callback executed");
};

// now method
// app.get("/arrays",(req,res)=>{})
app.get("/arrays", [callback1, callback2, callback3]);
// output First callback ,second callback,Thirs callback
// Array of callback executed -in response
```

---

4. String pattern path
   -It gives restriction when certain string pattern matches

```js
app.get("/ab?cd", (req, res) => {
  res.send("This route path will mathc abcd and acd");
  //if the string contains any of them then it will be successfull
});
// in response suppose i type /abc  it will show send res
```

---

5. Regular Expression
   It is used whenever the regx is matched then only it will run other wise Error

```js
app.get(/a/, (req, res) => {
  res.send("This word matches word a");
});
//- /a/ means that if any word matches the letter a then it will give response else error
// example -/apple -will give respone because a matches
// example -coat-will give response
```

---

6. Combination of independent function and array of function

```js
const callback1 = (req, res, next) => {
  console.log("First callback");
  next();
};
const callback2 = (req, res, next) => {
  console.log("Second callback");
  next();
};

// app method
app.get(
  "/users",
  [callback1, callback2],
  (req, res, next) => {
    console.log("Third callback");
    next();
  },
  (req, res) => {
    console.log("Fourth callback");
    res.send("Combination of independent function and array of function");
  }
);
// -First callback
//- Second callback
//- Third callback
//- Fourth callback
//- Combination of independent function and array of function
```

7. all method-
   all method is used for restriction and run for all HTTP method

```js
app.all("*", (req, res) => {
  res.send("Page not found");
});
```
