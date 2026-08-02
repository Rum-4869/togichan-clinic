// HTMLの中から、三本線ボタンとメニューの枠を探してくる
const hamburgerBtn = document.querySelector('.hamburger-btn');
const navMenu = document.querySelector('.nav-menu');

// 三本線ボタンが「クリック」されたときの処理
hamburgerBtn.addEventListener('click', () => {
    // toggle（トグル）＝ ついていなければ付ける、ついていれば外す という超便利メソッド！
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// メニューの中のリンクが押されたら、メニューを閉じる処理
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
// ==========================================
// FAQアコーディオン（よくある質問を開閉する）
// ==========================================
// 1. ページ内の「質問ボタン」をすべて取得する
const faqQuestions = document.querySelectorAll('.faq-question');

// 2. forEachを使って、1つ1つの質問ボタンに設定をしていく
faqQuestions.forEach((question) => {
    
    // 3. クリックされた時の処理
    question.addEventListener('click', () => {
        // クリックされた質問の「親要素（.faq-itemの箱）」を取得
        const faqItem = question.parentElement;
        
        // toggleを使って 'active' クラスを付け外しする
        faqItem.classList.toggle('active');
    });
});