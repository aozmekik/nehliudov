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
        this.email = 'exbat_76@hotmail.com';
        this.password = 'semih123';
        this.name = null;
        this.role = 0;
        this.image = null;
    }
}


module.exports = {
    Role,
    User,
    roles,
};