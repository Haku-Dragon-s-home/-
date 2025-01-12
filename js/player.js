


/*	player.js
 *	created by sumiyo, 2024/11/16

	*/



const player = {
	'f': {},
	'data': {
		'mode': 0,
		'pause': 1,
		'ask': 0,
		'vol': 0.5,
		'loop': false,
		'lrc': {
			'data': null,
			'leng': 0,
			'now': 0,
			'open': 0,
		},
		'timer': {
			't1': null,
			't2': null,
			't3': null,
		},
		'now': {
			'leng': 0,
			'now': 0,
			'id': 0,
		},
	},
}

// 加载音乐信息
player.f.data = function(){
	return [

	{
		name: 'この空であなたを待ってる - KOKIA',
		src: '1830163710',
		img: 'resCPZ3quIJPxdn1HDt3ww==/109951165811423814',
		act: {lrc: true, js: "player.e.img.setAttribute('style', 'margin: -60px -20px;')"},
	},
	{
		name: 'One Last Adventure - Evan Call',
		src: '2116382384',
		img: '8RdmkeoexrTxI7PdasUkhA==/109951169761664617',
		act: {lrc: false, js: "setTimeout(function (){player.e.lrcT.innerHTML = (`　FRIEREN: BEYOND JOURNEY'S END`.repeat(4)); player.e.lrcT.setAttribute('style', 'animation: 31s loop linear infinite normal')}, 1000)"},
	},
	{
		name: 'Goodbye for Now, Eisen - Evan Call',
		src: '2146700515',
		img: 'n21kvn_4tw2AFdVHJX4bjg==/109951169594833348',
		act: {lrc: false, js: "setTimeout(function (){player.e.lrcT.innerHTML = (`　FRIEREN: BEYOND JOURNEY'S END`.repeat(4)); player.e.lrcT.setAttribute('style', 'animation: 31s loop linear infinite normal')}, 1000)"},
	},
	{
		name: "原風景 - mamomo & 丘咲アンナ",
		src: '33469247',
		img: 'ct9bs4VXR1mrbVRsX9iboA==/3372202162443903',
		act: {lrc: true, js: null},
	},
	{
		name: 'ワタリドリ - KOKIA',
		src: '2101452199',
		img: 'rLHKvau26Wt2KA5DJc_u6A==/109951169067925149',
		act: {lrc: true, js: null},
	},
	{
		name: 'Calling - MAROK & mamomo',
		src: '1944649836',
		img: 'vrXsouN6rhgah68sHv4Akg==/109951169530454564',
		act: {lrc: false, js: null},
	},
	{
		name: 'Saudade (Original Mix) - Kupla',
		src: '518904157',
		img: 'c04kf5BCGexeunM4MfAkHw==/109951165069828217',
		act: {lrc: false, js: null},
	},
	{
		name: 'Friend - Kozoro',
		src: '33004707',
		img: 'FR7zKYB8ujNRoWQuGCHbGg==/109951163288692527',
		act: {lrc: false, js: null},
	},
	{
		name: 'Together - Bcalm & Purrple Cat',
		src: '1916742663',
		img: 'zJBR2s3mTC06Z-v4npw2Jw==/109951168736565471',
		act: {lrc: false, js: null},
	},
	{
		name: 'Have You Ever - Darsena & eugenio izzi',
		src: '1980987766',
		img: 'rrUDhlEJKRBdz-1JcsUAFw==/109951169990022823',
		act: {lrc: false, js: null},
	},
	{
		name: 'Disappear in Light - Equal Stones & Endless Melancholy',
		src: '29406314',
		img: 'JIeHyV-yad8BDq_4GmsVuA==/2572857209028564',
		act: {lrc: false, js: null},
	},
	{
		name: 'Gusts of Wind Blowing in Different Directions - The Last Dinosaur',
		src: '19498811',
		img: 'f3exPjEKfsnrQbsUqUlb2w==/109951169557730207',
		act: {lrc: false, js: null},
	},
	{
		name: 'There Is Still Wonder Left To Behold - reche',
		src: '2017419119',
		img: 'b4dFvmdWVTmHv6gKgdgzEQ==/109951168261721978',
		act: {lrc: true, js: null},
	},
	{
		name: 'One Day - KISNOU',
		src: '448316625',
		img: '9QkYHkN8UCiybMg-qHempw==/109951168047707020',
		act: {lrc: false, js: null},
	},
	{
		name: 'like water - Park Bird & Chance Thrash',
		src: '1847674461',
		img: 'FPZrJuBWnJKtR9_4zXmMOQ==/109951166009136375',
		act: {lrc: false, js: null},
	},
	{
		name: '変わり行く世界のために - 茶太',
		src: '697291',
		img: 'eiR5oFPitGtu1hzka4Vm5g==/814738116182197',
		act: {lrc: true, js: null},
	},
	{
		name: 'bliss - milet',
		src: '2122535814',
		img: 'b66bKUxVNZlC_S_3u7UCaA==/109951169268030489',
		act: {lrc: true, js: null},
	},
	{
		name: 'この空であなたを待ってる inst. - KOKIA',
		src: '1830163712',
		img: 'resCPZ3quIJPxdn1HDt3ww==/109951165811423814',
		act: {lrc: true, js: "player.e.img.setAttribute('style', 'margin: -60px -20px;')"},
	},

	]

}



