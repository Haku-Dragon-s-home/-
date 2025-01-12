


/*	admin.js
 *	created by sumiyo, 2024/7/29
 *	version: BETA 0.00.014

	*/



const env = {
	'data': {
		'domain': 'sumiyo.link',
		'isNetwork': (document.domain ? true :false),
		'isMobile': (window.innerWidth < 900 ? true :false),
		'key': null,
		'callback': null,
	},
	'e': {
		'input': document.querySelector('textarea'),
		'output': document.querySelector('.console'),

	},

	'tmp': {},
	'f': {},
	'timer': {}
}

env.f.analysis = function(str) {
	// 解析命令
	var cmd = str.match(/"[^"]+"|\S+/g) || []
	env.f.write('<cmd>' + str + '</cmd>')

	if (cmd[0] == 'help') {
		env.f.write(`---------------------- [ 帮助 ] ----------------------
help							查看帮助信息
cls							清除控制台
login "密码"					登录
login "旧密码" "新密码"			修改密码`)
		return
	}
	if (cmd[0] == 'cls') {
		env.e.output.innerHTML = ''
		return
	}

	if (cmd[0] == 'login') {
		if (cmd.length == 2) {
			env.f.write('querying the database:<info>\n	- api: "https://' + env.data.domain + '/remark.api"\n	- key: ' + cmd[1] + '</info>')

			fetch('https://' + env.data.domain + '/remark.api', {
				method: "POST",
				headers: {
					"Token": 0,
				},
				body: JSON.stringify({
					"key": cmd[1],
				})
			})
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(json => {
				if (json.results[0].login) {
					env.f.write('<su>login succeeded: </su>your key is correct, you have successfully logged in now')
					env.data.key = cmd[1]
				} else {
					env.f.write('<err>login failed: </err>your key is incorrect, please try again')
				}
			})
			.catch(err => {env.f.write(('<err>' + err + '</err>').toLowerCase())})
		}

		if (cmd.length == 3) {
			alert('修改')
		}
		return
	}



}


env.f.write = function(str) {
	// 显示结果
	var span = document.createElement('a')
		span.innerHTML = str + '<br />'

	env.e.output.appendChild(span)
}



env.e.input.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		env.f.analysis(env.e.input.value)
		env.e.input.value = ''
		e.preventDefault()
	}
   })



env.e.output.innerHTML = ''
env.f.write(new Date())
env.f.write('init env<br />')
env.f.write('<info>login to use the sys functions<info>')







