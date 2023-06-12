// SUNUCUYU BU DOSYAYA KURUN

// SERVERINIZI EXPORT EDİN {}
const express = require("express");
const server = express();
const userModel = require("./users/model");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Server is running!");
});
// POST
server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    } else {
      const inserted = await userModel.insert({ name: name, bio: bio });
      res.status(201).json(inserted);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});
//GET//
server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});
server.get("/api/users/:id", async (req, res) => {
  try {
    const idUser = await userModel.findById(req.params.id);
    if (idUser) {
      res.json(idUser);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});
// DELETE :id
server.delete("/api/users/:id", async (req, res) => {
  try {
    const idUser = await userModel.remove(req.params.id);
    if (idUser) {
      res.json(idUser);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});
// PUT :id
server.put("/api/users/:id", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    } else {
      const updatedData = await userModel.update(req.params.id, req.body);
      if (updatedData) {
        res.json(updatedData);
      } else {
        res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});
module.exports = server;
