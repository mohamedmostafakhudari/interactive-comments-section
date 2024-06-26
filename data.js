export const comments = [
  {
    id: "1",
    content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "Sun Mar 31 2024 20:49:22 GMT+0200 (Eastern European Standard Time)",
    score: 36,
    user: {
      image: {
        png: "./assets/images/avatars/image-amyrobson.png",
        webp: "./assets/images/avatars/image-amyrobson.webp"
      },
      username: "amyrobson"
    },
    replies: []
  },
  {
    id: "2",
    content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: "Tue Apr 16 2024 20:50:51 GMT+0200 (Eastern European Standard Time)",
    score: 5,
    user: {
      image: {
        png: "./assets/images/avatars/image-maxblagun.png",
        webp: "./assets/images/avatars/image-maxblagun.webp"
      },
      username: "maxblagun"
    },
    replies: [
      {
        id: "3",
        content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: "Tue Apr 23 2024 20:50:21 GMT+0200 (Eastern European Standard Time)",
        score: 4,
        replyingTo: "maxblagun",
        user: {
          image: {
            png: "./assets/images/avatars/image-ramsesmiron.png",
            webp: "./assets/images/avatars/image-ramsesmiron.webp"
          },
          username: "ramsesmiron"
        }
      },
      {
        id: "4",
        content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: "Sun Apr 28 2024 21:51:28 GMT+0300 (Eastern European Summer Time)",
        score: 2,
        replyingTo: "ramsesmiron",
        user: {
          image: {
            png: "./assets/images/avatars/image-juliusomo.png",
            webp: "./assets/images/avatars/image-juliusomo.webp"
          },
          username: "juliusomo"
        }
      }
    ]
  }
]