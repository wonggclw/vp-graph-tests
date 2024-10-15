/*

How do the API requests come in. How do the relations work. They specify a type, and then
reference the two people in that type fo relation. goes from person1 -> person 2

*/


interface Link {
    id: number;
    type: 'Couple' | 'ParentChild';
    person1: number;
    person2: number;
}

interface Person {
    id: string;
    sortKey: number;
    firstName: string;
    lastName: string;
    born: number;
    died: number;
    img: string;
    gender: 'M' | 'F';
}

// Creating the family tree
const grandparent1: Person = {
    id: "1",
    sortKey: 7,
    firstName: "John",
    lastName: "Doe",
    born: 1940,
    died: 0,
    img: "url_to_image_1",
    gender: "M"
};

const grandparent3: Person = {
    id: "3",
    sortKey: 9,
    firstName: "Robert",
    lastName: "Smith",
    born: 1942,
    died: 0,
    img: "url_to_image_3",
    gender: "M"
};

const grandparent4: Person = {
    id: "4",
    sortKey: 10,
    firstName: "Linda",
    lastName: "Smith",
    born: 1946,
    died: 0,
    img: "url_to_image_4",
    gender: "F"
};

// Creating parents
const parent1: Person = {
    id: "5",
    sortKey: 3,
    firstName: "Michael",
    lastName: "Doe",
    born: 1970,
    died: 0,
    img: "url_to_image_5",
    gender: "M"
};

const parent2: Person = {
    id: "2",
    sortKey: 4,
    firstName: "Jessica",
    lastName: "Doe",
    born: 1975,
    died: 0,
    img: "url_to_image_6",
    gender: "F"
};

// Creating the child (root)
const child: Person = {
    id: "7",
    sortKey: 1,
    firstName: "Emily",
    lastName: "Doe",
    born: 2000,
    died: 0,
    img: "url_to_image_7",
    gender: "F"
};

const familyTree: Person[] = [
    grandparent1,
    grandparent3,
    grandparent4,
    parent1,
    parent2,
    child
];

// Test people for the family tree
const people: Person[] = [
    // Grandparents (Generation 3)
    { id: "1", sortKey: 1, firstName: "George", lastName: "Doe", born: 1930, died: 0, img: "url_to_image_1", gender: "M" },
    { id: "2", sortKey: 2, firstName: "Martha", lastName: "Doe", born: 1932, died: 0, img: "url_to_image_2", gender: "F" },
    { id: "3", sortKey: 3, firstName: "Edward", lastName: "Smith", born: 1935, died: 0, img: "url_to_image_3", gender: "M" },
    { id: "4", sortKey: 4, firstName: "Helen", lastName: "Smith", born: 1937, died: 0, img: "url_to_image_4", gender: "F" },

    // Parents (Generation 2)
    { id: "5", sortKey: 5, firstName: "Michael", lastName: "Doe", born: 1960, died: 0, img: "url_to_image_5", gender: "M" },
    { id: "6", sortKey: 6, firstName: "Jessica", lastName: "Doe", born: 1965, died: 0, img: "url_to_image_6", gender: "F" },

    // Root (Generation 1)
    { id: "7", sortKey: 7, firstName: "Emily", lastName: "Doe", born: 1990, died: 0, img: "url_to_image_7", gender: "F" },
];

// Test links for parent-child and couple relationships
const links: Link[] = [
    // Grandparents (Couple relationships)
    { id: 1, type: "Couple", person1: 0, person2: 1 }, // George & Martha Doe
    { id: 2, type: "Couple", person1: 2, person2: 3 }, // Edward & Helen Smith

    // Parents (ParentChild relationships)
    { id: 3, type: "ParentChild", person1: 0, person2: 4 }, // George is father of Michael
    { id: 4, type: "ParentChild", person1: 1, person2: 4 }, // Martha is mother of Michael
    { id: 5, type: "ParentChild", person1: 2, person2: 5 }, // Edward is father of Jessica
    { id: 6, type: "ParentChild", person1: 3, person2: 5 }, // Helen is mother of Jessica

    // Root (ParentChild relationships)
    { id: 7, type: "ParentChild", person1: 4, person2: 6 }, // Michael is father of Emily
    { id: 8, type: "ParentChild", person1: 5, person2: 6 }, // Jessica is mother of Emily
];

class RelationshipGraph{
    private parent_map: Map<string, Set<string>>;
    private child_map: Map<string, Set<string>>;
    private id_map: Map<string, Person>;
    

    public constructor(){
        this.parent_map = new Map();
        this.child_map = new Map();
        this.id_map = new Map();
    }
    
    public addParent(child: Person, parent: Person){
        this.id_map.set(child.id, child);
        this.id_map.set(parent.id, parent);
        let parentList = this.parent_map.get(child.id);
        if (!parentList || parentList === undefined){
            parentList = new Set();
        }
        parentList.add(parent.id);
        this.parent_map.set(child.id, parentList);
        console.log(this.parent_map.get(child.id));
    }

    public addChild(parent: Person, child: Person){
        this.id_map.set(child.id, child);
        this.id_map.set(parent.id, parent);
        let childList = this.child_map.get(parent.id);
        if (!childList){
            childList = new Set();
        }
        childList.add(child.id);
        this.child_map.set(parent.id, childList);
        console.log(this.child_map.get(parent.id));
    }

    // public addPerson(person: Person){
    //     //takes a person object and adds the person and their relationships to the map
    //     this.id_map.set(person.id, person);

