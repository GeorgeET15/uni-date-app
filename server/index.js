const PORT = process.env.PORT || 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const uri = process.env.URI;
const app = express();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "UniDate2024@gmail.com", // Your Gmail email address
    pass: "foni kxsn bzbh dyxk",
  },
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://unidate.vercel.app/");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const cors = require("cors");
const corsOptions = {
  origin: "*", // Allow requests from any origin
  credentials: true, // Access-Control-Allow-Credentials: true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const client = new MongoClient(uri);

app.get("/", (req, res) => {
  res.json("Hello to my app");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const sanitizedEmail = email.toLowerCase();
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
      verification_code: verificationCode,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    // Send verification email
    const mailOptions = {
      from: "UniDate2024@gmail.com",
      to: sanitizedEmail,
      subject: "UniDate Account Verification",
      text: `Hello,
    
    Thank you for signing up with UniDate! To verify your email address and activate your account, please enter the following verification code:
    
    Verification Code: ${verificationCode}
    
    If you did not sign up for UniDate, please ignore this email.
    
    Best regards,
    UniDate Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ token, userId: generatedUserId, verificationCode });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.post("/verify", async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({
      email,
      verification_code: verificationCode,
    });

    if (user) {
      await users.updateOne({ email }, { $unset: { verification_code: "" } });

      const token = jwt.sign(user, email, { expiresIn: 60 * 24 });
      res.status(201).json({ success: true, token, userId: user.user_id });
    } else {
      res
        .status(400)
        .json({ success: false, error: "Invalid verification code" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const user = await users.findOne({ email });

    if (user) {
      const correctPassword = await bcrypt.compare(
        password,
        user.hashed_password
      );

      if (correctPassword) {
        const token = jwt.sign(user, email, { expiresIn: 60 * 24 });
        return res
          .status(201)
          .json({ success: true, token, userId: user.user_id });
      }
    }

    // Move this line outside of the try block
    return res
      .status(400)
      .json({ success: false, error: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "An error occurred during login." });
  } finally {
    // Make sure to close the database connection in the finally block
    await client.close();
  }
});

app.get("/gendered-users", async (req, res) => {
  const client = new MongoClient(uri);
  const gender = req.query.gender;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { gender_identity: { $eq: gender } };
    const sortCondition = { created_at: 1 }; // 1 for ascending order (oldest first)
    const foundUsers = await users.find(query).sort(sortCondition).toArray();

    res.send(foundUsers);
  } finally {
    await client.close();
  }
});

app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        // age: 2024 - formData.dob_year,
        branch: formData.branch,
        current_year: formData.current_year,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };

    const inserteduser = await users.updateOne(query, updateDocument);
    res.send(inserteduser);
  } finally {
    await client.close();
  }
});

app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

app.post("/remove-match", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const messages = database.collection("messages");

    // Step 1: Remove the match from the user's matches
    const matchQuery = { user_id: userId };
    const matchUpdateDocument = {
      $pull: { matches: { user_id: matchUserId } },
    };
    await users.updateOne(matchQuery, matchUpdateDocument);

    // Step 2: Remove the match from the other user's matches
    const reverseMatchQuery = { user_id: matchUserId };
    const reverseMatchUpdateDocument = {
      $pull: { matches: { user_id: userId } },
    };
    await users.updateOne(reverseMatchQuery, reverseMatchUpdateDocument);

    // Step 3: Delete all messages between the two users
    const messageQuery = {
      $or: [
        { from_userId: userId, to_userId: matchUserId },
        { from_userId: matchUserId, to_userId: userId },
      ],
    };
    await messages.deleteMany(messageQuery);

    res.json({ success: true });
  } catch (error) {
    console.error("Error removing match:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = JSON.parse(req.query.userId);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userId,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();

    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

app.get("/messages", async (req, res) => {
  const { userId, correspondingUserId } = req.query;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});

app.post("/message", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } finally {
    await client.close();
  }
});

app.delete("/delete-user", async (req, res) => {
  const client = new MongoClient(uri);
  const userIdToDelete = req.body.userId; // Assuming you send the userId to delete in the request body

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    // Step 1: Delete the user
    const deletionQuery = { user_id: userIdToDelete };
    await users.deleteOne(deletionQuery);

    // Step 2: Delete all messages sent or received by the user
    const messagesQuery = {
      $or: [{ from_userId: userIdToDelete }, { to_userId: userIdToDelete }],
    };
    await messages.deleteMany(messagesQuery);

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.get("/total-registered-users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    // Fetch total registered users
    const totalRegisteredUsers = await users.countDocuments();
    let maleUsers = 0;
    let femaleUsers = 0;

    // Fetch gender identities
    const genderIdentities = await users
      .find({}, { projection: { _id: 0, gender_identity: 1 } })
      .toArray();

    // Log each gender identity
    genderIdentities.forEach((user) => {
      if (user.gender_identity === "man") {
        maleUsers++;
      } else if (user.gender_identity === "woman") {
        femaleUsers++;
      }
    });
    res.json({ totalRegisteredUsers, maleUser, femaleUser });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("Server running on PORT " + PORT));
