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

class RelationshipGraph{
    private parent_map: Map<string, Set<string>>;
    private child_map: Map<string, Set<string>>;
    private id_map: Map<string, Person>;
    

    public constructor(){
        this.parent_map = new Map();
        this.child_map = new Map();
        this.id_map = new Map();
    }
    
    /*
    * Adds another parent to a person, updates the child and parent map.
    *
    */
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

    // adds another child to a person
    //updates both the child and parent map
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

    //gets a person object from an id
    public getPerson(id: string){
        return this.id_map.get(id);
    }

    /*
    * Gets a chunk of people in the ancestry direction. 
    * person - specifices the root of the tree
    * generations - the number of generations you want. 1 generation gets parents, 2, grandparents etc.
    *
    * returns a list of Person objects that starts with the root and goes to each generation, top to bottom.
    * 
    * ex. [root, parent1, parent2, parent1 parents, parent2 parents, etc.]
    * 
    * if generations = 1 then it will return a list with the child and its parents
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

    /*
    * Works the same as getParenChunk, but works in the opposite direction
    * getting the children instead of the parents
    * 
    * generations = 1 will give one set of children.
    *
    */
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


    //returns a list of the ids of the parent of a person
    public getParentsId(person: Person){
        return this.parent_map.get(person.id);
    }

    //returns a lsit of the ids of the child of a person.
    public getChildrenId(person: Person){
        return this.child_map.get(person.id);
    }

    //lets you just grab the parents of a person, returns them as a list of two person objects
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

    //lets you grab the children of a person, returns them as a list of person objects.
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

    /*
    * Adds people to the graph based on links, takes in a 
    * list of links and a list of people, and then populates
    * the graph based on the links.
    * 
    * (The method of putting data in the graph is still up for change based
    * on how the API call data is received)
    *
    */
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

    /*
    * Prints the three maps, used for testing.
    *
    */
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


