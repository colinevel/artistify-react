/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../models/Artist");
const albumModel = require("../models/Album");

const getAverageRate = async idArtist => {
  // use agregate features @ mongo db to code this feature
  // https://docs.mongodb.com/manual/aggregation/
};

router.get("/artists", async (req, res, next) => {
  // let's determine the sort query object ()
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  // console.log("sort and limit artists ? > ", sortQ, limitQ);
  artistModel
    .find({})
    .populate("style")
    .sort(sortQ)
    .limit(limitQ)
    .then(async artists => {
      const artistsWithRatesAVG = await Promise.all(
        artists.map(async res => {
          // AVG : things are getting tricky here ! :) 
          // the following map is async, updating each artist with an avg rate
          const copy = res.toJSON(); // copy the artist object (mongoose response are immutable)
          // copy.avg = await getAverageRate(res._id); // get the average rates fr this artist

          copy.isFavorite =
            req.user && req.user.favorites.artists.includes(copy._id.toString());
          return copy; // return to the mapped result array
        })
      );

      res.json({ artists: artistsWithRatesAVG }); // send the augmented result back to client
    })
    .catch(next);
});


router.get("/artists/:id", (req, res, next) => {
  artistModel
  .findById(req.params.id)
  .then(({ name, style, description, isBand }) => {
    console.log("this is the edited artist", { name, style, description, isBand });
    res.status(200).json({ name, style, description, isBand })
    })
    .catch(err => {
    console.error(err);
    res.status(500).json(err);
  })
});

router.get("/filtered-artists", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.post("/artists", (req, res) => {
  const {name, style, description, isBand} = req.body;
  console.log({name, style, description, isBand});
  artistModel
  .create({name, style, description, isBand})
  .then(() => {
    res.status(200).json({name, style, description, isBand})
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  })
});

router.patch("/artists/:id", async (req, res, next) => {
  const { name, style, description, isBand } = req.body;
  console.log("this is the reqbody", req.body);
  const updatedArtist = {
    name, style, description, isBand
  }
  artistModel
    .findByIdAndUpdate(req.params.id, updatedArtist, { new: true })
    .then((artist) => {
    console.log(artist);
    res.status(200).json(artist)
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/artists/:id", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

module.exports = router;
