import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import { userModel } from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const LocalStrategy = local.Strategy;

dotenv.config();

const GITHUB_CLIENT_ID = "Iv1.51a36e4a0a2e5e36";
const GITHUB_CLIENT_SECRET = "55b888a2f25f748a0a0f0e6c8811bff1f215fb73";
const GITHUB_CALLBACK_URL = "http://localhost:8080/api/sessions/githubCallback";

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
          };
          let result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done("Error al obtener el usuario: " + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user || !isValidPassword(user, password)) {
            console.log("Credenciales inválidas");
            return done(null, false);
          }

          const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET, { expiresIn: '1h' });

          return done(null, { user, token });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Ayuda passport");
        try {
          console.log(profile);
          let user = await userModel.findOne({ githubId: profile.id });
          console.log(user);
          if (user) {
            console.log("Usuario ya existe");
  
            const githubToken = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET, { expiresIn: '1h' });
  
            return done(null, { user, githubToken });
          } else {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: "",
              password: "",
            };
            let result = await userModel.create(newUser);
  
            const githubToken = jwt.sign({ userId: result._id }, process.env.SESSION_SECRET, { expiresIn: '1h' });
  
            console.log("Lo creo al usuario");
            return done(null, { user: result, githubToken });
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
  
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
};

export default initializePassport;