    //     if (person.parents){
    //         let parentList: Set<string> = new Set();
    //         person.parents.forEach((item) => {
    //             this.id_map.set(item.id, item);
    //             parentList.add(item.id);
    //             const children = this.child_map.get(item.id);
    //             if (children === undefined){
    //                 this.child_map.set(item.id, new Set(person.id));
    //             }
    //             else{
    //                 children.add(person.id);
    //                 this.child_map.set(item.id, children);
    //             }
    //         });
    //         this.parent_map.set(person.id, parentList);
    //     }
    // }

    public getPerson(id: string){
        return this.id_map.get(id);
    }

    /*
    * Gets a chunk of people in the ancestry direction. 
    * person - specifices the root of the tree
    * generations - the number of generations you want. 1 generation gets parents, 2, grandparents etc.
    *
    * returns a list that starts with the root and goes to each generation, top to bottom.
    */
    public getParentChunk(person: Person, generations: number){
        const fullChunk: Person[] = [];
        let lastGen: Person[] = [person];
        let genCounter = 0;
        while (true){
            genCounter++;
            let temp: Person[] = [];
            lastGen.forEach((relative) => {

                temp = [...temp, ...this.getParents(relative)]
                fullChunk.push(relative);
            })
            lastGen = temp;
            if (genCounter === generations){
                break;
            }
        }
        return fullChunk;
    }

    public getChildChunk(person: Person, generations: number){
        const fullChunk: string[] = [person.id];
        let lastGen: Person[] = [person];
        let genCounter = 0;
        while (true){
            genCounter++;
            let temp: Person[] = [];
            lastGen.forEach((relative) => {
                temp = [...temp, ...this.getChildren(relative)]
                fullChunk.push(relative.id);
            })
            lastGen = temp;
            if (genCounter == generations){
                break;
            }
        }
        return fullChunk;
    }



    public getParentsId(person: Person){
        return this.parent_map.get(person.id);
    }

    public getChildrenId(person: Person){
        return this.child_map.get(person.id);
    }

    public getParents(person: Person){
        const parentList: Person[] = [];
        const parentIds = this.getParentsId(person);
        if (parentIds === undefined){
            return [];
        }
        else{
            parentIds.forEach((id) => {
                parentList.push(this.id_map.get(id)!)
            })
        }
        return parentList;
    }

    public getChildren(person: Person){
        const childList: Person[] = [];
        const childIds = this.getChildrenId(person);
        if (childIds === undefined){
            return [];
        }
        else{
            childIds.forEach((id => {
                childList.push(this.id_map.get(id)!);
            }))
        }
        return childList;
    }

    public populateLinks(people: Person[], links: Link[]){
        people.forEach((person) =>{
            this.id_map.set(person.id, person);
        })
        links.forEach((link) => {
            if (link.type === "ParentChild"){
                console.log("putting link together");
                const parent: Person = people[link.person1];
                const child: Person = people[link.person2];
                this.addParent(child, parent);
                this.addChild(parent, child);
            }
        })
    }

    public printPeople(){
        console.log("ID MAP {")
        this.id_map.forEach((person, id) => {
            console.log(id + ": " + person);
        })
        console.log("}")
        console.log("PARENT MAP {")
        this.parent_map.forEach((parent, person) => {
            console.log(person + ": " + parent);
        })
        console.log("}");
        console.log("CHILD MAP {")
        this.child_map.forEach((child, person) => {
            console.log(person + ": " + child);
        })
    }
}



//function to check whether it is populating correctly

// Function to generate random persons
// function generateRandomPerson(id: number): Person {
//     const firstNames = ['John', 'Jane', 'Alex', 'Chris', 'Kate'];
//     const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'];

//     const parent1: Person = {
//         id: "12314321",
//         firstName: 'ben',
//         lastName: 'Christensen',
//         born: 1979,
//         died: 1321,
//         img: 'none',
//         gender: 'M'
//     }

//     const parent2: Person = {
//         id: "12341234213",
//         firstName: 'Christensen',
//         lastName: 'Ben',
//         born: 1784,
//         died: 1783,
//         img: 'none',
//         gender: 'M'
//     }

//     return {
//         id,
//         firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
//         lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
//         born: Math.floor(Math.random() * 50) + 1970, 
//         died: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 50) + 1971,
//         img: `none`,
//         gender: Math.random() < 0.5 ? 'M' : 'F',
//         parents: [parent1, parent2] // Assign parents for even IDs
//     };
// }

// Test function
// async function testAddingPersons() {
//     const graph = new RelationshipGraph();
//     const startTime = performance.now();

//     for (let i = 1; i <= 10000; i++) {
//         const person = generateRandomPerson(i);
//         graph.addPerson(person);
//     }

//     const endTime = performance.now();
//     console.log(`Time taken to add 10,000 persons: ${(endTime - startTime).toFixed(2)} milliseconds`);
// }

// function testGetChunk(){
//     const graph = new RelationshipGraph();
//     familyTree.forEach((person) => {
//         graph.addPerson(person);
//     })
//     const chunk = graph.getParentChunk(child, 3)
//     console.log(chunk.length);
//     console.log(chunk);
// }

const graph = new RelationshipGraph();
graph.populateLinks(people, links);
graph.printPeople();
console.log(graph.getParentChunk(people[6], 3));

/**
 * test values:
 * 
 * 10000: about 15 ms
 * 100000: about 150 ms
 * 1000000: about 1500 ms
 */


