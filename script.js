const imgEl = document.getElementById("story-image");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const inputSection = document.getElementById("input-section");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-input");
const tooltip = document.getElementById("tooltip");
const titleEl = document.getElementById("title");

const btn1 = document.getElementById("choice1");
const btn2 = document.getElementById("choice2");
const btn3 = document.getElementById("choice3");
const buttons = [btn1, btn2, btn3];

let hasKeycard = false;
let currentScene = "start";

const storyData = {
    start: {
        img: "ballroom.jpg",
        lines: ["The Van Doren Gala is blindingly glamorous.", "Suddenly, Julian, your ex who thought you died in a fondue accident, grabs your arm.", "'Nick! You're alive? And wearing MY grandmother's stolen pearls?'"],
        btns: [
            { text: "Slap him dramatically", next: "slap" },
            { text: "The 'Amnesia' Defense", next: "amnesia" },
            { text: "Seduce him for his keycard", next: "seduce" }
        ]
    },
    amnesia: {
        img: "confused.jpg",
        lines: ["'I don't know who this Nick is!' you cry, clutching your head.", "'I am the Countess Von Snob, and I've had amnesia since the yacht explosion!'", "Julian narrows his eyes. 'Then explain the pizza tattoo on your neck!'"],
        btns: [
            { text: "'It's a birthmark!'", next: "birthmark_fail" },
            { text: "'It's a map to the diamond!'", next: "tattoo_map" }
        ]
    },
    birthmark_fail: {
        img: "busted.jpg",
        lines: ["'A birthmark shaped like a pepperoni slice?' Julian laughs dryly.", "'You haven't changed at all. Security! This Countess is a fraud!'", "The guards surround you, weapons drawn."],
        btns: [
            { text: "Bribe them with pearls", next: "guard_bribe" },
            { text: "Go quietly to jail", next: "ending_arrest" }
        ]
    },
    tattoo_map: {
        img: "tattoo.jpg",
        lines: ["'Fine! It's a map!' you whisper. 'The pepperoni shows the vault!'", "Julian's greed takes over. 'Then we're partners again. One last job?'", "He leads you through a secret servant's entrance."],
        btns: [
            { text: "Follow him to the vault", next: "vault_entry" },
            { text: "Double-cross him", next: "double_cross" }
        ]
    },
    double_cross: {
        img: "darkness.jpg",
        lines: ["You trip Julian in the dark and take his master key.", "As he falls, he shouts: 'You always loved pepperoni more than me!'", "You reach the laser hallway alone."],
        btns: [{ text: "Tango through lasers", next: "lasers" }]
    },
    guard_bribe: {
        img: "bribe.jpg",
        lines: ["The guards look at the pearls. 'These are fake!' one yells.", "But Stefano (your twin) steps in. 'Leave him to me, boys.'", "He whispers: 'Nick, it's me, Stefano! I've missed you!'"],
        btns: [{ text: "Hug your brother", next: "twin_reunion" }]
    },
    slap: {
        img: "slap.jpg",
        lines: ["The slap echoes. The orchestra stops. The drama is peak.", "Julian clutches his cheek. 'That sting... it's definitely you.'", "Stefano, the lead guard, rushes over to arrest you."],
        btns: [
            { text: "Reveal you're his twin", next: "twin_reunion" },
            { text: "Throw a drink in his face", next: "chaos" }
        ]
    },
    seduce: {
        img: "seduce.jpg",
        lines: ["'Forget the pearls, Julian. I want the diamond... and you.'", "He melts. 'Take my keycard, my heart, and my secret wig collection!'", "He hands you a golden card and a tearful look."],
        btns: [
            { text: "Steal the wig collection", next: "wig_theft" },
            { text: "Sprint to the lasers", next: "lasers" }
        ]
    },
    wig_theft: {
        img: "wigs.jpg",
        lines: ["You find the secret closet. The wigs are majestic!", "Inside the 'Platinum Bob', you find a note from your father.", "'Nick, the diamond is a trap. Meet me in the wine cellar.'"],
        btns: [
            { text: "Go to the wine cellar", next: "wine_cellar" },
            { text: "Ignore the warning", next: "vault_entry" }
        ]
    },
    wine_cellar: {
        img: "wine.jpg",
        lines: ["Your father is there, sipping a 1942 vintage.", "'The diamond is poisoned, Nick. We're stealing the Museum instead!'", "He hands you a deed to the building. You're rich legally!"],
        btns: [
            { text: "Sign the deed", next: "ending_family" },
            { text: "The building isn't enough!", next: "vault_entry" }
        ]
    },
    twin_reunion: {
        img: "twins.jpg",
        lines: ["'Brother!' Stefano cries. 'I was hired to guard the gem!'", "He hands you a disguise. 'Go! I'll tell them you escaped!'", "You are now dressed as a high-ranking General."],
        btns: [
            { text: "Command vault to open", next: "vault_success" },
            { text: "Search Julian's pockets", next: "arrest_ex" }
        ]
    },
    chaos: {
        img: "chaos.jpg",
        lines: ["Champagne flies! A fountain breaks!", "In the panic, a giant wedding cake is wheeled out.", "The 'Midnight Star' is the topper! Julian is reaching for it!"],
        btns: [
            { text: "Dive into the cake", next: "cake_ending" },
            { text: "Tackle Julian", next: "ending_arrest" }
        ]
    },
    vault_entry: {
        img: "vault.jpg",
        lines: ["The vault requires a typed password.", "The hint is Julian's favorite person."],
        isInputNode: true,
        correctAnswer: "Nick",
        next: "vault_success",
        fail: "vault_fail"
    },
    lasers: {
        img: "lasers.jpg",
        lines: ["Red lasers crisscross the room.", "You perform a flawless Argentine Tango through the beams.", "You reach the diamond's pedestal. It glows with malice."],
        btns: [{ text: "Grab the diamond", next: "vault_success" }]
    },
    vault_success: {
        img: "diamond.jpg",
        lines: ["The gem is yours! It's heavier than Julian's lies.", "But the exit is blocked by your father and Julian.", "'Good work, Nick,' Father says. 'Now, who do you choose?'"],
        btns: [
            { text: "Choose Family & Fortune", next: "ending_family" },
            { text: "Choose Love & Julian", next: "ending_wedding" },
            { text: "Choose Yourself & Run", next: "ending_rich" }
        ]
    },
    vault_fail: {
        img: "alarm.jpg",
        lines: ["Wrong! The alarm plays a sad trombone sound.", "Glitter cannons fire, coating you in pink sparkles.", "Julian and the police arrive. 'I've always loved you the most!''"],
        btns: [{ text: "Go to jail in style", next: "ending_arrest" }]
    },
    arrest_ex: {
        img: "handcuffs.jpg",
        lines: ["You cuff Julian to the chocolate fountain.", "'This is just like our first date!' he yells happily.", "Suddenly, he pulls a diamond ring out of his tuxedo sock!"],
        btns: [
            { text: "Say 'Yes' and Elope!", next: "ending_wedding" },
            { text: "Take the ring and leave", next: "ending_rich" }
        ]
    },
    ending_rich: {
        img: "rich.jpg",
        lines: ["END: THE WEALTHY RECLUSE.", "You have the diamond. You live in a mansion with 50 cats.", "Sometimes you look at the pizza tattoo and cry."],
        btns: [{ text: "NEW SEASON (RESTART)", next: "start" }]
    },
    ending_arrest: {
        img: "jail.jpg",
        lines: ["END: PRISON COUTURE.", "You're the most popular person in your cell.", "Julian sends you roses every day. It's exhausting."],
        btns: [{ text: "NEW SEASON (RESTART)", next: "start" }]
    },
    ending_family: {
        img: "family_business.jpg",
        lines: ["END: THE HEIST DYNASTY.", "You, Dad, and Stefano own the museum now.", "The Van Doren family is back on top of the world!"],
        btns: [{ text: "NEW SEASON (RESTART)", next: "start" }]
    },
    ending_wedding: {
        img: "wedding.jpg",
        lines: ["END: THE HEIST WEDDING.", "You realized that Julian's drama is better than any diamond.", "You get married in a getaway helicopter. Stefano is the priest!"],
        btns: [{ text: "NEW SEASON (RESTART)", next: "start" }]
    },
    cake_ending: {
        img: "cake.jpg",
        lines: ["END: SWEET VICTORY.", "You found the diamond in the frosting.", "You retire and open a bakery called 'The Great Escape'."],
        btns: [{ text: "NEW SEASON (RESTART)", next: "start" }]
    }
};