player.list = player.f.data()
player.data.num = player.list.length
env.data.version.player = '1.0.23'

player.e = {
		body: document.querySelector('.player audio'),
		frame: document.querySelector('.player'),
		img: document.querySelector('.player-cover img'),
		name: document.querySelector('.player-name'),
		bar0: document.querySelector('.player-bar0'),
		bar1: document.querySelector('.player-bar1 div'),
		mode: document.querySelector('.player-header-right a'),
		menu: document.querySelector('.player-menu'),
		list: document.querySelectorAll('.list-item'),
		list_body: document.querySelector('.player-list div'),
		btn1: document.querySelectorAll('.player-btn')[0],
		btn2: document.querySelectorAll('.player-btn')[1],
		ask: document.querySelector('.player-ask'),
		s1: document.querySelector('.player-sound1'),
		s2: document.querySelector('.player-sound0'),
		kana: document.querySelector('.player-kana'),
		lrc: document.querySelector('.player-lrc list'),
		lrcI: document.querySelector('.player-lrc img'),
		lrcB: document.querySelector('.player-lrc'),
		lrcT: document.querySelector('.player-title span'),
		line: [],

		cover0: document.querySelector('.player-mobile0'),
		cover1: document.querySelector('.player-mobile1'),
	}



player.f.load = function(){
	// 加载音乐信息
	var id = player.data.now.id

	player.e.name.innerHTML = player.list[id].name
	player.e.img.src = 'https://p1.music.126.net/' + player.list[id].img + '.jpg?param=300y300'
	player.e.body.src = 'https://music.163.com/song/media/outer/url?id=' + player.list[id].src + '.mp3'

	player.e.img.setAttribute('style', 'margin: -124px -40px;')
	player.e.bar1.style.width = '0px'
	player.data.now.per = 0

	player.e.lrcI.setAttribute('style', 'opacity: 0;')
	env.f.fade(player.e.lrcT, -160)
	env.f.fade(player.e.kana, -300)
	env.f.fade(player.e.lrcI, -300)

	// 为当前播放歌曲添加样式
	if (player.e.list[id]) {
		document.getElementById('list-item-active').removeAttribute('id')
		player.e.list[id].id = 'list-item-active'
		env.f.scroll(player.e.list_body, player.e.list[0].offsetHeight * (player.data.now.id - 1), 300)
	}
	if (player.list[id].act.js) {
		eval(player.list[id].act.js)
	}

	// 加载歌词
	player.f.lrc.get()
	setTimeout(function (){
		player.e.lrcI.src = player.e.img.src
		player.e.lrcT.innerHTML = ('　' + player.list[id].name).repeat(4).toUpperCase().replace(/[(]/g, '「').replace(/[)]/g, '」')
		env.f.fade(player.e.lrcT, 300, 'animation: ' + player.list[id].name.length + 's loop linear infinite normal')

		if (!isNaN(player.e.body.duration)) {
			player.data.now.leng = player.e.body.duration
		}
	}, 500)
}

