const pc = {
    abilities: [
        'strength',
        'dexterity',
        'constitution',
        'intelligence',
        'wisdom',
        'charisma'
    ],
    skills: [
        {name:'acrobatics', attribute:'acrobatics', ability:'dexterity'},
        {name:'animal handling', attribute:'animal_handling', ability:'wisdom'},
        {name:'arcana', attribute:'arcana', ability:'intelligence'},
        {name:'athletics', attribute:'athletics', ability:'strength'},
        {name:'deception', attribute:'deception', ability:'charisma'},
        {name:'history', attribute:'history', ability:'intelligence'},
        {name:'insight', attribute:'insight', ability:'wisdom'},
        {name:'intimidation', attribute:'intimidation', ability:'charisma'},
        {name:'investigation', attribute:'investigation', ability:'intelligence'},
        {name:'medicine', attribute:'medicine', ability:'wisdom'},
        {name:'nature', attribute:'nature', ability:'intelligence'},
        {name:'perception', attribute:'perception', ability:'wisdom'},
        {name:'performance', attribute:'performance', ability:'charisma'},
        {name:'persuasion', attribute:'persuasion', ability:'charisma'},
        {name:'religion', attribute:'religion', ability:'intelligence'},
        {name:'sleight of hand', attribute:'sleight_of_hand', ability:'dexterity'},
        {name:'stealth', attribute:'stealth', ability:'dexterity'},
        {name:'survival', attribute:'survival', ability:'wisdom'}
    ],
    childPages: [
        'saving-throws',
        'skills'
    ]
};