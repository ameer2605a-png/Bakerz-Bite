/**
 * Bakerz Bite - Chef Bite AI Concierge
 * A professional bakery concierge providing menu recommendations, ingredient
 * transparency, store hours, dietary guidance, PKR pricing, JazzCash/EasyPaisa
 * payment help, delivery tracking, and direct checkout routing.
 */

class BakeryChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.isTyping = false;
    this.unreadCount = 0;

    this.dom = {
      launcher: document.getElementById('chatbotLauncher'),
      window: document.getElementById('chatbotWindow'),
      closeBtn: document.getElementById('closeChatbotBtn'),
      messagesContainer: document.getElementById('chatbotMessages'),
      inputForm: document.getElementById('chatbotForm'),
      inputField: document.getElementById('chatbotInput'),
      suggestionsContainer: document.getElementById('chatbotSuggestions'),
      badge: document.getElementById('chatbotBadge'),
      clearBtn: document.getElementById('clearChatBtn')
    };

    this.suggestionPrompts = [
      { label: "🍰 View Best Sellers", prompt: "What are your best sellers?" },
      { label: "💳 Payment Methods", prompt: "What payment methods do you accept?" },
      { label: "🥜 Allergen Info", prompt: "Tell me about allergens and ingredients" },
      { label: "🚚 Delivery Timings", prompt: "What are your delivery timings?" }
    ];

    this.init();
  }

  init() {
    if (!this.dom.launcher || !this.dom.window) return;

    // Attach listeners
    this.dom.launcher.addEventListener('click', () => this.toggleChat());
    if (this.dom.closeBtn) {
      this.dom.closeBtn.addEventListener('click', () => this.toggleChat(false));
    }

    if (this.dom.clearBtn) {
      this.dom.clearBtn.addEventListener('click', () => this.clearHistory());
    }

    if (this.dom.inputForm) {
      this.dom.inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleUserSubmit();
      });
    }

    // Render quick suggestion pills
    this.renderSuggestions();

    // Initial greeting if empty
    const saved = sessionStorage.getItem('bakerz_chat_history');
    if (saved) {
      try {
        this.messages = JSON.parse(saved);
        this.renderAllMessages();
      } catch (err) {
        this.sendInitialGreeting();
      }
    } else {
      this.sendInitialGreeting();
    }
  }

  sendInitialGreeting() {
    const greeting = {
      sender: 'bot',
      time: this.getCurrentTimeString(),
      text: "Welcome to **Bakerz Bite**! I'm **Chef Bite**, your virtual bakery concierge. How may I sweeten your day?\n\nI can help with signature cakes, pastries & cookies, ingredient & allergen details, PKR pricing, special offers, **JazzCash / EasyPaisa** payments, delivery, and checkout.",
      quickActions: [
        { label: "🍰 View Best Sellers", action: "scrollToMenu" },
        { label: "🏷️ Today's Offers", action: "scrollToOffers" },
        { label: "💳 Payment Methods", action: "scrollToContact" }
      ]
    };
    this.addMessage(greeting);
  }

  getCurrentTimeString() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  toggleChat(forceState) {
    this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
    if (this.isOpen) {
      this.dom.window.classList.add('active');
      this.dom.launcher.classList.add('active');
      this.dom.launcher.setAttribute('aria-expanded', 'true');
      this.clearBadge();
      setTimeout(() => {
        if (this.dom.inputField) this.dom.inputField.focus();
        this.scrollToBottom();
      }, 200);
    } else {
      this.dom.window.classList.remove('active');
      this.dom.launcher.classList.remove('active');
      this.dom.launcher.setAttribute('aria-expanded', 'false');
    }
  }

  renderSuggestions() {
    if (!this.dom.suggestionsContainer) return;
    this.dom.suggestionsContainer.innerHTML = '';
    this.suggestionPrompts.forEach(item => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chat-suggestion-chip';
      chip.textContent = item.label;
      chip.addEventListener('click', () => {
        this.handlePromptClick(item.prompt);
      });
      this.dom.suggestionsContainer.appendChild(chip);
    });
  }

  handlePromptClick(promptText) {
    if (this.isTyping) return;
    this.dom.inputField.value = promptText;
    this.handleUserSubmit();
  }

  handleUserSubmit() {
    const query = this.dom.inputField.value.trim();
    if (!query || this.isTyping) return;

    // Add user message
    this.addMessage({
      sender: 'user',
      time: this.getCurrentTimeString(),
      text: query
    });

    this.dom.inputField.value = '';
    this.showTypingIndicator();

    // Natural bot delay (600 - 1000ms)
    setTimeout(() => {
      const response = this.generateAIResponse(query);
      this.hideTypingIndicator();
      this.addMessage(response);
    }, 750);
  }

  showTypingIndicator() {
    this.isTyping = true;
    const typingEl = document.createElement('div');
    typingEl.id = 'botTypingIndicator';
    typingEl.className = 'chat-message bot typing';
    typingEl.innerHTML = `
      <div class="chat-avatar bot-avatar">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a4 4 0 0 0-4 4c0 1.25.57 2.37 1.46 3.1A5.98 5.98 0 0 0 6 15v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1c0-2.5-1.54-4.66-3.46-5.9A4.01 4.01 0 0 0 16 6a4 4 0 0 0-4-4z"/>
        </svg>
      </div>
      <div class="chat-bubble">
        <span class="typing-label">Chef Bite is typing…</span>
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    this.dom.messagesContainer.appendChild(typingEl);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const el = document.getElementById('botTypingIndicator');
    if (el) el.remove();
  }

  addMessage(msgObj) {
    this.messages.push(msgObj);
    this.renderSingleMessage(msgObj);
    this.saveHistory();
    this.scrollToBottom();

    if (!this.isOpen && msgObj.sender === 'bot') {
      this.unreadCount++;
      if (this.dom.badge) {
        this.dom.badge.textContent = this.unreadCount;
        this.dom.badge.classList.remove('hidden');
      }
    }
  }

  clearBadge() {
    this.unreadCount = 0;
    if (this.dom.badge) {
      this.dom.badge.classList.add('hidden');
    }
  }

  saveHistory() {
    try {
      sessionStorage.setItem('bakerz_chat_history', JSON.stringify(this.messages.slice(-30)));
    } catch (e) {
      // quota or private browsing
    }
  }

  clearHistory() {
    this.messages = [];
    sessionStorage.removeItem('bakerz_chat_history');
    this.dom.messagesContainer.innerHTML = '';
    this.sendInitialGreeting();
  }

  renderAllMessages() {
    this.dom.messagesContainer.innerHTML = '';
    this.messages.forEach(msg => this.renderSingleMessage(msg));
    this.scrollToBottom();
  }

  renderSingleMessage(msg) {
    const isBot = msg.sender === 'bot';
    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${isBot ? 'bot' : 'user'}`;

    // Format markdown bold and linebreaks
    let formattedText = msg.text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    let quickActionsHtml = '';
    if (msg.quickActions && msg.quickActions.length) {
      quickActionsHtml = `
        <div class="chat-quick-actions">
          ${msg.quickActions.map(action => `
            <button type="button" class="chat-action-btn" data-action="${action.action}" ${action.payload ? `data-payload="${action.payload}"` : ''}>
              ${action.label}
            </button>
          `).join('')}
        </div>
      `;
    }

    msgEl.innerHTML = `
      ${isBot ? `
        <div class="chat-avatar bot-avatar" title="Chef Bite">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a4 4 0 0 0-4 4c0 1.25.57 2.37 1.46 3.1A5.98 5.98 0 0 0 6 15v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1c0-2.5-1.54-4.66-3.46-5.9A4.01 4.01 0 0 0 16 6a4 4 0 0 0-4-4z"/>
          </svg>
        </div>
      ` : ''}
      <div class="chat-bubble">
        <div class="chat-text">${formattedText}</div>
        ${quickActionsHtml}
        <span class="chat-time">${msg.time}</span>
      </div>
      ${!isBot ? `
        <div class="chat-avatar user-avatar" title="You">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      ` : ''}
    `;

    // Bind action buttons if any
    const actionBtns = msgEl.querySelectorAll('.chat-action-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.getAttribute('data-action');
        const payload = e.currentTarget.getAttribute('data-payload');
        this.executeQuickAction(action, payload);
      });
    });

    this.dom.messagesContainer.appendChild(msgEl);
  }

  scrollToBottom() {
    if (this.dom.messagesContainer) {
      this.dom.messagesContainer.scrollTop = this.dom.messagesContainer.scrollHeight;
    }
  }

  executeQuickAction(action, payload) {
    if (action === 'scrollToMenu') {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'scrollToOffers') {
      const offers = document.getElementById('offers');
      if (offers) offers.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'scrollToContact') {
      const contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'openProductModal') {
      if (window.BakerzApp && window.BakerzApp.openProductModal) {
        window.BakerzApp.openProductModal(payload);
      }
    } else if (action === 'applyCoupon') {
      if (window.BakerzApp && window.BakerzApp.applyCouponCode) {
        window.BakerzApp.applyCouponCode(payload);
      }
    } else if (action === 'openCheckout') {
      if (window.BakerzApp && window.BakerzApp.openCheckoutModal) {
        window.BakerzApp.openCheckoutModal();
      }
    } else if (action === 'openCart') {
      if (window.BakerzApp && window.BakerzApp.toggleCart) {
        window.BakerzApp.toggleCart(true);
      }
    }
  }

  /**
   * Conversational Intelligence Engine
   */
  generateAIResponse(rawQuery) {
    const q = rawQuery.toLowerCase();
    const time = this.getCurrentTimeString();

    // 1. Ingredients, Ethos, Butter, Flour, Safety
    if (q.includes('butter') || q.includes('flour') || q.includes('cream') || q.includes('ingredient') || q.includes('safe') || q.includes('preservative') || q.includes('healthy') || q.includes('ethos')) {
      return {
        sender: 'bot',
        time,
        text: "🧈 **Our Pure Baking Ethos: Zero Compromises!**\n\nAt Bakerz Bite, we stand fiercely for honest, artisanal excellence:\n- **100% Real Butter:** Strictly Normandy & grass-fed creamery butter (82%+ butterfat). Zero margarine, zero vegetable shortenings, and never palm oil.\n- **Unbleached Stone-Ground Flour:** Certified non-GMO, naturally aged heirloom wheat flour that preserves natural wheat germ and nutty aroma.\n- **Fresh Farm Cream:** Farm-fresh dairy cream whipped daily with whole Madagascar vanilla beans.\n- **0% Artificial Additives:** No artificial food colorings, no high-fructose corn syrups, and no synthetic dough conditioners.",
        quickActions: [
          { label: "🥐 View Butter Croissant (Rs. 450)", action: "openProductModal", payload: "pastry-1" },
          { label: "📖 Read Brand Backstory", action: "scrollToContact" }
        ]
      };
    }

    // 2. Cakes / Chocolate / Birthday / Recommendation
    if (q.includes('cake') || q.includes('chocolate') || q.includes('birthday') || q.includes('anniversary') || q.includes('dessert') || q.includes('recommend')) {
      return {
        sender: 'bot',
        time,
        text: "🎂 **Top Recommendation: Belgian Triple Chocolate Truffle Cake (Rs. 3,850)!**\n\nIf you love rich cocoa, this is our undisputed crown jewel. Layered with 70% single-origin Valrhona dark chocolate ganache, moist dark sponge, and edible gold leaf.\n\nPrefer something lighter? Try our **Madagascar Vanilla Bean Velvet Cake (Rs. 3,200)** or our caramelized **Basque Burnt Cheesecake (Rs. 3,600)**!",
        quickActions: [
          { label: "🍫 Belgian Truffle Cake (Rs. 3,850)", action: "openProductModal", payload: "cake-1" },
          { label: "🧀 Basque Cheesecake (Rs. 3,600)", action: "openProductModal", payload: "cake-3" }
        ]
      };
    }

    // 3. Allergies / Gluten-Free / Vegan / Nut-Free
    if (q.includes('allergy') || q.includes('allergies') || q.includes('gluten') || q.includes('vegan') || q.includes('nut') || q.includes('celiac') || q.includes('dairy free')) {
      return {
        sender: 'bot',
        time,
        text: "🌱 **Dietary & Allergen Information:**\n\n- **Nut-Free Favorites:** Our *Artisan French Butter Croissant (Rs. 450)*, *Belgian Triple Chocolate Truffle Cake (Rs. 3,850)*, and *Maldon Sea Salt Cookie (Rs. 380)* are prepared completely nut-free!\n- **Gluten-Conscious:** Our *Basque Burnt Cheesecake (Rs. 3,600)* has an ultra-low flour structure.\n- **Full Transparency:** Every item displays an itemized ingredient list. If you have severe allergies, please let our team know!",
        quickActions: [
          { label: "🍪 Sea Salt Cookie (Rs. 380)", action: "openProductModal", payload: "cookie-1" },
          { label: "🥐 Butter Croissant (Rs. 450)", action: "openProductModal", payload: "pastry-1" }
        ]
      };
    }

    // 4. Hours, Location, Address, Pakistan
    if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('close') || q.includes('location') || q.includes('address') || q.includes('where') || q.includes('phone') || q.includes('contact')) {
      return {
        sender: 'bot',
        time,
        text: "📍 **Visit Our Flagship Boutique:**\n\n- **Address:** Plot 14-C, Artisan Commercial Zone, Gulberg III, Lahore, Pakistan\n- **Phone:** +92 (42) 3578-BAKE / +92 (42) 3578-2253\n- **WhatsApp:** +92 300 2253792\n- **Hours:**\n  • Mon – Fri: 7:00 AM – 10:00 PM\n  • Sat – Sun: 7:30 AM – 11:00 PM\n- **Fresh Baking Shifts:** 7:00 AM, 12:00 PM, and 4:30 PM daily!",
        quickActions: [
          { label: "🗺️ View Location & Inquiry Form", action: "scrollToContact" }
        ]
      };
    }

    // 5. Offers, Discounts, Coupons, Promo
    if (q.includes('discount') || q.includes('offer') || q.includes('coupon') || q.includes('promo') || q.includes('deal') || q.includes('code') || q.includes('sale')) {
      return {
        sender: 'bot',
        time,
        text: "🎉 **Active Special Offers at Bakerz Bite:**\n\n1. **SMILE20** – 20% OFF on all whole signature cakes & pies (min order Rs. 2,500)!\n2. **SWEETMORNING** – 25% OFF morning pastry + coffee combo (min order Rs. 800).\n3. **FRESHBAKE** – Rs. 500 OFF your first online order over Rs. 2,000.\n4. **FREEMUG** – Free Bakerz Bite Ceramic Mug (Rs. 1,650 value) on orders over Rs. 5,000!\n\nWould you like me to apply one to your treat basket right now?",
        quickActions: [
          { label: "Apply 'SMILE20' (-20%)", action: "applyCoupon", payload: "SMILE20" },
          { label: "Apply 'FRESHBAKE' (-Rs. 500)", action: "applyCoupon", payload: "FRESHBAKE" },
          { label: "🎁 View All Offers", action: "scrollToOffers" }
        ]
      };
    }

    // 6. Merchandise, Mug, Bag, Glass, Tray
    if (q.includes('merch') || q.includes('mug') || q.includes('bag') || q.includes('tote') || q.includes('glass') || q.includes('tray')) {
      return {
        sender: 'bot',
        time,
        text: "☕ **Bakerz Boutique Merchandise (in PKR):**\n\nBring our café warmth to your breakfast table:\n- **Artisan Matte Ceramic Mug** (Rs. 1,650): Custom speckled stoneware in cocoa & warm cream.\n- **Heavy Canvas Baker's Tote** (Rs. 1,950): 100% organic cotton with dedicated baguette sleeve.\n- **Double-Walled Borosilicate Glass** (Rs. 1,450): Condensation-free thermal tumbler with bamboo lid.\n- **Hand-Carved Walnut & Brass Pastry Tray** (Rs. 4,200): Solid American walnut heirloom board.",
        quickActions: [
          { label: "☕ View Ceramic Mug (Rs. 1,650)", action: "openProductModal", payload: "merch-1" },
          { label: "👜 View Baker's Tote (Rs. 1,950)", action: "openProductModal", payload: "merch-2" }
        ]
      };
    }

    // 6b. Order / Buy / Checkout intent — route straight to PKR checkout
    if (q.includes('order') || q.includes('buy') || q.includes('checkout') || q.includes('purchase') || q.includes('i want') || q.includes("i'd like")) {
      return {
        sender: 'bot',
        time,
        text: "🛍️ **Ready to Order?** Wonderful choice!\n\nAdd your favorites to the treat basket, then check out securely with **JazzCash, EasyPaisa, Debit/Credit Card, or Cash on Delivery** — all priced in PKR.\n\nIf your basket already has items, jump straight to checkout below — otherwise let's pick something delicious first!",
        quickActions: [
          { label: "🧺 Open My Basket", action: "openCart" },
          { label: "💳 Go to Checkout", action: "openCheckout" },
          { label: "🍰 Browse Best Sellers", action: "scrollToMenu" }
        ]
      };
    }

    // 7. Payment Methods / JazzCash / EasyPaisa / Credit Card
    if (q.includes('jazzcash') || q.includes('easypaisa') || q.includes('pay') || q.includes('payment') || q.includes('card') || q.includes('cod') || q.includes('checkout')) {
      return {
        sender: 'bot',
        time,
        text: "💳 **Flexible PKR Payment Methods Supported:**\n\n- **JazzCash & EasyPaisa:** Fast, seamless mobile wallet payments via account number & OTP or QR scan.\n- **Credit / Debit Cards:** Visa, Mastercard, PayPak, and UnionPay with 256-bit SSL encryption.\n- **Apple Pay & Google Pay:** Quick 1-click biometric authorization.\n- **Fulfillment:** In-Store Boutique Pickup (Free, 25 mins) or Handcrafted Courier Delivery (Rs. 250, FREE on orders over Rs. 3,000)!",
        quickActions: [
          { label: "🥐 Browse Menu & Order", action: "scrollToMenu" }
        ]
      };
    }

    // 8. Custom Cake Orders & Catering
    if (q.includes('custom') || q.includes('catering') || q.includes('wedding') || q.includes('party') || q.includes('event')) {
      return {
        sender: 'bot',
        time,
        text: "💍 **Custom Celebration Cakes & Catering:**\n\nWe craft bespoke multi-tiered wedding cakes, corporate dessert platters, and personalized birthday showstoppers! We typically require **48 to 72 hours lead time** for custom piping and flavor infusions.\n\nDrop your details in our contact inquiry form and Master Baker Julian will connect directly!",
        quickActions: [
          { label: "📝 Inquire for Custom Cake", action: "scrollToContact" }
        ]
      };
    }

    // 8b. Delivery, Shipping & Order Tracking
    if (q.includes('deliver') || q.includes('shipping') || q.includes('track') || q.includes('courier') || q.includes('dispatch') || q.includes('timing')) {
      return {
        sender: 'bot',
        time,
        text: "🚚 **Delivery & Order Tracking:**\n\n- **In-Store Pickup:** Free — ready in ~25 minutes at our Gulberg III boutique.\n- **Courier Delivery:** Rs. 250 flat, FREE on orders over Rs. 3,000 within Lahore; 24–48 hours nationwide.\n- **Tracking:** Once dispatched, you'll receive an SMS/WhatsApp with a live tracking link. Share your order ID anytime and I'll walk you through it.\n\n💡 Hot tip: order before 4:30 PM for same-day dispatch!",
        quickActions: [
          { label: "🧺 Open My Basket", action: "openCart" },
          { label: "🍰 Browse Menu", action: "scrollToMenu" }
        ]
      };
    }

    // 8c. Best Sellers, Popular Items & PKR Price Inquiries
    if (q.includes('best seller') || q.includes('popular') || q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('rate')) {
      return {
        sender: 'bot',
        time,
        text: "⭐ **Customer Favorites & PKR Pricing:**\n\n- 🥐 Butter Croissant — **Rs. 450**\n- 🍪 Maldon Sea Salt Cookie — **Rs. 380**\n- 🎂 Belgian Truffle Cake — **Rs. 3,850**\n- 🧀 Basque Cheesecake — **Rs. 3,600**\n\nEvery price includes our fresh-baked guarantee — no hidden fees, ever!",
        quickActions: [
          { label: "🥐 Croissant (Rs. 450)", action: "openProductModal", payload: "pastry-1" },
          { label: "🎂 Truffle Cake (Rs. 3,850)", action: "openProductModal", payload: "cake-1" },
          { label: "🛍️ Start an Order", action: "scrollToMenu" }
        ]
      };
    }

    // 9. Default friendly fallback
    return {
      sender: 'bot',
      time,
      text: "I'd be delighted to help! As your **Chef Bite** concierge, I can assist with:\n\n- 🍰 Signature cakes, pastries & cookies with live PKR prices\n- 🧈 Ingredient & allergen transparency (real butter, unbleached flour)\n- 🏷️ Active promo codes like **SMILE20** & **FRESHBAKE**\n- 💳 JazzCash, EasyPaisa, card & COD checkout\n- 🚚 Delivery timelines & order tracking\n\nWhat would you like to explore next?",
      quickActions: [
        { label: "🍰 Signature Cakes", action: "openProductModal", payload: "cake-1" },
        { label: "🏷️ Promo Codes", action: "scrollToOffers" },
        { label: "📍 Store Hours & Location", action: "scrollToContact" }
      ]
    };
  }
}

// Export / attach to window
window.BakeryChatbot = BakeryChatbot;
