
//Basic page navitagion
pc.childPages.forEach(page => {
    on(`clicked:show-${page}`, () => {
        setCurrentPage(page);
    });
});
on(`clicked:back`, () => {
    setCurrentPage('core');
});
let tabs = false;
on(`clicked:tabs`, () => {
    const value = (tabs) ? 'core' : 'tabs';
    setCurrentPage(value, () => {
        tabs = !tabs;
    });
});

//Populates home screen with proficient skills if lists are empty
on('sheet:opened', () => {
    populateProficientSavingThrows();
    populateProficientSkills();
});
//Setting toggles to show and hide Saving Throws and Skills on Home.
const toggleLists = [
    { list: 'chosen-saving-throws', source: getSavingThrowsAttributes() },
    { list: 'chosen-skills', source: getSkillsAttributes() }
];
toggleLists.forEach(toggleList => {
    toggleList.source.forEach(toggle => {
        on(`change:${toggle}_chosen`, event => {
            if(!event.newValue) return;
            refreshRepeatingPills(toggleList.list, toggleList.source);
        });
    });
});

//BOTTOM MODAL ON PLAYER ROLL
on('clicked:repeating_chosen-skills', event => {
    const id = getID(event.sourceAttribute);
    const nameAttribute = `repeating_chosen-skills_${id}_linked_name`;
    const bonusAttribute = `repeating_chosen-skills_${id}_linked_modifier`;
    const rollAttribute = `repeating_chosen-skills_${id}_linked_roll`;
    getAttrs([nameAttribute, bonusAttribute, rollAttribute], attributes => {
        openRollModal({name:attributes[nameAttribute],bonus:attributes[bonusAttribute],roll:attributes[rollAttribute]});
    });
});
on('clicked:repeating_chosen-saving-throws', event => {
    console.log(event);
});
on('clicked:close-modal', () => {
    closeRollModal();
});
on('change:roll_modal', event => {
    /*if(event.newValue && event.newValue !== HIDDEN_MODAL) {
        const rollDetails = JSON.parse(event.newValue);
        console.log(rollDetails);
    }*/
});

on('change:very_ugly_hack', eventinfo => {
    console.log('Now I am going to do something....');
});
on('change:roll_modal_done', eventinfo => {
    console.log('closing modal');
    closeRollModal();
})

//SAVING THROW BUTTON
on('clicked:show_saving_throws', event => {
    setCurrentPage('saving-throws');
});