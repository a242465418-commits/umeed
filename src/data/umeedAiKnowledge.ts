export interface SimpleTurn {
  role: 'user' | 'model';
  content: string;
}

export const UMEED_SYSTEM_INSTRUCTION = `You are UMEED AI, the official conversational assistant for UMEED — a humanitarian initiative with the tagline "Together, We Can Make a Difference."

IDENTITY & TONE:
- Warm, calm, respectful, transparent, and grounded in human dignity.
- Bilingual in English and Hindi (both Devanagari हिन्दी and conversational Hinglish). Respond in the language the user writes in, or switch between Hindi and English whenever requested.
- Use clean Markdown formatting (short headings using ###, bullet points, bold emphasis for important facts, and internal page links like [Support UMEED](#support), [Six Causes](#causes), [First Goal](#first-goal), [Volunteer With UMEED](#volunteer), [Transparency Ledger](#transparency), and [Contact UMEED](#contact)).

VERIFIED FACTS ABOUT UMEED (STRICT SOURCE OF TRUTH):
1. Founding Stage ("We are just getting started."):
   - UMEED (meaning "Hope") is a newly founded humanitarian initiative starting from an honest blank page.
   - Completed projects: 0 (Our first project is yet to begin).
   - Beneficiaries assisted to date: 0.
   - Donations collected to date: 0 (0.00).
   - Funds disbursed to date: 0 (0.00).
   - External NGO or corporate partnerships: 0 (None finalized yet. UMEED is working toward an official collaboration with a verified charitable organization).
   - Legal / NGO Registration status: Pre-Registration founding stage (no registration number or tax-exemption certificate exists yet).

2. Donations & Support UMEED Policy:
   - "Donation collection is not active yet."
   - UMEED does NOT accept monetary donations, online payments, bank transfers, cash, or UPI transfers right now.
   - The Support UMEED section (#support) displays a neutral placeholder reading "Official NGO Donation QR Coming Soon", keeps the "Scan QR Code" button disabled, and states: "UMEED is working toward an official collaboration with a verified charitable organization. Donation collection is not active yet."
   - Every future contribution, once authorized under a verified charitable organization, will be transparently documented in UMEED's public ledger.

3. Six Planned Humanitarian Causes (#causes):
   - 01. Education: Foundational literacy, student stationery/learning kits, and weekend volunteer reading & homework circles.
   - 02. Food & Nutrition: Wholesome dry-ration kits (grains, lentils, cooking staples) and hygienic, dignified community meals.
   - 03. Healthcare: Preventive health awareness, sanitation and menstrual hygiene kits, first-aid readiness, and referrals to licensed public clinics.
   - 04. Essential Supplies: Seasonal protection including warm winter blankets, clean weather-appropriate clothing, footwear, and utility kits.
   - 05. Disaster Relief: Rapid-response volunteer readiness protocols for floods, heatwaves, and local emergencies (clean drinking water, shelter tarpaulins, dry rations).
   - 06. Community Support: Neighborhood listening circles and practical help for senior citizens, daily-wage families, and differently-abled residents.
   (Note: All six causes are currently in the volunteer planning stage; 0 field drives have occurred so far.)

4. First Goal Roadmap (#first-goal):
   - Step 01: Founding Charter & Honest Launch (Current Stage — In Progress).
   - Step 02: Founding Volunteer Circle Formation (Yet to Begin).
   - Step 03: Ground Listening & Scope Selection (Yet to Begin).
   - Step 04: First Field Project Execution (Yet to Begin).

5. Volunteering (#volunteer):
   - Because donation collection is inactive, volunteering time and skills is the #1 way to help UMEED today.
   - Five Founding Volunteer roles:
     1) Education & Learning Support
     2) Food & Essential Distribution
     3) Healthcare & Wellness Awareness
     4) Community Listening & Field Coordination
     5) Operations, Transparency & Documentation
   - Visitors can register interest using the Founding Volunteer form in the [Volunteer Section](#volunteer).

6. Contact & Unavailable Details (#contact):
   - Visitors can send questions, ideas, or local community observations via the [Contact UMEED](#contact) form.
   - UMEED does NOT have a physical head office address, phone helpline number, WhatsApp helpline, or paid staff yet. Always state clearly when such details are unavailable.

STRICT SAFETY & HONESTY RULES (NON-NEGOTIABLE):
- NEVER invent or exaggerate donations, completed projects, beneficiary counts, statistics, registration numbers, or active NGO partnerships.
- Clearly say when information is unavailable (for example, office address, phone number, exact project launch date, or registration ID).
- NEVER accept donations, generate QR codes, or ask for payment, card, bank account, or UPI details.
- NEVER promise emergency, medical, rescue, or financial assistance. If a user describes a real-time emergency, medical issue, or urgent crisis, state clearly that UMEED cannot provide emergency, medical, or financial aid and advise contacting local emergency services (such as 112 / 108 in India or the nearest hospital/authorities) immediately.
- NEVER request sensitive personal information (such as government ID / Aadhaar numbers, bank details, passwords, private medical records, or exact home addresses).`;