function updateImage(fileName) {
    imgEl.src = fileName;
}

function updateText(lines) {
    const paragraphs = [p1, p2, p3];
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].textContent = lines[i] || "";
    }
}

function flashTitle() {
    titleEl.style.color = "red";
    titleEl.style.fontSize = "3.5rem";
    setTimeout(() => {
        titleEl.style.color = "#d4af37";
        titleEl.style.fontSize = "3rem";
    }, 500);
}

function toggleInputVisibility(show) {
    if (show) {
        inputSection.style.display = "block";
    } else {
        inputSection.style.display = "none";
    }
}

function renderScene(nodeKey) {
    currentScene = nodeKey;
    const node = storyData[nodeKey];
    
    updateImage(node.img);
    updateText(node.lines);
    flashTitle();

    if (node.isInputNode) {
        toggleInputVisibility(true);
        buttons.forEach(b => b.style.display = "none");
    } else {
        toggleInputVisibility(false);
        for (let i = 0; i < buttons.length; i++) {
            if (node.btns && node.btns[i]) {
                buttons[i].style.display = "block";
                buttons[i].textContent = node.btns[i].text;
            } else {
                buttons[i].style.display = "none";
            }
        }
    }
}


btn1.addEventListener("click", () => {
    const node = storyData[currentScene];
    if (node.btns && node.btns[0]) renderScene(node.btns[0].next);
});

btn2.addEventListener("click", () => {
    const node = storyData[currentScene];
    if (node.btns && node.btns[1]) renderScene(node.btns[1].next);
});

btn3.addEventListener("click", () => {
    const node = storyData[currentScene];
    if (node.btns && node.btns[2]) renderScene(node.btns[2].next);
});

submitBtn.addEventListener("click", () => {
    const node = storyData[currentScene];
    if (userInput.value.toLowerCase() === node.correctAnswer.toLowerCase()) {
        renderScene(node.next);
    } else {
        renderScene(node.fail);
    }
    userInput.value = ""; 
});

imgEl.addEventListener("mouseover", () => {
    tooltip.style.visibility = "visible";
    tooltip.style.left = "50%";
    tooltip.style.top = "20%";
});
imgEl.addEventListener("mouseout", () => {
    tooltip.style.visibility = "hidden";
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && inputSection.style.display === "block") {
        submitBtn.click();
    }
    if (event.key === "Escape") {
        alert("The drama is too intense to escape!");
    }
});

document.addEventListener("keydown", (e) => { if (e.key === "1") btn1.click(); });
document.addEventListener("keydown", (e) => { if (e.key === "2") btn2.click(); });
document.addEventListener("keydown", (e) => { if (e.key === "3") btn3.click(); });
window.addEventListener("load", () => console.log("Gala Loaded"));
window.addEventListener("resize", () => console.log("Dramatic resize!"));
p1.addEventListener("copy", () => alert("Stealing dialogue? How scandalous!"));

renderScene("start");