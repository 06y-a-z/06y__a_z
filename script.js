document.addEventListener('DOMContentLoaded', () => {

    /*
    * ===============================================
    * ★ ここを編集してください ★
    * ===============================================
    *
    * 表示したいコンテンツのリストです。
    * { } のカタマリをコピー＆ペーストすれば、
    * 好きなだけコンテンツを追加・削除できます。
    *
    */
    const contents = [
        { 
            title: "自己紹介", // ← 大きいタイトル
            artist: "", // ← アーティスト名（小さい文字）
            image: "/Users/yuuma/Downloads/Google Gemini Generated Image.png", // ← 画像のURL
            link: "", // ← 画像クリック時のリンク先
            details: "私の名前は齊藤優瞬[さいとうゆうま]です。難しい漢字ばかりで小学校の習字の時にはとても苦労をしました笑\n私は'人間の行動力は楽しい'から来ていると考えています。\nですので私は楽しいをモットーにさらに面白く、楽しく改善できるのではと常に考えて生活しています。\n動画なども伝えたいことをしっかりと捉えどうすればみんなが見てもらえるか、最初の3秒で決めに行きます。\n何かイベントなどでどうすればもっと伝わるかなど困ることがあったらご連絡ください！\nFacebookは2曲次で👋" // ← 詳細情報。 \n で改行されます
        },
        { 
            title: "私の通っている大学『iU』", // ← 大きいタイトル
            artist: "情報経営イノベーション専門職大学", // ← アーティスト名（小さい文字）
            image: "https://gateway.guide/wp-content/uploads/2024/04/338690348_6171625642883693_3271966848565495560_n.jpg", // ← 画像のURL
            link: "https://www.i-u.ac.jp/", // ← 画像クリック時のリンク先
            details: "私が現在通っているiU\n 正式名称『情報経営イノベーション専門職大学』です.\n設立7年目の大学でいい意味で何でもありで自分の好きなことを学べます。\n楽しいという感情を大切に,主体的に学習を進めています。" // ← 詳細情報。 \n で改行されます
        },
        { 
            title: "私のFacebook", // ← 大きいタイトル
            artist: "SNSアカウント", // ← アーティスト名（小さい文字）
            image: "/Users/yuuma/Downloads/facebookアイコン.png", // ← 画像のURL
            link: "https://www.facebook.com/share/19rjzq1cc8/?mibextid=wwXIfr", // ← 画像クリック時のリンク先
            details: "Facebookの私のページです。日常の出来事や、イベント情報などを投稿しています。ぜひフォローしてください！\n最近は動かせていないので積極的に動かそうと思います💦\niUの情報や活動を世間に伝えていこうと思います！" // ← 詳細情報。 \n で改行されます
        },
        { 
            title: "私のInstagram", 
            artist: "フォローしてね！",
            image: "/Users/yuuma/Downloads/インスタアイコン.png",
            link: "https://www.instagram.com/o6y__4?igsh=YjE5cmR6NmUzYWkw&utm_source=qr",
            details: "Instagramでは、主にストーリーを投稿しています。\n滅多には投稿しませんが、旅行など休暇の様子をあげています。\nプライベートが気になる方は是非！"
        },
        { 
            title: "私のTik Tok", 
            artist: "o6y__a",
            image: "/Users/yuuma/Downloads/TikTokアイコン.png",
            link: "https://www.tiktok.com/@o6y__4?_r=1&_t=ZS-91YHvGS7Am4",
            details: "TikTokでは、面白いをどれだけ短く伝えられるかが大切だと思います。\n最近は動画編集などに挑戦しているため、面白いと感じた構図を投稿して世間からの評価を見ています。またダンス動画も投稿していてダンスの素晴らしさを伝えようと考えています。\n僕の楽しいを具現化したようなアカウントなので興味を持ってもらえたらフォローしていただけると幸いです！"
        },
        { 
            title: "僕の推し『TWICE』", 
            artist: "TWICE",
            image: "https://img.hankyung.com/photo/202509/BF.41886386.1.jpg",
            link: "https://www.twicejapan.com/",
            details: "僕が大好きなK-popアイドルであるTWICEです。\nダンスの揃い具合が素晴らしく、メンバーのそれぞれの個性が違うことでより味を出しているこのグループ、プライベートの動画など見ていてとても面白いです！\n僕の最推しはtzuyuです。\nマンネ(末っ子)であり、グループみんなから愛され可愛らしいですが、ライブで魅せるあのギャップに惚れました。\n興味を持たれた方、是非一緒にライブに行きましょう！\n音楽、ダンスの素晴らしさ、そして推しが与えてくれる明日への活力を貰いに行きましょう！",
        }
    ];
    // ★ 編集エリアはここまで ★
    // ===============================================


    // 2. HTML要素の取得
    const playerImage = document.getElementById('player-image');
    const imageArea = document.querySelector('.image-area'); 
    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.querySelector('.artist'); 
    const playPauseButton = document.getElementById('play-pause-button');
    const playPauseIcon = playPauseButton.querySelector('.material-icons');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const currentTimeElement = document.getElementById('current-time');
    const shareButton = document.getElementById('share-button');
    const detailTitle = document.getElementById('detail-title');
    const detailContent = document.getElementById('detail-content');

    // 3. 状態変数
    let currentContentIndex = 0; 
    let isPlaying = false;       
    
    // 時間はミリ秒単位で管理
    const autoAdvanceDuration = 10000; // 10秒 = 10,000ミリ秒
    const updateInterval = 100;      // 100ミリ秒（0.1秒）ごとに更新（滑らかさ）
    
    let progressInterval;        
    let elapsedTime = 0;         

    // 4. コンテンツ表示を更新する関数
    function updateContent() {
        const content = contents[currentContentIndex];
        
        // テキストと画像を更新
        playerImage.src = content.image;
        playerTitle.textContent = content.title;
        playerArtist.textContent = content.artist; 
        
        // 詳細情報を更新
        detailTitle.textContent = content.title + "の詳細"; 
        detailContent.textContent = content.details; 

        // 画像エリアにクリックイベントを設定
        imageArea.style.cursor = 'pointer'; 
        imageArea.onclick = () => {
            if (isPlaying) {
                pausePlaying();
            }
            window.open(content.link, '_blank'); 
        };
    }

    // 5. プログレスバーと時間の更新（0.1秒ごとに呼ばれる）
    function updateProgressBar() {
        elapsedTime += updateInterval; 
        
        const progressPercentage = (elapsedTime / autoAdvanceDuration) * 100;
        
        progressBarFill.style.width = `${Math.min(progressPercentage, 100)}%`; 
        
        currentTimeElement.textContent = formatTime(Math.floor(elapsedTime / 1000));

        if (elapsedTime >= autoAdvanceDuration) {
            nextContent(); 
        }
    }

    // 時間をMM:SS形式にフォーマットするヘルパー関数
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // 6. 再生開始
    function startPlaying() {
        if (isPlaying) return; 
        isPlaying = true;
        playPauseIcon.textContent = 'pause'; 
        
        clearInterval(progressInterval); 
        
        progressInterval = setInterval(updateProgressBar, updateInterval);
    }

    // 7. 一時停止
    function pausePlaying() {
        if (!isPlaying) return; 
        isPlaying = false;
        playPauseIcon.textContent = 'play_arrow'; 
        
        clearInterval(progressInterval); 
    }

    // 8. 次のコンテンツへ
    function nextContent() {
        currentContentIndex = (currentContentIndex + 1) % contents.length;
        
        const wasPlaying = isPlaying; 
        resetPlayback();
        updateContent();
        
        if (wasPlaying) { 
            startPlaying();
        }
    }

    // 9. 前のコンテンツへ
    function prevContent() {
        currentContentIndex = (currentContentIndex - 1 + contents.length) % contents.length;
        
        const wasPlaying = isPlaying; 
        resetPlayback();
        updateContent();
        
        if (wasPlaying) { 
            startPlaying();
        }
    }

    // 10. 再生状態をリセット（次の曲に移った時に呼ぶ）
    function resetPlayback() {
        clearInterval(progressInterval); 
        elapsedTime = 0;                 
        progressBarFill.style.width = '0%';
        currentTimeElement.textContent = '0:00';
        
        if (isPlaying) {
            isPlaying = false;
            playPauseIcon.textContent = 'play_arrow';
        }
    }


    // 11. イベントリスナーを設定
    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            pausePlaying();
        } else {
            startPlaying();
        }
    });

    prevButton.addEventListener('click', prevContent);
    nextButton.addEventListener('click', nextContent);

    // B:
    shareButton.addEventListener('click', async () => {
        const currentContent = contents[currentContentIndex];
        
        const shareData = {
            title: currentContent.title, 
            text: `「${currentContent.title}」をチェック！\nアーティスト: ${currentContent.artist}\n${currentContent.details.substring(0, 100)}...\n`, // 本文
            url: window.location.href // このページ自体のURL
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('コンテンツが正常に共有されました');
            } catch (err) {
                console.error('共有に失敗しました:', err);
            }
        } else {
            // PCや非対応ブラウザの場合
            alert('お使いのブラウザは共有機能に対応していません。');
        }
    });

    // 12. ページ読み込み時に、最初のコンテンツを表示
    updateContent();
    pausePlaying(); // 最初は一時停止状態にしておく
});