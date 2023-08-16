import { Router } from "express";

const algo= Router();

algo.get('/' , (req, res) => {
    res.send('asd')
});

export default algo