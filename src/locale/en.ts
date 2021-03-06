import KEYS from './keys';

type Shape = {
  messages: { [key: string]: string };
};

const EN: Shape = {
  messages: {
    local: 'english',
    [KEYS.LOCAL_SITELOCALE]: 'Site Language',
    [KEYS.LOCAL_CHANGELOCALE]:
      'Choose the language you want the site to display in',
    [KEYS.LOCAL_NATIVENAME]: 'English',
    [KEYS.LOCAL_SELECTLABEL]: 'Language',
    [KEYS.SETTING_TITLE]: 'Settings',
    [KEYS.LOCAL_TITLE]: 'Tarteel - 50,000 Ayahs Challenge',
    [KEYS.LOCAL_DESCRIPTION]: 'Tarteel is an open-source project designed to help build digital tools to analyze the recitation of the Quran. Given the important place of reciting the Quran in the lives of Muslims, it is important to build software tools that can help ordinary Muslims recite the Quran with greater accuracy and appreciation.',

    [KEYS.USERS_LIST_TITLE]: 'Users List',
    [KEYS.NEXT_AYAH]: "Next Ayah",
    [KEYS.PREVIOUS_AYAH]: "Previous Ayah",
    [KEYS.RETRY_BUTTON_TEXT]: "retry",
    [KEYS.SUBMIT_BUTTON_TEXT]: "Next",
    [KEYS.CONTINUOUS_MODE_NOTE_TEXT]: "continuous mode",
    [KEYS.CHANGE_AYAH_TEXT]: "Click here to change Ayah",
    [KEYS.AYAH_PICKER_TITLE]: "Pick an Ayah",
    [KEYS.AYAH_PICKER_SEARCH_PLACEHOLDER]: "Search (in Arabic)",
    [KEYS.AYAH_PICKER_BACK_BUTTON_TEXT]: "Back To Surah",
    [KEYS.SURAH_PICKER_TITLE]: "Pick a Surah",
    [KEYS.SURAH_PICKER_SEARCH_PLACEHOLDER]: "Search (in English/Arabic)",
    [KEYS.SURAH_PICKER_BACK_BUTTON_TEXT]: "Back Home",
    [KEYS.DEMOGRAPHICS_PAGE_TITLE]: "Edit Your Data",
    [KEYS.DEMOGRAPHICS_FORM_SUBMIT_BUTTON_TEXT]: "that's me",
    [KEYS.SKIP_BUTTON_TEXT]: "Skip",
    [KEYS.GENDER_INPUT_LABEL]: "Gender",
    [KEYS.GENDER_INPUT_OPTION_MALE]: "male",
    [KEYS.GENDER_INPUT_OPTION_FEMALE]: "female",
    [KEYS.AGE_INPUT_LABEL]: "Age",
    [KEYS.QIRAAH_INPUT_LABEL]: "Qira'ah",
    [KEYS.QIRAAH_INPUT_OPTION_HAFS]: "Hafs",
    [KEYS.QIRAAH_INPUT_OPTION_WARSH]: "Warsh",
    [KEYS.QIRAAH_INPUT_OPTION_NOTSURE]: "not sure",
    [KEYS.QIRAAH_INPUT_OPTION_OTHER]: "Other",
    [KEYS.HERITAGE_INPUT_LABEL]: "Heritage",
    [KEYS.SUBSCRIBE_PAGE_TEMPLATE_TITLE]: "Subscribe",
    [KEYS.SUBSCRIBE_PAGE_TITLE]: "Thank you!",
    [KEYS.SUBSCRIBE_PAGE_EMAIL_PLACEHOLDER_TEXT]: "email address",
    [KEYS.SUBSCRIBE_PAGE_EMAIL_BUTTON_TEXT]: "Subscribe for Updates on Tarteel",
    [KEYS.SUBSCRIBE_BUTTON_TEXT]: "Subscribe",
    [KEYS.CONTINUE_READING_BUTTON_TEXT]: "Continue Reading",
    [KEYS.RANDOM_AYAH_LINK_TEXT]: "Random Ayah",
    [KEYS.ABOUT_LINK_TEXT]: "About",
    [KEYS.DEMOGRAPHIC_INFO_LINK_TEXT]: "Demographic info",
    [KEYS.PROFILE_LINK_TEXT]: "My Profile",
    [KEYS.MOBILE_APP_LINK_TEXT]: "Mobile",
    [KEYS.HOME_LINK_TEXT]: 'Home',
    [KEYS.COOKIES_BUTTON_TEXT]: 'Got it!',
    [KEYS.PRIVACY_POLICY_LINK_TEXT]: 'Privacy Policy',
    [KEYS.COOKIE_POLICY_LINK_TEXT]: 'Cookie Policy',
    [KEYS.EVALUATE_AYAHS]: "Evaluate Ayahs",
    [KEYS.DEMOGRAPHIC_PAGE_FIRST_PARAGRAPH_1]: "With your help, we have reached a total of",
    [KEYS.DEMOGRAPHIC_PAGE_FIRST_PARAGRAPH_2]: "recordings. That's great, but at Tarteel, we're also committed to making sure that our recordings reflect recitations by both women and men and from the different ethnicities and ages that make up the Muslim ummah.",
    [KEYS.DEMOGRAPHIC_PAGE_SECOND_PARAGRAPH]: "Help us assess how well we're doing by telling us a little bit about yourself...",
    [KEYS.SUBSCRIBE_PAGE_FIRST_PARAGRAPH_1]: "Alhamdulillah, with your help, we have reached a total of",
    [KEYS.SUBSCRIBE_PAGE_FIRST_PARAGRAPH_2]: "recordings.",
    [KEYS.SUBSCRIBE_PAGE_CONGRATS_MESSAGE_1]: "Congratulations! You have unlocked",
    [KEYS.SUBSCRIBE_PAGE_CONGRATS_MESSAGE_2]: "-- select any surah and ayah, and recite continuously and your recordings will be uploaded. Check it out by clicking below!",
    [KEYS.SUBSCRIBE_PAGE_HELP_US_MESSAGE_1]: "You can also help us reach our goal by sharing the Tarteel 50,000 challenge",
    [KEYS.SUBSCRIBE_PAGE_HELP_US_MESSAGE_2]: "with your friends and family!",
    [KEYS.NOT_FOUND_PAGE_TEMPLATE_TITLE]: "Not Found",
    [KEYS.NOT_FOUND_PAGE_TEXT]: "Not Found",
    [KEYS.AYAHS_RECITED]: "Ayahs recited",
    [KEYS.ABOUT_PAGE_TEMPLATE_TITLE]: "About",
    [KEYS.ABOUT_PAGE_RECITED_AYAHS_MESSAGE]: "Over <b>{users}</b> unique users have helped us reach a total of <b>{recitedAyahs}</b> ayahs so far alhamdulillah!",
    [KEYS.ABOUT_PAGE_FIRST_PARAGRAPH_TITLE]: "What is Tarteel?",
    [KEYS.ABOUT_PAGE_FIRST_PARAGRAPH_TEXT]: "Tarteel is an open-source project designed to help build digital tools to analyze the recitation of the Quran. Given the important place of reciting the Quran in the lives of Muslims, it is important to build software tools that can help ordinary Muslims recite the Quran with greater accuracy and appreciation. The name tarteel comes from the Quran itself, where God commands us to \"recite the Quran with tarteel (slow, measured rhythmic tones)\" (73:4).",
    [KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TITLE]: "What is the Tarteel 50,000 challenge?",
    [KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TEXT_1]: "The goal of the Tarteel 50,000 Challenge is to build the world's first public dataset of Quranic recitations carried out by ordinary Muslims. Most of the available audio of the Quran being recited is from professional reciters with strong fluency in tajweed (rules of recitation) and is recorded in studios. This is valuable when someone wants to listen to a recitation of the Quran.",
    [KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TEXT_2]: "However, many software tools that Muslim developers are interested in building require training machine learning models on Quranic recitation (e.g. to convert recitation2text), as it is recited by ordinary Muslims. The recitation of ordinary Muslims differs from professional recordings in many ways: for example, it may include background noise, or may be recited by people with limited knowledge of tajweed, or the demographics of reciters may be different. By collecting this data, we can train machine learning models, which we will release to software-developers who are interested in developing <a href='https://docs.google.com/presentation/d/1hlcbAcEfBg2y_KWwzyPPYjh5SMxowDEWM1XkDC48ZGQ/edit?usp=sharing'>a wide variety of applications</a> that are based on recitation2text, things like:",
    [KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TEXT_2_LINK]: "a wide variety of applications",
    [KEYS.ABOUT_PAGE_THIRD_PARAGRAPH_TITLE]: "Who is a part of Tarteel?",
    [KEYS.ABOUT_PAGE_THIRD_PARAGRAPH_TEXT]: "Tarteel came out bi'iznillah and with the efforts of the following people:",
    [KEYS.ABOUT_PAGE_FOURTH_PARAGRAPH_TITLE]: "How can I help?",
    [KEYS.ABOUT_PAGE_FOURTH_PARAGRAPH_TEXT]: "Tarteel is an open-source project that is maintained by developers interested in furthering the mission of Tarteel. If you'd like to contribute, please check out our GitHub repo: <a href='https://github.com/abidlabs/tarteel.io'>https://github.com/abidlabs/tarteel.io</a>",
    [KEYS.ABOUT_PAGE_FIFTH_PARAGRAPH_TITLE]: "What is the demographic breakdown of Tarteel users?",
    [KEYS.ABOUT_PAGE_SIXTH_PARAGRAPH_TITLE]: "Are the verses that are being recited varied?",
    [KEYS.ABOUT_PAGE_SIXTH_PARAGRAPH_TEXT]: "To build good machine learning models, it helps to have people recite different verses from across the entire Quran. We're measuring how well we've covered the Qur'an and these are our stats so far:",
    [KEYS.ABOUT_PAGE_SEVENTH_PARAGRAPH_TITLE]: "What is Tarteel's privacy policy?",
    [KEYS.ABOUT_PAGE_SEVENTH_PARAGRAPH_TEXT]: "The users who provide Tarteel with audio recordings of their recitations also provide a valuable trust to our team. In protect their privacy, while at the same time, creating a public dataset to be released to developers, we take the steps laid out in our <a href='/privacy'>privacy policy</a>.",
    [KEYS.ABOUT_PAGE_LAST_PARAGRAPH_TITLE]: "Where can I learn more about Tarteel?",
    [KEYS.ABOUT_PAGE_LAST_PARAGRAPH_TEXT]: "For more information, please check out our <a href='/static/docs/white-paper.pdf' target='_blank'>white paper</a>.",
    [KEYS.FIELDS_OF_USE_FIRST_ITEM]: "Hifz helping tools that automatically correct mistakes",
    [KEYS.FIELDS_OF_USE_SECOND_ITEM]: "Tarjweed teaching tools in a similar vein",
    [KEYS.FIELDS_OF_USE_THIRD_ITEM]: "Masjid kiosks that follow the imam and display the translation of the verse",
    [KEYS.MOBILE_PAGE_TITLE]: "Download our mobile app.",
    [KEYS.MOBILE_PAGE_PARAGRAPH]: "Use Tarteel on the go to make your breaks and commutes more productive and full of reward with our Android and iOS apps.",
    [KEYS.CONTACT_US_BUTTON_TEXT]: "contact us",
    [KEYS.LANDING_GREETING_MESSAGE]: "Salaam!",
    [KEYS.LANDING_FIRST_PARAGRAPH]: " Welcome to the <b>Tarteel 50,000 Challenge</b>! Thank you for helping us build the world's first public, open-source dataset</a> of Quran recitations by ordinary Muslim men and women. <a href='/about'>Learn more</a>",
    [KEYS.LANDING_SECOND_PARAGRAPH_TITLE]: "How it works",
    [KEYS.LANDING_LIST_FIRST_ITEM]: "To start off, Tarteel will provide you with <b>5 verses</b> to recite.",
    [KEYS.LANDING_LIST_SECOND_ITEM]: "Click the mic to record yourself reciting the verse. <b>Don't worry</b> about making your recitation perfect, as we're looking for people with a variety of recitation levels.",
    [KEYS.LANDING_LIST_THIRD_ITEM]: "These recitations <a href='/privacy'>will be released</a> as an open-source initiative to encourage machine learning applications based on recitations of the Quran.",
    [KEYS.LANDING_LAST_LINE]: "Click <strong>START</strong> below to get started!",
    [KEYS.LANDING_BUTTON_TEXT]: "Start",


    [KEYS.CONTRIBUTOR_1]: "Abubakar Abid, PhD student at Stanford University",
    [KEYS.CONTRIBUTOR_2]: "Ali Abid, software engineer at Google",
    [KEYS.CONTRIBUTOR_3]: "Ali Abdalla, mechanical engineer at Tesla",
    [KEYS.CONTRIBUTOR_4]: "Abdellatif Abdelfattah, software engineer at Twitter",
    [KEYS.CONTRIBUTOR_5]: "BaHaa Jr., software engineering student at HTI",
    [KEYS.CONTRIBUTOR_6]: "Hamzah Khan, software engineer at Uber ATG",
    [KEYS.CONTRIBUTOR_7]: "Areeba Abid, biomedical engineering student at Georgia Tech",
    [KEYS.CONTRIBUTOR_8]: "Anas Abou Allaban, roboticist and undergraduate at Northeastern University",
    [KEYS.CONTRIBUTOR_9]: "Abdulrahman Alfozan, software engineer at Facebook",
    [KEYS.CONTRIBUTOR_10]: "Mohammad Siddiqui, 4th Year undergraduate student at UCLA.",
    [KEYS.CONTRIBUTOR_11]: "Abdulrahman Alfozan, software engineer at Facebook",
    [KEYS.CONTRIBUTOR_12]: "Ali Emara, iOS Software Engineer at Adobe",
    [KEYS.CONTRIBUTOR_13]: "Haider Ahmad, recent Duke University grad",
    [KEYS.CONTRIBUTOR_14]: "Marwa Abdulhai, computer science undergraduate at MIT",
    [KEYS.CONTRIBUTOR_15]: "Moin Nadeem, junior at MIT studying computer science",

  },
};

export default EN;
