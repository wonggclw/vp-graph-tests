
interface Person {
    id: number;
    firstName: string;
    lastName: string;
    born: number;
    died: number;
    img: string;
    gender: 'M' | 'F';
    parents?:Person[]
}

// Creating the family tree
const grandparent1: Person = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    born: 1940,
    died: 0,
    img: "url_to_image_1",
    gender: "M",
    parents: []
};

const grandparent3: Person = {
    id: 3,
    firstName: "Robert",
    lastName: "Smith",
    born: 1942,
    died: 0,
    img: "url_to_image_3",
    gender: "M",
    parents: []
};

const grandparent4: Person = {
    id: 4,
    firstName: "Linda",
    lastName: "Smith",
    born: 1946,
    died: 0,
    img: "url_to_image_4",
    gender: "F",
    parents: []
};

// Creating parents
const parent1: Person = {
    id: 5,
    firstName: "Michael",
    lastName: "Doe",
    born: 1970,
    died: 0,
    img: "url_to_image_5",
    gender: "M",
    parents: [grandparent1]
};

const parent2: Person = {
    id: 6,
    firstName: "Jessica",
    lastName: "Doe",
    born: 1975,
    died: 0,
    img: "url_to_image_6",
    gender: "F",
    parents: [grandparent3, grandparent4]
};

// Creating the child (root)
const child: Person = {
    id: 7,
    firstName: "Emily",
    lastName: "Doe",
    born: 2000,
    died: 0,
    img: "url_to_image_7",
    gender: "F",
    parents: [parent1, parent2]
};

const familyTree: Person[] = [
    grandparent1,
    grandparent3,
    grandparent4,
    parent1,
    parent2,
    child
];


class RelationshipGraph{
    parent_map: Map<Person, Person[]> = new Map();
    child_map: Map<Person, Person[]> = new Map();
    addPerson(person: Person){
        //takes a person object and adds the person and their relationships to the map
        if (person.parents){
            this.parent_map.set(person, person.parents);
            person.parents.forEach((parent) => {
                const children = this.child_map.get(parent)
                if (children === undefined){
                    this.child_map.set(parent, [person])
                }
                else{
                    children.push(person)
                    this.child_map.set(parent, children)
                }
            });
        }
    }

     getParentChunk(person: Person, generations: number){
        const chunk: Person[] = [person];
        let next: number = 0
        const chunkSize = (2**generations) - 1;

        while (chunk.length < chunkSize){
            const curPerson = chunk[next];
            const parents = this.parent_map.get(curPerson);
            if (!parents){
                null;
            }
            else{
                parents.forEach((parent) =>{
                    chunk.push(parent);
                })
            }
            next += 1;
            if (next > chunk.length - 1){
                return chunk;
            }
        }

        return chunk;
    }

    getParents(person: Person){
        const parents = this.parent_map.get(person);
        if (!parents){
            return []
        }
        return parents
    }

    getChildren(person: Person){
        return this.child_map.get(person);
    }
}



//function to check whether it is populating correctly

// Function to generate random persons
function generateRandomPerson(id: number): Person {
    const firstNames = ['John', 'Jane', 'Alex', 'Chris', 'Kate'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'];

    const parent1: Person = {
        id: 12314321,
        firstName: 'ben',
        lastName: 'Christensen',
        born: 1979,
        died: 1321,
        img: 'none',
        gender: 'M'
    }

    const parent2: Person = {
        id: 12341234213,
        firstName: 'Christensen',
        lastName: 'Ben',
        born: 1784,
        died: 1783,
        img: 'none',
        gender: 'M'
    }

    return {
        id,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        born: Math.floor(Math.random() * 50) + 1970, 
        died: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 50) + 1971,
        img: `none`,
        gender: Math.random() < 0.5 ? 'M' : 'F',
        parents: [parent1, parent2] // Assign parents for even IDs
    };
}

// Test function
async function testAddingPersons() {
    const graph = new RelationshipGraph();
    const startTime = performance.now();

    for (let i = 1; i <= 10000; i++) {
        const person = generateRandomPerson(i);
        graph.addPerson(person);
    }

    const endTime = performance.now();
    console.log(`Time taken to add 10,000 persons: ${(endTime - startTime).toFixed(2)} milliseconds`);
}

function testGetChunk(){
    const graph = new RelationshipGraph();
    familyTree.forEach((person) => {
        graph.addPerson(person);
    })
    const chunk = graph.getParentChunk(child, 3)
    console.log(chunk.length);
    console.log(chunk);
}

testGetChunk();

/**
 * test values:
 * 
 * 10000: about 15 ms
 * 100000: about 150 ms
 * 1000000: about 1500 ms
 */


