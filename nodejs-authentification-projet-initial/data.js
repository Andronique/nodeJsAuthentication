const bcrypt = require('bcrypt');

let defaultHashedPw;

const utilisateurs = [];

(async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    defaultHashedPw = await bcrypt.hash('1234', salt);
    
    utilisateurs.push({
      id: 1,
      nom: "Lois Musole",
      email: 'louis@drcmind.com',
      password: defaultHashedPw,
    });

    utilisateurs.push({
      id: 2,
      nom: "Amani Bisimwa",
      email: 'amani@drcmind.com',
      password: defaultHashedPw,
    });

  } catch (error) {
    console.error('Error hashing password:', error);
  }
})();

module.exports = {
  cours: [
    {
      titre: "Guide complet sur mongoose",
      desc: `Dans ce cours vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/mongoose.jpg",
    },
    {
      titre: "Javascript moderne",
      desc: `Vous apprendrez dans ce cours les notions fondamentales du langage de programmation
           Javascript`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/js.jpg",
    },
    {
      titre: "MongoDB pour débutants",
      desc: `Gérer vos données avec la base de données non relationnelle MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/mongoDb.jpg",
    },
    {
      titre: "Cours Git et Github pour débutants",
      desc: `Dans ce cours vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/gitgithub.jpg",
    },
    {
      titre: "NodeJs pour débutants",
      desc: `Dans ce cours vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/nodejs.jpg",
    },
    {
      titre: "Créer une API avec NodeJs et MongoDB",
      desc: `Dans ce cours vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/restapi.jpg",
    },
    {
      titre: "Créer des applications NodeJs Sécurisées",
      desc: `Dans ce cours vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/safenodejs.jpg",
    },
    {
      titre: "Cloner Youtube avec Flutter Web",
      desc: `Dans ce cours vous apprendrez les notions fondamentales sur 
          l'utilisation de la bibliothèque mongoose pour gérer la base de données MongoDB`,
      lienVideo: "public/video/mongoose.mp4",
      lienThumbnail: "/images/thumbnail/youtubeclone.jpg",
    },
  ],
  utilisateurs,
};
