import passport from "passport";
import local from "passport-local";
import { userModel } from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "asd",
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, contrasena, done) => {
        console.log('linea 14')
        const { nombre, apellido, email } = req.body;
        try {
            console.log('linea 17', req.body)
        //   const user = await userModel.findOne({ email: username });
       
        //   if (!nombre || !apellido || !email || !contrasena) {
        //     return done(null, false, {
        //       status: "error",
        //       message: "Datos incompletos",
        //     });
        //   }

        //   if (user) {
        //     console.log("El usuario ya existe");
        //     return done(null, false, {
        //       status: "error",
        //       message: "El usuario ya existe",
        //     });
        //   }

        //   const newUser = {
        //     nombre,
        //     apellido,
        //     email,
        //     contrasena: createHash(contrasena),
        //   };

        //   const result = await userModel.create(newUser);
        //   return done(null, result);
        } catch (error) {
          console.log(
            "Error en la operación POST de usuarios en MongoDB:",
            error
          );
          return done(null, false, {
            status: "error",
            message: "Error en el servidor",
          });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log('serial')    
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    console.log('deserial A USEr')
    let user = await userModel.findById(_id);
    console.log('clg user',user)
    done(null, user);
  });
};

export default initializePassport;
