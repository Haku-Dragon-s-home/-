


/*	script.js
 *	created by sumiyo, 2025/1/10

	*/



const env = {
	'data': {
		'db': null,
		'p': 1,
		'cn': null,
		'pn': 1,
		'isNetwork': (document.domain ? true :false),
		'version': '1.0.10',
	},
	'e': [
		document.querySelectorAll('footer a')[0],
		document.querySelectorAll('footer a')[1],
		document.querySelectorAll('footer a')[2],
		document.querySelector('.post a'),
	],
	'f': {},
	'timer': {'t1': null},
}



env.f.time = function() {
	// 获取标准时间
	var now = new Date()
	var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
	var formatter = new Intl.DateTimeFormat('en-US', options)
	var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})

	return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')
}

env.f.wait = function() {
	// 防止触发速率限制
	clearInterval(env.timer.t1)
	for (var i = 0; i < env.e.length; i++) {env.e[i].classList.add('wait')}

	env.timer.t1 = setInterval(() => {
		for (var i = 0; i < env.e.length; i++) {env.e[i].classList.remove('wait')}
		clearInterval(env.timer.t1)
	}, 3000)
}

env.f.err = function(str) {
	// 抛出请求错误
	document.querySelector('.list').innerHTML = '<span>' + str + '</span><br /><br class="f-1" />'
}

env.f.init = function() {
	// 初始化
	env.f.wait()
	if (env.data.isNetwork) {
		fetch('https://sumiyo.link/remark.api', {
			method: "POST",
			headers: {
				"Token": 3,
			},
			body: JSON.stringify({})
		})
		.then(response => {
			if (response.ok) {
				return response.json()
			}
		})
		.then(json => {
			env.data.cn = Number(json.results[0].data)
			env.data.pn = Math.ceil(env.data.cn / 5)
			document.getElementById('_2').innerHTML = env.data.cn

			env.f.get(1)
		})
		.catch(err => {env.f.err(err)})
	}
}

env.f.get = function(n) {
	// 获取留言数据
	env.data.p = n
	document.getElementById('_1').innerHTML = n

	fetch('https://sumiyo.link/remark.api', {
		method: "POST",
		headers: {
			"Token": 2,
		},
		body: JSON.stringify({
			"page": (n - 1) * 5,
		})
	})
	.then(response => {
		if (response.ok) {
			return response.json()
		}
	})
	.then(json => {
		env.data.db = json
		env.f.load()
	})
	.catch(err => {env.f.err(err)})
}

env.f.load = function() {
	// 加载留言
	var d = env.data.db.results
	var e = document.querySelector('.list')

	e.innerHTML = ''
	env.e[0].setAttribute('class', (env.data.pn == 1) ? 'disabled' : '')
	env.e[1].setAttribute('class', (env.data.p == env.data.pn) ? 'disabled' : '')

	for (var i = 0; i < d.length; i++) {
		var span = document.createElement('comment')
			e.appendChild(span)

		var name = document.createElement('name')
			name.innerText = d[i].name.replace(/\n/g, '') + ':  '
			span.appendChild(name)

		var cont = document.createElement('span')
			cont.innerText = d[i].content
			span.appendChild(cont)

		if (cont.offsetHeight>150) {
			cont.setAttribute('style', 'height: 150px')
			var unfold = document.createElement('a')
				unfold.innerHTML = '[展开]'
				unfold.setAttribute('class', 'unfold')
				unfold.setAttribute('onclick', "this.parentNode.querySelector('span').removeAttribute('style'); this.remove()")
				span.appendChild(unfold)
		}

		var info = document.createElement('info')
			info.innerText = '[' + d[i].id.substring(0, 16) + ']'
			span.appendChild(info)

		if (d[i].op == '0') {
			if (parseInt(d[i].id.replace(/:/g, '').replace(/-/g, '').replace(/ /g, '')) + 7000000 > parseInt(env.f.time())) {
				var a = document.createElement('a')
					a.innerHTML = '[删除]'
					a.setAttribute('class', 'zoltraak')
					a.setAttribute('onclick', 'env.f.zoltraak("' + env.data.db['results'][i]['id'] + '")')
					info.appendChild(a)
			}
		}

		if (d[i].op == '1') {
			name.setAttribute('class', 'op')
		}
	}
}

env.f.submit = function() {
	// 提交留言
	var e1 = document.querySelectorAll('textarea')[0]
	var e2 = document.querySelectorAll('textarea')[1]
	var n = e1.value.replace(/\n/g, '')
	var c = e2.value
	var ban = [' ']

	//  排除违禁词
	if (ban.some(item => n.includes(item))) {return}
	if (n.length == 0 || n.length > 20 || c.length == 0 || c.length > 200) {return	}

	env.f.wait()
	fetch('https://sumiyo.link/remark.api', {
		method: "POST",
		headers: {
			"Token": 1
		},
		body: JSON.stringify({
			"name": n,
			"content": c,
		})
	})
	.then(response => {
		if (response.ok) {
			e2.value = ''
			e2.removeAttribute('style')

			env.data.cn ++
			env.data.pn = Math.ceil(env.data.cn / 5)
			document.getElementById('_2').innerHTML = env.data.cn

			env.f.get(1)
		}
	})
	.catch(err => {env.f.err(err)})
}

env.f.zoltraak = function(id) {
	// 删除留言
	env.f.wait()
	fetch('https://sumiyo.link/remark.api', {
		method: "POST",
		headers: {
			"Token": 0,
		},
		body: JSON.stringify({
			"id": id,
		})
	})
	.then(response => {
		if (response.ok) {
			return response.json()
		}
	})
	.then(json => {
		env.data.cn --
		env.data.pn = Math.ceil(env.data.cn / 5)
		document.getElementById('_2').innerHTML = env.data.cn

		env.f.get(1)
	})
	.catch(err => {env.f.err(err)})
}

env.f.page = function(n) {
	// 翻页
	if (((env.data.p + n) > 0) && ((env.data.p + n) <= env.data.pn)) {
		env.f.wait()
		env.e[0].setAttribute('class', (env.data.p + n == 1) ? 'disabled' : '')
		env.e[1].setAttribute('class', (env.data.p + n == env.data.pn) ? 'disabled' : '')

		env.f.get(env.data.p + n)
	}
}






env.f.init()


