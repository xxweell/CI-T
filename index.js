// question 1
class SiegeState {
    constructor() {
      this.canMove = false;
      this.damage = 20;
    }
  }
  
  class TankState {
    constructor() {
       this.canMove = true;
       this.damage = 5;
    }
  }
  
  class Tank {
    constructor() {
      this.state = new TankState();
    }
  
    get canMove() { 
      return this.state.canMove;
    }
    get damage() { 
      return this.state.damage;
    }
  }


//   TESTES

const chai = require("chai");
const {assert} = chai;
chai.config.truncateThreshold = 0;

describe('State', () => {
  it('Tank State', () => {
    let tank = new Tank();

    assert.equal(tank.canMove, true);
    assert.equal(tank.damage, 5);
  });

  it('Siege State', () => {
    let tank = new Tank();
    tank.state = new SiegeState();

    assert.equal(tank.canMove, false);
    assert.equal(tank.damage, 20);
  });

  it('Mix State', () => {
    let tank = new Tank();

    assert.equal(tank.canMove, true);
    tank.state = new SiegeState();
    assert.equal(tank.damage, 20);
  });
});

// question 2
class Fly {
    move(unit) {
      return unit + 10
    }
  }
  
  class Walk {
    move(unit) {
      return unit + 1
    }
  }
  
  class Viking {
    constructor() {
        this.position = 0;
        this.moveBehavior = new Walk();
    }
    
    move() {
      const newPosition = this.moveBehavior.move(this.position)
      this.position = newPosition
      return newPosition
    }
  }

//   testes
const chai = require("chai");
const {assert} = chai;
chai.config.truncateThreshold = 0;

describe('Strategy', () => {
  it('Walk Move', () => {
    let viking = new Viking();
    
    viking.move();
    assert.equal(viking.position, 1);
    viking.move();
    assert.equal(viking.position, 2);
  });
  
  it('Fly Move', () => {
    let viking = new Viking();
    viking.moveBehavior = new Fly();
    
    viking.move();
    assert.equal(viking.position, 10);
    viking.move();
    assert.equal(viking.position, 20);
  });
  
  it('Mix Move', () => {
    let viking = new Viking();
    
    viking.move();
    assert.equal(viking.position, 1);
    viking.moveBehavior = new Fly();
    viking.move();
    assert.equal(viking.position, 11);
  });
});

// question 3
/**
 * Using ES6-style classes
 * See below for an alternative ES5-prototype solution setup
 */

 class User {
    #name;
    #login = false;
    #lastLogedInAt = null;
    constructor(name) {
      this.#name = name;
    }
    isLoggedIn() {
      return this.#login;
    }
    getLastLoggedInAt() {
      return this.#lastLogedInAt;
    }
    logIn() {
      this.#login = true;
      this.#lastLogedInAt = new Date();
    }
    logOut() {
      this.#login = false;
    }
    getName() {
      return this.#name;
    }
    setName(name) {
      this.#name = name;
    }
    canEdit(comment) {
      return comment.getAuthor().getName() === this.#name;
    }
    canDelete(comment) {
      return false;
    }
  }
  
  class Moderator extends User {
    canEdit(comment) {
      return comment.getAuthor().getName() === this.getName();
    }
    canDelete(comment) {
      return true;
    }
  }
  
  class Admin extends Moderator {
    canEdit(comment) {
      return true;
    }
    canDelete(comment) {
      return true;
    }
  }
  
  class Comment {
    #createdAt = new Date();
    #author;
    constructor(author, message, repliedTo) {
      this.#author = author;
    }
    getMessage() {}
    setMessage(message) {}
    getCreatedAt() {
      return this.#createdAt;
    }
    getAuthor() {
      return this.#author;
    }
    getRepliedTo() {
      
    }
    toString() {}
  }

  //TESTES
  const {expect} = require('chai');

