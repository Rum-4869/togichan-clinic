const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

function getClinicStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isClosedDay = day === 0 || day === 4;
  const isOpenTime = hour >= 9 && hour < 18;

  return {
    text: !isClosedDay && isOpenTime ? '🟢 現在、診療受付中です' : '🔴 本日の診療は終了しました',
    className: !isClosedDay && isOpenTime ? 'status-badge status-open' : 'status-badge status-closed'
  };
}

const newsItems = [
  { label: 'お知らせ', text: '年末年始の診療は、12月29日(火)〜1月3日(日)までお休みとさせていただきます。', color: '#61b5d9' },
  { label: '休診情報', text: '10月3日(土)は、都合により臨時休診とさせていただきます。ご迷惑をおかけしますがよろしくお願いいたします。', color: '#ff9d76' },
  { label: '予防接種', text: 'インフルエンザ予防接種の予約受付を開始しました。WEBまたはお電話にてご予約ください。', color: '#4ade80' },
  { label: 'お知らせ', text: '院内の絵本を新しく入れ替えました！待ち時間も楽しくお過ごしいただけます。', color: '#61b5d9' }
];

const services = [
  { icon: '🩺', title: '一般小児科', description: 'かぜ、発熱、腹痛など、お子様のあらゆる急な体調不良に対応します。' },
  { icon: '🌿', title: '小児アレルギー科', description: 'アトピー性皮膚炎、食物アレルギー、花粉症、気管支ぜんそくなどの検査・治療を行います。' },
  { icon: '🧴', title: '小児皮膚科', description: 'あせも、おむつかぶれ、乳児湿疹など、お子様のデリケートな肌トラブルを優しく治療します。' },
  { icon: '🍎', title: '育児・栄養相談', description: '離乳食の進め方やアレルギーの心配、夜泣きや発育に関するお悩みに丁寧にお答えします。' },
  { icon: '💉', title: '予防接種', description: '定期接種、任意接種に幅広く対応。スケジュール管理もお任せください。' },
  { icon: '👶', title: '乳幼児健診', description: 'お子様の健やかな発育と発達を、丁寧にサポート・確認いたします。' }
];

const staffMembers = [
  { image: 'images/とぎちゃん.jpg', name: '院長：とぎちゃん 先生', text: '「地域のこどもたちと、パパママの笑顔を守る。」をモットーに、親しみやすく安心できるクリニックを目指しています。育児のちょっとした不安や疑問も、どうぞお気軽にご相談ください。' },
  { image: 'images/ayana.jpg', name: '看護師：あやな さん', text: 'お子様がリラックスして注射や診察を受けられるよう、優しく笑顔でサポートします！どんなことでも気軽にお声がけください。' },
  { image: 'images/Jill.jpg', name: '受付・医療事務：ジル さん', text: '明るい笑顔で皆様をお迎えします。予防接種のスケジュール管理や、受診に関するご不安など、何でもご相談ください。' }
];

const facilities = [
  { image: 'images/待合室.jpg', title: '明るい待合室', description: '感染対策を徹底し、お子様がリラックスして待ち時間を過ごせるよう絵本やぬいぐるみをご用意しています。' },
  { image: 'images/kidsspace.jpg', title: 'キッズスペース', description: '靴を脱いで遊べるスペースです。おもちゃは定期的にアルコール消毒を行っています。' },
  { image: 'images/授乳室.jpg', title: '授乳室・おむつ台', description: '調乳用のお湯や、おむつ替え専用のシートを完備。安心してお越しください。' }
];

const scheduleRows = [
  { time: '9:00 - 12:30', days: ['◯', '◯', '◯', '/', '◯', '◯', '/'] },
  { time: '15:00 - 18:00', days: ['◯', '◯', '/', '/', '◯', '◯', '/'] }
];

const faqItems = [
  { question: '予約なしでも診てもらえますか？', answer: 'はい、ご受診いただけます。ただし、ご予約の患者様を優先してご案内するため、お待ちいただく場合がございます。可能な限りWEB予約をご利用ください。' },
  { question: '駐車場はありますか？', answer: 'はい、クリニックの目の前に10台分の無料駐車場をご用意しております。' },
  { question: '予防接種と健診は同時に受けられますか？', answer: 'はい、同時受診が可能です。ご予約の際、両方のメニューを選択してください。' }
];

app.get('/', (req, res) => {
  res.render('index', {
    pageTitle: 'とぎちゃんクリニック | 地域のこどもたちと、パパママの笑顔を守る。',
    statusBadge: getClinicStatus(),
    newsItems,
    services,
    staffMembers,
    facilities,
    scheduleRows,
    faqItems,
    year: new Date().getFullYear()
  });
});

app.get('/reserve', (req, res) => {
  res.render('reserve', {
    statusBadge: getClinicStatus(),
    year: new Date().getFullYear()
  });
});

app.post('/reserve', (req, res) => {
  const formData = {
    name: req.body.name || '',
    phone: req.body.phone || '',
    date: req.body.date || '',
    department: req.body.department || '',
    note: req.body.note || ''
  };

  res.render('thanks', {
    statusBadge: getClinicStatus(),
    year: new Date().getFullYear(),
    formData
  });
});

app.use(express.static(path.join(__dirname), { index: false }));

const port = Number(process.env.PORT || 3000);
const host = '127.0.0.1';

const server = app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Use a different port: PORT=3001 npm start`);
  } else if (err.code === 'EPERM') {
    console.error(`Permission denied for port ${port}. Use a higher port or run with appropriate permissions.`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
