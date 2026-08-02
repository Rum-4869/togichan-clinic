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
/* ==========================================
   1. 「現在診療中か」を自動判定する仕組み
   ========================================== */
function checkClinicStatus() {
    const badge = document.getElementById('status-badge');
    if (!badge) return;

    const now = new Date();
    const day = now.getDay();   // 0:日, 1:月, 2:火, 3:水, 4:木, 5:金, 6:土
    const hour = now.getHours();

    // 例：木曜(4)と日曜(0)が休診、時間は9時〜18時まで診療と仮定
    const isClosedDay = (day === 0 || day === 4);
    const isOpenTime = (hour >= 9 && hour < 18);

    if (!isClosedDay && isOpenTime) {
        badge.textContent = '🟢 現在、診療受付中です';
        badge.className = 'status-badge status-open';
    } else {
        badge.textContent = '🔴 本日の診療は終了しました';
        badge.className = 'status-badge status-closed';
    }
}
checkClinicStatus(); // サイトを開いた瞬間に判定を実行！

/* ==========================================
   3. スクロールに合わせてフワッと出す仕組み
   ========================================== */
// 画面に入ったか監視する「オブザーバー」を作る
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 要素が画面に入ったら 'visible' クラスをつける
            entry.target.classList.add('visible');
        }
    });
});

// HTMLで 'fade-in' をつけた要素をすべて見つけて、監視対象にする
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    // 1. 300px以上スクロールしたらボタンを表示、それ以外は非表示にする
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // 2. ボタンをクリックしたらページトップへスムーズに戻る
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault(); // リンク本来のジャンプを無効化
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // スムーズにスクロールさせる
        });
    });
}