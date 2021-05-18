export const Status = Object.freeze({
    SUITABLE_TRACE: 0,
    SUITABLE_ONE_TIME: 1,
    NOT_SUITABLE: 2,
    WILL_BE_QUESTIONED: 3,
    CONFLICTING: 4
});

export const Comment = Object.freeze({
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
        this.members = null;
        this.rating = null;
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
        this.clerk = null;
        this.name = null;
        this.idNo = null;
        this.tel = null;
        this.rent = null;
        this.regDate = null;
        this.warmingType = null;
        this.address = null;
        this.city = null;
        this.district = null;
        this.town = null;
        this.street = null;
        this.nation = null;
        this.status = null;
        this.health = null;
        this.education = null;
        this.members = null;
        this.budgets = null;
        this.needs = null;
        this.notes = null;
    }
};


const statuses = Object.freeze({
    [Status.SUITABLE_TRACE]: 'Uygun (Takip)',
    [Status.SUITABLE_ONE_TIME]: 'Uygun (Tek Sefer)',
    [Status.NOT_SUITABLE]: 'Uygun Değil',
    [Status.WILL_BE_QUESTIONED]: 'Sorgulanacak',
    [Status.CONFLICTING]: 'Çelişkili',

});

const comments = Object.freeze({
    [Comment.VERY_LOW]: 'Çok Zayıf',
    [Comment.LOW]: 'Zayıf',
    [Comment.NORMAL]: 'Normal',
    [Comment.GOOD]: 'İyi',
    [Comment.VERY_GOOD]: 'Çok İyi'
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
export const commentList = toArray(comments);
export const genderList = toArray(genders);
export const budgetList = toArray(budgets);

function toArray(dict) {
    var array = [];
    var key;
    for (var key in dict)
        array.push({ label: dict[key], value: key });
    return array;
}
