import passport from "passport";
import jwt from 'passport-jwt';
import local from "passport-local";
import GitHubStrategy from 'passport-github2'
import { userModel } from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = req =>{
  let token = null;
  if(req && req.cookies){
    token = req.cookies['coderSecret']
  }
}

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
            console.log("el usuario ya existe");
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
          return done("error al obtener el usuario: " + error);
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
                console.log("el usuario no existe")
                return done(null, false);
            }
  
            if (!isValidPassword(user, password)) {
                return done(null, false)
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
  );

  passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.51a36e4a0a2e5e36',
    clientSecret: '55b888a2f25f748a0a0f0e6c8811bff1f215fb73',
    callbackURL: 'http://localhost:8080/api/sessions/githubCallback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('ayuda passport')
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
        console.log('lo creo al user')
        done(null, result)
      } else {
        console.log('segun esto esta')
        done(null, user);
      }
    } catch (error) {
      return done(error)
    }
  }));

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey:'coderSecret',
  },async(jwt_payload,done)=>{
    try {
      return done (null,jwt_payload);
    } catch (error) {
      return done (error)
    }
  }))
  

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