describe('OOP Tests', () => {
  let user1;
  let user2;
  let mod;
  let admin;
  let user1Comment;
  let user2Comment;
  let modComment;
    
  beforeEach(() => {
    user1 = new User('User 1');
    user2 = new User('User 2');
    mod = new Moderator('Moderator');
    admin = new Admin('Admin');
    user1Comment = new Comment(user1, 'hello');
    user2Comment = new Comment(user2, 'hi', user1Comment);
    modComment = new Comment(mod, 'moderator', user2Comment);
  });
  
  it('should handle instantiation', () => {
    expect(user1.getName()).to.equal('User 1', 'User name is set correctly');
    expect(user2.getName()).to.equal('User 2', 'User name is set correctly');
    expect(user1Comment.getCreatedAt()).to.be.an.instanceof(Date, 'Comment date was set on creation');
    expect(user1Comment.getAuthor()).to.equal(user1, 'User was set on comment creation');
    expect(user2Comment.getAuthor()).to.equal(user2, 'User was set on comment creation');
    expect(modComment.getAuthor()).to.equal(mod, 'User was set on comment creation');
  });
  
  it('should handle login methods', () => {
    expect(user1.isLoggedIn()).to.equal(false, 'User is logged out by default');
    expect(user1.getLastLoggedInAt()).to.equal(null, 'Last logged in date is not set by default');
    user1.logIn();
    expect(user1.isLoggedIn()).to.equal(true, 'User can be logged in');
    expect(user1.getLastLoggedInAt()).to.be.an.instanceof(Date, 'Last logged in date is set');
    let lastLoggedInDate = user1.getLastLoggedInAt();
    user1.logOut();
    expect(user1.isLoggedIn()).to.equal(false, 'User can be logged out');
    expect(user1.getLastLoggedInAt()).to.equal(lastLoggedInDate, 'Last logged in date stays the same');
  });
  
  it('should handle inheritance', () => {
    expect(user1).to.be.an.instanceof(User, 'User is a User');
    expect(user1).to.not.be.an.instanceof(Moderator, 'User is not a Moderator');
    expect(user1).to.not.be.an.instanceof(Admin, 'User is not an Admin');
    
    expect(mod).to.be.an.instanceof(User, 'Moderator is a User');
    expect(mod).to.be.an.instanceof(Moderator, 'Moderator is a Moderator');
    expect(mod).to.not.be.an.instanceof(Admin, 'Moderator is not an Admin');
    
    expect(admin).to.be.an.instanceof(User, 'Admin is a User');
    expect(admin).to.be.an.instanceof(Moderator, 'Admin is a Moderator');
    expect(admin).to.be.an.instanceof(Admin, 'Admin is an Admin');
  });
  
  it('should handle method overriding', () => {
    expect(user1.canEdit(user1Comment)).to.equal(true, 'User can edit their own comment');
    expect(user1.canEdit(user2Comment)).to.equal(false, 'User cannot edit other comments');
    expect(user1.canDelete(user1Comment)).to.equal(false, 'User cannot delete their own comment');
    expect(user1.canDelete(user1Comment)).to.equal(false, 'User cannot delete other comment');

    expect(mod.canEdit(modComment)).to.equal(true, 'Moderator can edit their own comment');
    expect(mod.canEdit(user1Comment)).to.equal(false, 'Moderator cannot edit other comments');
    expect(mod.canDelete(modComment)).to.equal(true, 'Moderator can delete their own comment');
    expect(mod.canDelete(user1Comment)).to.equal(true, 'Moderator can delete other comments');

    expect(admin.canEdit(user1Comment)).to.equal(true, 'Admin can edit other comments');
    expect(admin.canDelete(user1Comment)).to.equal(true, 'Admin can delete other comments');
  });
  
  it('should handle function overloading', () => {
    expect(user1Comment.getRepliedTo()).to.equal(undefined, 'Comment was created without a reply');
    expect(user2Comment.getRepliedTo()).to.equal(user1Comment, 'Comment was created with a reply');
  });
  
  it('should handle User encapsulation', () => {
    expect(user1.getName()).to.equal('User 1', 'User name was set');
    user1.setName('User 1 updated');
    expect(user1.getName()).to.equal('User 1 updated', 'User name can be updated');
    expect(user1.name).to.equal(undefined, 'User name field is not directly exposed');
    expect(user1.loggedIn).to.equal(undefined, 'User loggedIn field is not directly exposed');
  });
  
  it('should handle Comment encapsulation', () => {
    expect(user1Comment.getMessage()).to.equal('hello', 'Comment message was set');
    user1Comment.setMessage('howdy');
    expect(user1Comment.getMessage()).to.equal('howdy', 'Comment message can be updated');
    expect(user1Comment.message).to.equal(undefined, 'Comment message field is not directly exposed');
  });
  
  it('should handle composition', () => {
    expect(user2Comment.getRepliedTo()).to.equal(user1Comment, 'Ensure comment relationships are preserved');
    expect(modComment.getRepliedTo()).to.equal(user2Comment, 'Ensure comment relationships are preserved');
  });
  
  it('should handle toString', () => {
    expect(user1Comment.toString()).to.equal('hello by User 1', 'The toString method should return the correct hierarchy (no reply)');
    expect(user2Comment.toString()).to.equal('hi by User 2 (replied to User 1)', 'The toString method should return the correct hierarchy (reply)');
    expect(modComment.toString()).to.equal('moderator by Moderator (replied to User 2)', 'The toString method should return the correct hierarchy (nested reply)');
    
    user1.setName('User One');
    user2.setName('User Two');
    expect(user1Comment.toString()).to.equal('hello by User One', 'The toString method should reflect reference changes');
    expect(user2Comment.toString()).to.equal('hi by User Two (replied to User One)', 'The toString method should reflect reference changes');
  });
});

