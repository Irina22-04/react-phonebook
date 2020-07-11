export const alphabet = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т",
    "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Э", "Ю", "Я"];

const findChildren = (element, structure) => {
    const {id} = element;
    return structure
        .filter((otherElement) => otherElement.parent === id)
        .map((otherElement) => ({...otherElement, children: findChildren(otherElement, structure)}))
};

export const makeStairs = (structureStore) => {
    const {structure: oldStructure, ...withoutStructure} = structureStore;
    const rootElement = oldStructure.find((element) => !element.parent);
    if(rootElement){
        const structure = {...rootElement, children: findChildren(rootElement, oldStructure)};
        return {...withoutStructure, structure}
    }
    return structureStore
};

