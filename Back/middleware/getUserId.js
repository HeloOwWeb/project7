const getUserId = (req) => {
    return req.user.userId
};

module.exports = getUserId;