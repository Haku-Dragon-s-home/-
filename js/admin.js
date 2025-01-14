


/*	admin.js
 *	created by sumiyo, 2024/7/29
 *	version: BETA 0.00.014

	*/


chunk = []
const env = {
	'data': {
		'domain': 'sumiyo.link',
		'isNetwork': (document.domain ? true :false),
		'isMobile': (window.innerWidth < 900 ? true :false),
		'key': null,
		'ask': 0,
	},
	'e': {
		'input': document.querySelector('textarea'),
		'output': document.querySelector('.console'),

	},

	'tmp': {},
	'f': {},
	'timer': {
		't0': null,
		't2': null,
	}
}



env.f.analysis = function(str) {
	// 解析命令
	var cmd = (str.match(/"[^"]+"|\S+/g) || []).map(part => part.replace(/^"|"$/g, ''))
	env.f.write('<cmd>' + str + '</cmd>')



	if (env.data.ask) {
		if (cmd[0].toLowerCase() == 'y' || cmd[0].toLowerCase() == 'n') {
			if (cmd[0].toLowerCase() == 'n') {
				env.f.write('operation cancelled')
				env.data.ask = 0
				return
			}
			if (env.data.ask == 1) {
				env.data.ask = 0
				env.f.write('start to upload file\n	--header: ', false)

				fetch('https://' + env.data.domain + '/admin.api', {
					method: "POST",
					headers: {
						"Token": 1,
					},
					body: JSON.stringify({
						"key": env.data.key,
						"sql": "UPDATE file set data='" + chunk.slice(-1)[0].name + '###' + chunk.slice(-1)[0].chunk + "' where name='header'",
					})
				})
				.then(response => {
					if (response.ok) {
						return response.json()
					}
				})
				.then(json => {
					env.f.write('succeed')
					var i = 0
					clearInterval(env.timer.t1)

					env.timer.t1 = setInterval(() => {
						if (i == chunk.slice(-1)[0].chunk) {
							env.f.write('operation successful, the file has been uploaded')
							chunk = []
							clearInterval(env.timer.t1)
							return
						}

						env.f.write('	--chunk: ' + i)
						fetch('https://' + env.data.domain + '/admin.api', {
							method: "POST",
							headers: {
								"Authorization": i,
								"Token": 2
							},
							body: chunk[i]
						})
						.then(response => {
							if (response.ok) {
								i ++
								return response.json()
							}
						})
						.catch(err => {env.f.write('fetch failed, try again')})

					}, 5000)
				})
				.catch(err => {env.f.write('failed\noperation cancelled')})
				return
			}
		}
		env.f.write('next step ? [Y/N]')
		return
	}



	if (cmd[0] == 'help') {
		env.f.write(`---------------------- [ <warn>帮助</warn> ] ----------------------------
help									查看帮助信息
cls									清除控制台
login "密码"							登录
login "旧密码" "新密码"					修改密码
login out								退出登录
pool add "昵称" "内容" "权限" "id"			添加留言 (权限 = 0 / 1, id 默认填 "")
pool delete "id"						删除留言
pool read "page"						读取指定页的留言 (从 0 开始)
file upload							上传文件
file download							下载文件
file delete							删除文件

select name from sqlite_schema where type='table' and name != '_cf_KV' ORDER BY name		查询所有表名
select * from 表名																	查询指定表的全部数据
select * from 表名 where 列名='数据'													查询指定表指定行的数据
update root set 列名='新数据' where 列名='数据'											修改指定位置的数据
-----------------------------------------------------------`)
		return
	}
	if (cmd[0] == 'cls') {
		env.e.output.innerHTML = ''
		return
	}

	if (cmd[0] == 'login') {
		if (cmd.length == 2) {
			if (cmd[1] == 'out') {	
				env.f.write('<warn>[INFO]</warn> the sys has logged out')
				env.data.key = null
				return
			}

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
			if (cmd[1] == env.data.key) {
				fetch('https://' + env.data.domain + '/admin.api', {
					method: "POST",
					headers: {
						"Token": 1,
					},
					body: JSON.stringify({
						"key": cmd[1],
						"sql": "UPDATE root set content='" + cmd[2] + "' where data='adminKey'",
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



	if (!env.data.key) {return}

	if (cmd[0] == 'file' && cmd.length == 2) {
		if (cmd[1] == 'upload') {
			env.f.write('<input class="upload" type="file" />select the file to upload')
			var e = document.querySelector('.upload')
			e.click()

			e.addEventListener('change', function() {
				var file = event.target.files
				e.remove()
				env.f.chunk(file[0])
			})

			return
		}

		if (cmd[1] == 'download') {
			env.f.write('start to collect data\n	--header: ', false)
			fetch('https://' + env.data.domain + '/admin.api', {
				method: "POST",
				headers: {
					"Token": 1,
				},
				body: JSON.stringify({
					"key": env.data.key,
					"sql": "SELECT * from file where name='header'",
				})
			})
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(json => {
				var file = json.results[0].data.split('###')[0]
				var n = json.results[0].data.split('###')[1]
				chunk = []

				env.f.write('succeed\nstart to collect chunks')
				var i = 0
				clearInterval(env.timer.t1)

				env.timer.t1 = setInterval(() => {
					if (i == n) {
						env.f.write('operation successful, the file has been downloaded<a class="download" >download</a>')
						var e = document.querySelector('.download')

						// 创建一个 Blob 还原以数组形式储存的文件
						var url = URL.createObjectURL(new Blob(chunk, { type: 'application/octet-stream' }))
						e.href = url
						e.download = file
						e.click()

						URL.revokeObjectURL(url)
						chunk = []
						e.remove()

						clearInterval(env.timer.t1)
						return
					}

					env.f.write('	--chunk: ' + i)
					fetch('https://' + env.data.domain + '/admin.api', {
						method: "POST",
						headers: {
							"Token": 1
						},
						body: JSON.stringify({
							"key": env.data.key,
							"sql": "SELECT * from file where name='c" + i + "'",
						})
					})
					.then(response => {
						if (response.ok) {
							i ++
							return response.json()
						}
					})
					.then(json => {
						chunk[i] = new Uint8Array(json.results[0].data).buffer
					})
					.catch(err => {env.f.write('fetch failed, try again')})

				}, 5000)
			})
			.catch(err => {env.f.write('failed\noperation cancelled')})
			return
		}

		if (cmd[1] == 'delete') {
			env.f.write('start to delete data')
			var i = 0
			clearInterval(env.timer.t1)

			env.timer.t1 = setInterval(() => {
				if (i == 10) {
					env.f.write('reset header')
					fetch('https://' + env.data.domain + '/admin.api', {
						method: "POST",
						headers: {
							"Token": 1
						},
						body: JSON.stringify({
							"key": env.data.key,
							"sql": "UPDATE file set data='0###0' where name='header'"
						})
					})
					.then(response => {
						if (response.ok) {
							return response.json()
						}
					})
					.then(json => {
						env.f.write('operation successful, the file has been deleted')
					})
					.catch(err => {env.f.write('fetch failed, try again')})

					clearInterval(env.timer.t1)
					return
				}

				env.f.write('	--chunk: ' + i)
				fetch('https://' + env.data.domain + '/admin.api', {
					method: "POST",
					headers: {
						"Token": 1
					},
					body: JSON.stringify({
						"key": env.data.key,
						"sql": "UPDATE file set data = ''",
					})
				})
				.then(response => {
					if (response.ok) {
						i ++
						return response.json()
					}
				})
				.catch(err => {env.f.write('fetch failed, try again')})
			}, 5000)
			return
		}
	}

	if (['update', 'select', 'create', 'drop', 'alter', 'insert', 'delete'].includes(cmd[0])) {
		fetch('https://' + env.data.domain + '/admin.api', {
			method: "POST",
			headers: {
				"Token": 1,
			},
			body: JSON.stringify({
				"key": env.data.key,
				"sql": str,
			})
		})
		.then(response => {
			if (response.ok) {
				return response.json()
			}
		})
		.then(json => {
			env.f.table(json)
			return
		})
		.catch(err => {env.f.write(('<err>' + err + '</err>').toLowerCase())})
	}



	if (cmd[0] == 'pool') {
		if (cmd.length == 6 && cmd[1] == 'add') {
			var id = cmd[5]
			if (cmd[5] == "") {
				var now = new Date()
				var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
				var formatter = new Intl.DateTimeFormat('en-US', options)
				var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {})
				var id = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`
			}

			var sql = "INSERT INTO comment (id, deletable, name, content) VALUES ('" + id + "', '" + cmd[4] + "', '" + cmd[2] + "', '" + cmd[3] + "'); UPDATE root set content=content+1 where data='comment'"
		}

		if (cmd.length == 3 && cmd[1] == 'delete') {
			var sql = "DELETE FROM comment WHERE id = '" + cmd[2] + "'; UPDATE root set content=content-1 where data='comment'"
		}

		if (cmd.length == 3 && cmd[1] == 'read') {
			var sql = "SELECT * FROM comment ORDER BY id DESC LIMIT " + cmd[2] + ", 5"
		}

		fetch('https://' + env.data.domain + '/admin.api', {
			method: "POST",
			headers: {
				"Token": 1,
			},
			body: JSON.stringify({
				"key": env.data.key,
				"sql": sql,
			})
		})
		.then(response => {
			if (response.ok) {
				return response.json()
			}
		})
		.then(json => {
			env.f.table(json)
			return
		})
		.catch(err => {env.f.write(('<err>' + err + '</err>').toLowerCase())})
	}

	env.f.write('<err>[ERROR]</err> unkown command, or you do not have sufficient permissions to execute this command')
}

env.f.write = function(str, wrap = true) {
	// 显示结果
	var span = document.createElement('span')
		span.innerHTML = str + (wrap ? '<br />' : '')

	env.e.output.appendChild(span)
	window.scrollTo(0, document.documentElement.scrollHeight)
}

env.f.table = function(d) {
	// 打印表格
	if (!d.results) {return}
	if (!d.results.length) {return}
	var a = d.results
	var h = a.length
	var k = Object.keys(a[0])
	var head = ''
	var body = ''

	for (var i = 0; i < k.length; i++) {
		var head = head + '<th>' + k[i] + '</th>'
	}
	for (var x = 0; x < h; x++) {
		var tmp = ''
		for (var y = 0; y < k.length; y++) {
			var tmp = tmp + '<th>' + a[x][k[y]] + '</th>'
		}
		var body = body + '<tr>' + tmp + '</tr>'
	}

	env.f.write(`<table border="1"><thead><tr>` + head + `</tr></thead><tbody>` + body + `</tbody></table><span><span onclick="this.parentNode.querySelector('info').removeAttribute('style'); this.remove()" >[show the raw data]</span><info style="display: none;" >` + JSON.stringify(d) + `</span></span>`)
}

env.f.chunk = function(file) {
	// 文件切片
	var FD = new FormData()
	FD.set('file', file)

	if (FD.get('file').size <= 10485760) {
		var size = 1 * 960 * 1024
		var n = Math.ceil(file.size / size)
		chunk = []
		env.f.write('	--name: ' + file.name + '\n	--mime: ' + file.type + '\n	--size: ' + env.f.sizeFormatter(file.size) + '\n	--chunk: ' + n + ' (960 KB / chunk)')

		// 创建文件分片
		for (var i = 0; i < n; i++) {
			const s = i * size
			const e = Math.min(file.size, s + size)
			chunk[i] = file.slice(s, e)
		}


		// 将片转为二进制流
		env.f.write('convert: Blob => ArrayBuffer')
		var i = 0
		clearInterval(env.timer.t0)

		// 创建 FileReader 对象
		var reader = new FileReader()
		reader.onload = function(e) {chunk[i - 1] = e.target.result}

		env.timer.t0 = setInterval(() => {
			i ++
			reader.readAsArrayBuffer(chunk[i - 1])
			env.f.write('	--chunk: ' + (i - 1))

			if (i == n) {
				chunk.push({name: file.name, chunk: n})
				env.data.ask = 1
				env.f.write('all the preparation work has been done')
				env.f.write('next step ? [Y/N]')
				clearInterval(env.timer.t0)
			}

		},1000)
	} else {
		env.f.write('this file is too large to upload (over 10 MB)')
	}
}

env.f.sizeFormatter = function(bytes) {
	// 文件大小转换
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	if (bytes === 0) return '0 Bytes'
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
	return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}








env.e.input.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		if (env.e.input.value != '') {env.f.analysis(env.e.input.value)}
		env.e.input.value = ''
		e.preventDefault()
	}
   })



env.e.output.innerHTML = ''
env.f.write(new Date())
env.f.write('init env<br />')
env.f.write('<info>login to use the sys functions<info>')


