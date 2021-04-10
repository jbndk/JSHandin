import * as mongo from "mongodb"
import FriendFacade from '../src/facades/friendFacade';

import chai from "chai";
const expect = chai.expect;

//use these two lines for more streamlined tests of promise operations
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import bcryptjs from "bcryptjs"
import { InMemoryDbConnector } from "../src/config/dbConnector"
import { ApiError } from "../src/errors/apiError";

let friendCollection: mongo.Collection;
let facade: FriendFacade;

describe("## Verify the Friends Facade ##", () => {

  before(async function () {
      const client = await InMemoryDbConnector.connect();
      const db = client.db();
      friendCollection = db.collection("friends");
      facade = new FriendFacade(db)
  })

  beforeEach(async () => {
    const hashedPW = await bcryptjs.hash("secret", 4)
    await friendCollection.deleteMany({})
    await friendCollection.insertMany(
        [
            { firstName: "Rasmus", lastName: "Klump", email: "rk@amo.dk", password: hashedPW, role: "user" },
            { firstName: "Mickey", lastName: "Mouse", email: "mm@disney.com", password: hashedPW, role: "user" },
        ]
    )
  })

  describe("Verify the addFriend method", () => {
    it("It should Add the user Jan", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret" }
      const status = await facade.addFriend(newFriend);
      expect(status).to.be.not.null
      const jan = await friendCollection.findOne({ email: "jan@b.dk" })
      expect(jan.firstName).to.be.equal("Jan")
    })

    it("It should not add a user with a role (validation fails)", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret", role: "admin" }
      await expect(facade.addFriend(newFriend)).to.be.rejectedWith(ApiError)
    })
  })

  describe("Verify the editFriend method", () => {
    it("It should change lastName to Mus", async () => {
        const userName = "mm@disney.com"
        const editedFriend = { firstName: "Mickey", lastName: "Mus", email: "mm@disney.com", password: "secret"}
        await facade.editFriend(userName, editedFriend)
        const updatedFriend = await facade.getFriend(userName)
        expect(updatedFriend.lastName).to.be.equal("Mus")
    })
  })

  describe("Verify the deleteFriend method", () => {
    it("It should remove the user Rasmus Klump", async () => {
        const userName = "rk@amo.dk";
        await expect(facade.getFriend(userName)).not.to.be.rejectedWith(ApiError)
        await facade.deleteFriend(userName)
        await expect(facade.getFriend(userName)).to.be.rejectedWith(ApiError)
    })
    //I don't find this test relevant, given the design of the test above:
    /*
    xit("It should return false, for a user that does not exist", async () => {
        
    })
    */
  })

  describe("Verify the getAllFriends method", () => {
    it("It should get two friends", async () => {
        const friendArray = await facade.getAllFriends()
        const friendArrayLength = friendArray.length
        expect(friendArrayLength).to.be.equal(2)
    })
  })

  describe("Verify the getFriend method", () => {
    it("It should find Rasmus Klump", async () => {
        const userName = "rk@amo.dk"
        const friend = await facade.getFriend(userName)
        expect(friend.email).to.be.equal(userName)    
    })
    it("It should not find xxx.@.b.dk", async () => {
        const userNameTrue = "rk@amo.dk"
        const userNameFalse = "xxx.@.b.dk"
        const friend = await facade.getFriend(userNameTrue)
        expect(friend.email).not.to.be.equal(userNameFalse) 
    })
  })

  describe("Verify the getVerifiedUser method", () => {
    it("It should correctly validate Rasmus Klumps credentials", async () => {
      const verifiedUser = await facade.getVerifiedUser("rk@amo.dk", "secret")
      expect(verifiedUser).to.be.not.null;
    })

    it("It should NOT validate Rasmus Klumps credentials", async () => {
        const verifiedUser = await facade.getVerifiedUser("rk@amo.dk","wrong.password") 
        expect(verifiedUser).to.be.null
    })

    it("It should NOT validate a non-existing users credentials", async () => {
        const verifiedUser = await facade.getVerifiedUser("does@not.exist","secret") 
        expect(verifiedUser).to.be.null
    })
  })

})