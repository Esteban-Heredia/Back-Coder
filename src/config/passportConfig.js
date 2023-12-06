import passport from "passport";
import local from "passport-local";
import GitHubStrategy from 'passport-github2'
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
            const user = await userModel.findOne({ email: username });
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

  // passport.use('github', new GitHubStrategy({
  //   clientID: 'Iv1.e4e2b78542f1414f',
  //   clientSecret: '0f8f25537cbe67f8fd1fe076c1a812c13f49f4c0',
  //   callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
  // }, async (accessToken, refreshToken, profile, done) => {
  //   console.log('ayuda passport')
  //   try {
  //     console.log(profile)
  //     let user = await userModel.find({ email: profile._json.email })
  //     if (!user) {
  //       let newUser = {
  //         nombre: profile._json.name,
  //         apellido: profile._json.lastName,
  //         email: profile._json.email,
  //         contrasena: "",
  //       };
  //       let result = await userModel.create(newUser);
  //       done(null, result)
  //     } else {
  //       done(null, result);
  //     }
  //   } catch (error) {
  //     return done(error)
  //   }
  // }));
  

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    let user = await userModel.findById(_id);
    done(null, user);
  });
};

export default initializePassport;
