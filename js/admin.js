


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
	var cmd = (str.match(/"[^"]+"|\S+/g) || []).map(part => part.replace(/^"|"$/g, ''))
	env.f.write('<cmd>' + str + '</cmd>')

	if (cmd[0] == 'help') {
		env.f.write(`---------------------- [ 帮助 ] ----------------------
help							查看帮助信息
cls							清除控制台

login "密码"					登录
login "旧密码" "新密码"			修改密码
login out						退出登录

select name from sqlite_schema where type='table' and name != '_cf_KV' ORDER BY name		查询所有表名
select * from 表名																	查询指定表的全部数据
select * from 表名 where 列名='行名'													查询指定表指定行的数据`)
		return
	}
	if (cmd[0] == 'cls') {
		env.e.output.innerHTML = ''
		return
	}

	if (cmd[0] == 'login') {
		if (cmd.length == 2) {
			if (cmd[1] == 'out') {	
				env.f.write('<err>the sys has logged out</err>')
				env.data.key = null
				return
			}

			env.f.write('fetch:<info>\n	- api: "https://' + env.data.domain + '/admin.api"\n	- key: "' + cmd[1] + '"</info>')
			fetch('https://' + env.data.domain + '/admin.api', {
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
					env.f.write('<su>[SUCCEED] </su>your key is correct, you have successfully logged in now')
					env.data.key = cmd[1]
				} else {
					env.f.write('<err>[FAILED] </err>your key is incorrect, please try again')
				}
				return
			})
			.catch(err => {env.f.write(('<err>' + err + '</err>').toLowerCase())})
		}

		if (cmd.length == 3 && env.data.key) {
			env.f.write('fetch:<info>\n	- api: "https://' + env.data.domain + '/admin.api"\n	- original_key: "' + cmd[1] + '"\n	- new_key: "' + cmd[2] + '"</info>')
			if (cmd[1] == env.data.key) {
				fetch('https://' + env.data.domain + '/admin.api', {
					method: "POST",
					headers: {
						"Token": 1,
					},
					body: JSON.stringify({
						"old": cmd[1],
						"new": cmd[2],
					})
				})
				.then(response => {
					if (response.ok) {
						return response.json()
					}
				})
				.then(json => {
					env.f.write('<su>[SUCCEED] </su> key changed: "' + cmd[1] + '" => "' + cmd[2] + '"')
					env.data.key = cmd[2]
					return
				})
				.catch(err => {env.f.write(('<err>' + err + '</err>').toLowerCase())})
			} else {
				env.f.write('<err>[FAILED] </err>your original key is incorrect, please try again')
			}
		}
	}

	if (['update', 'select', 'create', 'drop', 'alter', 'insert', 'delete'].includes(cmd[0])) {
		env.f.write('fetch:<info>\n	- api: "https://' + env.data.domain + '/admin.api</info>')
		fetch('https://' + env.data.domain + '/admin.api', {
			method: "POST",
			headers: {
				"Token": 2,
			},
			body: JSON.stringify({
				"sql": str,
			})
		})
		.then(response => {
			if (response.ok) {
				return response.json()
			}
		})
		.then(json => {
			env.f.write(`<span><cmd onclick="this.parentNode.querySelector('info').removeAttribute('style'); this.remove()" >[show the raw data]</cmd><info style="display: none;" >` + json + `</info></span>`)
			return
		})
		.catch(err => {env.f.write(('<err>' + err + '</err>').toLowerCase())})
	}

}


env.f.write = function(str) {
	// 显示结果
	var span = document.createElement('span')
		span.innerHTML = str + '<br />'

	env.e.output.appendChild(span)
	window.scrollTo(0, document.documentElement.scrollHeight)
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







