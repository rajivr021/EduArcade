const gamesData = [
    {
        id: 1,
        title: "Need for Speed",  // Racing game
        banner: "https://www.shutterstock.com/image-vector/science-day-600nw-71929141.jpg",
        rating: 4.5,
        isNew: true,
        isPopular: true
    },
    {
        id: 2,
        title: "Mario Kart",  // Popular racing game
        banner: "https://images-cdn.ubuy.co.in/635e1ab163d3200ab81be27a-boy-super-mario-backdrop-5x3-feet-kids.jpg",
        rating: 4.8,
        isNew: false,
        isPopular: true
    },
    {
        id: 3,
        title: "Candy Crush",  // Popular puzzle game
        banner: "https://media.istockphoto.com/id/908952990/vector/illustration-of-the-treasure-cave-with-a-waterfall-and-chest.jpg?s=612x612&w=0&k=20&c=3Zye5Ts8V5q_UbvvCzjhRxQmqWdt0vo1p6sz8R5uXMc=",
        rating: 4.7,
        isNew: false,
        isPopular: true
    },
    {
        id: 4,
        title: "Subway Surfers",  // Endless runner
        banner: "https://play-lh.googleusercontent.com/U9klmXBtoQ1T1hXh5L3Yu_DAEpJFneSHop68AXGxmcTqxhkPBOk2W0ODU-n68SlE1-s",
        rating: 4.6,
        isNew: false,
        isPopular: true
    },
    {
        id: 5,
        title: "NBA 2K",  // Basketball game
        banner: "https://img.freepik.com/premium-vector/cheerful-little-kids-playing-basketball-with-big-orange-ball-fun-game-playground_376504-1206.jpg",
        rating: 4.4,
        isNew: true,
        isPopular: false
    },
    {
        id: 6,
        title: "Typing Master",  // Typing game
        banner: "https://image.winudf.com/v2/image/Y29tLnRpbnlsYWJwcm9kdWN0aW9ucy50cmFpbnNfaWNvbl8xNTM1OTk0MTAxXzAyNg/icon.png?fakeurl=1&h=240&type=webp",
        rating: 3.9,
        isNew: false,
        isPopular: false
    },
    {
        id: 7,
        title: "Monument Valley",  // Puzzle game
        banner: "https://static.vecteezy.com/system/resources/previews/014/008/164/non_2x/maze-game-template-in-camping-theme-for-kids-free-vector.jpg",
        rating: 4.9,
        isNew: true,
        isPopular: true
    },
    {
        id: 8,
        title: "Asphalt 9",  // Racing game
        banner: "https://img.freepik.com/premium-vector/maze-game-kids-labyrinth-conundrum-color-vector-illustration_1057-172713.jpg",
        rating: 4.3,
        isNew: false,
        isPopular: true
    },
    {
        id: 9,
        title: "Tetris",  // Classic puzzle game
        banner: "https://m.media-amazon.com/images/I/71RuXB-P8lL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.7,
        isNew: false,
        isPopular: true
    },
    {
        id: 10,
        title: "GTA V",  // Open-world racing/action
        banner: "https://static.vecteezy.com/system/resources/thumbnails/050/358/009/small/a-slowmotion-closeup-as-the-flag-gently-waves-in-the-wind-the-nighttime-sky-and-bright-lights-creating-a-picturesque-backdrop-for-the-end-of-a-exhilarating-race-photo.jpg",
        rating: 4.9,
        isNew: false,
        isPopular: true
    },
    {
        id: 11,
        title: "Wordscapes",  // Word puzzle
        banner: "https://mir-s3-cdn-cf.behance.net/projects/404/00773e95928985.613e3b9fe8ca2.jpg",
        rating: 4.2,
        isNew: false,
        isPopular: false
    },
    {
        id: 12,
        title: "Sudoku",  // Number puzzle
        banner: "/gameImg/abcus.png",
        rating: 4.0,
        isNew: false,
        isPopular: false
    },
    {
        id: 13,
        title: "PUBG Mobile",  // Battle royale
        banner: "https://cdn.splashmath.com/curriculum_uploads/images/playables/num_seq_photo_farm_2_gm.png",
        rating: 4.8,
        isNew: false,
        isPopular: true
    },
    {
        id: 14,
        title: "Clash of Clans",  // Strategy game
        banner: "https://cdn2.momjunction.com/wp-content/uploads/static-content/illustration_images/fun_english_learning_games_and_activities_for_kids_illustration.jpg.webp",
        rating: 4.6,
        isNew: false,
        isPopular: true
    },
    {
        id: 15,
        title: "Angry Birds",  // Puzzle/arcade
        banner: "https://media.istockphoto.com/id/512397594/vector/scattered-sweet-candies.jpg?s=612x612&w=0&k=20&c=_fdp-W2zVevzWj85SkLG4vOBdKZ7jJMvt-2KpHkcFFY=",
        rating: 4.5,
        isNew: false,
        isPopular: true
    },
    {
        id: 16,
        title: "FIFA Mobile",  // Sports game
        banner: "https://www.janelbreitenstein.com/wp-content/uploads/2019/02/Learn-Through-Play-7-Skills-You-Can-Teach-Through-Fun-Activities-02-1-1024x648.png",
        rating: 4.4,
        isNew: true,
        isPopular: true
    },
    {
        id: 17,
        title: "Temple Run",  // Endless runner
        banner: "https://triviacrack.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FbackgroundBanner.3ffd0ab6.webp&w=3840&q=75",
        rating: 4.3,
        isNew: false,
        isPopular: false
    },
    {
        id: 18,
        title: "8 Ball Pool",  // Sports game
        banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJgNcKS537VP-eIzpT_9uwAVnJrI-teaub8E-jXpcG1QH9-YGbrd7VbKvFoloM4jG-GDU&usqp=CAU",
        rating: 4.5,
        isNew: false,
        isPopular: true
    },
    {
        id: 19,
        title: "Ludo King",  // Board game
        banner: "https://media.istockphoto.com/id/521305404/vector/matching-game-for-children-animals-and-favorite-food.jpg?s=612x612&w=0&k=20&c=Xsyj6K7diJPfOy_NNUPWDvFcYs4ldKRmLLnsa-TL54I=",
        rating: 4.2,
        isNew: false,
        isPopular: false
    },
    {
        id: 20,
        title: "Chess",  // Classic strategy
        banner: "https://img.gamemonetize.com/uc3t7rb989gp07i25otuohgk6hjifrrl/512x384.jpg",
        rating: 4.7,
        isNew: false,
        isPopular: true
    },
    {
        id: 21,
        title: "Forza Horizon",  // Racing
        banner: "https://www.shutterstock.com/image-vector/find-9-differences-game-children-600nw-2462072099.jpg",
        rating: 4.7,
        isNew: true,
        isPopular: true
    },
    {
        id: 22,
        title: "Minecraft",  // Sandbox
        banner: "/gameImg/MINECRAFTLOGO.jpg",
        rating: 4.9,
        isNew: false,
        isPopular: true
    },
    {
        id: 23,
        title: "Roblox",  // Sandbox
        banner: "https://m.media-amazon.com/images/I/A1Wl7nryBXL._SL500_.jpg",
        rating: 4.6,
        isNew: false,
        isPopular: true
    },
    {
        id: 24,
        title: "Call of Duty",  // FPS
        banner: "https://cdn.education.com/files/static/game-images/uppercase-letters-photoshoot-2022-12-13.jpg",
        rating: 4.8,
        isNew: true,
        isPopular: true
    },
    {
        id: 25,
        title: "Crossy Road",  // Arcade
        banner: "https://static.vecteezy.com/system/resources/previews/041/061/356/non_2x/crossword-quiz-game-grid-with-galaxy-space-planets-vector.jpg",
        rating: 4.2,
        isNew: false,
        isPopular: false
    },
    {
        id: 26,
        title: "Pokémon GO",  // AR
        banner: "https://i.pinimg.com/736x/61/cf/5d/61cf5d07056151f6122eba38beb04dfd.jpg",
        rating: 4.5,
        isNew: false,
        isPopular: true
    },
    {
        id: 27,
        title: "Fruit Ninja",  // Arcade
        banner: "https://static.vecteezy.com/system/resources/thumbnails/013/798/613/small_2x/the-view-of-playground-full-of-the-children-playing-on-it-vector.jpg",
        rating: 4.1,
        isNew: false,
        isPopular: false
    },
    {
        id: 28,
        title: "Clash Royale",  // Strategy
        banner: "https://m.media-amazon.com/images/I/81zEm7Wm8sL._UF1000,1000_QL80_.jpg",
        rating: 4.6,
        isNew: false,
        isPopular: true
    },
    {
        id: 29,
        title: "Brawl Stars",  // Action
        banner: "https://media.istockphoto.com/id/969053022/vector/educational-game-for-children-word-search-puzzle-kids-activity-summer-holidays-theme-learning.jpg?s=612x612&w=0&k=20&c=Ynuc5sILXtIJ2xtBssdhSSYeUMhdyp2uH34I56DrkIk=",
        rating: 4.4,
        isNew: true,
        isPopular: true
    },
    {
        id: 30,
        title: "Hill Climb Racing",  // Racing
        banner: "https://img.freepik.com/premium-vector/happy-kids-building-tower-with-colorful-blocks_150234-134259.jpg",
        rating: 4.0,
        isNew: false,
        isPopular: false
    },
    {
        id: 31,
        title: "Plants vs Zombies",  // Strategy
        banner: "https://m.media-amazon.com/images/I/71wWsC1FNjL._AC_UF1000,1000_QL80_.jpg",
        rating: 4.7,
        isNew: false,
        isPopular: true
    },
    {
        id: 32,
        title: "Among Us",  // Party
        banner: "https://static.vecteezy.com/system/resources/thumbnails/043/064/770/small/flat-style-family-board-game-for-children-kids-boardgame-with-green-map-game-steps-srat-and-finish-flowers-insects-ladybugs-and-grasshoppers-illustration-vector.jpg",
        rating: 4.3,
        isNew: false,
        isPopular: true
    },
    {
        id: 33,
        title: "Stumble Guys",  // Battle Royale
        banner: "https://as2.ftcdn.net/jpg/04/44/32/73/1000_F_444327300_YNdKVgCpB0tvsIGsepJopooKM6BWuynw.jpg",
        rating: 4.5,
        isNew: true,
        isPopular: true
    },
    {
        id: 34,
        title: "Real Racing 3",  // Racing
        banner: "https://img.freepik.com/premium-photo/kids-play-together-kindergarden-playroom-with-children_1029476-224968.jpg",
        rating: 4.4,
        isNew: false,
        isPopular: false
    },
    {
        id: 35,
        title: "Genshin Impact",  // RPG
        banner: "https://media.istockphoto.com/id/1288330715/vector/treasure-game-map-cartoon-tropical-island-map-showing-road-direction-to-pirate-gold-treasure.jpg?s=612x612&w=0&k=20&c=sYy7g1hkLwtqDErbpl2lrQItyvitxgY6AqTIY9s3LCk=",
        rating: 4.8,
        isNew: true,
        isPopular: true
    },
    {
        id: 36,
        title: "Doodle Jump",  // Arcade
        banner: "https://play-lh.googleusercontent.com/IsMxW_7EWIkNSuQ4f3tQXLsmXhK_gHebDz1sj5e7Mx1jWBlA3nehu-p3p4GgbvdIkmJY",
        rating: 4.1,
        isNew: false,
        isPopular: false
    },
    {
        id: 37,
        title: "Free Fire",  // Battle Royale
        banner: "https://img.freepik.com/premium-photo/cartoon-illustration-children-playing-slide-with-word-kids_1217673-181453.jpg",
        rating: 4.6,
        isNew: false,
        isPopular: true
    },
    {
        id: 38,
        title: "Hay Day",  // Farming
        banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwrJZDE7Z5f5xjRV_h15Vfs3KL7vorKcNnvQ&s",
        rating: 4.2,
        isNew: false,
        isPopular: false
    },
    {
        id: 39,
        title: "Jetpack Joyride",  // Arcade
        banner: "https://img.freepik.com/free-vector/purple-background-with-quiz-word-colorful-people_52683-126.jpg",
        rating: 4.0,
        isNew: false,
        isPopular: false
    },
    {
        id: 40,
        title: "Tomb Runner",  // Adventure
        banner: "https://i.ytimg.com/vi/fLtS5Ni7Dt8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDqMPjwXNfn9wFyuguqSWp8mHy6Mw",
        rating: 4.3,
        isNew: true,
        isPopular: false
    }
];

export default gamesData;