export const SUGGESTED_CHAT_PROMPTS = [
  {
    id: 'mission-causes',
    title: 'Explore UMEED’s mission & causes',
    prompt: 'What is UMEED’s mission, and which six humanitarian causes are you preparing to serve?',
    languageLabel: 'English',
  },
  {
    id: 'volunteer-how',
    title: 'Join as a Founding Volunteer',
    prompt: 'How can I volunteer with UMEED right now since donations are not active yet?',
    languageLabel: 'English',
  },
  {
    id: 'transparency-status',
    title: 'Check verified transparency status',
    prompt: 'Can I donate today, and what is UMEED’s current verified transparency report?',
    languageLabel: 'English',
  },
  {
    id: 'hindi-intro',
    title: 'उम्मीद (UMEED) के बारे में जानें',
    prompt: 'उम्मीद (UMEED) का उद्देश्य क्या है और मैं आज स्वयंसेवक (volunteer) के रूप में कैसे जुड़ सकता हूँ?',
    languageLabel: 'हिन्दी',
  },
];

function containsHindi(text: string): boolean {
  if (/[\u0900-\u097F]/.test(text)) {
    return true;
  }
  const lower = text.toLowerCase();
  const hindiWords = [
    'kya hai',
    'kaise',
    'madad',
    'daan',
    'kab',
    'kyun',
    'namaste',
    'namaskar',
    'hindi mein',
    'hindi me',
    'jankari',
    'batao',
    'bataiye',
  ];
  return hindiWords.some((kw) => lower.includes(kw));
}

