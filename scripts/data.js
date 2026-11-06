/**
 * Bakerz Bite - Product Catalog, Offers, Gallery, and Store Data
 * Brand Ethos: Premium quality, 100% real butter, farm cream, unbleached flour, no harmful additives.
 * Currency: Pakistani Rupees (PKR / Rs.)
 */

const BAKERY_DATA = {
  brand: {
    name: "Bakerz Bite",
    tagline: "Where smiles are served daily.",
    phone: "+92 (42) 3578-BAKE",
    phoneDisplay: "+92 (42) 3578-2253",
    whatsapp: "+92 300 2253792",
    email: "hello@bakerzbite.com",
    address: "Plot 14-C, Artisan Commercial Zone, Gulberg III, Lahore, Pakistan",
    hours: {
      weekdays: "Mon - Fri: 7:00 AM - 10:00 PM",
      weekends: "Sat - Sun: 7:30 AM - 11:00 PM"
    },
    currency: "PKR",
    currencySymbol: "Rs.",
    deliveryFee: 250,
    freeDeliveryThreshold: 3000,
    gstRate: 0.05, // 5% GST for bakery/food service
    ethos: [
      {
        icon: "butter",
        title: "100% Real Butter",
        desc: "Strictly pure Normandy & grass-fed creamery butter (82% butterfat). Never margarine, shortening, or palm oil."
      },
      {
        icon: "flour",
        title: "Unbleached Stone-Ground Flour",
        desc: "Certified non-GMO, naturally aged, unbromated and unbleached heirloom wheat flour for pure golden crusts."
      },
      {
        icon: "cream",
        title: "Farm-Fresh Heavy Cream",
        desc: "Rich local dairy cream whipped daily with whole Madagascan bourbon vanilla beans and pure cane sugar."
      },
      {
        icon: "clean",
        title: "0% Artificial Additives",
        desc: "No synthetic preservatives, artificial colorings, high fructose corn syrup, or chemical dough conditioners."
      }
    ]
  },

  categories: [
    { id: "all", name: "All Delights", icon: "sparkles" },
    { id: "cakes", name: "Signature Cakes", icon: "cake" },
    { id: "pastries", name: "Artisan Pastries", icon: "croissant" },
    { id: "cookies", name: "Fresh-Baked Cookies", icon: "cookie" },
    { id: "pies", name: "Rustic Pies & Tarts", icon: "pie" },
    { id: "merchandise", name: "Boutique Merch", icon: "coffee" }
  ],

  products: [
    // --- CAKES ---
    {
      id: "cake-1",
      name: "Belgian Triple Chocolate Truffle Cake",
      category: "cakes",
      price: 3850,
      rating: 4.9,
      reviewCount: 128,
      badge: "Best Seller",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Rich layers of dark chocolate sponge layered with 70% Valrhona ganache and cocoa nibs.",
      description: "Our signature masterpiece crafted for true chocolate aficionados. Soft, moist chocolate sponge made with unbleached Dutch cocoa, layered generously with silky ganache made from 70% single-origin Belgian chocolate and farm-fresh heavy cream, finished with a mirror glaze and delicate edible gold leaf.",
      ingredients: [
        "100% Real Grass-Fed Sweet Cream Butter (82% butterfat)",
        "Single-Origin 70% Valrhona Belgian Dark Chocolate",
        "Farm-Fresh Local Heavy Cream",
        "Certified Unbleached Heritage Wheat Flour",
        "Organic Cage-Free Brown Eggs",
        "Pure Madagascar Bourbon Vanilla",
        "Raw Organic Cane Sugar"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy", "Eggs"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "410 kcal / slice",
      portion: "Serves 8-10 slices"
    },
    {
      id: "cake-2",
      name: "Madagascar Vanilla Bean Velvet Cake",
      category: "cakes",
      price: 3200,
      rating: 4.8,
      reviewCount: 94,
      badge: "Customer Favorite",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Tender golden sponge infused with slow-extracted vanilla beans and silky Swiss meringue buttercream.",
      description: "Delicate, melt-in-your-mouth crumb scented with thousands of organic Madagascar vanilla seeds. Whipped with European butter and whipped egg whites for a cloud-like texture that is never overly sweet.",
      ingredients: [
        "Pure Grade-A Normandy European Butter",
        "Whole Organic Madagascar Vanilla Beans",
        "Unbleached Pastry Flour",
        "Slow-Whipped Farm Fresh Cream",
        "Free-Range Egg Whites",
        "Cane Sugar & Sea Salt"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy", "Eggs"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "340 kcal / slice",
      portion: "Serves 8-10 slices"
    },
    {
      id: "cake-3",
      name: "Basque Burnt Caramel Cheesecake",
      category: "cakes",
      price: 3600,
      rating: 5.0,
      reviewCount: 162,
      badge: "Chef's Award",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Caramelized deeply on the outside with an ultra-creamy, molten custard center.",
      description: "Baked at high heat to achieve that gorgeous smoky caramel crust while maintaining an impossibly smooth, custardy center. Made exclusively with Philadelphia cream cheese, farm heavy cream, and natural Madagascar vanilla.",
      ingredients: [
        "Farmstead Cream Cheese & Fresh Dairy Curds",
        "100% Real Heavy Whipping Cream",
        "Organic Free-Range Egg Yolks",
        "Minimal Unbleached Flour (for structure)",
        "Organic Raw Cane Sugar & Pinch of Maldon Flaky Salt"
      ],
      allergens: ["Milk / Dairy", "Eggs", "Wheat / Gluten (trace)"],
      dietary: ["Vegetarian", "Low-Gluten Recipe"],
      calories: "390 kcal / slice",
      portion: "Serves 8 slices"
    },
    {
      id: "cake-4",
      name: "Salted Caramel & Toasted Pecan Layer Cake",
      category: "cakes",
      price: 3950,
      rating: 4.9,
      reviewCount: 81,
      badge: "Seasonal Special",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Brown butter sponge with house-made salted amber caramel and buttery roasted Georgia pecans.",
      description: "We brown our butter until it smells nutty and intoxicating, fold it into unbleached flour sponge, and drizzle generous layers of slow-simmered sea salt caramel made with heavy cream and real butter.",
      ingredients: [
        "Browned European Sweet Butter",
        "House-Cooked Amber Sea Salt Caramel",
        "Roasted Georgia Pecans",
        "Unbleached Stone-Ground Flour",
        "Farm Dairy Cream",
        "Grade A Maple Syrup"
      ],
      allergens: ["Tree Nuts (Pecans)", "Wheat / Gluten", "Milk / Dairy", "Eggs"],
      dietary: ["Vegetarian"],
      calories: "440 kcal / slice",
      portion: "Serves 8-10 slices"
    },

    // --- PASTRIES ---
    {
      id: "pastry-1",
      name: "Artisan French Butter Croissant",
      category: "pastries",
      price: 450,
      rating: 5.0,
      reviewCount: 245,
      badge: "Fresh at 7 AM",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Golden, shattering honeycomb exterior with tender, butter-steeped layers within.",
      description: "Laminated over 72 hours with 27 individual micro-layers of 84% butterfat European churned butter and cold-fermented unbleached flour dough. Flaky on the outside, feather-light and cloud-like inside.",
      ingredients: [
        "84% Butterfat Churned Cultured Butter",
        "French T55 Style Unbleached Flour",
        "Filtered Spring Water & Fresh Yeast",
        "Whole Milk",
        "Guerande Grey Sea Salt"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "280 kcal",
      portion: "1 Large Croissant"
    },
    {
      id: "pastry-2",
      name: "Valrhona Pain au Chocolat",
      category: "pastries",
      price: 550,
      rating: 4.9,
      reviewCount: 198,
      badge: "Best Seller",
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Double batons of semi-sweet chocolate nestled inside multi-layered buttery puff dough.",
      description: "Handcrafted with two solid batons of Valrhona 55% French chocolate encased in our classic three-day laminated butter pastry. Baked each morning until deeply caramelized and fragrant.",
      ingredients: [
        "100% Real European Cultured Butter",
        "Valrhona 55% Chocolate Batons",
        "Unbleached Stone-Ground Flour",
        "Farm Fresh Whole Milk",
        "Sea Salt & Brown Cane Sugar"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy", "Soy Lecithin (Chocolate)"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "320 kcal",
      portion: "1 Pastry"
    },
    {
      id: "pastry-3",
      name: "Wild Blackberry & Vanilla Custard Danish",
      category: "pastries",
      price: 580,
      rating: 4.8,
      reviewCount: 76,
      badge: "New",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Crisp flaky pastry well filled with silky vanilla cream and tart organic mountain berries.",
      description: "A fluted puff pastry boat laden with our scratch-made egg yolk vanilla bean custard and topped with fresh organic mountain blackberries, brushed with warm apricot glaze.",
      ingredients: [
        "Real European Creamery Butter",
        "Unbleached Heritage Flour",
        "Farm Cream & Egg Yolk Custard",
        "Organic Wild Blackberries",
        "Pure Bourbon Vanilla & Natural Apricot Glaze"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy", "Eggs"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "310 kcal",
      portion: "1 Danish"
    },
    {
      id: "pastry-4",
      name: "Pistachio Rose Cardamom Escargot",
      category: "pastries",
      price: 650,
      rating: 4.9,
      reviewCount: 110,
      badge: "Chef's Pick",
      image: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Swirled laminated dough packed with roasted pistachio frangipane and subtle organic rose essence.",
      description: "Spiraled pastry rolled with finely crushed Sicilian green pistachios, sweet butter frangipane cream, freshly cracked green cardamom, and showered in candied edible rose petals.",
      ingredients: [
        "Raw Sicilian Bronte Pistachios",
        "100% Real Grass-Fed Butter",
        "Unbleached Flour",
        "Farm Cream",
        "Organic Rose Hydrosol & Green Cardamom"
      ],
      allergens: ["Tree Nuts (Pistachio, Almond)", "Wheat / Gluten", "Milk / Dairy", "Eggs"],
      dietary: ["Vegetarian"],
      calories: "360 kcal",
      portion: "1 Escargot Pastry"
    },

    // --- COOKIES ---
    {
      id: "cookie-1",
      name: "Maldon Sea Salt Valrhona Dark Choc Cookie",
      category: "cookies",
      price: 380,
      rating: 5.0,
      reviewCount: 312,
      badge: "Iconic Classic",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Crispy edges, chewy molten center, filled with puddles of 72% dark chocolate & flaky salt.",
      description: "We age our cookie dough for 48 hours to allow the butterfat and natural vanilla to deeply hydrate the flour. Every bite delivers warm, molten pockets of dark Valrhona chocolate countered by crunchy Maldon sea salt flakes.",
      ingredients: [
        "Browned Normandy Butter",
        "Valrhona 72% Dark Chocolate Discs",
        "Unbleached Artisan Pastry Flour",
        "Free-Range Eggs",
        "Dark Muscovado Sugar & Maldon Sea Salt"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy", "Eggs"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "290 kcal",
      portion: "1 Jumbo Cookie (110g)"
    },
    {
      id: "cookie-2",
      name: "Toasted Macadamia & White Velvet Cookie",
      category: "cookies",
      price: 420,
      rating: 4.8,
      reviewCount: 140,
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Golden roasted Hawaiian macadamias folded into sweet brown butter dough with pure cocoa butter chunks.",
      description: "Slow-roasted whole macadamia nuts deliver a buttery crunch, balanced with premium Belgian white chocolate made with real cocoa butter (never vegetable fat).",
      ingredients: [
        "Hawaiian Dry-Roasted Macadamias",
        "Pure Cocoa Butter Belgian White Chocolate",
        "Grass-Fed Dairy Butter",
        "Unbleached Heirloom Wheat Flour",
        "Bourbon Vanilla & Sea Salt"
      ],
      allergens: ["Tree Nuts (Macadamia)", "Wheat / Gluten", "Milk / Dairy", "Eggs"],
      dietary: ["Vegetarian"],
      calories: "320 kcal",
      portion: "1 Jumbo Cookie"
    },
    {
      id: "cookie-3",
      name: "Chewy Brown Butter Spiced Snickerdoodle",
      category: "cookies",
      price: 320,
      rating: 4.9,
      reviewCount: 92,
      badge: "Comfort Favorite",
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Pillowy, cinnamon-sugar dusted cookie with nutty browned butter notes and crisp edges.",
      description: "Rolled twice in fragrant organic Ceylon cinnamon and raw cane sugar before baking. Soft, thick, and wonderfully comforting with our signature brown butter undertone.",
      ingredients: [
        "Grass-Fed Brown Butter",
        "True Organic Ceylon Cinnamon",
        "Unbleached White Wheat Flour",
        "Cream of Tartar (natural raising agent)",
        "Organic Eggs & Raw Cane Sugar"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy", "Eggs"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "260 kcal",
      portion: "1 Large Cookie"
    },

    // --- PIES ---
    {
      id: "pie-1",
      name: "Heirloom Dutch Spiced Apple Pie",
      category: "pies",
      price: 2850,
      rating: 4.9,
      reviewCount: 154,
      badge: "Bakerz Signature",
      image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Heaped with Honeycrisp & Granny Smith apples, brown sugar crumble, in an all-butter crust.",
      description: "Over 3 pounds of freshly peeled Hudson Valley apples tossed in nutmeg, clove, and apple cider reduction, encased in our ultra-flaky all-butter crust and crowned with toasted oat-butter streusel.",
      ingredients: [
        "100% Grass-Fed Cold Churned Butter",
        "Unbleached Pastry Flour",
        "Hudson Valley Fresh Granny Smith & Honeycrisp Apples",
        "Ceylon Cinnamon, Fresh Nutmeg & Allspice",
        "Brown Sugar Butter Streusel"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "360 kcal / slice",
      portion: "Whole 9-inch Pie (8 slices)"
    },
    {
      id: "pie-2",
      name: "Wild Blueberry & Thyme Lattice Tart",
      category: "pies",
      price: 2650,
      rating: 4.8,
      reviewCount: 88,
      badge: "Fresh Baked",
      image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Bursting with sweet-tart Maine wild blueberries kissed with fresh garden thyme.",
      description: "A hand-crimped butter lattice reveals a deep purple jewel of sweet, juicy wild blueberries infused with a whisper of organic garden thyme and fresh lemon zest.",
      ingredients: [
        "Maine Wild Mountain Blueberries",
        "Real European Butter (82% fat)",
        "Unbleached Stone-Ground Flour",
        "Organic Garden Thyme",
        "Fresh Meyer Lemon Zest & Cane Sugar"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "310 kcal / slice",
      portion: "Whole 9-inch Pie (8 slices)"
    },
    {
      id: "pie-3",
      name: "Velvety Meyer Lemon Silk Meringue Pie",
      category: "pies",
      price: 2750,
      rating: 5.0,
      reviewCount: 115,
      badge: "Crowd Pleaser",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Tangy curd made with fresh Meyer lemons, topped with towering torched vanilla meringue.",
      description: "Bright, zesty lemon curd whipped with rich butter and farm egg yolks, resting on an all-butter crust and piled high with glossy, caramelized French meringue toasted to amber perfection.",
      ingredients: [
        "Fresh Squeezed Meyer Lemon Juice & Zest",
        "European Churned Butter",
        "Farm Egg Yolks & Whipped Whites",
        "Unbleached Flour Crust",
        "Bourbon Vanilla Extract"
      ],
      allergens: ["Wheat / Gluten", "Milk / Dairy", "Eggs"],
      dietary: ["Vegetarian", "Nut-Free"],
      calories: "330 kcal / slice",
      portion: "Whole 9-inch Pie (8 slices)"
    },

    // --- MERCHANDISE ---
    {
      id: "merch-1",
      name: "Bakerz Bite Artisan Matte Ceramic Mug",
      category: "merchandise",
      price: 1650,
      rating: 4.9,
      reviewCount: 88,
      badge: "Official Merch",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      shortDesc: "14oz heavy stoneware mug in cocoa & warm cream with debossed Bakerz Bite logo.",
      description: "Custom-thrown speckled stoneware ceramic mug with a warm cocoa matte glaze exterior and creamy satin interior. Ergonomically shaped handle keeps your morning brew warm for hours. Dishwasher and microwave safe.",
      ingredients: [
        "Handmade Natural Stoneware Clay",
        "Lead-Free, Non-Toxic Food Grade Matte Glaze",
        "Debossed Bakerz Bite Artisanal Insignia",
        "Capacity: 14 fl oz / 415 ml"
      ],
      allergens: ["None"],
      dietary: ["Dishwasher Safe", "Microwave Safe", "Eco-Friendly"],
      calories: "Holds endless hot chocolate & coffee",
      portion: "1 Artisan Mug"
    },
    {
      id: "merch-2",
      name: "Organic Heavy Canvas Baker's Tote Bag",
      category: "merchandise",
      price: 1950,
      rating: 5.0,
      reviewCount: 104,
      badge: "Staff Pick",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      shortDesc: "16oz unbleached organic cotton tote bag with reinforced handles and interior baguette sleeve.",
      description: "Crafted from 100% GOTS certified organic unbleached cotton canvas. Designed specifically for bakery runs with an elastic interior pocket that holds a warm baguette upright, plus dedicated spots for cookie boxes and your wallet.",
      ingredients: [
        "100% GOTS Certified Organic Unbleached Cotton (16oz heavy weave)",
        "Water-Based Non-Toxic Vegetable Inks",
        "Reinforced Cross-Stitched Handles",
        "Dimensions: 16\" H x 15\" W x 5\" D"
      ],
      allergens: ["None"],
      dietary: ["100% Biodegradable", "Zero Plastic", "Machine Washable"],
      calories: "Carries up to 35 lbs of pastries",
      portion: "1 Canvas Tote"
    },
    {
      id: "merch-3",
      name: "Double-Walled Borosilicate Iced Glass",
      category: "merchandise",
      price: 1450,
      rating: 4.8,
      reviewCount: 63,
      badge: "Best Seller",
      image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80",
      shortDesc: "16oz sweat-proof thermal glass with bamboo lid and reusable glass pastry straw.",
      description: "Engineered with double-wall thermal borosilicate glass that keeps your iced latte or cold brew icy cold without condensation on your hands or café table. Comes complete with a natural bamboo seal lid and glass straw.",
      ingredients: [
        "High-Durability Borosilicate Thermal Glass (-20°C to 150°C)",
        "Natural Moso Bamboo Lid with Food-Grade Silicone Gasket",
        "Borosilicate Smoothie / Iced Drink Straw",
        "Capacity: 16 fl oz / 480 ml"
      ],
      allergens: ["None"],
      dietary: ["BPA-Free", "Condensation-Proof", "Sustainable"],
      calories: "Zero sweat rings on your wood table",
      portion: "1 Glass + Lid + Straw"
    },
    {
      id: "merch-4",
      name: "Hand-Carved Walnut & Brass Pastry Serving Tray",
      category: "merchandise",
      price: 4200,
      rating: 5.0,
      reviewCount: 47,
      badge: "Limited Edition",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Solid American Walnut serving board with brushed golden brass handles and crumb grooves.",
      description: "Handcrafted from sustainably harvested American Walnut and finished with pure food-grade organic walnut oil and beeswax. Features brushed brass handles and subtle perimeter grooves to catch flaky croissant crumbs.",
      ingredients: [
        "Solid Sustainably Harvested American Walnut Wood",
        "Solid Brushed Antique Brass Hardware",
        "Organic Beeswax & Food-Grade Mineral Oil Finish",
        "Dimensions: 18\" L x 10\" W x 1.25\" H"
      ],
      allergens: ["Finished with Walnut Oil (Tree Nut)"],
      dietary: ["Hand Wash Only", "Heirloom Quality"],
      calories: "Designed to serve joy for generations",
      portion: "1 Artisan Serving Tray"
    }
  ],

  offers: [
    {
      id: "offer-1",
      code: "SWEETMORNING",
      title: "Morning Smile Combo",
      discount: "25% OFF",
      type: "percentage",
      value: 0.25,
      minOrder: 800,
      tag: "Breakfast Deal",
      highlight: "Daily 7:00 AM – 11:30 AM",
      desc: "Enjoy 25% off when you pair any artisan flaky pastry or croissant with a handcrafted barista coffee.",
      terms: "Valid on all pastries and espresso drinks with a minimum order of Rs. 800."
    },
    {
      id: "offer-2",
      code: "SMILE20",
      title: "Celebration Cake Special",
      discount: "20% OFF",
      type: "percentage",
      value: 0.20,
      minOrder: 2500,
      tag: "Weekend Family Treat",
      highlight: "On All Whole Cakes & Pies",
      desc: "Planning a birthday, anniversary, or gathering? Take 20% off any full-sized artisan cake or pie.",
      terms: "Valid on all 8-inch and 9-inch whole bakery items. Minimum order Rs. 2,500."
    },
    {
      id: "offer-3",
      code: "FRESHBAKE",
      title: "First Bite Welcome Gift",
      discount: "Rs. 500 OFF",
      type: "fixed",
      value: 500,
      minOrder: 2000,
      tag: "New Friend Welcome",
      highlight: "Orders Over Rs. 2,000",
      desc: "New to Bakerz Bite? Here is Rs. 500 off your very first order of our fresh oven-baked goods.",
      terms: "Applies to first-time online orders with subtotal of Rs. 2,000 or more."
    },
    {
      id: "offer-4",
      code: "FREEMUG",
      title: "Merch & Bakes Bundle",
      discount: "FREE MUG",
      type: "gift",
      value: 1650,
      minOrder: 5000,
      tag: "Collector's Reward",
      highlight: "Orders Over Rs. 5,000",
      desc: "Get our signature handcrafted Bakerz Bite Ceramic Mug (Rs. 1,650 value) added to your parcel at zero cost!",
      terms: "Automatically adds complimentary mug when code is applied and subtotal is Rs. 5,000+."
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Scoring Artisan Sourdough",
      category: "craft",
      categoryName: "Bakery Craft",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
      caption: "Hand-scoring naturally fermented loaves before hitting the volcanic stone hearth deck."
    },
    {
      id: "gal-2",
      title: "Morning Croissant Lamination",
      category: "craft",
      categoryName: "Bakery Craft",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
      caption: "27 precise micro-layers of real Normandy cultured butter and unbleached heritage flour."
    },
    {
      id: "gal-3",
      title: "Signature Berry Velvet Tart",
      category: "bakes",
      categoryName: "Fresh Bakes",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80",
      caption: "Hand-picked organic wild mountain berries nestled on sweet vanilla bean pastry cream."
    },
    {
      id: "gal-4",
      title: "Warm Cocoa & Cream Corner",
      category: "ambiance",
      categoryName: "Café Ambiance",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
      caption: "Our sunlit reading lounge where smiles, fresh coffee, and warm bakes meet every morning."
    },
    {
      id: "gal-5",
      title: "Belgian Truffle Drip Cake",
      category: "bakes",
      categoryName: "Fresh Bakes",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      caption: "Glazing our triple chocolate truffle cake with 70% dark single-origin chocolate ganache."
    },
    {
      id: "gal-6",
      title: "Espresso Barista Craft",
      category: "ambiance",
      categoryName: "Café Ambiance",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
      caption: "Pairing artisan pastries with custom-roasted single origin Ethiopian and Colombian beans."
    },
    {
      id: "gal-7",
      title: "Glazing Fresh Cinnamon Brioche",
      category: "craft",
      categoryName: "Bakery Craft",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
      caption: "Drizzling warm cream cheese vanilla icing on fluffy, oven-hot cinnamon brioche spirals."
    },
    {
      id: "gal-8",
      title: "Evening Boutique Glow",
      category: "ambiance",
      categoryName: "Café Ambiance",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
      caption: "Warm amber lighting welcoming visitors for evening tea, pies, and dessert gatherings."
    }
  ],

  initialReviews: [
    {
      id: "rev-1",
      name: "Ayesha Malik",
      avatar: "AM",
      rating: 5,
      date: "2 days ago",
      product: "Belgian Triple Chocolate Truffle Cake",
      verified: true,
      text: "You can immediately taste the difference real butter and unbleached flour makes. The cake was delightfully moist without being greasy or overly sweet. Easily the most luxurious chocolate cake in Lahore!",
      helpful: 34
    },
    {
      id: "rev-2",
      name: "Hamza Tariq",
      avatar: "HT",
      rating: 5,
      date: "1 week ago",
      product: "Artisan French Butter Croissant",
      verified: true,
      text: "Having lived abroad in Paris, I am notoriously picky about croissants. Bakerz Bite has achieved absolute perfection: genuine honeycomb crumb, the shatter of the crust at Rs. 450, and pure European butter aroma.",
      helpful: 28
    },
    {
      id: "rev-3",
      name: "Zainab Raza",
      avatar: "ZR",
      rating: 5,
      date: "2 weeks ago",
      product: "Basque Burnt Caramel Cheesecake",
      verified: true,
      text: "The molten center of the Basque cheesecake is divine. I ordered via JazzCash and had it picked up within 25 minutes. Love their pure ingredient transparency—no margarine or artificial additives!",
      helpful: 19
    },
    {
      id: "rev-4",
      name: "Bilal Sheikh",
      avatar: "BS",
      rating: 5,
      date: "3 weeks ago",
      product: "Artisan Matte Ceramic Mug & Cookies",
      verified: true,
      text: "I bought the ceramic mug (Rs. 1,650) and a box of sea salt Valrhona cookies. The heavy stoneware feels amazing in hand and keeps morning espresso piping hot. 10/10 bakery experience!",
      helpful: 15
    }
  ],

  faqs: [
    {
      q: "Do you use 100% real butter in all your baked goods?",
      a: "Yes, without exception! Every croissant, cake sponge, cookie, and tart crust is baked strictly with 82%+ butterfat grass-fed sweet cream butter. We never use margarine, vegetable shortenings, or palm oil."
    },
    {
      q: "What makes unbleached stone-ground flour better?",
      a: "Standard commercial flour is chemically bleached with chlorine or potassium bromate. Our unbleached heirloom wheat flour is naturally aged and stone-ground, keeping the natural wheat germ, rich vitamins, and authentic rustic flavor intact."
    },
    {
      q: "Which payment methods are accepted for PKR orders?",
      a: "We support Credit / Debit Cards (Visa, Mastercard, PayPak, UnionPay), JazzCash & EasyPaisa (local mobile wallets with instant account/OTP confirmation), and Apple Pay / Google Pay."
    },
    {
      q: "How can I order custom wedding or celebration cakes?",
      a: "Please fill out our Custom Cake inquiry form under the Contact section with your target date, flavor profile, and guest count. Master Baker Julian will connect with you within 24 hours. We require 48-72 hours notice for custom creations."
    },
    {
      q: "What are your delivery charges and delivery times?",
      a: "Boutique in-store pickup is free and ready in 25 minutes. Handcrafted courier delivery is Rs. 250 across our metropolitan delivery zone, and 100% FREE for all orders over Rs. 3,000."
    }
  ]
};

// Freeze data to prevent accidental tampering
Object.freeze(BAKERY_DATA);
