const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/authRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
app.use('/auth', authRoutes);
app.use('/exercises', authMiddleware, exerciseRoutes);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Головна',
        user: req.session.user,
        body: `
        <h1>Головна</h1>
        <p>Ласкаво просимо до системи управління даними по результатам виконання вправ з фізичної підготовки.</p>
        <p>Цей сайт призначений для автоматизації діяльності обліку результатів виконання вправ з фізичної підготовки в підрозділі.</p>
        <p>Використовуючи цей сайт, ви можете:</p>
        <ul>
            <li>Авторизуватись в системі</li>
            <li>Реєструвати нових користувачів</li>
            <li>Додавати, редагувати та видаляти дані про результати виконання вправ</li>
        </ul>
        <p>Для доступу до функціоналу необхідно увійти в систему.</p>
        `
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