export function generateDemoUmeedReply(messages: SimpleTurn[]): string {
  const latestUserMsg =
    [...messages].reverse().find((m) => m.role === 'user')?.content.trim() || '';
  const lower = latestUserMsg.toLowerCase();
  const isHindi = containsHindi(latestUserMsg);

  // 1. Emergency / Medical / Financial Assistance Safety Rule
  if (
    /\b(emergency|ambulance|hospital|urgent help|medical help|need money|financial help|loan|suicide|flood rescue|accident)\b/i.test(
      lower
    ) ||
    /(इमरजेंसी|आपातकाल|अस्पताल|पैसे चाहिए|आर्थिक मदद|मेडिकल मदद|बचाओ)/.test(latestUserMsg)
  ) {
    if (isHindi) {
      return `### महत्वपूर्ण सुरक्षा सूचना
**UMEED आपातकालीन (emergency), चिकित्सा (medical), या आर्थिक सहायता प्रदान नहीं कर सकता है।** हम अभी अपने शुरुआती नियोजन चरण (*We are just getting started*) में हैं और हमारा कोई सक्रिय हेल्पलाइन या राहत दल अभी उपलब्ध नहीं है।

- यदि यह कोई आपातकालीन या चिकित्सा स्थिति है, तो कृपया तुरंत अपने स्थानीय आपातकालीन नंबर (**112** या **108**) पर कॉल करें या नजदीकी सरकारी अस्पताल/प्रशासन से संपर्क करें।
- कृपया चैट में अपनी कोई भी संवेदनशील व्यक्तिगत जानकारी (जैसे आधार नंबर, बैंक विवरण या मेडिकल रिकॉर्ड) साझा न करें।`;
    }
    return `### Important Safety Notice
**UMEED cannot provide emergency, medical, or financial assistance.** We are just getting started in our foundational planning stage and do not operate an active helpline, medical dispatch, or financial aid fund.

- If you or someone near you is facing a medical or safety emergency, please contact your local official emergency services immediately (such as **112** or **108**, or your nearest public hospital).
- Please do not share sensitive personal details (such as government IDs, medical records, or bank details) in this chat.`;
  }

  // 2. Sensitive Personal Info Safety Rule
  if (
    /\b(aadhaar|aadhar|pan card|bank account|credit card|debit card|cvv|otp|password)\b/i.test(
      lower
    ) ||
    /(आधार|पैन कार्ड|बैंक खाता|ओटीपी|पासवर्ड)/.test(latestUserMsg)
  ) {
    if (isHindi) {
      return `### गोपनीयता एवं सुरक्षा
कृपया यहाँ **कोई भी संवेदनशील व्यक्तिगत या वित्तीय जानकारी** (जैसे आधार/पैन नंबर, बैंक खाता, UPI पिन, या पासवर्ड) साझा न करें।

- UMEED कभी भी भुगतान विवरण या गोपनीय दस्तावेज़ नहीं मांगता है।
- **दान संग्रह अभी सक्रिय नहीं है** (*Donation collection is not active yet*)।`;
    }
    return `### Privacy & Safety Reminder
Please **do not share sensitive personal or financial information** (such as government ID numbers, bank accounts, card numbers, OTPs, or passwords) in chat.

- UMEED never requests payment credentials or private identification documents.
- **Donation collection is not active yet.**`;
  }

  // 3. Donation / QR / Payment / NGO Collaboration Questions
  if (
    /\b(donate|donation|qr|upi|pay|payment|fund|money|contribute money|ngo partner|collaboration)\b/i.test(
      lower
    ) ||
    /(दान|डोनेट|पैसे|क्यूआर|भुगतान|सहयोग|एनजीओ)/.test(latestUserMsg)
  ) {
    if (isHindi) {
      return `### दान और सहयोग की वर्तमान स्थिति
**अभी दान संग्रह सक्रिय नहीं है** (*Donation collection is not active yet*)।

- **आधिकारिक NGO सहयोग की तैयारी:** UMEED एक प्रमाणित धर्मार्थ संस्था (verified charitable organization) के साथ आधिकारिक सहयोग की दिशा में काम कर रहा है।
- **कोई सक्रिय QR या भुगतान गेटवे नहीं:** हमारे [Support UMEED](#support) अनुभाग में केवल *"Official NGO Donation QR Coming Soon"* का प्लेसहोल्डर है और **"Scan QR Code"** बटन निष्क्रिय (disabled) रखा गया है।
- **सत्यापित पारदर्शिता रिकॉर्ड:** अब तक **0** दान एकत्र किया गया है और **0** राशि खर्च की गई है।
- **आज कैसे मदद करें:** आप बिना किसी आर्थिक योगदान के हमारे [Volunteer अनुभाग](#volunteer) में स्वयंसेवक के रूप में जुड़ सकते हैं।`;
    }
    return `### Donation & Contribution Status
**Donation collection is not active yet.**

- **Official Collaboration in Progress:** UMEED is working toward an official collaboration with a verified charitable organization. Until that governance is formally completed, we do not accept online payments, bank transfers, cash, or UPI transfers.
- **QR Placeholder Status:** Our [Support UMEED](#support) section displays a neutral *"Official NGO Donation QR Coming Soon"* placeholder, and the **Scan QR Code** button remains disabled.
- **Verified Ledger:** Total donations collected to date: **0.00**. Total funds disbursed: **0.00**.
- **How You Can Help Today:** Right now, we welcome your time and skills rather than money—you can register in our [Volunteer Section](#volunteer).`;
  }

  // 4. Volunteer Questions
  if (
    /\b(volunteer|join|help today|participate|roles|skills|teach|mentor)\b/i.test(lower) ||
    /(स्वयंसेवक|वॉलंटियर|जुड़|जुड़ें|मदद कैसे|योगदान)/.test(latestUserMsg)
  ) {
    if (isHindi) {
      return `### UMEED के संस्थापक स्वयंसेवक (Founding Volunteer) बनें
चूंकि अभी दान संग्रह सक्रिय नहीं है, इसलिए आपका समय और कौशल ही UMEED की सबसे बड़ी ताकत है। आप इन **5 क्षेत्रों** में अपनी रुचि दर्ज कर सकते हैं:

1. **Education & Learning Support:** बच्चों के लिए पठन-पाठन और स्टेशनरी किट की योजना।
2. **Food & Essential Distribution:** सुरक्षित राशन किट और आवश्यक सामग्री वितरण की तैयारी।
3. **Healthcare & Wellness Awareness:** स्वच्छता और निवारक स्वास्थ्य जागरूकता।
4. **Community Listening & Field Coordination:** स्थानीय परिवारों की वास्तविक ज़रूरतों को समझना।
5. **Operations, Transparency & Documentation:** खुली किताब (open-book) रिकॉर्ड और पारदर्शिता बनाए रखना।

जुड़ने के लिए वेबसाइट के [Volunteer With UMEED](#volunteer) फॉर्म में अपना नाम, ईमेल और शहर दर्ज करें।`;
    }
    return `### Volunteering With UMEED
Because donation collection is not active yet, thoughtful volunteers are how UMEED begins. You can express interest in joining our Founding Volunteer Circle across **five roles**:

1. **Education & Learning Support** — Planning weekend reading circles and student stationery kits.
2. **Food & Essential Distribution** — Organizing quality checks and dignified dry-ration distribution plans.
3. **Healthcare & Wellness Awareness** — Supporting hygiene education and licensed public clinic referrals.
4. **Community Listening & Field Coordination** — Listening directly to neighborhood families before Project 01 begins.
5. **Operations, Transparency & Documentation** — Maintaining open-book records and honest updates.

You can submit your interest directly in the [Volunteer With UMEED](#volunteer) section on this page.`;
  }

  // 5. Six Causes Questions
  if (
    /\b(cause|causes|education|food|nutrition|healthcare|supplies|disaster|community support|focus area)\b/i.test(
      lower
    ) ||
    /(कार्यक्षेत्र|शिक्षा|भोजन|पोषण|स्वास्थ्य|आपदा|समुदाय)/.test(latestUserMsg)
  ) {
    if (isHindi) {
      return `### UMEED के 6 मुख्य मानवीय कार्यक्षेत्र
हम अभी शुरुआती तैयारी में हैं (*0 प्रोजेक्ट पूर्ण*)। भविष्य में काम शुरू होने पर UMEED इन **6 क्षेत्रों** में सेवा करेगा:

- **01. Education (शिक्षा):** बुनियादी साक्षरता, स्कूल स्टेशनरी किट और सप्ताहांत मार्गदर्शन।
- **02. Food & Nutrition (भोजन एवं पोषण):** पौष्टिक सूखा राशन (अनाज, दालें) और सम्मानजनक सामुदायिक भोजन।
- **03. Healthcare (स्वास्थ्य देखभाल):** निवारक स्वास्थ्य जागरूकता, स्वच्छता किट और सरकारी क्लीनिक मार्गदर्शन।
- **04. Essential Supplies (आवश्यक सामग्री):** सर्दियों के कंबल, स्वच्छ कपड़े और दैनिक उपयोग की वस्तुएं।
- **05. Disaster Relief (आपदा राहत):** बाढ़, लू या स्थानीय आपदाओं के लिए प्रशिक्षित स्वयंसेवक तैयारी।
- **06. Community Support (सामुदायिक सहयोग):** वरिष्ठ नागरिकों और ज़रूरतमंद पड़ोसियों के साथ संवाद व व्यावहारिक सहयोग।

विस्तार से देखने के लिए [Six Causes अनुभाग](#causes) देखें।`;
    }
    return `### UMEED’s Six Humanitarian Causes
All six focus areas are currently in our foundational planning phase (**0 field drives conducted yet**):

- **01. Education:** Foundational literacy, school supply kits, and volunteer-led reading and homework support.
- **02. Food & Nutrition:** Balanced dry-ration staple kits and hygienic, respectful seasonal meals.
- **03. Healthcare:** Preventive health awareness, hygiene essentials, and referrals to public medical clinics.
- **04. Essential Supplies:** Warm winter blankets, clean weather-appropriate clothing, footwear, and household necessities.
- **05. Disaster Relief:** Volunteer preparedness playbooks for floods, heatwaves, and local emergencies.
- **06. Community Support:** Neighborhood listening visits and practical solidarity for senior citizens and families in distress.

Explore each planned blueprint in the [Causes Section](#causes).`;
  }

  // 6. Transparency / Projects / Statistics / Registration / First Goal
  if (
    /\b(transparency|ledger|report|stats|statistics|beneficiar|project|completed|registered|registration|first goal|roadmap)\b/i.test(
      lower
    ) ||
    /(पारदर्शिता|प्रोजेक्ट|आंकड़े|रजिस्ट्रेशन|पंजीकरण|पहला लक्ष्य)/.test(latestUserMsg)
  ) {
    if (isHindi) {
      return `### सत्यापित पारदर्शिता रिपोर्ट (Day Zero Ledger)
UMEED पूरी ईमानदारी के साथ शून्य से शुरुआत कर रहा है (*We are just getting started*):

- **पूर्ण किए गए प्रोजेक्ट्स:** 0 *(हमारा पहला प्रोजेक्ट अभी शुरू होना बाकी है)*
- **लाभान्वित लोग (Beneficiaries):** 0
- **कुल एकत्रित दान:** 0.00 *(दान संग्रह अभी सक्रिय नहीं है)*
- **कुल खर्च राशि:** 0.00
- **बाहरी NGO साझेदारी:** 0 *(आधिकारिक सहयोग के लिए प्रयास जारी है)*
- **पंजीकरण स्थिति:** Pre-Registration *(अभी कोई NGO पंजीकरण संख्या नहीं है)*

हमारी 4-चरणीय तैयारी देखने के लिए [First Goal](#first-goal) और [Transparency अनुभाग](#transparency) देखें।`;
    }
    return `### Verified Open-Book Transparency Status
UMEED begins with an unembellished blank ledger (**We are just getting started**):

- **Completed Humanitarian Projects:** 0 *(Our first project is yet to begin — currently in Step 01 of 04: Founding Charter & Honest Launch)*
- **Beneficiaries Assisted:** 0
- **Total Donations Collected:** 0.00 *(Donation collection is not active yet)*
- **Total Funds Disbursed:** 0.00
- **External NGO Partnerships:** 0 *(Working toward an official collaboration with a verified charitable organization)*
- **Formal NGO Registration:** Pre-Registration stage *(No registration number exists yet)*

You can inspect the full table anytime in our [Transparency Section](#transparency) and [First Goal Roadmap](#first-goal).`;
  }

  // 7. Contact / Office Address / Phone / Unavailable Info
  if (
    /\b(contact|email|phone|number|address|office|location|where are you|reach)\b/i.test(lower) ||
    /(संपर्क|पता|ऑफिस|फ़ोन|फोन|नंबर|कहाँ)/.test(latestUserMsg)
  ) {
    if (isHindi) {
      return `### UMEED से संपर्क करें
- **ऑनलाइन संदेश:** आप इस वेबसाइट के [Contact UMEED](#contact) अनुभाग में दिए गए फॉर्म के माध्यम से हमें सीधे अपना प्रश्न या सुझाव भेज सकते हैं।
- **अनुपलब्ध जानकारी (स्पष्ट सूचना):** चूंकि UMEED अभी शुरुआती संस्थापक चरण में है, इसलिए हमारे पास अभी **कोई भौतिक कार्यालय पता (physical office), फ़ोन हेल्पलाइन नंबर, या सवेतन स्टाफ उपलब्ध नहीं है**।`;
    }
    return `### Contacting UMEED
- **Direct Website Form:** You can send questions, volunteer inquiries, or local community observations through our [Contact UMEED](#contact) section.
- **Information Currently Unavailable:** Because UMEED is in its early founding stage, we **do not have a physical head office address, phone helpline number, or paid staff yet**. All coordination currently takes place digitally through our founding volunteer circle.`;
  }

  // 8. Default / Mission / Greeting (Bilingual aware)
  if (isHindi) {
    return `### नमस्ते! UMEED AI में आपका स्वागत है
**UMEED** (जिसका अर्थ है *आशा*) एक नई मानवीय पहल है जिसका ध्येय वाक्य है: **"Together, We Can Make a Difference."**

हम पूरी ईमानदारी के साथ अभी शुरुआत कर रहे हैं (*We are just getting started*):
- **वर्तमान स्थिति:** अभी तक **0** प्रोजेक्ट पूरे हुए हैं, **0** लाभार्थियों की सहायता हुई है, और **दान संग्रह अभी सक्रिय नहीं है** (*Donation collection is not active yet*)।
- **हमारे 6 प्रस्तावित कार्यक्षेत्र:** शिक्षा, भोजन एवं पोषण, स्वास्थ्य देखभाल, आवश्यक सामग्री, आपदा राहत, और सामुदायिक सहयोग ([Six Causes देखें](#causes))।
- **आप कैसे जुड़ सकते हैं:** आप हमारे [Volunteer अनुभाग](#volunteer) में संस्थापक स्वयंसेवक के रूप में अपनी रुचि दर्ज कर सकते हैं।

आप मुझसे **हिन्दी** या **English** में UMEED के उद्देश्य, कार्यक्षेत्रों, स्वयंसेवा या पारदर्शिता रिपोर्ट के बारे में कुछ भी पूछ सकते हैं!`;
  }

  return `### Welcome to UMEED AI
**UMEED**—meaning *hope*—is a founding-stage humanitarian initiative guided by the belief: **"Together, We Can Make a Difference."**

Here is an honest snapshot of where UMEED stands today:
- **Founding Baseline:** We are just getting started, with **0** completed projects and **0** beneficiaries assisted so far. Our [First Goal](#first-goal) project is currently in the volunteer preparation phase.
- **Donations Inactive:** **Donation collection is not active yet.** UMEED is working toward an official collaboration with a verified charitable organization ([Support UMEED](#support)).
- **Six Planned Causes:** Education, Food & Nutrition, Healthcare, Essential Supplies, Disaster Relief, and Community Support ([Explore Causes](#causes)).
- **Get Involved Today:** Join our Founding Volunteer Circle in the [Volunteer Section](#volunteer) or reach out via [Contact UMEED](#contact).

Feel free to ask me anything about UMEED in **English** or **हिन्दी (Hindi)**.`;
}
