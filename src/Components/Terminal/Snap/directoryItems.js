const DirectoryItems = {
  "/users/mattmarsden/home/": [
    "$aboutme",
    "$contact",
    "$portfolio",
    "$languages&tools",
  ],
  "/users/mattmarsden/home/aboutme/": ["#aboutme.txt", "$home"],
  "/users/mattmarsden/home/contact/": ["mattmarsdendev@gmail.com", "$home"],
  "/users/mattmarsden/home/portfolio/": [
    "mmarsden89.github.io/#/portfolio",
    "#portfolioWebsite.txt",
    "#trividuh.txt",
    "#nationalParks.txt",
    "$home",
  ],
  "/users/mattmarsden/home/languages&tools/": ["#languages&tools.txt", "$home"],
  aliases: {
    "/users/mattmarsden/home/$aboutme/": "/users/mattmarsden/home/aboutme/",
    "/users/MattMarsden/$home/": "/users/mattmarsden/home/",
    "/users/MattMarsden/$home/$home": "/users/mattmarsden/home/",
    "/users/mattmarsden/home/$Home": "/users/mattmarsden/home/",
    "/users/mattmarsden/home/home/": "/users/mattmarsden/home/",
  },
};

export default DirectoryItems;
