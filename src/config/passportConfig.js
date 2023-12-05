import passport from "passport";
import local from "passport-local";
import { userModel } from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "contrasena",
      },
      async (req, username, contrasena, done) => {
        const { nombre, apellido, email } = req.body;
        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            console.log("el usuario ya existe");
            return done(null, false);
          }
          const newUser = {
            nombre,
            apellido,
            email,
            contrasena: createHash(contrasena),
          };
          let result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("error al obtener el usuario: " + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy({
        usernameField: "email",
        passwordField: "contrasena",
    },
    async (username, contrasena, done) => {
        try {
            let user = await userModel.findOne({ email: username });
            if (!user) {
                console.log("el usuario no existe")
                return done(null, false);
            }
  
            if (!isValidPassword(user, contrasena)) {
                return done(null, false)
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    let user = await userModel.findById(_id);
    done(null, user);
  });
};

export default initializePassport;
