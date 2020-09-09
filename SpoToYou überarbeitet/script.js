var listOfTracks =document.getElementById("listOfTracks");
var tracks = listOfTracks.children;
var textField = document.getElementById("enterUsername");
var convertButton = document.getElementById("convertButton");
var trackJson = [
    {"Name":"Kid Simius - The Flute Song - Paul Kalkbrenner Remix",
    "Img":"https://i.scdn.co/image/ab67616d00004851db0346d1f6790958e6d72349"},
    {"Name":"Tinush - Sandburg",
    "Img":"https://i.scdn.co/image/ab67616d00004851ca6e7842277879be9ab92e5f"},
    {"Name":"Axel Thesleff - I",
    "Img":"https://i.scdn.co/image/ab67616d00004851bf15c06fde1aa11d33f200c3"},
    {"Name":"Worakls - Salzburg",
    "Img":"https://i.scdn.co/image/ab67616d00004851956b1c265311e7b01794ef0b"},
    {"Name":"Feine Sahne Fischfilet - Komplett im Arsch - Verschnibbt & Zugenäht - Remix",
    "Img":"https://i.scdn.co/image/ab67616d000048515fcfa5926e98d6bda2906da9"},
    {"Name":"RÜFÜS DU SOL - Innerbloom",
    "Img":"https://i.scdn.co/image/ab67616d00004851bc488b39ebad6435086ce5b3"},
    {"Name":"Kölsch - 14",
    "Img":"https://i.scdn.co/image/ab67616d0000485196907e1b361f436730d9ca1f"},
    {"Name":"Klangkarussell - Hey Maria - Elderbrook Remix",
    "Img":"https://i.scdn.co/image/ab67616d000048518f83152c6b30d0e8514df2bc"},
    {"Name":"drkmnd - Meteor Shower",
    "Img":"https://i.scdn.co/image/ab67616d000048513b5c13a5b7c55735a52e5080"},
    {"Name":"xJK. - Fuse",
    "Img":"https://i.scdn.co/image/ab67616d00004851c8801bb2383bdc6012f14d73"},
    {"Name":"Kölsch - Loreley",
    "Img":"https://i.scdn.co/image/ab67616d0000485150ad3725762c0fda89081901"},
    {"Name":"Daft Punk - Veridis Quo",
    "Img":"https://i.scdn.co/image/ab67616d000048518b56fd8fb9f486c7ebd2303a"},
    {"Name":"Blue Wednesday - Cloud Dance",
    "Img":"https://i.scdn.co/image/ab67616d00004851d74d04bdd8ed893edb635df0"},
    {"Name":"Jerry Folk - Take Three",
    "Img":"https://i.scdn.co/image/ab67616d00004851146d5db75f467eb248d99a7e"},
    {"Name":"Haircuts for Men - 破壊の塔",
    "Img":"https://i.scdn.co/image/ab67616d000048513d14b6f84399a0353661c279"},
    {"Name":"Cospe - So Fresh",
    "Img":"https://i.scdn.co/image/ab67616d00004851ba66dfa1bbcaf5beb5953a15"},
    {"Name":"PowerPCME - Bluelight specials going on now!",
    "Img":"https://i.scdn.co/image/ab67616d0000485171e756eec48f9a88fd8fb872"},
    {"Name":"Lexy & K-Paul - Happy Zombies - Paul Kalkbrenner Remix",
    "Img":"https://i.scdn.co/image/ab67616d000048514fc40d6a791d8f87397a40b4"},
    {"Name":"Flamingo Star - Lost In Music",
    "Img":"https://i.scdn.co/image/ab67616d00004851f980bd1dd4752e53f1f52d13"},
    {"Name":"Kavinsky - Nightcall",
    "Img":"https://i.scdn.co/image/ab67616d00004851d6d8c2eaa1f9031b62f7a3f7"},
    {"Name":"Piotr Bejnar - Pachniesz Owocami (Frivolous Remix)",
    "Img":"https://i.scdn.co/image/ab67616d000048518da1cd52f1cd90e84c577638"},
    {"Name":"Stromae - Te Quiero - Paul Kalkbrenner Remix",
    "Img":"https://i.scdn.co/image/ab67616d000048510da814c6522fd9e9c74b3231"},
    {"Name":"Gaiser - Stringtest",
    "Img":"https://i.scdn.co/image/ab67616d00004851726184af5ef424f71ec53d07"},
    {"Name":"Mindchatter - Tough As Nails",
    "Img":"https://i.scdn.co/image/ab67616d000048518063dbd61cf1a5110822e3b6"},
    {"Name":"Tame Impala - The Less I Know The Better",
    "Img":"https://i.scdn.co/image/ab67616d000048519e1cfc756886ac782e363d79"},
    {"Name":"Nod One's Head - Up",
    "Img":"https://i.scdn.co/image/ab67616d000048514b6ee8a81ddd3ab3638115b8"},
    {"Name":"Grey Killer - Two Days",
    "Img":"https://i.scdn.co/image/ab67616d00004851c3bc04e6c8677b3dc540f070"},
    {"Name":"Two Feet - Pink Reprise",
    "Img":"https://i.scdn.co/image/ab67616d00004851d11188025d684f93f8cc1260"},
    {"Name":"Jay Pei - Dark Horse",
    "Img":"https://i.scdn.co/image/ab67616d00004851058c0b466fa1f81063ab7aa5"},
    {"Name":"Nico Stojan - Blue Hour",
    "Img":"https://i.scdn.co/image/ab67616d000048514c53fb306c0fcd433cac87b8"},
    {"Name":"Herr Lang - Zeit für Sommer",
    "Img":"https://i.scdn.co/image/ab67616d0000485186cc58132ed09c294dcb43b1"},
    {"Name":"Bondi - Land Of The Blind",
    "Img":"https://i.scdn.co/image/ab67616d000048511dddcf5275131223cd75e2de"},
    {"Name":"Zonderling - Sonderling (2016 Edit)",
    "Img":"https://i.scdn.co/image/ab67616d0000485105ff459876dcd4d96d6fddfd"},
    {"Name":"Federleicht - On The Streets - Kollektiv Turmstrasse Let Freedom",
    "Img":"https://i.scdn.co/image/ab67616d000048511ab7aa3ef00fb07e177a0aab"},
    {"Name":"Adana Twins - Strange - Acid Pauli & Nu Remix",
    "Img":"https://i.scdn.co/image/ab67616d00004851256301e2c11e8d685c09c3d1"},
    {"Name":"Emil Berliner - Meuterei",
    "Img":"https://i.scdn.co/image/ab67616d00004851daa9d2ea01a5b52e0b590eca"},
    {"Name":"Paul Kalkbrenner - Aaron",
    "Img":"https://i.scdn.co/image/ab67616d00004851d321448ad434d8177f422bcd"},
    {"Name":"Flow & Zeo - Chicago - Original Mix",
    "Img":"https://i.scdn.co/image/ab67616d00004851ea3fb4deae5b56a819beb0f8"},
    {"Name":"BeeGee - Bipolar Disorder",
    "Img":"https://i.scdn.co/image/ab67616d0000485173f643d00df3255349cc3dd6"},
    {"Name":"Marek Hemmann - Zunder",
    "Img":"https://i.scdn.co/image/ab67616d0000485178c21fa992406b5abd9e7592"},
    {"Name":"Subjoi - Flashing Lights",
    "Img":"https://i.scdn.co/image/ab67616d00004851f200701aa5c03632bb4d2eab"},
    {"Name":"Klangkarussell - Good To Go",
    "Img":"https://i.scdn.co/image/ab67616d00004851d3e34e8eacb7f5f3efd5ae71"},
    {"Name":"Cospe - Super 1",
    "Img":"https://i.scdn.co/image/ab67616d000048516fd29bca5cbfc47d4c97c80f"},
    {"Name":"Marek Hemmann - Gemini",
    "Img":"https://i.scdn.co/image/ab67616d00004851aac47acc633666daa8b3642f"},
    {"Name":"Nico Stojan - Oktoberfest",
    "Img":"https://i.scdn.co/image/ab67616d00004851c734b1d98640973d7296f262"},
    {"Name":"Oliver Koletzki - Hypnotized",
    "Img":"https://i.scdn.co/image/ab67616d0000485115be104fbc9ce0b6fb09b832"},
    {"Name":"Paul Kalkbrenner - Part Three",
    "Img":"https://i.scdn.co/image/ab67616d0000485146e22996d4ae55a8e12963f8"},
    {"Name":"Oliver Schories - Daily Routines",
    "Img":"https://i.scdn.co/image/ab67616d00004851befdd9f5c43235e064dfa78b"},
    {"Name":"NTO - La clé des champs",
    "Img":"https://i.scdn.co/image/ab67616d000048515e04fccc811e35cf8d8f4c61"},
    {"Name":"Stephan Bodzin - Singularity",
    "Img":"https://i.scdn.co/image/ab67616d00004851e46bbec6a5aeafe36a682a9e"},
    {"Name":"Maceo Plex - Solitary Daze",
    "Img":"https://i.scdn.co/image/ab67616d0000485148157756589331955944659c"},
    {"Name":"Kölsch - Grey",
    "Img":"https://i.scdn.co/image/ab67616d0000485196907e1b361f436730d9ca1f"},
    {"Name":"Joachim Pastor - Reykjavik",
    "Img":"https://i.scdn.co/image/ab67616d000048512e4389a130d66f1f968384b8"},
    {"Name":"Paul Kalkbrenner - Battery Park",
    "Img":"https://i.scdn.co/image/ab67616d00004851a95e48ee035e4b6f22c807cf"},
    {"Name":"Solee - Phoenix - Unique Repeat Remix",
    "Img":"https://i.scdn.co/image/ab67616d00004851f6abfee20bdfd918ba3d2eca"},
    {"Name":"GHEIST - Frequent Tendencies",
    "Img":"https://i.scdn.co/image/ab67616d00004851e96c9dbba16ba1a3d69b093b"},
    {"Name":"Joachim Pastor - Millenium",
    "Img":"https://i.scdn.co/image/ab67616d0000485192655834df8fc76516d6d5fb"},
    {"Name":"HVOB - Azrael",
    "Img":"https://i.scdn.co/image/ab67616d00004851ed8e50e55f356d1a86b66b69"},
    {"Name":"Marc Romboy - Atlas - Adriatique Remix",
    "Img":"https://i.scdn.co/image/ab67616d000048510dc574d9e17d6c617d12cfd7"},
    {"Name":"Worakls - Toi",
    "Img":"https://i.scdn.co/image/ab67616d00004851956b1c265311e7b01794ef0b"},
    {"Name":"Valsa - Happy Pink Pills - Marek Hemmann Remix",
    "Img":"https://i.scdn.co/image/ab67616d00004851df24990e7c3037f07ff7900c"},
    {"Name":"KlangTherapeuten - Perlentaucher - Melokind Remix",
    "Img":"https://i.scdn.co/image/ab67616d00004851674b9864804f109287026b80"},
    {"Name":"WYS - Snowman",
    "Img":"https://i.scdn.co/image/ab67616d0000485180db5f1340bc1170a22d8e2c"},
    {"Name":"AKA AKA - Narcotica",
    "Img":"https://i.scdn.co/image/ab67616d0000485163d4f2c689a96adfcccdcf31"},
    {"Name":"Oliver Schories - Brizzle",
    "Img":"https://i.scdn.co/image/ab67616d00004851befdd9f5c43235e064dfa78b"},
    {"Name":"Nostalgia 77 - Sleepwalker - Ambassadeurs Remix",
    "Img":"https://i.scdn.co/image/ab67616d000048516c001c26c097f14bf3c01919"},
    {"Name":"Karavelo - Cashmere",
    "Img":"https://i.scdn.co/image/ab67616d00004851cbdd4e8d1e013e8a260f3954"},
    {"Name":"Galcher Lustwerk - Life",
    "Img":"https://i.scdn.co/image/ab67616d00004851a5bc4bcb9f7eba331dbb17a4"},
    {"Name":"GentleBeatz - Heartbroken",
    "Img":"https://i.scdn.co/image/ab67616d00004851568453586dc3a06d9d30bd26"},
    {"Name":"quickly, quickly - Ghost",
    "Img":"https://i.scdn.co/image/ab67616d000048512ed1016cf3ad5e99934e2cb5"},
    {"Name":"Snaer. - Lime",
    "Img":"https://i.scdn.co/image/ab67616d000048513300b0bf71c55ebbc3f7db67"},
    {"Name":"Sebastian Kamae - Oxygen",
    "Img":"https://i.scdn.co/image/ab67616d000048511a86ef5442ae5fb42fc7d916"},
    {"Name":"emune - Like This - Instrumental",
    "Img":"https://i.scdn.co/image/ab67616d00004851d71ebcfd8f33fa9af57ddd46"},
    {"Name":"Bugseed - Speak Under",
    "Img":"https://i.scdn.co/image/ab67616d00004851af1147aebe53cd1ef3bf0481"},
    {"Name":"b l o o p r - Solemn Days",
    "Img":"https://i.scdn.co/image/ab67616d00004851a550ba00e36509c07d244561"},
    {"Name":"Ben Hauke - Get up to Get Down",
    "Img":"https://i.scdn.co/image/ab67616d0000485125a82e099993c5476de1881d"},
    {"Name":"Robot Orchestra - DustyRhodes",
    "Img":"https://i.scdn.co/image/ab67616d0000485103bc6789347974e9b3ba530f"},
    {"Name":"Mujo - Fujiyama Lights",
    "Img":"https://i.scdn.co/image/ab67616d0000485168c400c5dd3d511168b3debd"},
    {"Name":"David Chief - Mudd",
    "Img":"https://i.scdn.co/image/ab67616d000048514e33c9641431f6447ed7937b"},
    {"Name":"Cloudchord - Bopatron",
    "Img":"https://i.scdn.co/image/ab67616d00004851671219159f4a9580f20106a4"},
    {"Name":"Mono:Massive - Ghosty",
    "Img":"https://i.scdn.co/image/ab67616d000048514175805388e1c6de4a478686"},
    {"Name":"Living Room - David 116",
    "Img":"https://i.scdn.co/image/ab67616d00004851f970997d0290fb5b8d082972"},
    {"Name":"Gianni Brezzo - Holding On",
    "Img":"https://i.scdn.co/image/ab67616d00004851056ee070d0aabd00827f9035"},
    {"Name":"B-Side - Ode Nobunaga",
    "Img":"https://i.scdn.co/image/ab67616d000048510af16f48b89fc40d8217e5b0"},
    {"Name":"Erik Jackson - Moments",
    "Img":"https://i.scdn.co/image/ab67616d00004851a6db83d16e5d6826f517b9c0"},
    {"Name":"Lester Nowhere - Bubble Tea",
    "Img":"https://i.scdn.co/image/ab67616d00004851bf157337f6590e37a5cc205f"},
    {"Name":"Makaya McCraven - Suite for Artis Gilmore",
    "Img":"https://i.scdn.co/image/ab67616d0000485104797c8e537006de217bd8bd"},
    {"Name":"Mora - Golfi.",
    "Img":"https://i.scdn.co/image/ab67616d000048515ad946e22a350b2ba90490aa"},
    {"Name":"fantompower - free (at ease)",
    "Img":"https://i.scdn.co/image/ab67616d000048512d3c278c13cce42adf762b8d"},
    {"Name":"Nokiaa - Fool's Gold",
    "Img":"https://i.scdn.co/image/ab67616d00004851d2a3ca2e4fad5e66076cbb7a"},
    {"Name":"Blue Lab Beats - Pineapple",
    "Img":"https://i.scdn.co/image/ab67616d0000485111490d23afd4de0b8fa7ec49"},
    {"Name":"City Girl - Within Glowing Shadows",
    "Img":"https://i.scdn.co/image/ab67616d00004851113318cac53a283a1b3150fb"},
    {"Name":"Nightmares On Wax - The Othership",
    "Img":"https://i.scdn.co/image/ab67616d00004851b6bed7c9c8a7ca450f48bd67"},
    {"Name":"Potatohead People - No Sleep Til MTL",
    "Img":"https://i.scdn.co/image/ab67616d000048511cf0e6022d0c223b63885b07"},
    {"Name":"Ruck P - Destination",
    "Img":"https://i.scdn.co/image/ab67616d00004851e4e7e19c4d36d5047dc8b243"},
    {"Name":"Aver - Hauskatze",
    "Img":"https://i.scdn.co/image/ab67616d00004851cb37c584eade82154f12b0a9"},
    {"Name":"Bluestaeb - Last Minute Session Cut - The Outro",
    "Img":"https://i.scdn.co/image/ab67616d0000485147ebeada50944546caf181de"},
    {"Name":"Intalekt - Peace",
    "Img":"https://i.scdn.co/image/ab67616d000048514ab392fa17ccab155d4407d8"},
    {"Name":"Joe Armon-Jones - Mollison Dub",
    "Img":"https://i.scdn.co/image/ab67616d000048515586a8be702a1c9e9b7336b7"},
    {"Name":"Epifania - Headspace",
    "Img":"https://i.scdn.co/image/ab67616d0000485146310dc30157ea6cade90fdb"},
    {"Name":"Living Room - Feel the Sun - Original",
    "Img":"https://i.scdn.co/image/ab67616d00004851682766144feb36d114fd4a81"},
    {"Name":"Oatmello - Two Minutes Left",
    "Img":"https://i.scdn.co/image/ab67616d000048516fabede589dc9e9ad24f04cc"},
    {"Name":"Emma-Jean Thackray - Rain Dance",
    "Img":"https://i.scdn.co/image/ab67616d00004851bd4d150916c5ef6331a02c49"},
    {"Name":"Jazzrausch Bigband - Sonata - Pt. II Scherzo",
    "Img":"https://i.scdn.co/image/ab67616d00004851220bcf3cc3dbaef3f14e582d"},
    {"Name":"Mecca:83 - Soul Power",
    "Img":"https://i.scdn.co/image/ab67616d00004851a4e477c2012e3018af441a5b"},
    {"Name":"Alex Cortiz - Barfly - Slo-Fi Mix",
    "Img":"https://i.scdn.co/image/ab67616d00004851594ec79c40853ee21ec01416"},
    {"Name":"Nils Petter Molvær - Little Indian",
    "Img":"https://i.scdn.co/image/ab67616d000048518cda24478038b00097ce79f3"},
    {"Name":"Living Room - The Childhood Dreams - Worldtraveller & Grooveadelic Instrumental",
    "Img":"https://i.scdn.co/image/ab67616d00004851c517f98013fc469e3a74d772"},
    {"Name":"Kiefer - Island",
    "Img":"https://i.scdn.co/image/ab67616d0000485126115825990e8b68009b7068"},
    {"Name":"Sames - Cold",
    "Img":"https://i.scdn.co/image/ab67616d00004851192480d9b933a1747faffc21"},
    {"Name":"Avoure - Aura",
    "Img":"https://i.scdn.co/image/ab67616d00004851a8a7ee64ced4c341c52245ee"},
    {"Name":"NTO - Carrousel - Short Version",
    "Img":"https://i.scdn.co/image/ab67616d000048513c87168eeaa5e8b72c251a37"},
    {"Name":"Unders - Syria - Original",
    "Img":"https://i.scdn.co/image/ab67616d00004851a26e694a8205807fc1de9bce"},
    {"Name":"Pleasurekraft - Tarantula - Original Mix",
    "Img":"https://i.scdn.co/image/ab67616d00004851c70bdf8c8e5393aab77e2768"},
    {"Name":"Mounika. - Long Silent",
    "Img":"https://i.scdn.co/image/ab67616d00004851a18c2a3d6a2ce6358fd27345"},
    {"Name":"Paul Kalkbrenner - A Million Days",
    "Img":"https://i.scdn.co/image/ab67616d00004851a95e48ee035e4b6f22c807cf"},
    {"Name":"Kalabrese - Kafi Lied (feat. Sarah Palin)",
    "Img":"https://i.scdn.co/image/ab67616d00004851418fff45838d703cad73466d"},
    {"Name":"Ten Walls - Mas",
    "Img":"https://i.scdn.co/image/ab67616d00004851d54ab4e5e36421b6695438ef"},
    {"Name":"Landhouse - Robots",
    "Img":"https://i.scdn.co/image/ab67616d000048513b2fbb521b79931bf889aa71"},
    {"Name":"Tube & Berger - Imprint Of Pleasure",
    "Img":"https://i.scdn.co/image/ab67616d00004851bea83351a99d398eae5bc659"},
    {"Name":"potsu - i'm closing my eyes",
    "Img":"https://i.scdn.co/image/ab67616d00004851e8f20934f1c54cd64d01c99e"},
    {"Name":"Saib - Sakura Trees",
    "Img":"https://i.scdn.co/image/ab67616d000048518ea18b3cf8f32736be54ecc2"},
    {"Name":"Stand High Patrol - Midnight Walkers",
    "Img":"https://i.scdn.co/image/ab67616d00004851d0ca685eed3f3e41a2498310"},
    {"Name":"N O M I N A L - Everyday Everyone",
    "Img":"https://i.scdn.co/image/ab67616d00004851aebc06b6676fe3b4f311c843"},
    {"Name":"Avidus - Revenge of the Whales",
    "Img":"https://i.scdn.co/image/ab67616d00004851e95285c05670eb9eda67de48"},
    {"Name":"Stand High Patrol - Lobbies Daily Hobbies",
    "Img":"https://i.scdn.co/image/ab67616d000048518bcca1576f6bcd160dbf8778"},
    {"Name":"NTO - Alter Ego",
    "Img":"https://i.scdn.co/image/ab67616d0000485131df6c2b01c79be44601410c"},
    {"Name":"NTO - Croche",
    "Img":"https://i.scdn.co/image/ab67616d000048516eb1ec03c9ca617d0b2d9763"},
    {"Name":"Ben Böhmer - Hunting - Kidnap Remix",
    "Img":"https://i.scdn.co/image/ab67616d0000485126ace0f648ae0cb0377c2cd5"},
    {"Name":"TWO LANES - The Rest Is Noise",
    "Img":"https://i.scdn.co/image/ab67616d00004851b3e518f0219909fd5512c9f9"},
    {"Name":"Solee - March of the giants",
    "Img":"https://i.scdn.co/image/ab67616d0000485145b06fb8d9e8c1e44d90de1f"},
    {"Name":"Namito - Stone Flower - Original",
    "Img":"https://i.scdn.co/image/ab67616d000048512aff2829f7b1afa8f2ff7b37"},
    {"Name":"Definition - Life",
    "Img":"https://i.scdn.co/image/ab67616d000048510a3705da740040d63b541701"},
    {"Name":"Julian Wassermann - My Enemy",
    "Img":"https://i.scdn.co/image/ab67616d00004851a47395089b34fdd982b7d88f"},
    {"Name":"Kakoon - Dream",
    "Img":"https://i.scdn.co/image/ab67616d0000485178b79ab77105bbb2aefbae45"},
    {"Name":"Einmusik - Lapislazuli",
    "Img":"https://i.scdn.co/image/ab67616d000048510a32bf0a22c24fbd559bf728"},
    {"Name":"Kicktracks - cosmogyral",
    "Img":"https://i.scdn.co/image/ab67616d000048517baeaa5c07b546cdd9f966b9"},
    {"Name":"Hidden Empire - Palladion",
    "Img":"https://i.scdn.co/image/ab67616d00004851b6f6b71c2a998bf97907a7c4"},
    {"Name":"Gabriel Vitel - Mind Doodles",
    "Img":"https://i.scdn.co/image/ab67616d00004851a210be992ec3bfb54098e3d9"},
    {"Name":"Oliver Koletzki - Arrow and Bow - Marek Hemmann Remix",
    "Img":"https://i.scdn.co/image/ab67616d00004851c0d4755109b1ad7ea211a744"},
    {"Name":"Portable - Surrender (Kosi Edit) - mixed",
    "Img":"https://i.scdn.co/image/ab67616d0000485183e788a3159dac5ff0dd792c"},
    {"Name":"AKIRA - FALL",
    "Img":"https://i.scdn.co/image/ab67616d000048512f58f9fcd94a094a36fce0b6"},
    {"Name":"Fritz Kalkbrenner - Facing the Sun",
    "Img":"https://i.scdn.co/image/ab67616d00004851b7d0ebeb59d8d96399a909e9"},
    {"Name":"Paul Kalkbrenner - Azure",
    "Img":"https://i.scdn.co/image/ab67616d00004851d321448ad434d8177f422bcd"},
    {"Name":"Paul Kalkbrenner - Sky and Sand",
    "Img":"https://i.scdn.co/image/ab67616d00004851d321448ad434d8177f422bcd"},
    {"Name":"Zonderling - Sonderling - Original Mix",
    "Img":"https://i.scdn.co/image/ab67616d00004851c4382b7edb51e59e50df0eab"},
    {"Name":"AK - Sleepless in Berlin",
    "Img":"https://i.scdn.co/image/ab67616d00004851434f20fbda2c2d6d02a3d628"},
    {"Name":"Nora En Pure - Come With Me - Radio Mix",
    "Img":"https://i.scdn.co/image/ab67616d00004851670d585081cdd331893c8b71"},
    {"Name":"Milky Chance - Blossom",
    "Img":"https://i.scdn.co/image/ab67616d00004851b0f6418a15ef8a73e18027e4"},
    {"Name":"Of Monsters and Men - Dirty Paws",
    "Img":"https://i.scdn.co/image/ab67616d00004851cb3f67e8026e2e493a1e8262"},
    {"Name":"Niconé - Caje (Album Edit) - Orginal Version",
    "Img":"https://i.scdn.co/image/ab67616d0000485157d1660447a86fc14fbfdebf"},
    {"Name":"Rhye - 3 Days",
    "Img":"https://i.scdn.co/image/ab67616d00004851a13907cf58fb1bd99f90a543"},
    {"Name":"Rob Viktum - Siem Pang",
    "Img":"https://i.scdn.co/image/ab67616d000048513407b97e74007cabe920ce6a"},
    {"Name":"Tube & Berger - Imprint of Pleasure",
    "Img":"https://i.scdn.co/image/ab67616d0000485119935a69723162f79cfd04d5"},
    {"Name":"Joris Delacroix - Air France",
    "Img":"https://i.scdn.co/image/ab67616d000048511e6f3d9d0ca8cce1ad7f4307"},
    {"Name":"Beatamines - How Never",
    "Img":"https://i.scdn.co/image/ab67616d00004851a7f7409670292e78080279d2"},
    {"Name":"Daniel Steinberg - Lonely",
    "Img":"https://i.scdn.co/image/ab67616d00004851bcfa0c1a5942c03d8dad586f"},
    {"Name":"Fritz Kalkbrenner - Wes",
    "Img":"https://i.scdn.co/image/ab67616d00004851cd85ca4ad711f362eca90e16"},
    {"Name":"Sascha Braemer - People - Original Version",
    "Img":"https://i.scdn.co/image/ab67616d0000485170d1beb217e62bffe065c2da"},
    {"Name":"Kölsch - Opa",
    "Img":"https://i.scdn.co/image/ab67616d0000485150ad3725762c0fda89081901"},
    {"Name":"Klangkarussell - Sonnentanz - Sun Don't Shine",
    "Img":"https://i.scdn.co/image/ab67616d00004851e37608ac9405cd4163c20207"},
    {"Name":"Hippie Sabotage - Distance",
    "Img":"https://i.scdn.co/image/ab67616d000048517b2ee107afec98269d58c1e6"},
    {"Name":"Solomun - After Rain comes Sun",
    "Img":"https://i.scdn.co/image/ab67616d0000485124152cc694eebde533773dee"},
    {"Name":"Adana Twins - Strange",
    "Img":"https://i.scdn.co/image/ab67616d0000485179585c96307e218a8f315970"},
    {"Name":"Solomun - The Way Back",
    "Img":"https://i.scdn.co/image/ab67616d0000485116668410107067902feba4f8"},
    {"Name":"DAVID AUGUST - Moving Day",
    "Img":"https://i.scdn.co/image/ab67616d00004851eeca7dc31c2cdacc72af9b2e"},
    {"Name":"Klanglos - Wicked Game",
    "Img":"https://i.scdn.co/image/ab67616d000048510b02a1e83d784e7c9dcd5a54"},
    {"Name":"Loaf Muzik - Per Cassettes",
    "Img":"https://i.scdn.co/image/ab67616d000048514ffbbf6ba5846fd64a196441"},
    {"Name":"Tez Cadey - Seve - Radio Edit",
    "Img":"https://i.scdn.co/image/ab67616d000048510c551f1302f62d992bc127c7"},
    {"Name":"Nachtbraker - Hamdi - Original Mix",
    "Img":"https://i.scdn.co/image/ab67616d0000485109aa48ebd722f2d3bd6c9a45"},
    {"Name":"Elobrian Sunrise - When We Gather",
    "Img":"https://i.scdn.co/image/ab67616d000048512bb009a73de8ab47548f0fb4"},
    {"Name":"Euføeni - Float",
    "Img":"https://i.scdn.co/image/ab67616d000048513e0553b45e04ba8bad43ad4d"},
    {"Name":"Klartraum - Weltenwandler - Radio Edit",
    "Img":"https://i.scdn.co/image/ab67616d000048514923e153f1f92e12fb7649ea"},
    {"Name":"Rone - Ginkgo Biloba",
    "Img":"https://i.scdn.co/image/ab67616d00004851ceda84814f0f0849f7c4368f"},
    {"Name":"The Magician - Disko Dakka (Club Fever Pt.1)",
    "Img":"https://i.scdn.co/image/ab67616d0000485167e3420d3e1fea7c5dba0dc1"},
    {"Name":"Stimming - The Song",
    "Img":"https://i.scdn.co/image/ab67616d00004851d94c3b5d517c91f5e79a1f5a"},
    {"Name":"NTO - The Hound",
    "Img":"https://i.scdn.co/image/ab67616d000048510cda3fc8effc5cec77ca2f17"},
    {"Name":"Joachim Pastor - Taïga - N'to Remix",
    "Img":"https://i.scdn.co/image/ab67616d00004851f7fdd3289c369ba5e1172942"},
    {"Name":"NTO - Petite - Einmusik Remix",
    "Img":"https://i.scdn.co/image/ab67616d00004851f7fdd3289c369ba5e1172942"},
    {"Name":"NTO - Starlings",
    "Img":"https://i.scdn.co/image/ab67616d0000485124ad5042f872fb0468287c0e"},
    {"Name":"NTO - Meanwhile in Rio",
    "Img":"https://i.scdn.co/image/ab67616d000048514feb04bc77062f24fa5f6918"},
    {"Name":"HVOB - Azrael",
    "Img":"https://i.scdn.co/image/ab67616d000048519366b8b58290ee5180115311"}
    
    ]

