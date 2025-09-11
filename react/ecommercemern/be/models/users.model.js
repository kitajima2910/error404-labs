class User {
    constructor(username, email, password, role, deleted) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.deleted = deleted;
    }
}

module.exports = User;
