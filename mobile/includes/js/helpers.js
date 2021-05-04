
const getAbilitiesAttributes = () => {
    return pc.abilities;
};

const getSavingThrowsAttributes = () => {
    return getAbilitiesAttributes().map(ability => { return `${ability}_save`; });
};

const getSkillsAttributes = () => {
    return pc.skills.map(skill => { return skill.attribute; });
};

const getProficientRolls = (rollType, callback) => {
    const getRollAttributes = {
        savingThrows: () => {
            return getSavingThrowsAttributes().map(ability => { return `${ability}_prof`; });
        },
        skills: () => {
            return getSkillsAttributes().map(skill => { return `${skill}_prof`; });
        }
    };
    if(!getRollAttributes[rollType]) return [];
    const proficiencyAttributes = getRollAttributes[rollType]();
    getAttrs(proficiencyAttributes, attributes => {
        const proficientRolls = Object.keys(attributes).filter(attribute => { return String(attributes[attribute]).includes('@{pb}'); }).map(attribute => { return attribute.replace(/attr_|_prof/g,''); });
        callback(proficientRolls);    
    });
};

const getProficientSavingThrows = callback => {
    if(typeof callback !== 'function') return;
    getProficientRolls('savingThrows', callback);
};

const getProficientSkills = callback => {
    if(typeof callback !== 'function') return;
    getProficientRolls('skills', callback);
};

const getAllSkills = callback => {
    if(typeof callback !== 'function') return;
    return callback(getSkillsAttributes());
};

const ifEmptyRepeating = (repeatingSection, callback) => {
    if(typeof callback !== 'function') return;
    getSectionIDs(repeatingSection, ids => {
        if(ids.length === 0) callback();
    });
};
const addEditablePills = (list, pills) => {
    let update = {};
    pills.forEach(pill => {
        const id = generateRowID();
        update[`repeating_${list}_${id}_linked_roll`] = pill.roll;
        update[`repeating_${list}_${id}_linked_name`] = pill.name;
        update[`repeating_${list}_${id}_linked_modifier`] = pill.modifier;
    });
    setAttrs(update);
};
const refreshRepeatingPills = (list, source) => {
    //First we remove all existing items to avoid dealing with ordering:
    getSectionIDs(list, ids => {
        ids.forEach(id => {
            removeRepeatingRow(`repeating_${list}_${id}`);
        });
        //Than we add all chosen itens
        const chosenToggles = source.map(entry => { return `${entry}_chosen`});
        getAttrs(chosenToggles, attributes => {
            const pills = [];
            Object.keys(attributes).filter(attribute => { return attributes[attribute] == 1; }).forEach(chosen => {
                const parentAttribute = chosen.replace('_chosen','');
                pills.push({
                    roll: `@{${parentAttribute}_roll}`,
                    name: parentAttribute,
                    modifier: `@{${parentAttribute}_bonus}`
                });   
            });
            addEditablePills(list, pills);
        });
    });
};
const populateProficientEntries = (list, getProficient) => {
    ifEmptyRepeating(list, () => {
        getProficient(entries => {
            let update = {};
            entries.forEach(entry => {
                update[`${entry}_chosen`] = 1;
            })
            setAttrs(update, {silent: true}, () => {
                refreshRepeatingPills(list, entries);
            });
        });
    });
};
const populateProficientSavingThrows = () => {
    populateProficientEntries('chosen-saving-throws', getProficientSavingThrows);
};
const populateProficientSkills = () => {
    populateProficientEntries('chosen-skills', getAllSkills);
};
const openRollModal = (roll, callback) => {
    refreshRollModal(roll, () => {
        if(callback) setAttrs({roll_modal: JSON.stringify(roll)}, callback);
        else setAttrs({roll_modal: JSON.stringify(roll)});  
    });  
};
const refreshRollModal = (details, callback) => {
    const rollBonusIfNotEmpty = (details.bonus != 0) ? ` + ${details.bonus}` : '';
    const fakeD20 = Math.round(Math.random() * 19 + 1);
    const update = {
        roll_modal_name: details.name,
        roll_modal_bonus: details.bonus,
        roll_modal_roll: `&{template:mobile-simple} {{rname=${details.name}}} {{desc=1d20${rollBonusIfNotEmpty}}} {{mod=${details.bonus}}} {{r1=[[1d20${rollBonusIfNotEmpty}]]}}`
    };
    if(callback) setAttrs(update, callback)
    else setAttrs(update)  
};
const closeRollModal = (callback) => {
    if(callback) setAttrs({roll_modal: HIDDEN_MODAL}, callback);
    else setAttrs({roll_modal: HIDDEN_MODAL});
};
const getID = value => {
    const regexp = /-.{19}(?=_)|-.{19}$/g;
    const valueAsString = String(value);
    const match = valueAsString.match(regexp);
    return (match) ? match.join() : "";
};
const setCurrentPage = (page, callback) => {
    if(typeof callback === 'function')
        setAttrs({ current_page: page }, callback);
    else {
        setAttrs({ current_page: page });
    }
};