import express from "express";
const app = express();
// const port=3000
const port = process.env.PORT || "3001";

// routing in express
// 1 callback of single
app.get("/", (req, res) => {
  res.send("You are at the Home page");
});
app.get("/users", (req, res) => {
  console.log("First users data ");
  res.send("Users status is successfull");
});

// 2. more than one callback
app.get(
  "/shop",
  (req, res, next) => {
    console.log("second callback");
    next();
  },
  (req, res) => {
    console.log("Third callback");
    res.send("Successfully purchased ..");
  }
);

// 3. Array of callbacks

const callback1 = (req, res, next) => {
  console.log("First array callback");
  next();
};

const callback2 = (req, res, next) => {
  console.log("Second array callback");
  next();
};
const callback3 = (req, res) => {
  console.log("Third array callback");
  res.send("Successfully created arrays");
};

app.get("/lists", [callback1, callback2, callback3]);

// 5. combination of independent function and array of function
const callback01 = (req, res, next) => {
  console.log("First array collection callback");
  next();
};

const callback02 = (req, res, next) => {
  console.log("Second array collection callback");
  next();
};
const callback03 = (req, res) => {
  console.log("Third array collection callback");
  res.send("Successfully created arrays");
};

app.get(
  "/collections",
  [callback01, callback02, callback03],
  (req, res, next) => {
    console.log("Fourth callback of collection");
    next();
  },
  (req, res) => {
    console.log("Fifth callback of collection");
    res.send("Collection fetched successfully");
  }
);

// string pattern

app.get("/ab?cd", (req, res) => {
  console.log("This will work for acb and abcd");
  res.send("it works fine");
});

app.get("/ab+cd", (req, res) => {
  // abcd ,abbcd,abbbcd abbbbcd .....n
  res.send("This path will match abcd abbcd abbbcd and so on");
});

// Regular expression

// app.get(/a/, (req, res) => {
//   res.send(`the letter a belong `);
// });

app.get("/ab*cd", (req, res) => {
  // abcd abXcd abRandomcd
  res.send("ab*cd will give abcd abcxcd abRANDOMcd ...");
});

// javascript works on seqential order while not in asynchronous
// so all the applied routing might work on above such as /a/

app.get("/ab(cd)?e", (req, res) => {
  res.send("This will match /abe and /abcde ");
});

app.get(/.*fly$/, (req, res) => {
  // butterfly dragonfly,housefly
  res.send("This will match butterfly dragonfly...");
});
// listen app
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