player.f.mode = function(){
	// 切换播放模式
	player.f.mode.set(player.e.body.loop ? 0 : 1)
}
	player.f.mode.set = function(bool){
		if (bool) {
			player.e.mode.innerHTML = ''
			player.e.mode.title = '单曲循环'
			player.e.body.loop = player.data.loop = true
		} else {
			player.e.mode.innerHTML = ''
			player.e.mode.title = '列表循环'
			player.e.body.loop = player.data.loop = false
		}
	}

player.f.menu = function(){
	// 播放器样式变化
	if (player.e.frame.classList.contains('wait') || player.data.ask == 1) return
	player.f.menu.set(player.data.mode ? 0 : 1)
}
	player.f.menu.set = function(bool){
		if (bool) {
			player.data.mode = 1
			player.e.frame.classList.add('wait')
			env.f.fade(player.e.menu, 200)

			if (env.data.isMobile) env.f.fade(player.e.cover1, -200)
			if (!player.e.list.length) player.f.list()
			setTimeout(function (){player.e.frame.classList.remove('wait')},250)
		} else {
			player.data.mode = 0
			player.e.frame.classList.add('wait', 'player-active')
			env.f.fade(player.e.menu, -200)

			if (env.data.isMobile) env.f.fade(player.e.cover1, 400)
			setTimeout(function (){player.e.frame.classList.remove('wait')},250)
		}
	}

player.f.list = function(){
	// 初始化播放列表
	player.e.list_body.innerHTML = ''
	for (var i = 0; i < player.data.num; i++) {
		var a = document.createElement('a')
			a.innerHTML = player.list[i]['name'].split('-')[0]
			a.setAttribute('class', 'list-item')
			a.setAttribute('title', player.list[i]['name'])
			a.setAttribute('onclick', 'player.f.play.start(' + i + ', 1)')

		player.e.list_body.appendChild(a)
	}

	player.e.list = document.querySelectorAll('.list-item')
	player.e.list[player.data.now.id].id = 'list-item-active'

	env.f.scroll(player.e.s1, 600, 10)
}

player.f.play = function(){
	// 播放 & 暂停
	player.f.play.set(player.data.pause ? 1 : 0)
}
	player.f.play.set = function(bool){
		if (bool) {
			player.e.body.volume = 0
			player.data.pause = 0
			player.e.body.play()

			player.e.body.currentTime = (player.e.body.duration * player.data.now.per) || 0
			player.e.body.volume = player.data.vol

			player.e.btn1.setAttribute('class', 'player-btn player-btn1')
			player.e.btn2.setAttribute('class', 'player-btn player-btn1')
		} else {
			player.e.body.pause()
			player.data.pause = 1

			player.e.btn1.setAttribute('class', 'player-btn player-btn0')
			player.e.btn2.setAttribute('class', 'player-btn player-btn0')
		}
	}

	player.f.play.start = function(id, autoplay){
		// 函数调用播放器
		player.data.now.id = id
		player.f.load()

		setTimeout(function (){player.f.play.set(autoplay ? 1 : 0)}, 500)
		return player.list[id].name
	}

