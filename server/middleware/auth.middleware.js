const auth = async (req, res, next) => {
    const headers = req.headers;
    const userId = headers['user-id'];

    if(!userId){
        console.error("No user id provided")
        return res.status(401).json({error: "User id is required as a parameter in the body"});
    }
    if (typeof userId !== 'string') {
        console.error("Invalid userId type");
        return res.status(400).json({ error: "User id must be a string" });
    }
    next();
}

module.exports = auth;