var mongoose = require('mongoose');
var Venue = mongoose.model("venue");

const createResponse = function (res, status, content) {
    res.status(status).json(content);
};

// Ortalama puan hesaplama fonksiyonu
const calculateLastRating = function (venue, isDeleted) {
    let sum = 0;
    let count = venue.comments.length;

    if (count === 0 && isDeleted) {
        venue.rating = 0;
    } else if (count > 0) {
        venue.comments.forEach(c => sum += c.rating);
        venue.rating = Math.ceil(sum / count);
    }
    venue.save();
};

// Yorum Ekle (POST)
const addComment = async function (req, res) {
    try {
        const venue = await Venue.findById(req.params.venueid)
            .select("comments")
            .exec();

        if (!venue) {
            createResponse(res, 404, { status: "Mekan bulunamadı" });
            return;
        }

        venue.comments.push({
            author: req.body.author,
            rating: req.body.rating,
            text: req.body.text
        });

        venue.save().then(v => {
            calculateLastRating(v, false);
            createResponse(res, 201, v.comments[v.comments.length - 1]);
        });
    } catch (err) {
        createResponse(res, 400, { status: "Yorum eklenemedi" });
    }
};

// Yorum Getir (GET)
const getComment = async function (req, res) {
    try {
        const venue = await Venue.findById(req.params.venueid)
            .select("name comments")
            .exec();

        if (!venue) {
            createResponse(res, 404, { status: "Mekan bulunamadı" });
            return;
        }

        const comment = venue.comments.id(req.params.commentid);
        if (!comment) {
            createResponse(res, 404, { status: "Yorum bulunamadı" });
            return;
        }

        const response = {
            venue: {
                name: venue.name,
                id: req.params.venueid
            },
            comment: comment
        };
        createResponse(res, 200, response);
    } catch (error) {
        createResponse(res, 404, { status: "Mekan bulunamadı" });
    }
};

// Yorum Güncelle (PUT)
const updateComment = async function (req, res) {
    try {
        const venue = await Venue.findById(req.params.venueid)
            .select("comments")
            .exec();

        if (!venue) {
            createResponse(res, 404, { status: "Mekan bulunamadı" });
            return;
        }

        const comment = venue.comments.id(req.params.commentid);
        if (!comment) {
            createResponse(res, 404, { status: "Yorum bulunamadı" });
            return;
        }

        comment.set(req.body);

        venue.save().then(() => {
            calculateLastRating(venue, false);
            createResponse(res, 201, comment);
        });
    } catch (err) {
        createResponse(res, 400, { status: "Yorum güncellenemedi" });
    }
};

// Yorum Sil (DELETE)
const deleteComment = async function (req, res) {
    try {
        const venue = await Venue.findById(req.params.venueid)
            .select("comments")
            .exec();

        if (!venue) {
            createResponse(res, 404, { status: "Mekan bulunamadı" });
            return;
        }

        const comment = venue.comments.id(req.params.commentid);
        if (!comment) {
            createResponse(res, 404, { status: "Yorum bulunamadı" });
            return;
        }

        comment.deleteOne();

        venue.save().then(() => {
            calculateLastRating(venue, true);
            createResponse(res, 200, { status: "Yorum silindi" });
        });
    } catch (err) {
        createResponse(res, 404, { status: "Yorum bulunamadı" });
    }
};

module.exports = {
    addComment,
    getComment,
    updateComment,
    deleteComment
}

