// ==================== БАЗА КЕЙСОВ (СПОРТИВНАЯ МЕДИЦИНА) ====================
const TASKS = [
    {
        id: 1,
        title: "Синдром перетренированности",
        shortDesc: "Бегун на длинные дистанции, 24 года. Жалобы на снижение результатов, бессонницу, тахикардию в покое.",
        specialty: "cardiology",
        points: 35,
        questionText: "Какой диагностический критерий является ключевым для синдрома перетренированности?",
        options: [
            "Снижение уровня кортизола",
            "Повышение уровня креатинфосфокиназы (КФК)",
            "Снижение вариабельности сердечного ритма (ВСР)",
            "Повышение уровня ферритина"
        ],
        correctAnswer: "Снижение вариабельности сердечного ритма (ВСР)",
        explanation: "Снижение ВСР — ранний маркер вегетативного дисбаланса при перетренированности, отражает истощение адаптационных резервов организма спортсмена."
    },
    {
        id: 2,
        title: "Растяжение связок голеностопа",
        shortDesc: "Футболист, 19 лет. Резкая боль в голеностопе после подворота стопы во время бега. Отёк, гематома.",
        specialty: "traumatology",
        points: 30,
        questionText: "Каков протокол первой помощи при растяжении связок голеностопа?",
        options: [
            "Тепло, компресс, подъём конечности",
            "Холод, покой, эластичный бинт, подъём конечности (RICE)",
            "Обезболивающее и полная иммобилизация",
            "Сразу начать разработку сустава"
        ],
        correctAnswer: "Холод, покой, эластичный бинт, подъём конечности (RICE)",
        explanation: "Протокол RICE (Rest, Ice, Compression, Elevation) — стандарт первой помощи при острых травмах мягких тканей в спортивной медицине."
    },
    {
        id: 3,
        title: "Тепловой удар у спортсмена",
        shortDesc: "Марафонец, 32 года. На финише потерял сознание. Кожа сухая, горячая. Температура тела 40.5°C.",
        specialty: "emergency",
        points: 40,
        questionText: "Какое действие является первым и обязательным при тепловом ударе?",
        options: [
            "Внутривенное введение жидкости",
            "Немедленное охлаждение тела (ледяные компрессы, ванна)",
            "Приём жаропонижающих препаратов",
            "Ингаляция кислорода"
        ],
        correctAnswer: "Немедленное охлаждение тела (ледяные компрессы, ванна)",
        explanation: "Тепловой удар — критическое состояние в спортивной медицине. Основное лечение — быстрое физическое охлаждение тела до нормализации температуры."
    },
    {
        id: 4,
        title: "Сотрясение мозга в спорте",
        shortDesc: "Хоккеист, 22 года. После столкновения на льду жалобы на головокружение, тошноту, потерю сознания на 30 секунд.",
        specialty: "traumatology",
        points: 35,
        questionText: "Какой протокол используется для оценки спортсмена с подозрением на сотрясение мозга на поле?",
        options: [
            "Шкала комы Глазго (ШКГ)",
            "Спортивный тест на сотрясение мозга (SCAT5)",
            "МРТ головного мозга",
            "Электроэнцефалография (ЭЭГ)"
        ],
        correctAnswer: "Спортивный тест на сотрясение мозга (SCAT5)",
        explanation: "SCAT5 (Sport Concussion Assessment Tool) — стандартизированный протокол для оценки спортсменов с подозрением на сотрясение мозга непосредственно на месте соревнования."
    },
    {
        id: 5,
        title: "Внезапная сердечная смерть в спорте",
        shortDesc: "Баскетболист, 19 лет. Во время интенсивной тренировки потерял сознание, пульс не определяется, дыхание отсутствует.",
        specialty: "emergency",
        points: 45,
        questionText: "Что является наиболее частой причиной внезапной сердечной смерти у молодых спортсменов?",
        options: [
            "Гипертрофическая кардиомиопатия",
            "Миокардит",
            "Тромбоэмболия легочной артерии",
            "Разрыв аневризмы аорты"
        ],
        correctAnswer: "Гипертрофическая кардиомиопатия",
        explanation: "Гипертрофическая кардиомиопатия является наиболее частой причиной внезапной сердечной смерти у молодых спортсменов в возрасте до 35 лет."
    },
    {
        id: 6,
        title: "Обезвоживание и электролитный дисбаланс",
        shortDesc: "Теннисистка, 27 лет. Во время матча в жаркую погоду жалобы на судороги мышц, слабость, головную боль.",
        specialty: "emergency",
        points: 30,
        questionText: "Какое состояние наиболее вероятно у спортсменки?",
        options: [
            "Гипонатриемия",
            "Гиперкалиемия",
            "Гипокальциемия",
            "Гипомагниемия"
        ],
        correctAnswer: "Гипонатриемия",
        explanation: "Гипонатриемия (снижение уровня натрия в крови) часто возникает у спортсменов, тренирующихся в жаркую погоду, из-за чрезмерного потоотделения и недостаточного восполнения электролитов."
    }
];

// ==================== ХРАНИЛИЩЕ ====================
const STORAGE_USERS = "medskills_users";
const STORAGE_CURRENT_USER = "medskills_current_session";

function hashPassword(pwd) {
    return btoa(pwd + "medSalt2025");
}

function initUsersStore() {
    let users = localStorage.getItem(STORAGE_USERS);
    if (!users) {
        const demoUser = {
            login: "doctor",
            passwordHash: hashPassword("123"),
            solvedTasks: [],
            totalPoints: 0
        };
        localStorage.setItem(STORAGE_USERS, JSON.stringify([demoUser]));
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function findUserByLogin(login) {
    const users = getUsers();
    return users.find(u => u.login === login) || null;
}

function getCurrentUser() {
    const session = sessionStorage.getItem(STORAGE_CURRENT_USER);
    if (!session) return null;
    try {
        const { login } = JSON.parse(session);
        return findUserByLogin(login);
    } catch (e) { return null; }
}

function saveUserProgress(userLogin, solvedArray, pointsSum) {
    const users = getUsers();
    const idx = users.findIndex(u => u.login === userLogin);
    if (idx !== -1) {
        users[idx].solvedTasks = solvedArray;
        users[idx].totalPoints = pointsSum;
        saveUsers(users);
    }
}

function logout() {
    sessionStorage.removeItem(STORAGE_CURRENT_USER);
    window.location.href = "index.html";
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Инициализация при загрузке любого скрипта
initUsersStore();