document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // =====================
  // 1. Elements Selection (Hoisted)
  // =====================

  // Header / Sidebar
  const menuBtn = document.querySelector(".menu-btn");
  const closeBtn = document.querySelector(".close-btn");
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

  // Pages
  const introPage = document.getElementById("intro-page"); // Intro
  const cardListView = document.getElementById("bungeoppang-list"); // Main Bungeoppang
  const tornadoPage = document.getElementById("tornado-page");
  const tteokPage = document.getElementById("tteok-page");
  const hotdogPage = document.getElementById("hotdog-page");
  const grainPage = document.getElementById("grain-page");
  const detailView = document.getElementById("detailView");

  // Buttons
  const enterBtn = document.getElementById("enterBtn"); // Start Button

  // Navigation Links (Mobile Sidebar)
  const tornadoLink = document.querySelector("#sidebar .i-tornado a");
  const bungeoppangLink = document.querySelector("#sidebar .i-bungeoppang a");
  const tteokLink = document.querySelector("#sidebar .i-tteok a");
  const hotdogLink = document.querySelector("#sidebar .i-hotdog a");
  const bbungtigiLink = document.querySelector("#sidebar .i-bbungtigi a");

  // Footer Selection
  const siteFooter = document.querySelector(".site-footer");

  // Detail View Elements
  const detailImg = document.getElementById("detailImg");
  const detailTitle = document.getElementById("detailTitle");
  const detailDesc = document.getElementById("detailDesc");
  const detailPrice = document.getElementById("detailPrice");
  const detailBack = document.getElementById("detailBack");
  const detailTags = document.getElementById("detailTags");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Scroll to Top Logic
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      // Show button if scrolled down 300px
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Debug Logs
  console.log("Elements Check:", {
    introPage: !!introPage,
    enterBtn: !!enterBtn,
    menuBtn: !!menuBtn,
    sidebar: !!sidebar,
    cardListView: !!cardListView,
    tornadoPage: !!tornadoPage,
    tteokPage: !!tteokPage,
    hotdogPage: !!hotdogPage,
    grainPage: !!grainPage,
    detailView: !!detailView,
    siteFooter: !!siteFooter,
    scrollTopBtn: !!scrollTopBtn,
    tornadoLink: !!tornadoLink,
    bungeoppangLink: !!bungeoppangLink,
    tteokLink: !!tteokLink,
    hotdogLink: !!hotdogLink,
    bbungtigiLink: !!bbungtigiLink,
  });

  if (!introPage) console.error("CRITICAL: introPage (intro-page) not found!");
  if (!cardListView)
    console.error("CRITICAL: cardListView (bungeoppang-list) not found!");
  if (!tornadoPage)
    console.error("CRITICAL: tornadoPage (tornado-page) not found!");
  if (!tteokPage) console.error("CRITICAL: tteokPage (tteok-page) not found!");
  if (!hotdogPage)
    console.error("CRITICAL: hotdogPage (hotdog-page) not found!");
  if (!grainPage) console.error("CRITICAL: grainPage (grain-page) not found!");

  // =====================
  // 2. Sidebar Logic
  // =====================

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      console.log("Menu button clicked");
      sidebar.classList.add("open");
      body.classList.add("sidebar-open");
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      console.log("Close button clicked");
      sidebar.classList.remove("open");
      body.classList.remove("sidebar-open");
    });
  }

  // State to track the last active page before entering detail view
  let lastActivePage = introPage; // STARTING POINT is now Intro Page

  // =====================
  // 3. Navigation Helpers
  // =====================

  // Helper to hide all pages and show one
  const showPage = (targetPage) => {
    // List of all main content pages
    const pages = [
      introPage,
      cardListView,
      tornadoPage,
      tteokPage,
      hotdogPage,
      grainPage,
      detailView,
    ];

    // If we are showing a main page (not detail view), save it as last active
    if (targetPage !== detailView && targetPage !== introPage) {
      lastActivePage = targetPage;
    }

    // Ensure footer is visible unless on intro (Intro can have footer too, but user didn't specify. Kepping it simple.)
    if (siteFooter) siteFooter.style.display = "block";

    pages.forEach((page) => {
      if (page) page.classList.add("hidden");
    });

    if (targetPage) {
      targetPage.classList.remove("hidden");
    }

    // Control Menu Button Visibility: Hide on Intro, Show elsewhere
    if (menuBtn) {
      if (targetPage === introPage) {
        menuBtn.style.display = "none";
      } else {
        menuBtn.style.display = "flex";
      }
    }

    // Close sidebar
    if (sidebar) sidebar.classList.remove("open");
    if (body) body.classList.remove("sidebar-open");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Initialize: Show Intro Page by default
  showPage(introPage);

  /* =========================================
     Intro Page Handling
     ========================================= */
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      // Show Main Bungeoppang List
      showPage(cardListView);
    });
  }

  /* =========================================
     Logo Navigation
     ========================================= */
  const mainLogo = document.getElementById("mainLogo");
  if (mainLogo) {
    mainLogo.addEventListener("click", () => {
      // Go to Intro page (thumbnail/hero)
      showPage(introPage);
    });
  }

  // =====================
  // 3-B. Desktop Navigation Logic
  // =====================
  const desktopNav = document.querySelector(".desktop-nav");
  if (desktopNav) {
    desktopNav.addEventListener("click", (e) => {
      // Find the closest anchor tag if clicked on child
      const link = e.target.closest("a");
      if (!link) return;

      e.preventDefault();
      
      const pageId = link.getAttribute("data-page");
      console.log("Desktop Nav Clicked:", pageId);

      let target = null;
      switch (pageId) {
        case "bungeoppang-list":
          target = cardListView;
          break;
        case "tornado-list":
          target = tornadoPage;
          break;
        case "tteok-list":
          target = tteokPage;
          break;
        case "hotdog-list":
          target = hotdogPage;
          break;
        case "grain-list":
          target = grainPage;
          break;
      }

      if (target) {
        showPage(target);
      }
    });
  }

  // =====================
  // 4. Page Routing Logic (Legacy Sidebar)
  // =====================
  // (Keeping existing sidebar logic as fallback for mobile)
  if (tornadoLink && tornadoPage) {
    tornadoLink.addEventListener("click", (e) => {
      console.log("Sidebar: Tornado link clicked");
      e.preventDefault();
      showPage(tornadoPage);
    });
  } else {
    console.warn("Tornado link or page missing, event listener skipped");
  }

  if (bungeoppangLink && cardListView) {
    bungeoppangLink.addEventListener("click", (e) => {
      console.log("Sidebar: Bungeoppang link clicked");
      e.preventDefault();
      showPage(cardListView);
    });
  }

  if (tteokLink && tteokPage) {
    tteokLink.addEventListener("click", (e) => {
      console.log("Sidebar: Tteok link clicked");
      e.preventDefault();
      showPage(tteokPage);
    });
  }

  if (hotdogLink && hotdogPage) {
    hotdogLink.addEventListener("click", (e) => {
      console.log("Sidebar: Hotdog link clicked");
      e.preventDefault();
      showPage(hotdogPage);
    });
  }

  if (bbungtigiLink && grainPage) {
    bbungtigiLink.addEventListener("click", (e) => {
      console.log("Sidebar: Bbungtigi link clicked");
      e.preventDefault();
      showPage(grainPage);
    });
  }

  // =====================
  // 5. Card Detail Logic
  // =====================

  const foodData = {
    redbean: {
      img: "img/bungeoppang-redbean.png",
      title: "Red bean paste",
      desc: `
            <h3>What it tastes like</h3>
            <p>"Warm, crispy fish-shaped waffle with naturally sweet and creamy red bean filling — like a cozy hug on a cold day."</p>
            <h3>Why we love it</h3>
            <ul>
              <li>Cute fish shape (Instagrammable!)</li>
              <li>Sweet but not heavy (natural bean sweetness)</li>
              <li>Warm street food experience (winter vibes)</li>
              <li>Budget-friendly (cheap &amp; filling)</li>
              <li>Unique flavor – red bean might be new to you, but worth trying!</li>
            </ul>
          `, // Keeping this truncated for brevity in this re-write, assuming original data was fine, but I should probably preserve all data.
      // WAIT - I shouldn't truncate data or I'll lose user's content. I must use original foodData.
      // Since I am writing the WHOLE file, I must include the FULL foodData.
    },
  };

  // RE-INSERTING FULL DATA to avoid data loss. I will copy-paste original data structure from previous read.

  const fullFoodData = {
    redbean: {
      img: "img/bungeoppang-redbean.png",
      title: "Red bean paste",
      desc: `
            <h3>What it tastes like</h3>
            <p>
              "Warm, crispy fish-shaped waffle with naturally sweet and creamy red bean filling
              — like a cozy hug on a cold day."
            </p>
      
            <h3>Why we love it</h3>
            <ul>
              <li>Cute fish shape (Instagrammable!)</li>
              <li>Sweet but not heavy (natural bean sweetness)</li>
              <li>Warm street food experience (winter vibes)</li>
              <li>Budget-friendly (cheap &amp; filling)</li>
              <li>Unique flavor – red bean might be new to you, but worth trying!</li>
            </ul>
      
            <h3>Texture contrast</h3>
            <p>
              Crispy, golden-brown waffle exterior meets soft, warm red bean paste inside.
            </p>
      
            <h3>Nostalgic value</h3>
            <p>
              Many Koreans have childhood memories of buying bungeoppang with pocket money after school.
            </p>
      
            <h3>Seasonal ritual</h3>
            <p>
              Bungeoppang vendors appear like clockwork when temperatures drop,
              signaling the arrival of winter.
            </p>
      
            <h3>The filling debate</h3>
            <p>
              Red bean is the OG, but custard cream became equally popular in the 2000s,
              making this Korea’s most wholesome food debate.
            </p>
      
            <h3>Where to easily find it</h3>
            <ul>
              <li>Subway station exits (Nov–Feb, peak season)</li>
              <li>University areas (Hongdae, Sinchon, Gangnam)</li>
              <li>Traditional markets (Gwangjang Market, Namdaemun)</li>
              <li>Convenience stores (CU, GS25 – frozen section, year-round)</li>
              <li>Department store food courts (premium versions)</li>
            </ul>
      
            <h3>Best time</h3>
            <p>
              Late afternoon to evening (3PM–8PM), during the winter months (November–February).
            </p>
          `,
    },

    custard: {
      img: "img/bungeoppang-custard.png",
      title: "Custard Bungeoppang",
      desc: `
            <h3>What it tastes like</h3>
            <p>
              "Crispy fish-shaped waffle filled with smooth, sweet custard cream—like a cream puff meets waffle, the crowd-pleaser version"
            </p>
      
            <h3>Why we love it</h3>
            <ul>
              <li>Universally loved flavor (No acquired taste needed)</li>
              <li>Smooth & creamy (Silky texture, no beans)</li>
              <li>Safer first choice (Familiar cream puff flavor)</li>
              <li>Instagram-worthy (Golden fish + oozing cream = perfect   shot)</li>
              <li>Best of both worlds (Korean street food + Western dessert taste)</li>
            </ul>
      
            <h3>Texture contrast</h3>
            <p>
              Crispy, golden-brown waffle shell breaks to reveal silky-smooth custard cream that flows like lava—completely different mouthfeel from grainy red bean
            </p>
      
            <h3>The Great Unifier</h3>
            <p>
              Custard has virtually no "haters" - it solved the problem of people who wanted bungeoppang but disliked red beans, expanding the market massively
            </p>
      
            <h3>The eternal debate</h3>
            <p>
              "팥 vs 슈크림" (Red Bean vs Custard) is Korea's most wholesome food war—online polls receive 200,000+ votes with results split 50/50, families playfully argue every winter
            </p>
      
            <h3>Where to easily find it</h3>
            <ul>
              <li>Subway station exits (Nov-Feb, peak season—almost every vendor offers both 팥/슈크림)</li>
              <li>University areas (Hongdae, Sinchon, Ewha—students prefer custard)</li>
              <li>Traditional markets (Gwangjang, Namdaemun—both options available)</li>
              <li>Convenience stores (CU, GS25 – frozen section, year-round)</li>
              <li>Department store bakeries (Premium versions with real vanilla custard)</li>
              <li>Theme parks (Lotte World, Everland—tourist-friendly)</li>
            </ul>
      
            <h3>Best time</h3>
            <p>
              Late afternoon to evening (3PM-8PM),  winter months (November-February) 
            </p>
      
            <h3>Pro Tip</h3>
            <p>
            Custard sells out faster than red bean at popular spots—arrive earlier!
            </p>
          `,
    },

    choco: {
      img: "img/bungeoppang-choco.png",
      title: "Chocolate Bungeoppang",
      desc: `
            <h3>What it tastes like</h3>
            <p>
            “Crispy fish waffle filled with rich, melted chocolate - like a portable chocolate lava cake in fish form”
            </p>
      
            <h3>Why we love it</h3>
            <ul>
              <li>Universally loved chocolate (Zero cultural barrier)</li>
              <li>Kid-friendly flavor (Perfect for families)</li>
              <li>Dessert lovers' choice (More indulgent than red bean/custard)</li>
              <li>Hot chocolate sensation (Melted chocolate oozes out)</li>
              <li>Instagram-worthy (Dark chocolate dripping from golden fish = visual gold)</li>
            </ul>
      
            <h3>Pure dessert energy</h3>
            <p>
            Unlike red bean (healthy undertones) or custard (elegant European vibes), chocolate bungeoppang leans fully into indulgence—it's candy in fish form
            <h3>The chocolate lava effect</h3>
            <p>
            When served fresh and hot, the chocolate filling reaches near-liquid state, creating a molten chocolate experience similar to lava cake—but at street food prices     </p>
      
            <h3>Gateway for kids</h3>
            <p>
            Many Korean children graduate from chocolate → custard → red bean as they grow up; chocolate is the "training wheels" version   </p>
      
      
            <h3>Where to easily find it</h3>
            <ul>
              <li>Theme parks (Lotte World, Everland—most popular flavor with kids)</li>
              <li>University areas (Hongdae, Sinchon—experimental vendors offer it)</li>
              <li>Convenience stores (CU, GS25—frozen section, year-round availability)</li>
              <li>Department store food courts (Premium versions with Valrhona chocolate)</li>
              <li>Festival/event venues (K-pop concerts, Christmas markets)</li>
              <li>⚠️ Less common than 팥/슈크림 at traditional street vendors (ask first!)</li>
      
      
            <h3>Best time</h3>
            <p>
              Year-round (least seasonal of all flavors), Peak: After-school hours (3-6PM) when kids are out, Theme parks: Anytime—always available at designated snack carts</p>
      
              <h3>Pro Tip</h3>
            <p>
             Follow vendor Instagram accounts for daily stock updates
            </p> 
          `,
    },

    dubai: {
      img: "img/bungeoppang-dubai.png",
      title: "Dubai Bungeoppang",
      desc: `
            <h3>What it tastes like</h3>
            <p>
              "Viral fusion dessert: crispy fish waffle filled with rich chocolate, crunchy kadayif threads, and pistachio cream 
      -TikTok made it famous”
            </p>
      
            <h3>Why we love it</h3>
            <ul>
              <li> Trending on social media (TikTok/Instagram viral sensation)</li>
              <li> Luxury meets street food (Premium ingredients at affordable price)</li>
              <li>Multiple textures (Crispy + crunchy + creamy all in one)</li>
              <li>Globally familiar flavors (Chocolate & pistachio - no acquired taste needed))</li>
              <li> Limited availability (FOMO factor—sold out daily!)
      </li>
            </ul>
      
            <h3>Texture symphony</h3>
            <p>
           Crispy waffle shell → smooth dark chocolate → crunchy kadayif (Turkish shredded pastry) → creamy pistachio filling      </p>
      
            <h3>Trend-jacking genius</h3>
            <p>
              Korea's superpower of absorbing global trends and making them Korean
            </p>
      
            <h3>Where to easily find it</h3>
            <ul>
              <li>Premium bakeries: 레자미오네뜨 (The Hyundai Seoul B1, Hyundai Trade Center)</li>
              <li>Pop-up stalls: Hongdae, Gangnam, university areas (check Instagram for locations—they move!)</li>
              <li>Department stores: Lotte Mall, Shinsegae food courts</li>
              <li>Social media: Follow hashtags #두바이붕어빵 
            #두바이초코붕어빵 for daily vendor locations</li>
              <li>⚠️ Limited quantities: Most places sell 50-100 sets per day—arrive early!</li>
      
            <h3>Best time</h3>
            <p>
              Weekdays: 2-4PM, 5-7PM (limited time slots, first-come-first-served), Weekends: 12-3PM, 5-8PM (longer hours, 100 sets available)</p>
      
              <h3>Pro Tip</h3>
            <p>
             Follow vendor Instagram accounts for daily stock updates
            </p> 
          `,
    },

    // ============================
    // Tornado Potato Items
    // ============================
    "tornado-original": {
      img: "img/tornado-original.png",
      title: "Original Tornado Potato",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Crispy spiral-cut potato on a stick, seasoned with savory spices—like eating an entire potato chip bag in the most fun way possible"
          </p>
    
          <h3>Why we love it</h3>
          <ul>
            <li>Extremely Instagrammable (Spiral shape = visual magnet)</li>
            <li>Fun to eat (Hand-held, portable, playful)</li>
            <li>Crispy texture (Maximum surface area = maximum crunch)</li>
            <li>Customizable seasoning (Choose your flavor adventure)</li>
            <li>No cultural barrier (Everyone loves fried potatoes!)</li>
          </ul>

          <h3>Engineering marvel</h3>
          <p>
            One potato becomes a 30cm+ spiral with uniform thickness - the cutting technique is oddly satisfying to watch (vendors often do it in front of customers)
          </p>
          
          <h3>Texture optimization</h3>
          <p>
            The spiral shape creates maximum surface area exposure during deep frying, resulting in all-crisp, no-soggy potato - scientifically superior to regular fries
          </p>

          <h3>Flavor delivery system</h3>
          <p>
             Each wave of the spiral holds seasoning powder perfectly, ensuring every bite is evenly flavored (unlike fries where seasoning falls to the bottom)
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Festivals & outdoor events (cherry blossom season, night markets - always present)</li>
            <li>University areas (Hongdae, Sinchon, Ewha - late afternoon crowds)</li>
            <li>Theme parks (Lotte World, Everland - multiple carts throughout)</li>
            <li>Beach/park areas (Hangang Park, Haeundae Beach - summer season)</li>
            <li>Night markets (Dongdaemun, Myeongdong street stalls)</li>
            <li>Tourist hotspots (N Seoul Tower base, Gyeongbokgung area)</li>
          </ul>

          <h3>Best time</h3>
          <p>
            Year-round availability (not seasonal), Peak: Late afternoon to evening (3PM-10PM), Weekends/holidays: Vendors appear in parks, tourist areas
          </p>
      `,
    },
    "tornado-chili": {
      img: "img/tornado-chili.png",
      title: "Chili Tornado Potato",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Spicy, crispy spiral potato with Korean chili seasoning -addictive heat meets crunchy potato perfection"
          </p>

          <h3>Why we love it</h3>
          <ul>
             <li>Korean spice introduction (Mild enough for beginners)</li>
             <li>Addictive flavor combo (Savory + spicy + garlicky)</li>
             <li>Extra crispy coating (Chili powder adds texture)</li>
             <li>Instagram-worthy red color (Vibrant visual appeal)</li>
             <li>Beer pairing champion (Perfect drinking snack)</li>
          </ul>

          <h3>Beginner-friendly Korean spice</h3>
          <p>
            Unlike tteokbokki or buldak (dangerously spicy), chili tornado potato offers manageable heat - spicy enough to feel Korean, mild enough not to ruin your day
          </p>

          <h3>Flavor layering</h3>
          <p>
            Korean chili seasoning (gochugaru-based) isn't just heat - it's sweet, smoky, garlicky, and slightly tangy all at once, coating every spiral ridge
          </p>

          <h3>The addiction factor</h3>
          <p>
             The spice level triggers endorphins without overwhelming, creating the "one more bite" loop - many say it's more addictive than the original
          </p>

          <h3>Visual pop</h3>
          <p>
            The red-orange chili powder creates striking color contrast against golden potato - instantly recognizable in photos
          </p>

          <h3>Where to easily find it</h3>
          <ul>
             <li>Pojangmacha (포장마차) near subway exits - perfect beer snack</li>
             <li>University districts (Hongdae, Sinchon - students love spicy versions)</li>
             <li>Night markets (Dongdaemun, Myeongdong - evening crowds prefer spicy)</li>
             <li>Festivals (every vendor offers chili as standard option)</li>
             <li>Hangang Park (especially popular with delivery chicken/beer combos)</li>
             <li>Theme parks (available but less popular - kids prefer cheese/original)</li>
          </ul>

          <h3>Best time</h3>
          <p>
            Evening/night (5PM-midnight) - spicy food hits different at night, After drinking (pojangmacha culture - soaks up alcohol), Year-round, but especially popular in cooler weather (fall/winter)
          </p>
      `,
    },
    "tornado-cheese": {
      img: "img/tornado-cheese.png",
      title: "Cheese Tornado Potato",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Spiral-cut potato deep-fried to crispy perfection, then coated in savory cheese powder – every ridge dusted with concentrated cheddar flavor that's salty, tangy, and dangerously addictive"
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Cheese powder magic (Concentrated cheddar flavor without the mess)</li>
            <li>Uniform coating (Every spiral ridge catches the seasoning perfectly)</li>
            <li>Savory upgrade (More sophisticated than plain salt, less intense than chili)</li>
            <li>No melting drama (Stays crispy, no gooey cheese fingers)</li>
            <li>Gateway flavor (Perfect middle ground between original and spicy)</li>
          </ul>

          <h3>The addiction factor</h3>
          <p>
            Cheese powder clings to every crevice – the fine dust coating means maximum flavor per bite without overwhelming. Unlike melted cheese, the powder lets you taste the crispy potato while adding savory-tangy depth.
          </p>
          <p>
            Each spiral delivers consistent cheese hit – your brain gets hooked on the salty-savory rhythm. The powder also slightly caramelizes on the hot potato, creating tiny flavor bombs in the crispy edges.
          </p>

          <h3>Visual pop</h3>
          <p>
            That golden potato dusted in orange-yellow cheese powder – instantly recognizable from across the street. The spiral shape shows off the even coating, looking like a cheese-flavored spring.
          </p>
          <p>
            When vendors shake the fresh-fried potato in the seasoning bag, the powder clouds up like a cheese storm, then settles into every ridge. It's less dramatic than melted cheese pulls, but the uniform golden-orange coating has its own hypnotic appeal.
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Pojangmacha (포장마차) near subway exits – Classic beer snack territory</li>
            <li>University districts (Hongdae, Sinchon) – Student favorite, budget-friendly</li>
            <li>Night markets (Dongdaemun, Myeongdong) – Evening snack crowds love it</li>
            <li>Festivals – Cheese powder is a standard option at every stall</li>
            <li>Hangang Park (한강공원) – Picnic pairing with fried chicken and beer</li>
            <li>Theme parks – Less popular than original with kids, but teen favorite</li>
          </ul>

          <h3>Best time</h3>
          <ul>
            <li>Evening/night (5PM-midnight) – Beer pairing perfection</li>
            <li>After work – Savory snack that hits the spot</li>
            <li>Year-round, but especially popular in cooler weather (fall/winter)</li>
            <li>Post-drinking – Savory carbs without spice aftermath</li>
          </ul>

          <h3>Pro tip</h3>
          <p>
            Ask for "치즈 많이" (extra cheese powder) if you want maximum flavor. Some vendors offer "치즈+어니언" (cheese + onion) combo seasoning – double the savory complexity.
          </p>

          <h3>Perfect pairing</h3>
          <p>
            Cheese tornado potato + cold beer = Classic Korean drinking snack. The salty-savory powder makes every sip more refreshing.
          </p>
      `,
    },

    // ============================
    // Tteok Items
    // ============================
    tteokbokki: {
      img: "img/Tteokbokki.png",
      title: "Original Tteokbokki",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Chewy rice cakes in fiery-sweet gochujang sauce – Korea's comfort food that makes you sweat, cry, and crave more"
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Sweet-spicy addiction (Sugar meets gochujang in perfect chaos)</li>
            <li>Chew therapy (Bouncy rice cake texture is oddly satisfying)</li>
            <li>Endorphin rush (Spice triggers natural highs – pain = pleasure)</li>
            <li>Ultimate comfort carbs (Street snack that eats like a full meal)</li>
            <li>Customization game (Add cheese, ramen, eggs – endless combos)</li>
          </ul>

          <h3>The addiction factor</h3>
          <p>
            Pain-pleasure loop: Mouth burns → endorphins kick in → you take another bite to "cool down" – it's a beautifully vicious cycle. The gochujang-sugar sauce thickens as it cooks, coating every rice cake crevice until you're basically eating spicy candy.
          </p>

          <h3>Visual pop</h3>
          <p>
            That violent red-orange sauce bubbling in metal pans – screams danger and deliciousness simultaneously. Topped with fish cakes and eggs, it's controlled chaos on a plate.
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Sindang-dong Tteokbokki Town (신당동) – The mecca</li>
            <li>Gwangjang Market (광장시장) – Legendary Ma Bok-rim stall</li>
            <li>University districts (Hongdae, Sinchon) – Cheap, late-night</li>
            <li>Pojangmacha near subways – Perfect drinking snack</li>
            <li>Convenience stores – Cup tteokbokki for emergencies</li>
          </ul>

          <h3>Best Time</h3>
          <ul>
            <li>Rainy days (Korean law: rain = tteokbokki cravings)</li>
            <li>Winter evenings (5PM-9PM) – Steam + cold weather = perfection</li>
            <li>After drinking (11PM-2AM) – Legendary hangover prevention</li>
            <li>Year-round obsession</li>
          </ul>

          <h3>Pro tip</h3>
          <p>
             Order "덜 매운 걸로" (less spicy) first. Level up gradually.
          </p>

          <h3>Perfect pairing</h3>
          <p>
             Tteokbokki + fried food (튀김) + cold beer = Holy trinity of Korean street food.
          </p>
      `,
    },
    sotteok: {
      img: "img/Sotteok - Sotteok.png",
      title: "Sotteok Sotteok",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Alternating sausage and rice cake skewers glazed in sweet-spicy sauce – the perfect salty-sweet-chewy combo that's impossible to eat just one"
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Texture rollercoaster (Juicy sausage → chewy rice cake → repeat)</li>
            <li>Sweet-spicy-salty trinity (Gochujang glaze meets savory meat perfection)</li>
            <li>Portable perfection (Skewer format = eat while walking, no guilt)</li>
            <li>Nostalgia missile (School festival memories in every bite)</li>
            <li>Ketchup controversy (Some drizzle it, purists rage – pick your side)</li>
          </ul>

          <h3>The addiction factor</h3>
          <p>
            Alternating textures create a rhythm – snap of sausage skin → bounce of rice cake → snap → bounce. Your brain gets hooked on the pattern. The sweet gochujang glaze caramelizes on the grill, creating crispy edges that contrast with soft interiors. It's ASMR you can eat.
          </p>

          <h3>Visual pop</h3>
          <p>
            Those perfectly grilled char marks on glossy red sauce, skewered in neat alternating patterns – it's geometric street food art. Vendors often sprinkle sesame seeds and green onions on top for that final Instagram flex.
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>School zones & university districts (Hongdae, Sinchon) – The birthplace vibe</li>
            <li>Street vendors near subway exits – After-school/work snack time</li>
            <li>Night markets (Dongdaemun, Myeongdong) – Peak evening crowds</li>
            <li>Hangang Park (한강공원) – Picnic essential, pairs with instant ramen</li>
            <li>Festival pop-ups – School festivals, cherry blossom season</li>
          </ul>

          <h3>Best Time</h3>
          <ul>
            <li>After school hours (3PM-6PM) – When students flood the streets</li>
            <li>Weekend evenings – Night market prime time</li>
            <li>Spring/Fall – Outdoor eating weather, festival season</li>
            <li>Year-round, but especially nostalgic during school festival seasons (May, October)</li>
          </ul>

          <h3>Pro tip</h3>
          <p>
             Ask for "양념 많이" (extra sauce) if you want maximum flavor. Some vendors offer cheese powder topping – controversial but dangerously good.
          </p>

          <h3>Perfect pairing</h3>
          <p>
             Sotteok sotteok + fish cake soup (오뎅) = Classic Korean street food combo. The hot broth balances the sweet-spicy skewer.
          </p>
      `,
    },
    "tteok-kkochi": {
      img: "img/Tteok-Kkochi.png",
      title: "Tteok Kkochi",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Skewered rice cakes glazed in sweet-spicy gochujang sauce – like tteokbokki's portable, less aggressive cousin that you can eat while running for the bus"
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Tteokbokki without the commitment (Same flavor, zero bowl required)</li>
            <li>Sweet-spicy gateway drug (Milder than tteokbokki, perfect spice intro)</li>
            <li>Chewy satisfaction (Rice cake texture with char-grilled edges)</li>
            <li>Sauce control (Choose your glaze level – light to drowning)</li>
            <li>One-handed operation (Eat while walking, texting, living your life)</li>
          </ul>

          <h3>The addiction factor</h3>
          <p>
            Grilled char marks add smoky depth that boiled tteokbokki can't match. The sauce caramelizes on the grill, creating sweet-crispy edges while the inside stays bouncy. It's the Goldilocks of Korean street food – not too spicy, not too mild, just right.
          </p>

          <h3>Visual pop</h3>
          <p>
            Those glossy red skewers lined up on the grill, sauce bubbling and caramelizing – pure street food theater. Vendors brush on extra sauce mid-grill for maximum shine. It's tteokbokki's photogenic older sibling.
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Street vendors near subway exits – Rush hour snack champion</li>
            <li>School zones (Hongdae, Sinchon) – Student budget favorite</li>
            <li>Traditional markets (Gwangjang, Namdaemun) – Old-school vendors</li>
            <li>Night markets (Myeongdong, Dongdaemun) – Tourist hotspot</li>
            <li>Pojangmacha – Late-night drinking companion</li>
          </ul>

          <h3>Best Time</h3>
          <ul>
            <li>Rush hour (5PM-7PM) – Grab-and-go commuter fuel</li>
            <li>Winter evenings – Hot skewer in cold weather = perfection</li>
            <li>After school (3PM-5PM) – Student swarm time</li>
            <li>Year-round, but especially comforting in cold weather</li>
          </ul>

          <h3>Pro tip</h3>
          <p>
             Ask for "매운 걸로" (spicy version) if you want the full experience, or "순한 맛" (mild) if you're testing the waters.
          </p>

          <h3>Perfect pairing</h3>
          <p>
             Tteok-kkochi + fish cake soup (오뎅국물) = The classic Korean street food power couple. Hot broth cuts through the sweet sauce perfectly.
          </p>
      `,
    },

    // ============================
    // Hot Dog Items
    // ============================
    "hotdog-original": {
      img: "img/Hot Dog.png",
      title: "Original Hot Dog",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Crispy panko-coated hot dog (or cheese) on a stick, rolled in sugar – a mind-bending sweet-savory collision that shouldn't work but absolutely does"
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Sugar on a hot dog (Sounds insane, tastes like genius)</li>
            <li>Crunch explosion (Panko coating stays crispy for days, basically)</li>
            <li>Cheese pull potential (Mozzarella versions = Instagram gold)</li>
            <li>Ketchup-mustard-sugar chaos (Sweet-tangy-savory all at once)</li>
            <li>Portable indulgence (Corn dogs grew up and got fancy)</li>
          </ul>

          <h3>The addiction factor</h3>
          <p>
            The sugar coating is the plot twist – it caramelizes slightly on the hot surface, creating a sweet crust that contrasts with savory hot dog and tangy condiments. Your brain can't decide if it's dessert or dinner, so you just keep eating.
          </p>
          <p>
            The ultra-crunchy panko stays crispy way longer than American corn dog batter – it's structurally superior.
          </p>

          <h3>Visual pop</h3>
          <p>
            That golden panko armor studded with potato cubes (gamja hot dog) or squid ink black coating – it's armor plating for street food. When you bite into cheese versions, the mozzarella stretch is legendary.
          </p>
          <p>
             Vendors dust it with sugar right in front of you for maximum drama.
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Myeongdong (명동) – Tourist central, every corner has a stand</li>
            <li>Hongdae (홍대) – Trendy variations, experimental flavors</li>
            <li>Convenience stores (GS25, CU) – Reheatable versions (decent emergency option)</li>
            <li>Street vendors near subways – Classic after-school/work snack</li>
            <li>Night markets (Dongdaemun) – Peak evening crowds</li>
          </ul>

          <h3>Best Time</h3>
          <ul>
            <li>After school hours (3PM-6PM) – Student rush</li>
            <li>Weekend shopping trips – Myeongdong/Hongdae walking snack</li>
            <li>Late night (9PM-midnight) – Drinking food that's not too heavy</li>
            <li>Year-round obsession, but especially satisfying in cooler weather</li>
          </ul>

          <h3>Pro tip</h3>
          <p>
             Try "반반" (ban-ban = half-half) – half sausage, half mozzarella on one stick. Best of both worlds. Ask for "설탕 많이" (extra sugar) if you're committed to the chaos.
          </p>

          <h3>Perfect pairing</h3>
          <p>
             Korean corn dog + convenience store banana milk = Nostalgic Korean combo that hits different.
          </p>
      `,
    },
    "hotdog-potato": {
      img: "img/Korea Corn Dog.png",
      title: "Korea Corn Dog (Potato)",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Hot dog armor-plated with crispy potato cubes, then dusted in sugar – like French fries and a corn dog had a baby that's simultaneously crunchy, savory, and sweet"
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Double carb insanity (Potato ON a corn dog = carb lovers' fever dream)</li>
            <li>Crunch squared (Crispy panko + crispy potato cubes = texture overload)</li>
            <li>Sweet-savory chaos (Sugar coating on fried potatoes breaks all the rules)</li>
            <li>Visual flex (Those potato cube studs look like edible LEGO armor)</li>
            <li>Fries built-in (Why choose between fries and corn dog when you can have both?)</li>
          </ul>

          <h3>The addiction factor</h3>
          <p>
            Each bite delivers three textures: crunchy potato exterior → crispy panko layer → juicy hot dog (or stretchy cheese) core. The potato cubes get extra crispy in the fryer while staying fluffy inside – they're basically gourmet tater tots welded to your corn dog.
          </p>
          <p>
             The sugar dusting caramelizes on the hot potato, creating sweet-salty perfection that your brain wasn't ready for.
          </p>

          <h3>Visual pop</h3>
          <p>
            That spiky potato armor is instantly recognizable – golden cubes jutting out like delicious battle gear. When vendors pull it from the fryer, those potato edges are perfectly bronzed. It's the most photogenic corn dog evolution, looking like street food went to design school.
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Myeongdong (명동) – Every hotdog stand offers gamja version</li>
            <li>Hongdae (홍대) – Student favorite, creative variations</li>
            <li>Convenience stores (GS25, CU) – Pre-made versions (reheatable)</li>
            <li>Night markets (Dongdaemun, Gwangjang) – Peak evening availability</li>
            <li>Street vendors near universities – Affordable student pricing</li>
          </ul>

          <h3>Best Time</h3>
          <ul>
            <li>After school/work (3PM-7PM) – Peak snack attack hours</li>
            <li>Weekend shopping trips – Perfect walking food</li>
            <li>Late night (9PM-1AM) – Post-drinking carb bomb</li>
            <li>Year-round, but especially satisfying in fall/winter when you want something hot and substantial</li>
          </ul>

          <h3>Pro tip</h3>
          <p>
             Order "치즈 감자" (cheese gamja) for the ultimate combo – mozzarella pull + potato crunch + sugar coating. Ask for "설탕 적게" (less sugar) if the sweet-savory combo sounds too wild for your first time.
          </p>

          <h3>Perfect pairing</h3>
          <p>
             Gamja hot dog + pickled radish (단무지) = The crunchy-tangy contrast cuts through the richness perfectly.
          </p>
      `,
    },
    "hotdog-cheese": {
      img: "img/hotdog-cheese.png",
      title: "Cheese Hot Dog",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Molten mozzarella stick on steroids, coated in crispy panko and dusted with sugar – the cheese pull is so legendary it's basically a sport"
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Cheese pull Olympics (Stretchy mozzarella that goes on forever – Instagram's favorite trick)</li>
            <li>Gooey vs. crunchy battle (Molten cheese core vs. crispy panko shell)</li>
            <li>Sugar on cheese?! (Sounds criminal, tastes like innovation)</li>
            <li>No meat guilt (Vegetarian-friendly street food win)</li>
            <li>Double cheese options (Some versions wrap cheese around MORE cheese)</li>
          </ul>

          <h3>The addiction factor</h3>
          <p>
            The mozzarella stretch is engineered for maximum drama – vendors use high-quality cheese that stays gooey even as it cools. First bite releases a cheese avalanche through the crispy coating.
          </p>
          <p>
            The sugar dusting creates sweet-salty-creamy chaos that shouldn't work but absolutely does. Your brain short-circuits trying to process "dessert or dinner?" so you just eat another one.
          </p>

          <h3>Visual pop</h3>
          <p>
            The cheese pull moment is social media gold – that long, elastic mozzarella string between your mouth and the stick. The golden panko armor contrasts with white cheese oozing out.
          </p>
          <p>
            Vendors know the power of the pull, often demonstrating it before handing it over. It's performance art you can eat.
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Myeongdong (명동) – Cheese pull central, tourist favorite</li>
            <li>Hongdae (홍대) – Creative versions with multiple cheese types</li>
            <li>Convenience stores (GS25, CU, 7-Eleven) – Microwaveable (cheese pull not guaranteed)</li>
            <li>Street vendors everywhere – Most popular hot dog variation</li>
            <li>Food courts (COEX, Starfield) – Chain versions with consistent quality</li>
          </ul>

          <h3>Best Time</h3>
          <ul>
            <li>Afternoon snack (2PM-5PM) – Post-lunch cheese craving peak</li>
            <li>Weekend hangouts – Perfect shareable photo op food</li>
            <li>Cold weather (fall/winter) – Hot melted cheese = instant comfort</li>
            <li>Year-round obsession, but the cheese pull hits different when it's cold outside</li>
          </ul>

          <h3>Pro tip</h3>
          <p>
             Ask for "치즈 많이" (extra cheese) if you want maximum pull potential. Try "모짜핫도그" (mozza hot dog) – entire stick is pure mozzarella, no hot dog. Order "설탕 빼고" (no sugar) if sweet cheese isn't your thing.
          </p>

          <h3>Perfect pairing</h3>
          <p>
             Cheese hot dog + pickled radish (단무지) + cola = The holy trinity. Tangy radish cuts through cheese richness, cola cleanses the palate.
          </p>
      `,
    },

    // ============================
    // Grain (Bbungtigi) Items
    // ============================
    "grain-rice": {
      img: "img/rice.png",
      title: "Original Bbungtigi",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Light, airy, and crunchy puffed rice snack with a hint of natural grain flavor—simple, satisfying, and slightly addictive."
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Crispy and airy (so fun to munch!)</li>
            <li>Slightly nutty and naturally sweet (no heavy sugar)</li>
            <li>Easy street snack experience (nostalgic vibes)</li>
            <li>Budget-friendly (cheap and filling)</li>
            <li>Unique texture (crispy shell with a delicate crunch—different from chips!)</li>
          </ul>

          <h3>Texture contrast</h3>
          <p>
            Light, crisp exterior with a satisfying airy crunch throughout
          </p>

          <h3>Nostalgic value</h3>
          <p>
            Many Koreans remember snacking on rice puffs during festivals, markets, or after school in childhood
          </p>

          <h3>Seasonal ritual</h3>
          <p>
            Often sold at markets, festivals, and street stalls year-round, but extra popular during holidays and winter festival seasons
          </p>

          <h3>The flavor debate</h3>
          <p>
            Plain salted rice vs. sugar-coated rice—some prefer the classic light saltiness, others love the sweet, powdery coating
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Traditional markets (Namdaemun, Gwangjang)</li>
            <li>Street festival stalls (year-round)</li>
            <li>Convenience stores (CU, GS25—snack aisle, year-round)</li>
            <li>Online snack shops (packaged, year-round)</li>
          </ul>

          <h3>Best Time</h3>
          <p>
            Anytime! Perfect for snack breaks, festivals, or cozying up with tea at home
          </p>
      `,
    },
    "grain-corn": {
      img: "img/gangnaengi.png",
      title: "Corn Gangnaengi",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Crunchy, lightly roasted corn kernels with a subtle nutty flavor—simple, addictive, and perfect for munching anytime."
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Extremely snackable (small, bite-sized, perfect hand-held portion)</li>
            <li>Lightly crunchy texture (satisfying without being heavy)</li>
            <li>Naturally flavorful (corn’s inherent sweetness and nuttiness)</li>
            <li>Budget-friendly (cheap and filling)</li>
            <li>Universal appeal (everyone can enjoy this crispy snack!)</li>
          </ul>

          <h3>Engineering marvel</h3>
          <p>
            Each kernel pops or roasts individually, creating a light, airy crunch that’s oddly satisfying to eat—perfectly consistent bite after bite.
          </p>

          <h3>Texture optimization</h3>
          <p>
            The roasted/puffed corn structure ensures maximum crunch with minimal effort—scientifically superior to ordinary chips that lose crispiness fast.
          </p>

          <h3>Flavor delivery system</h3>
          <p>
            Every kernel holds a delicate balance of natural flavor or light seasoning, ensuring even taste in every handful.
          </p>

          <h3>The "eating experience"</h3>
          <p>
            Pop them one by one, handfuls at a time, or mix with other snacks—interactive and endlessly munchable.
          </p>

          <h3>Nostalgic value</h3>
          <p>
            Many Koreans grew up enjoying corn gangnaengi at markets, festivals, or after school, making it a comforting, nostalgic snack.
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Traditional markets (Namdaemun, Gwangjang Market)</li>
            <li>Festival stalls and outdoor events (year-round, peak during holiday seasons)</li>
            <li>Convenience stores (CU, GS25—packaged snacks, year-round)</li>
            <li>Online snack shops (packaged, all-year availability)</li>
          </ul>

          <h3>Best Time</h3>
          <p>
            Anytime! Great for snacking at home, sharing with friends, or enjoying at outdoor events
          </p>
      `,
    },
    "grain-icecream": {
      img: "img/IceCream Bbungtigi.png",
      title: "Icecream Bbungtigi",
      desc: `
          <h3>What it tastes like</h3>
          <p>
            "Nostalgic puffed rice crunch meets creamy soft-serve – childhood snack transformed into an ice cream sandwich that's simultaneously light, airy, and indulgent"
          </p>

          <h3>Why we love it</h3>
          <ul>
            <li>Texture contrast heaven (Cloud-like puffed rice vs. smooth ice cream)</li>
            <li>Zero-guilt illusion (Feels lighter than waffle cones due to airy bbungtigi)</li>
            <li>Retro nostalgia trigger (Grandma's street snack meets modern dessert)</li>
            <li>Customization playground (Mix-and-match ice cream flavors with different bbungtigi types)</li>
            <li>Accidental diet hack (The air pockets make you feel full faster – less ice cream, more satisfaction)</li>
          </ul>

          <h3>Beginner-friendly Korean nostalgia</h3>
          <p>
            Bbungtigi (뻥튀기) is Korea's OG puffed snack – imagine rice cakes exploded into crispy clouds. Your grandparents bought it from street vendors with wooden carts.
          </p>
          <p>
             Now it's hijacked by Gen Z as an ice cream vessel, turning childhood memories into Instagram content.
          </p>

          <h3>The genius engineering</h3>
          <p>
            Unlike soggy waffle cones, bbungtigi stays crunchy for 10+ minutes thanks to its porous structure that doesn't absorb moisture quickly.
          </p>
          <p>
             Each bite delivers alternating waves of cold creaminess and crackling rice puffs – it's textural ASMR you can eat.
          </p>

          <h3>The addiction factor</h3>
          <ul>
            <li>The sweet-savory balance (slightly salted bbungtigi cuts through ice cream sweetness)</li>
            <li>Light but satisfying (you finish one and immediately want another because it feels "healthier")</li>
            <li>Flavor archaeology (hunting for caramelized rice bits stuck to melted ice cream)</li>
          </ul>

          <h3>Visual pop</h3>
          <p>
            The contrast is chef's kiss – pristine white/pastel ice cream nestled in rough, golden-brown puffed rice discs. It looks like a cloud sandwich, and every angle is feed-worthy. Vendors often add colorful toppings (crushed Oreos, fruit, honeycomb) for extra drama.
          </p>

          <h3>Where to easily find it</h3>
          <ul>
            <li>Ikseon-dong Hanok Village (익선동) – Trendy cafes serving artisan versions with premium ice cream</li>
            <li>Traditional markets (Gwangjang, Tongin) – Old-school vendors now offering the hybrid treat</li>
            <li>University districts (Hongdae, Sinchon) – Student-friendly prices, experimental flavors</li>
            <li>Dessert cafes in Gangnam/Garosugil (강남/가로수길) – Upscale versions with imported ice cream</li>
            <li>Hangang Park food trucks (한강공원) – Summer pop-ups capitalize on the trend</li>
            <li>Convenience stores (GS25, CU) – Pre-packaged versions (less impressive but convenient)</li>
          </ul>

          <h3>Best Time</h3>
          <ul>
            <li>Late spring to early fall (April-September) – Peak ice cream season, outdoor eating weather</li>
            <li>Afternoon snack time (2PM-5PM) – Post-lunch dessert crowds at cafes</li>
            <li>Weekend hanok village strolls (11AM-6PM) – Pairs perfectly with traditional architecture tourism</li>
            <li>Summer festivals (July-August) – Vendors set up specifically for evening crowds</li>
          </ul>

          <h3>Pro tip</h3>
          <p>
             Order it in cooler weather (early spring/late fall) for a hidden advantage – the bbungtigi stays crunchier longer, and you can savor it without racing against melting ice cream.
          </p>
      `,
    },
  };

  if (cardListView && detailView) {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        const key = card.dataset.food;
        console.log("Card clicked:", key);

        // If it's a tornado/tteok card, it might have data-food but not in foodData?
        // Let's check if the key exists in foodData.
        const info = fullFoodData[key];

        // Safety: If data is not in foodData (e.g. tornado items), maybe we shouldn't do the detail view transition?
        // The original code tried to open detail view for ALL cards.
        // But tornado items (e.g. "tornado-original") are NOT in foodData.
        // So info will be undefined.

        if (!info) {
          console.log(
            "No detail info for this card, skipping detail view transition."
          );
          return;
        }

        // Fill Data
        if (detailImg) {
          detailImg.src = info.img;
          detailImg.alt = info.title;
        }
        if (detailTitle) detailTitle.textContent = info.title;
        if (detailDesc) detailDesc.innerHTML = info.desc;
        // Price matches original logic? Original code had commented out prices in object but used info.price
        // Re-checking original code: keys like `price: "3 for 2,000 won"` were commented out!
        // But line 288: `detailPrice.textContent = info.price;`
        // If info.price is undefined, it sets textContent to empty.
        if (detailPrice) detailPrice.textContent = info.price || "";

        // Show Detail View
        showPage(detailView);
      });
    });
  }

  if (detailBack) {
    detailBack.addEventListener("click", () => {
      console.log("Back button clicked, returning to:", lastActivePage);
      // Go back to the last active page (or default to Bungeoppang if null)
      showPage(lastActivePage || cardListView);
    });
  }
});
