const  users = [];

// Join user to chat
function userJoin(id , username, room) {
    const user = {id , username, room};

    users.push(user);
    return user;
}

//get currentt user
function getCurrentUser(id){
    return users.find(user => user.id == id);
}

//user leaves chat
function userLeaves(id){
    const index = users.findIndex(user  => user.id == id);
}

module.exports = {
    userJoin, getCurrentUser
};