player.f.add = function(name, src, img, lrc, act) {
	// 更新播放器列表
	player.list = [
		{
			'name': name,
			'src': src,
			'img': img,
			'act': {'lrc': lrc, 'js': act}
		}
	]
	player.data.now.id = 0
	player.data.num = 1
	player.f.menu.set(1)

	if (!player.data.pause) player.f.play()
	if (player.data.ask) player.f.add.ask(0)
	setTimeout(function (){
		player.f.load()
		player.f.list()
		player.f.menu.set(1)
	}, 500)
}
	player.f.add.ask = function(bool, name, src, img, lrc, act) {
		if (bool) {
			player.data.ask = 1
			clearInterval(player.data.timer.t1)
			clearInterval(player.data.timer.t2)

			setTimeout(function (){player.data.mode ? player.f.menu.set(0) : null}, 2500)
			player.data.timer.t2 = setInterval(() => {
				if (env.data.isMobile) {env.f.fade(player.e.cover1, -200)}
				player.data.timer.t1 = setInterval(() => {
					if(player.data.ask) {
						player.f.add.ask(0)
						clearInterval(player.data.timer.t2)
					}
				}, 20000)

				if (env.data.isMobile) {
					env.f.fade(player.e.cover1, -200)
					player.e.frame.classList.add('player-phone')
					player.e.cover0.setAttribute('style', 'display: none')
				}
				env.f.fade(player.e.ask, 200)
				player.e.ask.querySelectorAll('a')[0].setAttribute('onclick', 'player.f.add("' + name + '", "' + src + '", "' + img + '", ' + lrc + ', "' + act + '")')
				clearInterval(player.data.timer.t2)

			}, 3000)
		} else {
			player.data.ask = 0
			env.f.fade(player.e.ask, -200)
			if (!player.data.ask && env.data.isMobile) env.f.fade(player.e.cover1, 200)
			clearInterval(player.data.timer.t2)
		}
	}

player.f.reset = function() {
	// 重置歌单
	player.list = player.f.data()
	player.data.num = player.list.length
	player.data.now.id = 0
	player.f.list()
	player.f.load()
	player.f.mode.set(1)
}

player.f.conv0 = function(n) {
	// 转换 ms --> mm:ss.fff
	var ts = Math.floor(n / 1000)
	var m = String(Math.floor(ts / 60)).padStart(2, '0')
	var s = String(ts % 60).padStart(2, '0')
	var ms = String(n % 1000).padStart(3, '0')

	return `${m}:${s}.${ms}`.substring(0, 9)
}

player.f.conv1 = function(str) {
	// 转换 mm:ss.fff --> ms
	var parts = str.split(':')
	return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
}

player.f.vol = function(n) {
	// 调整音量
	player.e.body.volume = n
}

player.f.show = function() {
	// 显示 & 隐藏播放器
	if(player.e.frame.classList.contains('player-phone') && !player.data.mode) {
		player.e.frame.classList.remove('player-phone')
		player.e.cover0.setAttribute('style', 'display: block')
	} else {
		player.e.frame.classList.add('player-phone')
		player.e.cover0.setAttribute('style', 'display: none')
	}
}

player.f.loadPlayer = function() {
	// 激活播放器
	if (typeof env.tmp.t3 == 'undefined') {
		env.tmp.t3 = ''
		return
	}

	env.tmp.t3 = null
	delete env.tmp.t3
	player.e.frame.classList.add('player-active')
}

