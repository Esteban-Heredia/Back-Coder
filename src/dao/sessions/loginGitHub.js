import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }),(req,res)=>{
    console.log('ayuda loginGit')
});

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    console.log('ayuda loginGit 2')
    req.session.user = req.user;
    res.redirect('/asdddasd');
});

export default router;
