const ensureNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/');
  };
  
  const ensureRole = (requiredRole) => {
    return (req, res, next) => {

        if (req.isAuthenticated() && req.session.user && req.session.user.role === requiredRole) {
        return next();
      }
      return res.status(403).send('no tenes el rol necesario');
    };
  };
  
  export { ensureNotAuthenticated, ensureRole };
  