player.f.lrc = {}
	player.f.lrc.get = function() {
		// 下载歌词
		player.data.lrc.data = null
		env.f.fade(player.e.lrc, -200)

		if (player.list[player.data.now.id].act.lrc) {
			fetch('https://' + env.data.domain + '/src/lrc/' + player.list[player.data.now.id].src + '.lrc')
			.then(response => {
				if (response.ok) {
					return response.text();
				}
			})
			.then(text => {player.f.lrc.load(text)})
			.catch(error => {
				console.error(error)
				setTimeout(function (){env.f.fade(player.e.lrc, 200)}, 1000)
				player.e.lrc.innerHTML = '<br /><br /><br /><br /><br /><br /><h1>' + player.list[player.data.now.id].name + '<br /><br /><span>加载歌词失败 ...</span></h1>'
			})
		} else {
			setTimeout(function (){
				player.e.lrc.innerHTML = '<br /><br /><br /><br /><br /><br /><h1>' + player.list[player.data.now.id].name + '<br /><br /><span>没有填词的纯音乐哦 ...</span></h1>'
				env.f.fade(player.e.lrc, 200)
			}, 1000)
		}
	}

	player.f.lrc.load = function(str) {
		// 渲染歌词
		player.data.lrc.leng = str.split('\n').length
		player.data.lrc.data = str
		player.data.lrc.now = 0
		player.e.lrc.innerHTML = ''

		for (var i = 0; i < player.data.lrc.leng; i++) {
			var line = document.createElement('line')
				line.setAttribute('onclick', 'player.f.lrc.to("' + str.split('\n')[i].substring(1, 10) + '")')
				player.e.lrc.appendChild(line)

			var lrc = document.createElement('lrc')
				if (str.split('\n')[i].split('#')[1] != undefined) {
					lrc.innerHTML = (str.split('\n')[i].slice(12) || '<br /><br />').split('#')[0] + '<trans>' + str.split('\n')[i].split('#')[1] + '</trans>'
				} else {
					lrc.innerHTML = (str.split('\n')[i].slice(12) || '<br /><br />').split('#')[0]
				}
				line.appendChild(lrc)

			var time = document.createElement('time')
				time.innerHTML = str.split('\n')[i].substring(1, 6)
				line.appendChild(time)

		}
		setTimeout(function (){
			player.e.lrc.innerHTML = '<br /><br /><br /><br /><br /><br /><h1>' + player.list[player.data.now.id]['name'] + '</h1><br />' +  player.e.lrc.innerHTML + '<br /><br /><br /><br /><br /><br />'
			player.e.line = document.querySelectorAll('line')
			player.f.lrc.find(player.e.body.currentTime)

			player.e.lrc.setAttribute('style', 'opacity: 0; display: block;')
			env.f.scroll(player.e.lrc, 0, 300)

			setTimeout(function (){
				player.e.lrc.setAttribute('style', 'opacity: 1; display: none;')
				env.f.fade(player.e.lrc, 200)
			}, 100)
		}, 500)

		if (str.includes('<rt>')) {
			player.f.kana()
			env.f.fade(player.e.kana, 300)
		} else {
			env.f.fade(player.e.kana, -300)
		}
	}

	player.f.lrc.read = function(n) {
		// 读取歌词指定行
		return player.data.lrc.data ? (player.data.lrc.data.split('\n')[n] || null) : null
	}

	player.f.lrc.gui = function() {
		// 打开歌词页面
		if (player.data.lrc.open) {
			player.data.lrc.open = 0
			env.f.fade(player.e.lrcB, -160)
		} else {
			player.data.lrc.open = 1
			player.f.lrc.find(player.e.body.currentTime)
			env.f.fade(player.e.lrcB, 160)
		}
	}

	player.f.lrc.find = function(n) {
		// 找到当前正在播放的歌词行数
		if (player.data.lrc.leng) {
			for (var i = 0; i < player.data.lrc.leng; i++) {
				if (Number(player.f.conv1((player.f.lrc.read(i) || '[00:00.000]').substring(1, 10))) <= n) {
					player.data.lrc.now = i
				} else {
					document.querySelector('.line-now') ? document.querySelector('.line-now').removeAttribute('class') : null
				}
			}
		}
	}

	player.f.lrc.to = function(n) {
		// 跳转到指定位置
		player.f.lrc.find(player.f.conv1(n))
		player.f.play.set(1)
		player.e.body.currentTime = player.f.conv1(n)
	}

	player.f.lrc.debug = function() {
		// 调试模式
		document.addEventListener('keydown', function(event) {
			if (event.key === 'Enter' || event.keyCode === 13) {
				console.log(player.f.conv0(player.e.body.currentTime))
			}
		});

		var div = document.createElement('div')
			div.setAttribute('style', 'position: fixed; z-index: 50; bottom: 0;')
			div.innerHTML = `
				<pre style="background: white; margin: 0; font-family: 'Microsoft YaHei'; overflow: scroll; max-height: 500px;" >preview</pre>
				<textarea type="text" autocomplete="off" style="font-family: 'Microsoft YaHei';" ></textarea>
					<button onclick="$('.player-lrc pre').html(document.querySelector('.player-lrc').querySelector('textarea').value)" >preview</button>
					<button onclick="player.f.lrc.load(document.querySelector('.player-lrc').querySelector('textarea').value)" >load</button>
			`
			document.querySelector('.player-lrc').appendChild(div)
	}

