
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

const people: Person[] = [
    { id: 1, firstName: 'John', lastName: 'Smith', born: 1940, died: 2010, img: '', gender: 'M' },
    { id: 2, firstName: 'Mary', lastName: 'Smith', born: 1945, died: 2015, img: '', gender: 'F' },
    { id: 3, firstName: 'James', lastName: 'Smith', born: 1965, died: 0, img: '', gender: 'M' },
    { id: 4, firstName: 'Linda', lastName: 'Smith', born: 1968, died: 0, img: '', gender: 'F' },
    { id: 5, firstName: 'Robert', lastName: 'Johnson', born: 1942, died: 2012, img: '', gender: 'M' },
    { id: 6, firstName: 'Alice', lastName: 'Johnson', born: 1970, died: 0, img: '', gender: 'F' },
    { id: 7, firstName: 'Michael', lastName: 'Brown', born: 1945, died: 2010, img: '', gender: 'M' },
    { id: 8, firstName: 'Christopher', lastName: 'Brown', born: 1975, died: 0, img: '', gender: 'M' },
    { id: 9, firstName: 'Emma', lastName: 'Smith', born: 1990, died: 0, img: '', gender: 'F' },
    { id: 10, firstName: 'Sarah', lastName: 'Davis', born: 1967, died: 0, img: '', gender: 'F' },
    { id: 11, firstName: 'Noah', lastName: 'Smith', born: 1993, died: 0, img: '', gender: 'M' },
    { id: 12, firstName: 'Sophia', lastName: 'Johnson', born: 1995, died: 0, img: '', gender: 'F' },
    { id: 13, firstName: 'Ethan', lastName: 'Johnson', born: 1998, died: 0, img: '', gender: 'M' },
    { id: 14, firstName: 'Isabella', lastName: 'Brown', born: 2000, died: 0, img: '', gender: 'F' },
    { id: 15, firstName: 'Jessica', lastName: 'Miller', born: 1978, died: 0, img: '', gender: 'F' },
    { id: 16, firstName: 'Liam', lastName: 'Brown', born: 2005, died: 0, img: '', gender: 'M' },
    { id: 17, firstName: 'Olivia', lastName: 'Brown', born: 2007, died: 0, img: '', gender: 'F' },
    { id: 18, firstName: 'Ava', lastName: 'Williams', born: 1998, died: 0, img: '', gender: 'F' },
    { id: 19, firstName: 'Mark', lastName: 'Williams', born: 1965, died: 0, img: '', gender: 'M' },
    { id: 20, firstName: 'Mason', lastName: 'Smith', born: 2025, died: 0, img: '', gender: 'M' },
    { id: 21, firstName: 'Jacob', lastName: 'Smith', born: 2028, died: 0, img: '', gender: 'M' },
    { id: 22, firstName: 'Lucas', lastName: 'Smith', born: 2022, died: 0, img: '', gender: 'M' },
    { id: 23, firstName: 'Mia', lastName: 'Taylor', born: 1994, died: 0, img: '', gender: 'F' },
    { id: 24, firstName: 'Charlotte', lastName: 'Johnson', born: 2003, died: 0, img: '', gender: 'F' },
    { id: 25, firstName: 'Daniel', lastName: 'Clark', born: 1992, died: 0, img: '', gender: 'M' }
];

// Now assign relationships after the people array is created
people[2].parents = [people[0], people[1]]; // James' parents are John and Mary
people[3].parents = [people[0], people[1]]; // Linda's parents are John and Mary
people[6].parents = [people[7], people[2]]; // Christopher's parents are Michael and Mary (remarried)
people[9].parents = [people[2], people[10]]; // Emma's parents are James and Sarah
people[10].parents = [people[2], people[10]]; // Noah's parents are James and Sarah
people[11].parents = [people[5], people[4]]; // Sophia's parents are Robert and Linda
people[12].parents = [people[5], people[4]]; // Ethan's parents are Robert and Linda
people[14].parents = [people[8], people[15]]; // Isabella's parents are Christopher and Jessica
people[16].parents = [people[8], people[15]]; // Liam's parents are Christopher and Jessica
people[17].parents = [people[8], people[15]]; // Olivia's parents are Christopher and Jessica
people[18].parents = [people[19], people[10]]; // Ava's parents are Mark and Sarah (remarried)
people[20].parents = [people[9], people[18]]; // Mason's parents are Emma and Ava
people[21].parents = [people[9], people[18]]; // Jacob's parents are Emma and Ava
people[22].parents = [people[11], people[23]]; // Lucas' parents are Noah and Mia
people[24].parents = [people[12], people[25]]; // Charlotte's parents are Sophia and Daniel


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

     getParentChunk(person: Person, chunkSize: number){
        const chunk: Person[] = [person];
        let next: number = 0

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

// Run the test
testAddingPersons();

/**
 * test values:
 * 
 * 10000: about 15 ms
 * 100000: about 150 ms
 * 1000000: about 1500 ms
 */


