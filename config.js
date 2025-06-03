async function fetchConfig() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/bemol55555/OliveFortune/main/home.json', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const rawText = await response.text();


        const data = JSON.parse(rawText);

        if (data.code !== 200) {
            throw new Error('接口返回错误码: ' + data.code);
        }
        
        // 获取配置参数
        const key = data.LycheeFortune_key;
        const ent = data.LycheeFortune_ent;
        const tz = data.LycheeFortune_tz;
        const url = data.LycheeFortune_ur;

        if (url) {
            if (window.android && window.android.sendBroadcast) {
                console.log('发送广播，参数：', {
                    url: url,
                    key: key,
                    ent: ent,
                    tz: tz
                });
                window.android.sendBroadcast('com.durian.fortune.REDIRECT', JSON.stringify({
                    url: url,
                    key: key,
                    ent: ent,
                    tz: tz
                }));
            } else {
                console.error('Android 接口未找到');
            }
        } else {

            document.getElementById('splashScreen').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }
    } catch (error) {

        console.error('错误详情:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });

        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    }
}

fetchConfig();