player.f.kana = function() {
	// 假名注音
	var e = document.querySelectorAll('rt')
	if (document.querySelector('.player-lrc').querySelector('rt').style.display == 'none') {
		for (var i = 0; i < e.length; i++) {
			e[i].removeAttribute('style')
		}
	} else {
		for (var i = 0; i < e.length; i++) {
			e[i].setAttribute('style', 'display: none;')
		}
	}
}






player.f.load()
player.e.body.volume = 0.5

// 进度条
setInterval(() => {
	if(!player.data.pause){
		player.data.now.per = (player.e.body.currentTime / player.e.body.duration).toFixed(8) || player.data.now.per
		player.e.bar1.setAttribute('style', 'width: ' + player.data.now.per * 100 + '%')
	}
}, 2000)

// 进度调整
player.e.bar0.addEventListener('click', function(event) {
	var p = ((event.clientX - player.e.bar0.getBoundingClientRect().left) / player.e.bar0.offsetWidth).toFixed(8)
	var now = Math.floor(player.e.body.duration || player.data.now.leng) * p
	player.e.bar1.setAttribute('style', 'width: ' + p * 100 + '%')
	player.data.now.per = p

	player.f.lrc.find(now)
	if (player.data.pause == 0) {
		player.e.body.currentTime = now
	}
})

// 歌词显示
player.e.body.addEventListener('timeupdate', function () {
	if (player.data.lrc.open && player.f.conv1((player.f.lrc.read(player.data.lrc.now) || '[59:59.000]').substring(1, 10)) <= player.e.body.currentTime) {
		document.querySelector('.line-now') ? document.querySelector('.line-now').removeAttribute('class') : null
		env.f.scroll(player.e.lrc, player.e.lrc.scrollTop + player.e.line[player.data.lrc.now].getBoundingClientRect().top - 220, 500)
		player.e.line[player.data.lrc.now].classList.add('line-now')
		player.data.lrc.now ++

	} else if (player.data.loop && ((player.e.body.duration - player.e.body.currentTime) <= 1)) {
		// 单曲循环时重置歌词
		player.data.lrc.now = 0
		env.f.scroll(player.e.lrc, 0, 300)
	}

})

// 列表播放
player.e.body.addEventListener('ended', function () {
	if (player.data.now.id == player.data.num - 1) player.data.now.id = -1
	player.data.now.id ++
	player.f.load()
	player.f.play.set(1)
})

// 调整音量
player.e.s1.addEventListener('scroll', () => {
	var s = 100 - (player.e.s1.scrollTop / 10).toFixed(0) + 10
	if (s < 0) var s = 0
	if (s > 100) var s = 100

	player.e.s2.innerHTML = s + '%'
	player.e.body.volume = s / 100
	player.data.vol = s / 100
})

// 手机样式
if (env.data.isMobile) {
	player.e.frame.setAttribute('style', 'transform: translateX(182px);')
}


