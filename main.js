// ========== CONFIGURATION ==========
const memoryPhotosConfig = {
  images: [
    "img/chat1.png",
    "img/chat2.png",
    "img/chat3.png",
    "img/chat4.png",
    "img/chat5.png",
    "img/chat6.png",
    "img/chat7.png",
    "img/chat8.png",
    // Add more images here!
  ],
  displayDuration: 3000, // 3 seconds per image
};

const getRandomPhotoStyle = () => {
  // Center-biased horizontal position (5% to 20% from left)
  const leftPos = Math.random() * 15 + 5;
  // Center-biased vertical position (8% to 18% from top)
  const topPos = Math.random() * 10 + 8;
  // Slight tilt (-12 to +12 degrees)
  const rotate = Math.random() * 24 - 12;
  
  return { left: leftPos, top: topPos, rotate };
};
// Gift card state
let yesClickCount = 0;
let giftCodeValue = "XXXX-XXXX-XXXX-XXXX";

// Random position generator - MORE MOVEMENT, stays in viewport
const getRandomPosition = () => {
  const positions = [
    { top: '20%', left: '50%' },
    { top: '30%', left: '50%' },
    { top: '40%', left: '50%' },
    { top: '50%', left: '50%' },
    { top: '60%', left: '50%' },
    { top: '70%', left: '50%' },
    { top: '80%', left: '50%' },
  ];

  return positions[Math.floor(Math.random() * positions.length)];
};


// Gift card interaction
const initGiftCard = () => {
  const yesBtn = document.querySelector('.gift-yes');
  const noBtn = document.querySelector('.gift-no');
  const question = document.querySelector('.gift-question');
  const questionPhase = document.querySelector('.gift-question-phase');
  const buttonsContainer = document.querySelector('.gift-buttons');
  const codeReveal = document.querySelector('.gift-code-reveal');
  const codeContainer = document.getElementById('codeContainer');
  const copyBtn = document.getElementById('copyBtn');
  const finalMessages = document.querySelector('.gift-final-messages');
  
  const questions = [
    "Do you want your gift?",
    "Are you absolutely sure?",
    "Really really sure?",
    "You promise you want it?",
    "Last chance... are you sure?"
  ];
  
  yesBtn.addEventListener('click', () => {
    yesClickCount++;
    
    if (yesClickCount < 5) {
      // Update question
      question.textContent = questions[yesClickCount];
      
      // Move BOTH buttons together to random position
      const pos = getRandomPosition();
      buttonsContainer.style.position = 'fixed';
      buttonsContainer.style.top = pos.top;
      buttonsContainer.style.left = pos.left || 'auto';
      buttonsContainer.style.right = pos.right || 'auto';
      buttonsContainer.style.transform = 'translate(-50%, -50%)';
      buttonsContainer.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
    } else {
      // 5th click - show code section
      questionPhase.style.display = 'none';
      codeReveal.style.display = 'block';
      
      // Code reveals on click
      codeContainer.addEventListener('click', function revealCode() {
        document.querySelector('.code-blurred').style.display = 'none';
        document.getElementById('revealedCode').textContent = giftCodeValue;
        document.querySelector('.code-revealed').style.display = 'block';
        copyBtn.style.display = 'block';
        
        // Show messages AFTER code is revealed
        setTimeout(() => {
          finalMessages.style.display = 'block';
        }, 600);
        
        // Remove click listener after first click
        codeContainer.removeEventListener('click', revealCode);
        codeContainer.style.cursor = 'default';
      });
    }
  });
  
  noBtn.addEventListener('click', () => {
    // No button moves the WHOLE container away!
    const pos = getRandomPosition();
    buttonsContainer.style.position = 'fixed';
    buttonsContainer.style.top = pos.top;
    buttonsContainer.style.left = pos.left || 'auto';
    buttonsContainer.style.right = pos.right || 'auto';
    buttonsContainer.style.transform = 'translate(-50%, -50%)';
    buttonsContainer.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
  
  // Copy code and auto-continue after 10 seconds
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(giftCodeValue).then(() => {
      copyBtn.textContent = '✓ Copied!';
      copyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      
      // After 10 seconds, hide gift section and show final message
      setTimeout(() => {
        document.querySelector('.gift-card-section').style.display = 'none';
        const nineSection = document.querySelector('.nine');
        nineSection.style.opacity = '1';
        nineSection.style.visibility = 'visible';
        TweenMax.staggerFrom('.nine p', 1, {
          opacity: 0,
          y: -20,
          rotationX: 5,
          skewX: '15deg'
        }, 1.2);
      }, 10000); // 10 seconds
    });
  });
};

