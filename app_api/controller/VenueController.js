var mongoose = require('mongoose');
var Venue = mongoose.model("venue");

const createResponse = function (res, status, content) {
    res.status(status).json(content);
}

var converter = (function () {
    var earthRadius = 6371; // km
    var radian2Kilometer = function (radian) {
        return parseFloat(radian * earthRadius);
    };
    var kilometer2Radian = function (distance) {
        return parseFloat(distance / earthRadius);
    };
    return {
        radian2Kilometer, kilometer2Radian,
    }
})();

const listVenues = async function (req, res) {
    try {
        const venues = await Venue.find({}).exec();
        if (venues.length > 0) {
            createResponse(res, 200, venues);
        } else {
            createResponse(res, 200, { "status": "Civarda mekan yok" });
        }
    } catch (error) {
        createResponse(res, 404, error);
    }
};

const addVenue = async function (req, res) {
    try {
        const venue = await Venue.create({
            name: req.body.name,
            address: req.body.address,
            rating: req.body.rating || 0,
            foodanddrink: req.body.foodanddrink,
            coordinates: [req.body.lat, req.body.long],
            hours: req.body.hours,
            comments: req.body.comments || []
        });
        createResponse(res, 201, venue);
    } catch (err) {
        createResponse(res, 400, err);
    }
};

const getVenue = async function (req, res) {
    try {
        const venue = await Venue.findById(req.params.venueid).exec();
        if (!venue) {
            createResponse(res, 404, { status: "böyle bir mekan yok" });
        } else {
            createResponse(res, 200, venue);
        }
    }
    catch (err) {
        createResponse(res, 404, { status: "böyle bir mekan yok" });
    }
};

const updateVenue = async function (req, res) {
    try {
        const venue = await Venue.findByIdAndUpdate(
            req.params.venueid,
            req.body,
            { new: true }
        );
        if (!venue) {
            createResponse(res, 404, { status: "Böyle bir mekan yok!" });
        } else {
            createResponse(res, 201, venue);
        }
    } catch (err) {
        createResponse(res, 400, err);
    }
};

const deleteVenue = async function (req, res) {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.venueid);
        if (!venue) {
            createResponse(res, 404, { status: "Böyle bir mekan yok!" });
        } else {
            createResponse(res, 200, { status: venue.name + " isimli mekan silindi" });
        }
    } catch (err) {
        createResponse(res, 404, { status: "Böyle bir mekan yok!" });
    }
};

module.exports = {
    listVenues,
    addVenue,
    getVenue,
    updateVenue,
    deleteVenue
}