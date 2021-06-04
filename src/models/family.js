import store from '../reducers/store';


export const Status = Object.freeze({
    SUITABLE_TRACE: 0,
    SUITABLE_ONE_TIME: 1,
    NOT_SUITABLE: 2,
    WILL_BE_QUESTIONED: 3,
    CONFLICTING: 4
});

export const Rating = Object.freeze({
    VERY_LOW: 0,
    LOW: 1,
    NORMAL: 2,
    GOOD: 3,
    VERY_GOOD: 4
});

export const WarmingType = Object.freeze({
    NATURAL_GAS: 0,
    STOVE: 1,
    ELECTRIC_HEATER: 2,
});

export const Gender = Object.freeze({
    MAN: 0,
    WOMAN: 1,
});

export const BudgetType = Object.freeze({
    INCOME: 0,
    EXPENSE: 1,
    BILL: 2,
})

export class Budget { // income and expense.
    constructor() {
        this._id = null;
        this.name = null;
        this.amount = null;
        this.type = null;
    }

};

export class Note {
    constructor() {
        this._id = null;
        this.statement = null;
        this.members = [];
    }
}


export class Member {
    constructor() {
        this._id = null;
        this.idNo = null;
        this.name = null;
        this.birthyear = null;
        this.gender = null;
        this.job = null;
        this.income = null;
        this.size = null;
        this.shoe = null;
        this.disease = null;
        this.note = null;
        this.school = null;
        this.grade = null;
        this.kinship = null;
    }
};


export class Family {
    constructor() {
        this._id = null;
        this.clerks = [store.getState().userReducer.user._id];
        this.name = null;
        this.idNo = null;
        this.tel = null;
        this.rent = null;
        this.regDate = null;
        this.warmingType = null;
        this.address = null;
        this.city = 34;
        this.district = null;
        this.town = null;
        this.street = null;
        this.nation = null;
        this.status = null;
        this.rating = null;
        this.health = false;
        this.education = false;
        this.members = [];
        this.budgets = [];
        this.needs = [];
        this.notes = [];
        this.images = [];
    }
};


const statuses = Object.freeze({
    [Status.SUITABLE_TRACE]: 'Uygun (Takip)',
    [Status.SUITABLE_ONE_TIME]: 'Uygun (Tek Sefer)',
    [Status.NOT_SUITABLE]: 'Uygun Değil',
    [Status.WILL_BE_QUESTIONED]: 'Sorgulanacak',
    [Status.CONFLICTING]: 'Çelişkili',

});

const ratings = Object.freeze({
    [Rating.VERY_LOW]: 'Çok Zayıf',
    [Rating.LOW]: 'Zayıf',
    [Rating.NORMAL]: 'Normal',
    [Rating.GOOD]: 'İyi',
    [Rating.VERY_GOOD]: 'Çok İyi'
})


const warmingTypes = Object.freeze({
    [WarmingType.NATURAL_GAS]: 'Doğalgaz',
    [WarmingType.STOVE]: 'Soba',
    [WarmingType.ELECTRIC_HEATER]: 'Elektrikli Isıtıcı',
});

const genders = Object.freeze({
    [Gender.MAN]: 'Erkek',
    [Gender.WOMAN]: 'Kadın',
});

const budgets = Object.freeze({
    [BudgetType.BILL]: 'Fatura',
    [BudgetType.INCOME]: 'Gelir',
    [BudgetType.EXPENSE]: 'Gider',
});


export const statusList = toArray(statuses);
export const warmingList = toArray(warmingTypes);
export const ratingList = toArray(ratings);
export const genderList = toArray(genders);
export const budgetList = toArray(budgets);

function toArray(dict) {
    var array = [];
    var key;
    for (var key in dict)
        array.push({ label: dict[key], value: parseInt(key) });
    return array;
}


const exampleFamily = new Family();
const member = new Member();
member.name = 'abc';
var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';

for (var i = 0; i < 10; i++) {
    exampleFamily.members.push(member);
    exampleFamily.needs.push('selam')
}
exampleFamily.images.push(base64Icon);
exampleFamily.clerks = ['selam', 'naber'];

export { exampleFamily };