// Generate memory photos HTML - with random drop positions
const generateMemoryPhotos = () => {
  const container = document.querySelector('.memory-photos');
  memoryPhotosConfig.images.forEach((imgSrc, index) => {
    const style = getRandomPhotoStyle();
    const photo = document.createElement('div');
    photo.className = 'memory-photo';
    photo.style.left = `${style.left}%`;
    photo.style.top = `${style.top}%`;
    photo.style.setProperty('--rotate-angle', `${style.rotate}deg`);
    photo.innerHTML = `<img src="${imgSrc}" alt="Memory ${index + 1}" />`;
    container.appendChild(photo);
  });
};

// Show memory photos one by one
const showMemoryPhotos = () => {
  const photos = document.querySelectorAll('.memory-photo');
  photos.forEach((photo, index) => {
    setTimeout(() => {
      photo.classList.add('visible');
    }, index * memoryPhotosConfig.displayDuration);
  });
};

// Hide all memory photos together
const hideMemoryPhotos = () => {
  const photos = document.querySelectorAll('.memory-photo');
  photos.forEach(photo => {
    photo.classList.add('fade-away');
  });
  // Remove photos completely after fade animation
  setTimeout(() => {
    photos.forEach(photo => {
      photo.style.display = 'none';
    });
  }, 1500);
};
// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)",
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=0.5"
    )
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .from(
      ".girl-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3,
      "-=0.5"
    )
    .to(".six", 0.5, {
      opacity: 0,
      scale: 0.8,
      y: 30,
    }, "+=1")
    .call(() => {
      // Show memory photos one by one
      showMemoryPhotos();
    })
    .to({}, memoryPhotosConfig.images.length * (memoryPhotosConfig.displayDuration / 1000) + 2, {}) // Wait for all photos
    .call(() => {
      // Hide all photos together
      hideMemoryPhotos();
    })
    .to({}, 1.5, {}) // Wait for fade out
    .call(() => {
      // Show gift card section
      document.querySelector('.gift-card-section').style.display = 'flex';
      TweenMax.from('.gift-container', 1, {
        scale: 0.5,
        opacity: 0,
        ease: Elastic.easeOut.config(1, 0.5)
      });
    })
    .to({}, 0.5, {}) // Pause for gift card interaction
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    );

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    // Reset memory photos
    const memoryContainer = document.querySelector('.memory-photos');
    memoryContainer.innerHTML = '';
    generateMemoryPhotos();
    
    // Reset gift card state
    yesClickCount = 0;
    document.querySelector('.gift-question-phase').style.display = 'block';
    document.querySelector('.gift-code-reveal').style.display = 'none';
    document.querySelector('.gift-question').textContent = questions[0];
    document.querySelector('.gift-buttons').style.position = 'relative';
    document.querySelector('.gift-buttons').style.top = 'auto';
    document.querySelector('.gift-buttons').style.left = 'auto';
    document.querySelector('.gift-buttons').style.right = 'auto';
    document.querySelector('.code-blurred').style.display = 'block';
    document.querySelector('.code-revealed').style.display = 'none';
    document.getElementById('copyBtn').style.display = 'none';
    document.getElementById('copyBtn').textContent = 'Copy Code';
    document.querySelector('.gift-final-messages').style.display = 'none';
    
    tl.restart();
  });
};

// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).map((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .getElementById(customData)
              .setAttribute("src", data[customData]);
          } else if (customData === "giftCode") {
            giftCodeValue = data[customData];
            // Set the blurred text to show something that hints at the code length
            document.getElementById("giftCode").textContent = "Click to reveal your gift code";
          } else {
            document.getElementById(customData).innerText = data[customData];
          }
        }
      });
    })
    .catch(() => {
      // If customize.json doesn't exist, continue anyway
      console.log("No customize.json found, using defaults");
    });
};

// Run fetch and animation in sequence
const resolveFetch = () => {
  return new Promise((resolve, reject) => {
    fetchData();
    resolve("Fetch done!");
  });
};

// Main execution: Generate photos then start animation
generateMemoryPhotos();
initGiftCard();
resolveFetch().then(animationTimeline());


// Replay button - reload page
document.getElementById("replay").addEventListener("click", function () {
  location.reload();
});

