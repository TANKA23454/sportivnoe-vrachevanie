// ==================== БАЗА ЗАДАЧ ====================
const TASKS = [
    { id: 1, title: "Острый коронарный синдром", shortDesc: "Пациент 58 лет с давящей болью за грудиной, иррадиация в левую руку.", specialty: "cardiology", points: 30, questionText: "Какое исследование является наиболее приоритетным для экстренной диагностики ОКС в первые 10 минут?", options: ["Тропониновый тест", "ЭКГ в 12 отведениях", "Эхокардиография", "Коронарография"], correctAnswer: "ЭКГ в 12 отведениях", explanation: "ЭКГ — быстро, доступно, позволяет выявить элевацию ST или другие изменения, определяет тактику реперфузии." },
    { id: 2, title: "Инфекционный эндокардит", shortDesc: "Лихорадка, шум регургитации, положительная гемокультура.", specialty: "infectious", points: 25, questionText: "Какой метод визуализации наиболее чувствителен для диагностики вегетаций на клапанах?", options: ["Трансторакальная эхокардиография", "Чреспищеводная эхокардиография", "МСКТ сердца", "МРТ сердца"], correctAnswer: "Чреспищеводная эхокардиография", explanation: "ЧПЭхоКГ имеет высокую разрешающую способность, особенно при протезированных клапанах." },
    { id: 3, title: "Анафилактический шок", shortDesc: "Через 5 минут после в/в антибиотика: гипотензия, стридор, крапивница.", specialty: "emergency", points: 40, questionText: "Какой препарат вводится первым при анафилаксии?", options: ["Дексаметазон", "Адреналин (эпинефрин)", "Димедрол", "Допамин"], correctAnswer: "Адреналин (эпинефрин)", explanation: "Адреналин — препарат выбора, вводится внутримышечно немедленно." },
    { id: 4, title: "Фибрилляция предсердий", shortDesc: "Пожилой пациент, жалобы на сердцебиение, слабость.", specialty: "cardiology", points: 20, questionText: "Для учета риска тромбоэмболических осложнений при неклапанной ФП используется шкала:", options: ["HAS-BLED", "CHA₂DS₂-VASc", "TIMI", "GRACE"], correctAnswer: "CHA₂DS₂-VASc", explanation: "CHA₂DS₂-VASc оценивает риск инсульта/ТЭЛА." },
    { id: 5, title: "Менингит", shortDesc: "Головная боль, ригидность затылочных мышц, лихорадка, сыпь.", specialty: "infectious", points: 35, questionText: "Золотой стандарт для подтверждения диагноза бактериального менингита?", options: ["КТ головного мозга", "Люмбальная пункция с анализом ликвора", "ПЦР крови", "МРТ с контрастом"], correctAnswer: "Люмбальная пункция с анализом ликвора", explanation: "Анализ ликвора (цитоз, белок, глюкоза) позволяет верифицировать диагноз." },
    { id: 6, title: "Гипертонический криз", shortDesc: "АД 210/120, головная боль, отек легких.", specialty: "emergency", points: 25, questionText: "Какой препарат предпочтительнее при осложненном гипертоническом кризе с отеком легких?", options: ["Нифедипин сублингвально", "Фуросемид в/в + нитроглицерин в/в", "Клонидин", "Каптоприл под язык"], correctAnswer: "Фуросемид в/в + нитроглицерин в/в", explanation: "Диуретик + вазодилататор снижают преднагрузку и постнагрузку." }
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