import passport from "passport";
import jwt from 'passport-jwt';
import local from "passport-local";
import GitHubStrategy from 'passport-github2'
import { userModel } from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";
import dotenv from 'dotenv'

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

dotenv.config()

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

// const cookieExtractor = req => {
//   let token = null;
//   if (req && req.cookies) {
//     token = req.cookies['coderSecret'];
//   }
//   return token;
// };

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

          // const token = jwt.sign({ sub: result._id }, 'coderSecret', { expiresIn: '1d' });
          return done(null, result);
        } catch (error) {
          return done("Error al obtener el usuario: " + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    },
    async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            if (!user) {
                console.log("El usuario no existe")
                return done(null, false);
            }
  
            if (!isValidPassword(user, password)) {
                return done(null, false)
            }

            // const token = jwt.sign({ sub: user._id }, 'coderSecret', { expiresIn: '1d' });
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
  );

  passport.use('github', new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('Ayuda passport')
    try {
      console.log(profile)
      let user = await userModel.find({ githubId: profile.id })
      console.log(user)
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          last_name: '',
          email: '',
          password:'',
        };
        let result = await userModel.create(newUser);
        // const jwtToken = jwt.sign({ sub: result._id, githubId: profile.id }, 'your-secret-key', { expiresIn: '1d' });
        console.log('Lo creo al usuario')
        done(null, { user: result });
      } else {
        console.log('Según esto está')
        const jwtToken = jwt.sign({ sub: user._id, githubId: profile.id }, 'your-secret-key', { expiresIn: '1d' });

        done(null, { user });
      }
    } catch (error) {
      return done(error)
    }
  }));

  // passport.use('jwt', new JWTStrategy({
  //   jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
  //   secretOrKey: 'coderSecret',
  // }, async (jwt_payload, done) => {
  //   try {
  //     return done(null, jwt_payload);
  //   } catch (error) {
  //     return done(error);
  //   }
  // }));
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
