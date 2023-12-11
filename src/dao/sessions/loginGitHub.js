import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }),(req,res)=>{
    console.log('ayuda loginGit')
    res.send('algooo final')
});

router.get('/githubcallback', passport.authenticate('github'), (req, res) => {
    console.log('ayuda loginGit 2')
    res.redirect('/users');
});

export default router;
