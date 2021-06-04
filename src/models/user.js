const Role = Object.freeze({
    GUEST: 0,
    MEMBER: 1,
    MANAGER: 2,
});

const roles = ['Ziyaretçi', 'İlçe Görevlisi', 'İlçe Sorumlusu'];


class User {
    // FIXME. add default image.
    constructor() {
        this._id = null;
        this.email = null;
        this.name = null;
        this.role = 0;
        this.image = null;
    }
}

const isManager = (user) => {
    return user.role === 2;
}

module.exports = {
    Role,
    User,
    roles,
    isManager
};