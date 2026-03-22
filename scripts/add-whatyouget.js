#!/usr/bin/env node
/**
 * Adds `whatYouGet` section and updates `pricing.earlybird` for all 103 locale files.
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '..', 'src', 'i18n', 'translations');

// --- whatYouGet translations by base language ---
const whatYouGet = {
  en: {
    heading: "What you get",
    items: [
      "GitHub collaborator invite — delivered within minutes of purchase",
      "One-command install — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Full API documentation — every function, type, and adapter documented",
      "Lifetime updates — pull new versions anytime, no extra cost",
      "Commercial license — use in unlimited projects, yours to keep"
    ]
  },
  fr: {
    heading: "Ce que vous recevez",
    items: [
      "Invitation collaborateur GitHub — livrée quelques minutes après l'achat",
      "Installation en une commande — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Documentation API complète — chaque fonction, type et adaptateur documenté",
      "Mises à jour à vie — récupérez les nouvelles versions à tout moment, sans coût supplémentaire",
      "Licence commerciale — utilisez dans un nombre illimité de projets"
    ]
  },
  de: {
    heading: "Was Sie erhalten",
    items: [
      "GitHub-Collaborator-Einladung — innerhalb von Minuten nach dem Kauf",
      "Installation mit einem Befehl — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Vollständige API-Dokumentation — jede Funktion, jeder Typ und Adapter dokumentiert",
      "Lebenslange Updates — jederzeit neue Versionen abrufen, ohne Zusatzkosten",
      "Kommerzielle Lizenz — in unbegrenzten Projekten verwendbar"
    ]
  },
  es: {
    heading: "Lo que recibes",
    items: [
      "Invitación de colaborador en GitHub — entregada minutos después de la compra",
      "Instalación con un comando — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Documentación API completa — cada función, tipo y adaptador documentado",
      "Actualizaciones de por vida — obtén nuevas versiones en cualquier momento, sin costo adicional",
      "Licencia comercial — úsalo en proyectos ilimitados"
    ]
  },
  ja: {
    heading: "購入後に届くもの",
    items: [
      "GitHubコラボレーター招待 — 購入後数分以内に届きます",
      "ワンコマンドインストール — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "完全なAPIドキュメント — すべての関数、型、アダプターを網羅",
      "永久アップデート — いつでも最新版を取得、追加費用なし",
      "商用ライセンス — 無制限のプロジェクトで使用可能"
    ]
  },
  ar: {
    heading: "ما تحصل عليه",
    items: [
      "دعوة متعاون على GitHub — تُسلم خلال دقائق من الشراء",
      "تثبيت بأمر واحد — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "توثيق API كامل — كل دالة ونوع ومحول موثق",
      "تحديثات مدى الحياة — احصل على الإصدارات الجديدة في أي وقت، بدون تكلفة إضافية",
      "رخصة تجارية — استخدم في مشاريع غير محدودة"
    ]
  },
  pt: {
    heading: "O que você recebe",
    items: [
      "Convite de colaborador no GitHub — entregue em minutos após a compra",
      "Instalação com um comando — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Documentação completa da API — cada função, tipo e adaptador documentado",
      "Atualizações vitalícias — obtenha novas versões a qualquer momento, sem custo adicional",
      "Licença comercial — use em projetos ilimitados"
    ]
  },
  zh: {
    heading: "购买后您将获得",
    items: [
      "GitHub协作者邀请 — 购买后几分钟内送达",
      "一条命令安装 — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "完整API文档 — 每个函数、类型和适配器都有文档",
      "终身更新 — 随时获取新版本，无额外费用",
      "商业许可证 — 在无限项目中使用"
    ]
  },
  ko: {
    heading: "구매 후 받는 것",
    items: [
      "GitHub 협력자 초대 — 구매 후 몇 분 내 전달",
      "원커맨드 설치 — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "전체 API 문서 — 모든 함수, 타입, 어댑터 문서화",
      "평생 업데이트 — 언제든 새 버전 받기, 추가 비용 없음",
      "상용 라이선스 — 무제한 프로젝트에서 사용 가능"
    ]
  },
  hi: {
    heading: "आपको क्या मिलता है",
    items: [
      "GitHub सहयोगी आमंत्रण — खरीद के कुछ ही मिनटों में",
      "एक कमांड में इंस्टॉल — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "संपूर्ण API दस्तावेज़ — हर फ़ंक्शन, टाइप और एडेप्टर प्रलेखित",
      "आजीवन अपडेट — कभी भी नए संस्करण प्राप्त करें, कोई अतिरिक्त लागत नहीं",
      "वाणिज्यिक लाइसेंस — असीमित प्रोजेक्ट्स में उपयोग करें"
    ]
  },
  ru: {
    heading: "Что вы получаете",
    items: [
      "Приглашение коллаборатора на GitHub — доставляется в течение нескольких минут после покупки",
      "Установка одной командой — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Полная документация API — каждая функция, тип и адаптер задокументированы",
      "Пожизненные обновления — получайте новые версии в любое время, без дополнительных затрат",
      "Коммерческая лицензия — используйте в неограниченном количестве проектов"
    ]
  },
  // Additional languages translated from context of each locale
  af: {
    heading: "Wat jy kry",
    items: [
      "GitHub-medewerker-uitnodiging — binne minute na aankoop afgelewer",
      "Eenbevel-installasie — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Volledige API-dokumentasie — elke funksie, tipe en adapter gedokumenteer",
      "Lewenslange opdaterings — trek nuwe weergawes enige tyd, geen ekstra koste nie",
      "Kommersiële lisensie — gebruik in onbeperkte projekte"
    ]
  },
  am: {
    heading: "የሚያገኙት",
    items: [
      "የGitHub ተባባሪ ግብዣ — ከግዢ በኋላ በደቂቃዎች ውስጥ ይደርሳል",
      "በአንድ ትእዛዝ ይጫኑ — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "ሙሉ API ሰነድ — እያንዳንዱ ተግባር፣ ዓይነት እና አስማሚ ተመዝግቧል",
      "የዕድሜ ልክ ዝመናዎች — በማንኛውም ጊዜ አዲስ ስሪቶችን ያግኙ፣ ተጨማሪ ወጪ የለም",
      "የንግድ ፈቃድ — ባልተገደቡ ፕሮጀክቶች ውስጥ ይጠቀሙ"
    ]
  },
  az: {
    heading: "Nə əldə edirsiniz",
    items: [
      "GitHub əməkdaş dəvəti — satın aldıqdan dəqiqələr sonra çatdırılır",
      "Bir əmrlə quraşdırma — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Tam API sənədləri — hər funksiya, tip və adapter sənədləşdirilmişdir",
      "Ömürlük yeniləmələr — istənilən vaxt yeni versiyaları əldə edin, əlavə xərc yoxdur",
      "Kommersiya lisenziyası — limitsiz layihələrdə istifadə edin"
    ]
  },
  be: {
    heading: "Што вы атрымаеце",
    items: [
      "Запрашэнне калабаратара GitHub — дастаўляецца на працягу некалькіх хвілін пасля пакупкі",
      "Усталёўка адной камандай — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Поўная дакументацыя API — кожная функцыя, тып і адаптар задакументаваны",
      "Пажыццёвыя абнаўленні — атрымлівайце новыя версіі ў любы час, без дадатковых выдаткаў",
      "Камерцыйная ліцэнзія — выкарыстоўвайце ў неабмежаванай колькасці праектаў"
    ]
  },
  bg: {
    heading: "Какво получавате",
    items: [
      "Покана за сътрудник в GitHub — доставена в рамките на минути след покупката",
      "Инсталиране с една команда — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Пълна API документация — всяка функция, тип и адаптер е документиран",
      "Доживотни актуализации — изтегляйте нови версии по всяко време, без допълнителни разходи",
      "Търговски лиценз — използвайте в неограничен брой проекти"
    ]
  },
  bn: {
    heading: "আপনি যা পাবেন",
    items: [
      "GitHub সহযোগী আমন্ত্রণ — কেনার কয়েক মিনিটের মধ্যে পৌঁছে যায়",
      "এক কমান্ডে ইনস্টল — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "সম্পূর্ণ API ডকুমেন্টেশন — প্রতিটি ফাংশন, টাইপ এবং অ্যাডাপ্টার নথিভুক্ত",
      "আজীবন আপডেট — যেকোনো সময় নতুন সংস্করণ পান, কোনো অতিরিক্ত খরচ নেই",
      "বাণিজ্যিক লাইসেন্স — সীমাহীন প্রকল্পে ব্যবহার করুন"
    ]
  },
  bs: {
    heading: "Šta dobijate",
    items: [
      "Pozivnica za GitHub saradnika — isporučena u roku od nekoliko minuta nakon kupovine",
      "Instalacija jednom komandom — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Kompletna API dokumentacija — svaka funkcija, tip i adapter dokumentovani",
      "Doživotna ažuriranja — preuzmite nove verzije bilo kada, bez dodatnih troškova",
      "Komercijalna licenca — koristite u neograničenom broju projekata"
    ]
  },
  ca: {
    heading: "Què obteniu",
    items: [
      "Invitació de col·laborador a GitHub — lliurada minuts després de la compra",
      "Instal·lació amb una comanda — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Documentació API completa — cada funció, tipus i adaptador documentat",
      "Actualitzacions de per vida — obtingueu noves versions en qualsevol moment, sense cost addicional",
      "Llicència comercial — feu servir en projectes il·limitats"
    ]
  },
  cs: {
    heading: "Co získáte",
    items: [
      "Pozvánka spolupracovníka na GitHub — doručena během minut po nákupu",
      "Instalace jedním příkazem — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Kompletní API dokumentace — každá funkce, typ a adaptér zdokumentovány",
      "Doživotní aktualizace — stahujte nové verze kdykoliv, bez dalších nákladů",
      "Komerční licence — používejte v neomezeném počtu projektů"
    ]
  },
  cy: {
    heading: "Beth gewch chi",
    items: [
      "Gwahoddiad cydweithiwr GitHub — wedi'i ddanfon o fewn munudau ar ôl prynu",
      "Gosod ag un gorchymyn — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Dogfennaeth API lawn — pob swyddogaeth, math ac addasydd wedi'u dogfennu",
      "Diweddariadau oes — tynnwch fersiynau newydd unrhyw bryd, dim cost ychwanegol",
      "Trwydded fasnachol — defnyddiwch mewn prosiectau diderfyn"
    ]
  },
  da: {
    heading: "Hvad du får",
    items: [
      "GitHub-collaborator-invitation — leveret inden for minutter efter køb",
      "Installation med én kommando — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Fuld API-dokumentation — hver funktion, type og adapter dokumenteret",
      "Livstidsopdateringer — hent nye versioner når som helst, uden ekstra omkostninger",
      "Kommerciel licens — brug i ubegrænsede projekter"
    ]
  },
  el: {
    heading: "Τι λαμβάνετε",
    items: [
      "Πρόσκληση συνεργάτη GitHub — παραδίδεται μέσα σε λίγα λεπτά από την αγορά",
      "Εγκατάσταση με μία εντολή — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Πλήρης τεκμηρίωση API — κάθε συνάρτηση, τύπος και προσαρμογέας τεκμηριωμένος",
      "Δωρεάν ενημερώσεις εφ' όρου ζωής — κατεβάστε νέες εκδόσεις ανά πάσα στιγμή, χωρίς επιπλέον κόστος",
      "Εμπορική άδεια — χρήση σε απεριόριστα έργα"
    ]
  },
  et: {
    heading: "Mida saate",
    items: [
      "GitHubi kaastöötaja kutse — toimetatakse mõne minuti jooksul pärast ostu",
      "Ühe käsuga paigaldamine — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Täielik API dokumentatsioon — iga funktsioon, tüüp ja adapter dokumenteeritud",
      "Eluaegsed uuendused — laadige uusi versioone igal ajal, ilma lisakuludeta",
      "Kommertslitsents — kasutage piiramatutes projektides"
    ]
  },
  eu: {
    heading: "Zer jasotzen duzun",
    items: [
      "GitHub laguntzaile gonbidapena — erosketaren minutu gutxira entregatua",
      "Komando bakarreko instalazioa — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "API dokumentazio osoa — funtzio, mota eta moldagailu guztiak dokumentatuta",
      "Bizitza osorako eguneratzeak — edozein unetan eskuratu bertsio berriak, kostu gehigarririk gabe",
      "Lizentzia komertziala — mugagabeko proiektuetan erabili"
    ]
  },
  fa: {
    heading: "آنچه دریافت می‌کنید",
    items: [
      "دعوت‌نامه همکار GitHub — ظرف چند دقیقه پس از خرید تحویل داده می‌شود",
      "نصب با یک دستور — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "مستندات کامل API — هر تابع، نوع و آداپتور مستندسازی شده",
      "به‌روزرسانی مادام‌العمر — هر زمان نسخه‌های جدید را دریافت کنید، بدون هزینه اضافی",
      "مجوز تجاری — در پروژه‌های نامحدود استفاده کنید"
    ]
  },
  fi: {
    heading: "Mitä saat",
    items: [
      "GitHub-yhteistyökutsu — toimitetaan minuuteissa oston jälkeen",
      "Yhden komennon asennus — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Täydellinen API-dokumentaatio — jokainen funktio, tyyppi ja adapteri dokumentoitu",
      "Elinikäiset päivitykset — hae uusia versioita milloin tahansa, ei lisäkustannuksia",
      "Kaupallinen lisenssi — käytä rajattomissa projekteissa"
    ]
  },
  fil: {
    heading: "Ang makukuha mo",
    items: [
      "GitHub collaborator invite — naihatid sa loob ng ilang minuto pagkatapos bumili",
      "One-command install — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Kumpletong API documentation — bawat function, type, at adapter ay dokumentado",
      "Lifetime updates — kunin ang bagong bersyon anumang oras, walang dagdag na bayad",
      "Commercial license — gamitin sa walang limitasyong mga proyekto"
    ]
  },
  gl: {
    heading: "O que recibes",
    items: [
      "Invitación de colaborador en GitHub — entregada minutos despois da compra",
      "Instalación cun só comando — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Documentación API completa — cada función, tipo e adaptador documentado",
      "Actualizacións de por vida — obtén novas versións en calquera momento, sen custo adicional",
      "Licenza comercial — úsao en proxectos ilimitados"
    ]
  },
  gu: {
    heading: "તમને શું મળે છે",
    items: [
      "GitHub સહયોગી આમંત્રણ — ખરીદીના થોડી મિનિટોમાં મળે છે",
      "એક કમાન્ડથી ઇન્સ્ટોલ — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "સંપૂર્ણ API દસ્તાવેજીકરણ — દરેક ફંક્શન, ટાઇપ અને એડેપ્ટર દસ્તાવેજીકૃત",
      "આજીવન અપડેટ્સ — ગમે ત્યારે નવા વર્ઝન મેળવો, કોઈ વધારાનો ખર્ચ નહીં",
      "વ્યાપારી લાઇસન્સ — અમર્યાદિત પ્રોજેક્ટ્સમાં ઉપયોગ કરો"
    ]
  },
  he: {
    heading: "מה אתה מקבל",
    items: [
      "הזמנת משתף פעולה ב-GitHub — מועברת תוך דקות מהרכישה",
      "התקנה בפקודה אחת — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "תיעוד API מלא — כל פונקציה, סוג ומתאם מתועדים",
      "עדכונים לכל החיים — משוך גרסאות חדשות בכל עת, ללא עלות נוספת",
      "רישיון מסחרי — השתמש בפרויקטים ללא הגבלה"
    ]
  },
  hr: {
    heading: "Što dobivate",
    items: [
      "Pozivnica za GitHub suradnika — isporučena u roku od nekoliko minuta nakon kupnje",
      "Instalacija jednom naredbom — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Potpuna API dokumentacija — svaka funkcija, tip i adapter dokumentirani",
      "Doživotna ažuriranja — preuzmite nove verzije bilo kada, bez dodatnih troškova",
      "Komercijalna licenca — koristite u neograničenom broju projekata"
    ]
  },
  hu: {
    heading: "Mit kapsz",
    items: [
      "GitHub kollaborátor meghívó — a vásárlás után perceken belül kézbesítve",
      "Egyparancs telepítés — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Teljes API dokumentáció — minden funkció, típus és adapter dokumentálva",
      "Élethosszig tartó frissítések — bármikor letöltheted az új verziókat, extra költség nélkül",
      "Kereskedelmi licenc — korlátlan számú projektben használható"
    ]
  },
  hy: {
    heading: "Ինչ եք ստանում",
    items: [
      "GitHub համագործակցի հրավեր — առաքվում է գնումից րոպdelays անց",
      "Մեկ հրամանով տեղադրում — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Ամբողջական API փաստաթղթեր — յուրաdelays անդdelays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays"
    ]
  },
  id: {
    heading: "Apa yang Anda dapatkan",
    items: [
      "Undangan kolaborator GitHub — dikirim dalam hitungan menit setelah pembelian",
      "Instalasi satu perintah — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Dokumentasi API lengkap — setiap fungsi, tipe, dan adapter terdokumentasi",
      "Pembaruan seumur hidup — dapatkan versi baru kapan saja, tanpa biaya tambahan",
      "Lisensi komersial — gunakan di proyek tanpa batas"
    ]
  },
  is: {
    heading: "Hvað þú færð",
    items: [
      "GitHub samstarfsaðila boð — afhent innan nokkurra mínútna frá kaupum",
      "Uppsetning með einni skipun — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Full API skjölun — hvert fall, tegund og millistykki skjalfest",
      "Ævináðgerðir — sæktu nýjar útgáfur hvenær sem er, án aukakostnaðar",
      "Viðskiptaleyfi — notaðu í ótakmörkuðum verkefnum"
    ]
  },
  it: {
    heading: "Cosa ricevi",
    items: [
      "Invito collaboratore GitHub — consegnato in pochi minuti dall'acquisto",
      "Installazione con un comando — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Documentazione API completa — ogni funzione, tipo e adattatore documentato",
      "Aggiornamenti a vita — scarica nuove versioni in qualsiasi momento, senza costi aggiuntivi",
      "Licenza commerciale — utilizza in progetti illimitati"
    ]
  },
  ka: {
    heading: "რას მიიღებთ",
    items: [
      "GitHub თანამშრომლის მოწვევა — შეძენიდან რამდენიმე წუთში მიიღება",
      "ერთი ბრძანებით ინსტალაცია — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "სრული API დოკუმენტაცია — ყველა ფუნქცია, ტიპი და ადაპტერი დოკუმენტირებული",
      "უვადო განახლებები — ნებისმიერ დროს ჩამოტვირთეთ ახალი ვერსიები, დამატებითი ხარჯის გარეშე",
      "კომერციული ლიცენზია — გამოიყენეთ შეუზღუდავ პროექტებში"
    ]
  },
  kk: {
    heading: "Сіз не аласыз",
    items: [
      "GitHub серіктес шақыруы — сатып алғаннан кейін бірнеше минут ішінде жеткізіледі",
      "Бір пәрменмен орнату — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Толық API құжаттамасы — әрбір функция, тип және адаптер құжатталған",
      "Өмірлік жаңартулар — кез келген уақытта жаңа нұсқаларды алыңыз, қосымша шығынсыз",
      "Коммерциялық лицензия — шексіз жобаларда қолданыңыз"
    ]
  },
  km: {
    heading: "អ្វីដែលអ្នកទទួលបាន",
    items: [
      "ការអញ្ជើញអ្នកសហការ GitHub — ផ្ញើក្នុងរយៈពេលប៉ុន្មាននាទីបន្ទាប់ពីការទិញ",
      "ដំឡើងដោយពាក្យបញ្ជាមួយ — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "ឯកសារ API ពេញលេញ — រាល់មុខងារ ប្រភេទ និងអាដាប់ទ័រត្រូវបានចងក្រង",
      "ការអាប់ដេតពេញមួយជីវិត — ទាញយកកំណែថ្មីគ្រប់ពេល ដោយគ្មានថ្លៃបន្ថែម",
      "អាជ្ញាប័ណ្ណពាណិជ្ជកម្ម — ប្រើក្នុងគម្រោងគ្មានដែនកំណត់"
    ]
  },
  kn: {
    heading: "ನೀವು ಏನು ಪಡೆಯುತ್ತೀರಿ",
    items: [
      "GitHub ಸಹಯೋಗಿ ಆಹ್ವಾನ — ಖರೀದಿಯ ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ತಲುಪಿಸಲಾಗುತ್ತದೆ",
      "ಒಂದೇ ಆಜ್ಞೆಯಲ್ಲಿ ಅನುಸ್ಥಾಪನೆ — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "ಸಂಪೂರ್ಣ API ದಾಖಲೆ — ಪ್ರತಿ ಕಾರ್ಯ, ಪ್ರಕಾರ ಮತ್ತು ಅಡಾಪ್ಟರ್ ದಾಖಲಿಸಲಾಗಿದೆ",
      "ಜೀವಮಾನ ನವೀಕರಣಗಳು — ಯಾವಾಗ ಬೇಕಾದರೂ ಹೊಸ ಆವೃತ್ತಿಗಳನ್ನು ಪಡೆಯಿರಿ, ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ವೆಚ್ಚವಿಲ್ಲ",
      "ವಾಣಿಜ್ಯ ಪರವಾನಗಿ — ಅನಿಯಮಿತ ಯೋಜನೆಗಳಲ್ಲಿ ಬಳಸಿ"
    ]
  },
  ky: {
    heading: "Сиз эмнени аласыз",
    items: [
      "GitHub кызматташ чакыруусу — сатып алгандан бир нече мүнөттө жеткирилет",
      "Бир буйрук менен орнотуу — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Толук API документациясы — ар бир функция, түрү жана адаптер документтелген",
      "Өмүр бою жаңыртуулар — каалаган убакта жаңы версияларды алыңыз, кошумча чыгымсыз",
      "Коммерциялык лицензия — чексиз долбоорлордо колдонуңуз"
    ]
  },
  lo: {
    heading: "ສິ່ງທີ່ທ່ານໄດ້ຮັບ",
    items: [
      "ຄຳເຊີນຜູ້ຮ່ວມງານ GitHub — ສົ່ງພາຍໃນນາທີຫຼັງຈາກການຊື້",
      "ຕິດຕັ້ງດ້ວຍຄຳສັ່ງດຽວ — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "ເອກະສານ API ຄົບຖ້ວນ — ທຸກຟັງຊັນ, ປະເພດ ແລະ adapter ມີເອກະສານ",
      "ອັບເດດຕະຫຼອດຊີວິດ — ດາວໂຫຼດເວີຊັນໃໝ່ໄດ້ຕະຫຼອດ, ບໍ່ມີຄ່າໃຊ້ຈ່າຍເພີ່ມ",
      "ໃບອະນຸຍາດການຄ້າ — ໃຊ້ໃນໂຄງການບໍ່ຈຳກັດ"
    ]
  },
  lt: {
    heading: "Ką gausite",
    items: [
      "GitHub bendradarbio pakvietimas — pristatomas per kelias minutes po pirkimo",
      "Įdiegimas viena komanda — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Pilna API dokumentacija — kiekviena funkcija, tipas ir adapteris dokumentuotas",
      "Atnaujinimai visam gyvenimui — bet kada parsisiųskite naujas versijas, be papildomų išlaidų",
      "Komercinė licencija — naudokite neribotame projektų skaičiuje"
    ]
  },
  lv: {
    heading: "Ko jūs saņemat",
    items: [
      "GitHub līdzstrādnieka ielūgums — piegādāts dažu minūšu laikā pēc iegādes",
      "Uzstādīšana ar vienu komandu — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Pilna API dokumentācija — katra funkcija, tips un adapteris dokumentēts",
      "Mūža atjauninājumi — lejupielādējiet jaunas versijas jebkurā laikā, bez papildu izmaksām",
      "Komerciāla licence — izmantojiet neierobežotos projektos"
    ]
  },
  mk: {
    heading: "Што добивате",
    items: [
      "Покана за GitHub соработник — доставена во рок од неколку минути по купувањето",
      "Инсталација со една команда — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Комплетна API документација — секоја функција, тип и адаптер документирани",
      "Доживотни ажурирања — преземете нови верзии кога сакате, без дополнителни трошоци",
      "Комерцијална лиценца — користете во неограничен број проекти"
    ]
  },
  ml: {
    heading: "നിങ്ങൾക്ക് ലഭിക്കുന്നത്",
    items: [
      "GitHub സഹകാരി ക്ഷണം — വാങ്ങിയ ശേഷം മിനിറ്റുകൾക്കുള്ളിൽ ലഭിക്കും",
      "ഒരു കമാൻഡിൽ ഇൻസ്റ്റാൾ — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "പൂർണ്ണ API ഡോക്യുമെന്റേഷൻ — എല്ലാ ഫങ്ഷനും, ടൈപ്പും, അഡാപ്റ്ററും ഡോക്യുമെന്റ് ചെയ്തിരിക്കുന്നു",
      "ആജീവനാന്ത അപ്‌ഡേറ്റുകൾ — എപ്പോൾ വേണമെങ്കിലും പുതിയ പതിപ്പുകൾ നേടുക, അധിക ചെലവില്ല",
      "വാണിജ്യ ലൈസൻസ് — പരിധിയില്ലാത്ത പ്രോജക്ടുകളിൽ ഉപയോഗിക്കുക"
    ]
  },
  mn: {
    heading: "Та юу авах вэ",
    items: [
      "GitHub хамтрагчийн урилга — худалдан авснаас хэдхэн минутын дараа хүргэгдэнэ",
      "Нэг тушаалаар суулгах — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Бүрэн API баримт бичиг — функц, төрөл, адаптер бүр баримтжуулсан",
      "Насан туршийн шинэчлэлтүүд — хүссэн үедээ шинэ хувилбаруудыг аваарай, нэмэлт зардалгүй",
      "Арилжааны лиценз — хязгааргүй төслүүдэд ашиглана"
    ]
  },
  mr: {
    heading: "तुम्हाला काय मिळते",
    items: [
      "GitHub सहकार्यकर्ता आमंत्रण — खरेदीनंतर काही मिनिटांत वितरित",
      "एका कमांडमध्ये इन्स्टॉल — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "संपूर्ण API दस्तऐवजीकरण — प्रत्येक फंक्शन, टाइप आणि अडॅप्टर दस्तऐवजीकृत",
      "आजीवन अपडेट्स — कधीही नवीन आवृत्त्या मिळवा, कोणताही अतिरिक्त खर्च नाही",
      "व्यावसायिक परवाना — अमर्यादित प्रकल्पांमध्ये वापरा"
    ]
  },
  ms: {
    heading: "Apa yang anda dapat",
    items: [
      "Jemputan kolaborator GitHub — dihantar dalam beberapa minit selepas pembelian",
      "Pemasangan satu arahan — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Dokumentasi API penuh — setiap fungsi, jenis dan penyesuai didokumenkan",
      "Kemas kini sepanjang hayat — dapatkan versi baharu pada bila-bila masa, tanpa kos tambahan",
      "Lesen komersial — gunakan dalam projek tanpa had"
    ]
  },
  my: {
    heading: "သင်ရရှိသည့်အရာ",
    items: [
      "GitHub ပူးပေါင်းသူ ဖိတ်ကြားစာ — ဝယ်ယူပြီး မိနစ်ပိုင်းအတွင်း ပေးပို့သည်",
      "တစ်ကြောင်းတည်း ထည့်သွင်းခြင်း — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "ပြည့်စုံသော API စာရွက်စာတမ်း — function, type နှင့် adapter တိုင်း မှတ်တမ်းတင်ထားသည်",
      "တစ်သက်တာ အပ်ဒိတ်များ — အခါမလပ် ဗားရှင်းအသစ်များ ရယူပါ၊ ထပ်ဆောင်းကုန်ကျစရိတ်မရှိ",
      "စီးပွားရေး လိုင်စင် — အကန့်အသတ်မရှိ ပရောဂျက်များတွင် အသုံးပြုပါ"
    ]
  },
  nb: {
    heading: "Hva du får",
    items: [
      "GitHub-collaborator-invitasjon — levert innen minutter etter kjøp",
      "Installasjon med én kommando — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Full API-dokumentasjon — hver funksjon, type og adapter dokumentert",
      "Livstidsoppdateringer — hent nye versjoner når som helst, uten ekstra kostnad",
      "Kommersiell lisens — bruk i ubegrensede prosjekter"
    ]
  },
  ne: {
    heading: "तपाईंले के पाउनुहुन्छ",
    items: [
      "GitHub सहकार्यकर्ता निमन्त्रणा — खरिद पछि केही मिनेटमा पठाइन्छ",
      "एउटै कमान्डमा इन्स्टल — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "पूर्ण API कागजात — हरेक फंक्शन, टाइप र एडेप्टर कागजातमा",
      "जीवनभर अपडेटहरू — कुनै पनि समयमा नयाँ संस्करणहरू प्राप्त गर्नुहोस्, कुनै अतिरिक्त लागत छैन",
      "व्यापारिक इजाजतपत्र — असीमित प्रोजेक्टहरूमा प्रयोग गर्नुहोस्"
    ]
  },
  nl: {
    heading: "Wat je krijgt",
    items: [
      "GitHub-collaborator-uitnodiging — binnen enkele minuten na aankoop geleverd",
      "Installatie met één commando — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Volledige API-documentatie — elke functie, type en adapter gedocumenteerd",
      "Levenslange updates — haal nieuwe versies op wanneer je wilt, zonder extra kosten",
      "Commerciële licentie — gebruik in onbeperkte projecten"
    ]
  },
  pa: {
    heading: "ਤੁਹਾਨੂੰ ਕੀ ਮਿਲਦਾ ਹੈ",
    items: [
      "GitHub ਸਹਿਯੋਗੀ ਸੱਦਾ — ਖਰੀਦ ਤੋਂ ਕੁਝ ਮਿੰਟਾਂ ਵਿੱਚ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ",
      "ਇੱਕ ਕਮਾਂਡ ਨਾਲ ਇੰਸਟਾਲ — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "ਪੂਰੀ API ਦਸਤਾਵੇਜ਼ — ਹਰ ਫੰਕਸ਼ਨ, ਟਾਈਪ ਅਤੇ ਅਡੈਪਟਰ ਦਸਤਾਵੇਜ਼ੀ",
      "ਜੀਵਨ ਭਰ ਅੱਪਡੇਟ — ਕਿਸੇ ਵੀ ਸਮੇਂ ਨਵੇਂ ਵਰਜ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ, ਕੋਈ ਵਾਧੂ ਲਾਗਤ ਨਹੀਂ",
      "ਵਪਾਰਕ ਲਾਇਸੈਂਸ — ਅਸੀਮਤ ਪ੍ਰੋਜੈਕਟਾਂ ਵਿੱਚ ਵਰਤੋ"
    ]
  },
  pl: {
    heading: "Co otrzymujesz",
    items: [
      "Zaproszenie współpracownika GitHub — dostarczone w ciągu kilku minut od zakupu",
      "Instalacja jednym poleceniem — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Pełna dokumentacja API — każda funkcja, typ i adapter udokumentowane",
      "Dożywotnie aktualizacje — pobieraj nowe wersje w dowolnym momencie, bez dodatkowych kosztów",
      "Licencja komercyjna — używaj w nieograniczonej liczbie projektów"
    ]
  },
  ro: {
    heading: "Ce primești",
    items: [
      "Invitație de colaborator GitHub — livrată în câteva minute după achiziție",
      "Instalare cu o singură comandă — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Documentație API completă — fiecare funcție, tip și adaptor documentat",
      "Actualizări pe viață — descarcă versiuni noi oricând, fără costuri suplimentare",
      "Licență comercială — folosește în proiecte nelimitate"
    ]
  },
  si: {
    heading: "ඔබට ලැබෙන දේ",
    items: [
      "GitHub සහයෝගිතා ආරාධනය — මිලදී ගැනීමෙන් මිනිත්තු කිහිපයකින් ලැබේ",
      "එක් විධානයකින් ස්ථාපනය — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "සම්පූර්ණ API ලේඛනගත කිරීම — සෑම ශ්‍රිතයක්, වර්ගයක් සහ ඇඩැප්ටරයක්ම ලේඛනගත කර ඇත",
      "ජීවිත කාලය පුරා යාවත්කාලීන — ඕනෑම වේලාවක නව අනුවාද ලබා ගන්න, අමතර වියදමක් නැත",
      "වාණිජ බලපත්‍රය — අසීමිත ව්‍යාපෘතිවල භාවිතා කරන්න"
    ]
  },
  sk: {
    heading: "Čo získate",
    items: [
      "Pozvánka spolupracovníka na GitHub — doručená v priebehu niekoľkých minút po nákupe",
      "Inštalácia jedným príkazom — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Kompletná API dokumentácia — každá funkcia, typ a adaptér zdokumentované",
      "Doživotné aktualizácie — sťahujte nové verzie kedykoľvek, bez dodatočných nákladov",
      "Komerčná licencia — používajte v neobmedzenom počte projektov"
    ]
  },
  sl: {
    heading: "Kaj dobite",
    items: [
      "Vabilo za GitHub sodelavca — dostavljeno v nekaj minutah po nakupu",
      "Namestitev z enim ukazom — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Popolna API dokumentacija — vsaka funkcija, tip in adapter dokumentirani",
      "Doživljenjske posodobitve — kadar koli prenesite nove različice, brez dodatnih stroškov",
      "Komercialna licenca — uporabite v neomejenem številu projektov"
    ]
  },
  sq: {
    heading: "Çfarë merrni",
    items: [
      "Ftesë bashkëpunëtori në GitHub — e dorëzuar brenda minutash pas blerjes",
      "Instalim me një komandë — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Dokumentacion i plotë API — çdo funksion, tip dhe përshtatës i dokumentuar",
      "Përditësime të përjetshme — shkarkoni versione të reja në çdo kohë, pa kosto shtesë",
      "Licencë komerciale — përdoreni në projekte të pakufizuara"
    ]
  },
  sr: {
    heading: "Шта добијате",
    items: [
      "Позивница за GitHub сарадника — испоручена у року од неколико минута после куповине",
      "Инсталација једном командом — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Комплетна API документација — свака функција, тип и адаптер документовани",
      "Доживотна ажурирања — преузмите нове верзије кад год желите, без додатних трошкова",
      "Комерцијална лиценца — користите у неограниченом броју пројеката"
    ]
  },
  sv: {
    heading: "Vad du får",
    items: [
      "GitHub-collaborator-inbjudan — levererad inom minuter efter köp",
      "Installation med ett kommando — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Fullständig API-dokumentation — varje funktion, typ och adapter dokumenterad",
      "Livstidsuppdateringar — hämta nya versioner när som helst, utan extra kostnad",
      "Kommersiell licens — använd i obegränsade projekt"
    ]
  },
  sw: {
    heading: "Unachopata",
    items: [
      "Mwaliko wa mshirikiano wa GitHub — unaletwa ndani ya dakika chache baada ya ununuzi",
      "Usakinishaji wa amri moja — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Nyaraka kamili za API — kila kazi, aina na adapta imeandikwa",
      "Masasisho ya maisha yote — pata matoleo mapya wakati wowote, bila gharama ya ziada",
      "Leseni ya kibiashara — tumia katika miradi isiyo na kikomo"
    ]
  },
  ta: {
    heading: "நீங்கள் பெறுவது",
    items: [
      "GitHub ஒத்துழைப்பாளர் அழைப்பு — வாங்கிய சில நிமிடங்களில் வழங்கப்படும்",
      "ஒரு கட்டளையில் நிறுவல் — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "முழுமையான API ஆவணம் — ஒவ்வொரு செயல்பாடு, வகை மற்றும் அடாப்டரும் ஆவணப்படுத்தப்பட்டுள்ளது",
      "வாழ்நாள் புதுப்பிப்புகள் — எப்போது வேண்டுமானாலும் புதிய பதிப்புகளைப் பெறுங்கள், கூடுதல் செலவு இல்லை",
      "வணிக உரிமம் — வரம்பற்ற திட்டங்களில் பயன்படுத்தவும்"
    ]
  },
  te: {
    heading: "మీరు పొందేది",
    items: [
      "GitHub సహకారి ఆహ్వానం — కొనుగోలు చేసిన కొన్ని నిమిషాల్లో అందించబడుతుంది",
      "ఒక కమాండ్‌తో ఇన్‌స్టాల్ — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "పూర్తి API డాక్యుమెంటేషన్ — ప్రతి ఫంక్షన్, టైప్ మరియు అడాప్టర్ డాక్యుమెంట్ చేయబడింది",
      "జీవితకాల అప్‌డేట్‌లు — ఎప్పుడైనా కొత్త వెర్షన్‌లు పొందండి, అదనపు ఖర్చు లేదు",
      "వాణిజ్య లైసెన్స్ — అపరిమిత ప్రాజెక్ట్‌లలో వాడండి"
    ]
  },
  th: {
    heading: "สิ่งที่คุณจะได้รับ",
    items: [
      "คำเชิญผู้ร่วมงาน GitHub — จัดส่งภายในไม่กี่นาทีหลังซื้อ",
      "ติดตั้งด้วยคำสั่งเดียว — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "เอกสาร API ครบถ้วน — ทุกฟังก์ชัน ทุกประเภท และทุกอะแดปเตอร์มีเอกสาร",
      "อัปเดตตลอดชีวิต — ดึงเวอร์ชันใหม่ได้ตลอดเวลา ไม่มีค่าใช้จ่ายเพิ่มเติม",
      "ใบอนุญาตเชิงพาณิชย์ — ใช้ในโปรเจกต์ไม่จำกัด"
    ]
  },
  tr: {
    heading: "Ne alıyorsunuz",
    items: [
      "GitHub işbirlikçi daveti — satın alma sonrası dakikalar içinde teslim edilir",
      "Tek komutla kurulum — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Tam API dokümantasyonu — her fonksiyon, tip ve adaptör belgelenmiştir",
      "Ömür boyu güncellemeler — istediğiniz zaman yeni sürümleri alın, ekstra maliyet yok",
      "Ticari lisans — sınırsız projede kullanın"
    ]
  },
  uk: {
    heading: "Що ви отримуєте",
    items: [
      "Запрошення співпрацівника GitHub — доставляється протягом кількох хвилин після покупки",
      "Встановлення однією командою — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Повна документація API — кожна функція, тип і адаптер задокументовані",
      "Довічні оновлення — завантажуйте нові версії в будь-який час, без додаткових витрат",
      "Комерційна ліцензія — використовуйте в необмеженій кількості проєктів"
    ]
  },
  ur: {
    heading: "آپ کو کیا ملتا ہے",
    items: [
      "GitHub تعاون کنندہ دعوت — خریداری کے چند منٹوں میں پہنچا دی جاتی ہے",
      "ایک کمانڈ سے انسٹال — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "مکمل API دستاویزات — ہر فنکشن، قسم اور اڈاپٹر دستاویزی ہے",
      "تاحیات اپ ڈیٹس — کسی بھی وقت نئے ورژن حاصل کریں، کوئی اضافی لاگت نہیں",
      "تجارتی لائسنس — لامحدود منصوبوں میں استعمال کریں"
    ]
  },
  uz: {
    heading: "Nima olasiz",
    items: [
      "GitHub hamkorlik taklifi — sotib olgandan bir necha daqiqada yetkaziladi",
      "Bitta buyruq bilan o'rnatish — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "To'liq API hujjatlari — har bir funksiya, turi va adapter hujjatlashtirilgan",
      "Umrbod yangilanishlar — istalgan vaqtda yangi versiyalarni oling, qo'shimcha xarajatsiz",
      "Tijorat litsenziyasi — cheksiz loyihalarda foydalaning"
    ]
  },
  vi: {
    heading: "Bạn nhận được gì",
    items: [
      "Lời mời cộng tác GitHub — gửi trong vài phút sau khi mua",
      "Cài đặt bằng một lệnh — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Tài liệu API đầy đủ — mọi hàm, kiểu và adapter đều được ghi chép",
      "Cập nhật trọn đời — tải phiên bản mới bất cứ lúc nào, không phí phụ trội",
      "Giấy phép thương mại — sử dụng trong dự án không giới hạn"
    ]
  },
  zu: {
    heading: "Okutholayo",
    items: [
      "Isimemo somlingani we-GitHub — sifika emizuzwini embalwa ngemuva kokuthenga",
      "Ukufaka ngomyalo owodwa — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
      "Imibhalo ye-API ephelele — yonke imisebenzi, uhlobo kanye ne-adapter kubhaliwe",
      "Izibuyekezo zempilo yonke — thola izinguqulo ezintsha noma nini, ngaphandle kwezindleko ezengeziwe",
      "Ilayisensi yokuhweba — sebenzisa kumaphrojekthi angenamkhawulo"
    ]
  }
};

// --- earlybird translations by base language ---
const earlybird = {
  en: "Early adopter discount — 20% off with code",
  fr: "Réduction early adopter — 20 % de réduction avec le code",
  de: "Frühbucher-Rabatt — 20 % Rabatt mit dem Code",
  es: "Descuento para early adopters — 20 % de descuento con el código",
  ja: "アーリーアダプター割引 — コードで20%オフ",
  ar: "خصم المتبنين الأوائل — خصم 20% باستخدام الرمز",
  pt: "Desconto para early adopters — 20% de desconto com o código",
  zh: "早期用户优惠 — 使用代码享8折",
  ko: "얼리 어답터 할인 — 코드로 20% 할인",
  hi: "प्रारंभिक उपयोगकर्ता छूट — कोड के साथ 20% की छूट",
  ru: "Скидка для ранних пользователей — 20% скидка с кодом",
  af: "Vroeë gebruiker-afslag — 20% afslag met kode",
  am: "ቀደምት ተቀባይ ቅናሽ — በኮድ 20% ቅናሽ",
  az: "Erkən istifadəçi endirimi — kodla 20% endirim",
  be: "Зніжка для ранніх карыстальнікаў — 20% зніжка з кодам",
  bg: "Отстъпка за ранни потребители — 20% отстъпка с код",
  bn: "প্রারম্ভিক ব্যবহারকারী ছাড় — কোড দিয়ে 20% ছাড়",
  bs: "Popust za rane korisnike — 20% popusta s kodom",
  ca: "Descompte per a early adopters — 20 % de descompte amb el codi",
  cs: "Sleva pro rané uživatele — 20% sleva s kódem",
  cy: "Gostyngiad mabwysiadwyr cynnar — 20% i ffwrdd gyda chod",
  da: "Tidlig bruger-rabat — 20% rabat med kode",
  el: "Έκπτωση πρώιμου χρήστη — 20% έκπτωση με κωδικό",
  et: "Varajase kasutaja allahindlus — 20% allahindlust koodiga",
  eu: "Lehen erabiltzaileen deskontua — %20 deskontua kodearekin",
  fa: "تخفیف کاربران اولیه — 20% تخفیف با کد",
  fi: "Varhaisen käyttäjän alennus — 20% alennus koodilla",
  fil: "Early adopter discount — 20% off gamit ang code",
  gl: "Desconto para early adopters — 20 % de desconto co código",
  gu: "પ્રારંભિક વપરાશકર્તા છૂટ — કોડ સાથે 20% છૂટ",
  he: "הנחת מאמצים מוקדמים — 20% הנחה עם קוד",
  hr: "Popust za rane korisnike — 20% popusta s kodom",
  hu: "Korai felhasználói kedvezmény — 20% kedvezmény kóddal",
  hy: "Վաdelays delays ells discount — 20% off with code",
  id: "Diskon pengguna awal — diskon 20% dengan kode",
  is: "Afsláttur fyrir snemma notendur — 20% afsláttur með kóða",
  it: "Sconto early adopter — 20% di sconto con il codice",
  ka: "ადრეული მომხმარებლის ფასდაკლება — 20% ფასდაკლება კოდით",
  kk: "Ерте пайдаланушы жеңілдігі — кодпен 20% жеңілдік",
  km: "ការបញ្ចុះតម្លៃអ្នកប្រើប្រាស់ដំបូង — បញ្ចុះ 20% ជាមួយកូដ",
  kn: "ಆರಂಭಿಕ ಬಳಕೆದಾರ ರಿಯಾಯಿತಿ — ಕೋಡ್‌ನೊಂದಿಗೆ 20% ರಿಯಾಯಿತಿ",
  ky: "Эрте колдонуучу арзандатуусу — код менен 20% арзандатуу",
  lo: "ສ່ວນຫຼຸດຜູ້ໃຊ້ກ່ອນ — ຫຼຸດ 20% ດ້ວຍລະຫັດ",
  lt: "Ankstyvo vartotojo nuolaida — 20% nuolaida su kodu",
  lv: "Agro lietotāju atlaide — 20% atlaide ar kodu",
  mk: "Попуст за рани корисници — 20% попуст со код",
  ml: "ആദ്യകാല ഉപയോക്താ കിഴിവ് — കോഡ് ഉപയോഗിച്ച് 20% കിഴിവ്",
  mn: "Эрт хэрэглэгчийн хөнгөлөлт — кодоор 20% хөнгөлөлт",
  mr: "प्रारंभिक वापरकर्ता सवलत — कोडसह 20% सवलत",
  ms: "Diskaun pengguna awal — diskaun 20% dengan kod",
  my: "အစောပိုင်း အသုံးပြုသူ လျှော့ဈေး — ကုဒ်ဖြင့် 20% လျှော့",
  nb: "Tidlig bruker-rabatt — 20% rabatt med kode",
  ne: "प्रारम्भिक प्रयोगकर्ता छुट — कोडसँग 20% छुट",
  nl: "Vroege gebruiker korting — 20% korting met code",
  pa: "ਸ਼ੁਰੂਆਤੀ ਵਰਤੋਂਕਾਰ ਛੋਟ — ਕੋਡ ਨਾਲ 20% ਛੋਟ",
  pl: "Zniżka dla wczesnych użytkowników — 20% zniżki z kodem",
  ro: "Reducere pentru utilizatorii timpurii — 20% reducere cu codul",
  si: "ආරම්භක පරිශීලක වට්ටම — කේතයෙන් 20% වට්ටම",
  sk: "Zľava pre skorých používateľov — 20% zľava s kódom",
  sl: "Popust za zgodnje uporabnike — 20% popust s kodo",
  sq: "Zbritje për përdoruesit e hershëm — 20% zbritje me kod",
  sr: "Попуст за ране кориснике — 20% попуста са кодом",
  sv: "Rabatt för tidiga användare — 20% rabatt med kod",
  sw: "Punguzo la watumiaji wa mapema — punguzo la 20% kwa msimbo",
  ta: "ஆரம்ப பயனர் தள்ளுபடி — குறியீட்டுடன் 20% தள்ளுபடி",
  te: "ప్రారంభ వినియోగదారు తగ్గింపు — కోడ్‌తో 20% తగ్గింపు",
  th: "ส่วนลดผู้ใช้งานรุ่นแรก — ลด 20% ด้วยรหัส",
  tr: "Erken kullanıcı indirimi — kodla %20 indirim",
  uk: "Знижка для ранніх користувачів — 20% знижка з кодом",
  ur: "ابتدائی صارف رعایت — کوڈ کے ساتھ 20% چھوٹ",
  uz: "Erta foydalanuvchi chegirmasi — kod bilan 20% chegirma",
  vi: "Giảm giá cho người dùng sớm — giảm 20% với mã",
  zu: "Isaphulelo somuntu wokuqala — 20% isaphulelo ngekodi"
};

// --- Locale → base language mapping ---
function getBaseLanguage(locale) {
  // Extract language code before the hyphen
  const lang = locale.split('-')[0];
  return lang;
}

// --- zh-TW and zh-HK need traditional Chinese ---
const zhTW = {
  heading: "購買後您將獲得",
  items: [
    "GitHub協作者邀請 — 購買後幾分鐘內送達",
    "一條命令安裝 — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
    "完整API文件 — 每個函式、類型和轉接器都有文件",
    "終身更新 — 隨時獲取新版本，無額外費用",
    "商業授權 — 在無限專案中使用"
  ]
};
whatYouGet['zh-TW'] = zhTW;
whatYouGet['zh-HK'] = zhTW;
earlybird['zh-TW'] = "早期用戶優惠 — 使用代碼享8折";
earlybird['zh-HK'] = "早期用戶優惠 — 使用代碼享8折";

// Fix Armenian (hy) which had garbled text
whatYouGet.hy = {
  heading: "Ինusage եdelays ells get",
  items: [
    "GitHub համագործdelays ells itation — delivered within minutes of purchase",
    "One-command install — npm install git+https://github.com/TomahawkCM/polyglot-kit.git",
    "Full API documentation — every function, type, and adapter documented",
    "Lifetime updates — pull new versions anytime, no extra cost",
    "Commercial license — use in unlimited projects, yours to keep"
  ]
};
// Actually let's use English for Armenian since we don't have good translations
whatYouGet.hy = whatYouGet.en;
earlybird.hy = earlybird.en;

// --- Main script ---
const dir = TRANSLATIONS_DIR;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let updated = 0;
let errors = [];

for (const file of files) {
  const filePath = path.join(dir, file);
  const locale = file.replace('.json', '');
  const baseLang = getBaseLanguage(locale);

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);

    // Determine whatYouGet translation: check specific locale first, then base language, then English
    const wyg = whatYouGet[locale] || whatYouGet[baseLang] || whatYouGet.en;
    const eb = earlybird[locale] || earlybird[baseLang] || earlybird.en;

    // Add whatYouGet before footer
    // Rebuild the object with correct key order
    const newData = {};
    for (const key of Object.keys(data)) {
      if (key === 'footer') {
        newData.whatYouGet = wyg;
      }
      newData[key] = data[key];
    }
    // If footer didn't exist, add at end
    if (!newData.whatYouGet) {
      newData.whatYouGet = wyg;
    }

    // Update earlybird
    if (newData.pricing) {
      newData.pricing.earlybird = eb;
    }

    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2) + '\n', 'utf8');
    updated++;
  } catch (err) {
    errors.push(`${file}: ${err.message}`);
  }
}

console.log(`Updated ${updated}/${files.length} files`);
if (errors.length) {
  console.error('Errors:', errors);
  process.exit(1);
}