console.log(Object.keys(trackJson).length);


//eventtrigger when enter pressed
textField.addEventListener("keydown", function(event){
    if (event.keyCode === 13) {
        checkIfEmpty("enter");
    }
})
//eventtrigger when tracks are selected
convertButton.addEventListener("click", function(event){
    convertPlaylist()
})

function checkAll(){
    for (let index = 0; index < tracks.length; index++){
        tracks[index].children[0].children[2].checked = true;
    }
}

function uncheckAll(){
    for (let index = 0; index < tracks.length; index++){
        tracks[index].children[0].children[2].checked = false;
    }
}
//deletes all li from all ul
function deleteLi(ulId){
    var ul = document.getElementById(ulId)
    while( ul.firstChild ){
        ul.removeChild( ul.firstChild );
    }
}
//changes the section that is shown
function changeActiveSection(newActiveSection){
    var sections = document.getElementsByClassName("section")
    for (let index = 0; index < sections.length; index++) {
        sections[index].classList.remove("activeSection");
    }
    var activeSection = document.getElementById(newActiveSection)
    activeSection.classList.add("activeSection");
    if(newActiveSection!=="playlistSelection"){
        deleteLi("listOfPlaylist");
        console.log("list of playlist cleared");
    }
    if(newActiveSection!=="trackSelection"){
        deleteLi("listOfTracks");
        console.log("tracklist cleared");
    }
    console.log("active section changed to: "+ newActiveSection);
    console.log("-------------------------------------");
}
//checks if empty, if yes rewrites Instruction, if not triggers all needed functions
function checkIfEmpty(eventType){
    var username = textField.value;
    username = username.trim();
    textField.value = "";
    if (username == ""){
        if(eventType == "button"){
            var alertMessage = document.createTextNode("Please Type in your Spotify username befor using the button")
        }
        else if(eventType == "enter"){
            var alertMessage = document.createTextNode("Please Type in your Spotify username befor pressing enter")
        }
        var newInstruction = document.createElement("h2");
        newInstruction.appendChild(alertMessage);
        var instruction = document.querySelector("h2");
        instruction.parentNode.replaceChild(newInstruction, instruction);
    }
    else{
        getPlaylists(username);
    }
}
//creates a new playlist as a li
function createPlaylistLi(playlistName,playlistImg,playlistId){
    var listOfPlaylist = document.getElementById("listOfPlaylist");
    var newPlaylistLi = document.createElement("li");
        newPlaylistLi.classList.add("playlist");
    var newButton = document.createElement("button");
        newButton.classList.add("playlistButton");
        newButton.addEventListener("click", function(event){
            getPlaylistsTracks(playlistId);
        })
    var newImg = document.createElement("img");
        newImg.src = playlistImg;
        newImg.alt = "image of that playlist";
        newImg.style = "float: left;";
    var newP = document.createElement("p");
    newP.appendChild(document.createTextNode(playlistName));
    newButton.appendChild(newImg);
    newButton.appendChild(newP);
    newPlaylistLi.appendChild(newButton);
    listOfPlaylist.appendChild(newPlaylistLi);
    console.log(`playlist: ${playlistName} wurde erstellt`);
}
//return the username and getting arr of that user´s playlists
function getPlaylists(username){
    console.log(`der username ${username} wurde eingegeben`);
    //get Request
    //arr of Playlist
    createPlaylistLi("lofi","https://i.scdn.co/image/ab67616d0000b273db0346d1f6790958e6d72349","idnmr2");
    createPlaylistLi("Hip Hop aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","https://i.scdn.co/image/ab67616d0000b273db0346d1f6790958e6d72349","idnmr3");
    changeActiveSection("playlistSelection");
}
//creates a new track as a li
function createTrackLi(trackName,trackImg){
    var newTrackLi = document.createElement("li");
    var newLabel = document.createElement("label");
        newLabel.classList.add("track");
    var newImg = document.createElement("img");
        newImg.src = trackImg;
        newImg.alt = "image of the cover";
        newImg.style = "float: left;";
    var newP = document.createElement("p");
        newP.appendChild(document.createTextNode(trackName));
    var newCheckbox = document.createElement("input");
        newCheckbox.setAttribute("type","checkbox");
        newCheckbox.setAttribute("checked","checkbox");
    var newCheckmark = document.createElement("span");
        newCheckmark.classList.add("checkmark");
    newLabel.appendChild(newImg);
    newLabel.appendChild(newP);
    newLabel.appendChild(newCheckbox);
    newLabel.appendChild(newCheckmark);
    newTrackLi.appendChild(newLabel);
    listOfTracks.appendChild(newTrackLi);
    console.log(`Track: ${trackName} wurde erstellt`);
}
//return the playlist id and getting arr of that playlist´s tracks
function getPlaylistsTracks(id){
    console.log(`Playlist mit Id nr. ${id} wurde ausgewählt.`);
    //get Request
    for (let index = 0; index < Object.keys(trackJson).length; index++) {
        var trackName = trackJson[index].Name;
        var trackImg = trackJson[index].Img;
        createTrackLi(trackName, trackImg);
    }
    changeActiveSection("trackSelection");
}
//craeting and returning arr of tracks und getting a link
function convertPlaylist(){
    var search = [];
    for (let index = 0; index < tracks.length; index++) {
        if(tracks[index].children[0].children[2].checked){
            search.push(tracks[index].children[0].children[1].textContent);
        }
    }
    console.log(search);
    //return arr of Tracks to "youtube"
    changeActiveSection("endScreen");
}
//returns the link of the converted Playlist
function returnLink(){
    alert("here should be your link:)");
}