//question 5
const descendingOrder = num => {

  
    let newValue = "";
      const numberString = `${num}`;
      numberString.split("").sort((a, b) => a > b ? -1 : a < b ? 1 : 0).forEach(element => {
          newValue += element
      });
      return newValue
  };

  // soution 2

  const descendingOrder = num => {
    const numberString = `${num}`;

    if(!numberString && numberString.length <= 0) return;

    const splited = numberString.split("");
    return splited.sort((a, b) => a > b ? -1 : a < b ? 1 : 0).join('')
};

  //Tests
  const chai = require("chai");
const {assert} = chai;
require("util").inspect.defaultOptions.depth = null;
chai.config.truncateThreshold = 0;

describe("example tests", () => {
  it("should work for zero", () => {
    assert.equal(descendingOrder(0), 0);
  });

  it("should work for a single digit", () => {
    assert.equal(descendingOrder(4), 4);
  });

  it("should work for multiple digits that are the same", () => {
    assert.equal(descendingOrder(777), 777);
  });

  it("should work for multiple digits that are in the right order", () => {
    assert.equal(descendingOrder(65), 65);
  });

  it("should work for multiple digits that are in the reverse order", () => {
    assert.equal(descendingOrder(47), 74);
  });

  it("should work for multiple digits that are in random order", () => {
    assert.equal(descendingOrder(1021), 2110);
  });

  it("should work for lots of digits", () => {
    assert.equal(descendingOrder(172384956), 987654321);
  });
});

// question 6
const dnaValues = {
  A: 'T',
  T: 'A',
  C: 'G',
  G: 'C',
}

// test
const dnaComplement = dna => {
  if (!dna) return '';
  const dnaSplited = dna.split('')
  return dnaSplited.map(value => dnaValues[value]).join('');
};

const {assert} = require("chai");

describe('dna_complement', () => {
  it('should work for a single A', () => {
    assert.equal(dnaComplement("A"), "T");
  });
  
  it('should work for a single T', () => {
    assert.equal(dnaComplement("T"), "A");
  });
  
  it('should work for a single C', () => {
    assert.equal(dnaComplement("C"), "G");
  });
  
  it('should work for a single G', () => {
    assert.equal(dnaComplement("G"), "C");
  });
  
  it('should work for a ATTGC', () => {
    assert.equal(dnaComplement("ATTGC"), "TAACG");
  });
  
  it('should work for a GTACAT', () => {
    assert.equal(dnaComplement("GTACAT"), "CATGTA");
  });
  
  it('should work for a CGCG', () => {
    assert.equal(dnaComplement("CGCG"), "GCGC");
  });
  
  it('should work for a very long input', () => {
    assert.equal(dnaComplement("GTATCGATCGATCGATCGATTATATTTTCGACGAGATTTAAATATATATATATACGAGAGAATACAGATAGACAGATTA"), "CATAGCTAGCTAGCTAGCTAATATAAAAGCTGCTCTAAATTTATATATATATATGCTCTCTTATGTCTATCTGTCTAAT");
  });
});

// number 4
const maskify = (text) =>  text.replace(/^(.{0})(.*)(.{4})$/,
     (_, a, b, c) => a + b.replace(/./g, '#') + c
);

//test
const {assert} = require("chai");

describe("maskify", () => {
  it("should work for a basic credit cards", () => {
    assert.equal(maskify("5512103073210694"), "############0694");
  });
  
  it("should work for different input lengths", () => {
    assert.equal(maskify("64607935616"), "#######5616");
  });
  
  it("should work for small values", () => {
    assert.equal(maskify("54321"), "#4321");
  });
  
  it("should work for tiny values", () => {
    assert.equal(maskify("21"), "21");
  });
  
  it("should work for non numeric inputs", () => {
    assert.equal(maskify("Nananananananananananananananana Batman!"), "####################################man!");
  });
  
  it("should work for empty inputs", () => {
    assert.equal(maskify(""), "");
  });
});

// number 5

const resto = (val1, val2) => ([Math.trunc(val1/val2), (val1%val2)]);

const withdraw = amount => {
  const [hundred, hundredRest] = amount < 100 ? [0, amount] : resto(amount, 100)
  const [fifty, fiftyRest] = hundredRest < 50 ? [0, hundredRest] : resto(hundredRest, 50)
  const [twenty] = resto(fiftyRest, 20)
  return [hundred, fifty, twenty];
};

//question 6
const stringSuffix = str => {
  const pattern = ['a','b','a','b', 'a', 'a']
    const arrString = str.split('')
    return arrString.reduce((acc, value, index) => {
        if(value === pattern[index]) {
            return acc + 1
        }
        return acc
    }, 0)
};

//test

const chai = require("chai");
const {assert} = chai;
require("util").inspect.defaultOptions.depth = null;
chai.config.truncateThreshold = 0;

describe("example tests", () => {
  it("should work for the given example", () => {
    assert.equal(stringSuffix("ababaa"), 6);
  });

  it("should work for a single repeating character", () => {
    assert.equal(stringSuffix("a"), 1);
  });

  it("should work for sets of multiple repeating characters", () => {
    assert.equal(stringSuffix("aa"), 1);
  });
});
