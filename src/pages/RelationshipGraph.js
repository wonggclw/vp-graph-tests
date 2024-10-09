var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RelationshipGraph = /** @class */ (function () {
    function RelationshipGraph() {
        this.parent_map = new Map();
        this.child_map = new Map();
    }
    RelationshipGraph.prototype.addPerson = function (person) {
        var _this = this;
        //takes a person object and adds the person and their relationships to the map
        if (person.parents) {
            this.parent_map.set(person, person.parents);
            person.parents.forEach(function (folk) {
                var children = _this.child_map.get(folk);
                if (children === undefined) {
                    _this.child_map.set(folk, [person]);
                }
                else {
                    children.push(person);
                    _this.child_map.set(folk, children);
                }
            });
        }
    };
    RelationshipGraph.prototype.getParents = function (person) {
        return this.parent_map.get(person);
    };
    RelationshipGraph.prototype.getChildren = function (person) {
        return this.child_map.get(person);
    };
    return RelationshipGraph;
}());
// Function to generate random persons
function generateRandomPerson(id) {
    var firstNames = ['John', 'Jane', 'Alex', 'Chris', 'Kate'];
    var lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'];
    var parent1 = {
        id: 12314321,
        firstName: 'ben',
        lastName: 'Christensen',
        born: 1979,
        died: 1321,
        img: 'none',
        gender: 'M'
    };
    var parent2 = {
        id: 12341234213,
        firstName: 'Christensen',
        lastName: 'Ben',
        born: 1784,
        died: 1783,
        img: 'none',
        gender: 'M'
    };
    return {
        id: id,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        born: Math.floor(Math.random() * 50) + 1970,
        died: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 50) + 1971,
        img: "none",
        gender: Math.random() < 0.5 ? 'M' : 'F',
        parents: [parent1, parent2] // Assign parents for even IDs
    };
}
// Test function
function testAddingPersons() {
    return __awaiter(this, void 0, void 0, function () {
        var graph, startTime, i, person, endTime;
        return __generator(this, function (_a) {
            graph = new RelationshipGraph();
            startTime = performance.now();
            for (i = 1; i <= 10000; i++) {
                person = generateRandomPerson(i);
                graph.addPerson(person);
            }
            endTime = performance.now();
            console.log("Time taken to add 10,000 persons: ".concat((endTime - startTime).toFixed(2), " milliseconds"));
            return [2 /*return*/];
        });
    });
}
// Run the test
testAddingPersons();
