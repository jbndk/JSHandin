import {Router} from "express"
import facade from "../facades/DummyDB-Facade";
import {ApiError} from "../errors/apiError"

const router = Router();

import authMiddleware from "../middleware/basic-auth";
router.use(authMiddleware)

router.get("/all", async (req, res) => {
    const friends = await facade.getAllFriends();
    const friendsDTO = friends.map(friend => {
      const {firstName, lastName, email} = friend
      return {firstName, lastName, email}
    })
    res.json(friendsDTO)
  } )

  router.get('/byemail/:email', async (req, res) => {
    const friend = await facade.getFrind(req.params.email);
    res.json(friend)
  } )

  router.get("/findby-username/:userid", async (req, res, next) => {
    const userId = req.params.userid;
    try {
      const friend = await facade.getFrind(userId);
      if (friend == null) {
        throw new ApiError("User not found", 404)
      }
      const { firstName, lastName, email } = friend;
      const friendDTO = { firstName, lastName, email }
      res.json(friendDTO);
    } catch (err) {
      next(err)
    }
  })

  router.get("/me", async (req:any, res, next) => {
    const userId = req.credentials.userName;
    try {
      const friend = await facade.getFrind(userId);
      if (friend == null) {
        throw new ApiError("User not found", 404)
      }
      const { firstName, lastName, email } = friend;
      const friendDTO = { firstName, lastName, email }
      res.json(friendDTO);
    } catch (err) {
      next(err)
    }
  })
  
  export default router;