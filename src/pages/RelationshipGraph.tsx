
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



class RelationshipGraph{
    parent_map: Map<Person, Person[]> = new Map();
    child_map: Map<Person, Person[]> = new Map();
    addPerson(person: Person){
        //takes a person object and adds the person and their relationships to the map
        if (person.parents){
            this.parent_map.set(person, person.parents);
            person.parents.forEach((folk) => {
                const children = this.child_map.get(folk)
                if (children === undefined){
                    this.child_map.set(folk, [person])
                }
                else{
                    children.push(person)
                    this.child_map.set(folk, children)
                }
            });
        }
    }

    getParents(person: Person){
        return this.parent_map.get(person);
    }

    getChildren(person: Person){
        return this.child_map.get(person);
    }
}


// Function to generate random persons
function generateRandomPerson(id: number): Person {
    const firstNames = ['John', 'Jane', 'Alex', 'Chris', 'Kate'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'];

    return {
        id,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        born: Math.floor(Math.random() * 50) + 1970, 
        died: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 50) + 1971,
        img: `none`,
        gender: Math.random() < 0.5 ? 'M' : 'F',
        parents = ['Jospeh Smith', 'Emma SMith'] // Assign parents for even IDs
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

// Run the test
testAddingPersons();


export default RelationshipGraph